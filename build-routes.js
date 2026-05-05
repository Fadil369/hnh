const fs = require('fs');
const basmaJs = fs.readFileSync('basma-portal/src/html.js', 'utf8');
const stitchHtml = fs.readFileSync('stitch-doctor-dashboard/1-doctor-dashboard-553dbe598d7c42e4870318243d354509.html', 'utf8');

// Extract bsmaHtml content
const basmaHtmlMatch = basmaJs.match(/const bsmaHtml = `([\s\S]*?)`;\s*(?:\r?\n|$)/);
let basmaHtml = basmaHtmlMatch ? basmaHtmlMatch[1] : '';
if (!basmaHtml) {
  // Try fallback logic
  const lines = basmaJs.split('\n');
  let inString = false;
  let str = [];
  for (let l of lines) {
    if (l.includes('const bsmaHtml = `')) { inString = true; continue; }
    if (inString && l.startsWith('`;')) { inString = false; break; }
    if (inString) { str.push(l); }
  }
  basmaHtml = str.join('\n');
}

let worker = fs.readFileSync('worker.js', 'utf8');

const basmaStr = JSON.stringify(basmaHtml);
const stitchStr = JSON.stringify(stitchHtml);

const injectCode = `
function basmaPortalPage(u) {
  return new Response(${basmaStr}, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
function stitchDoctorDashboard(u) {
  return new Response(${stitchStr}, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
`;

// Insert the functions before function ru(u)
worker = worker.replace('function ru(u){', injectCode + '\nfunction ru(u){');

// Update ru(u) to handle them
worker = worker.replace(
  'e==="provider-dashboard"||e==="doctor-dashboard")return G0(u);',
  'e==="provider-dashboard"||e==="doctor-dashboard")return G0(u);if(e==="basma"||e==="basma-portal")return basmaPortalPage(u);if(e==="stitch-doctor-dashboard")return stitchDoctorDashboard(u);'
);

fs.writeFileSync('worker.js', worker);
console.log('worker.js patched');
