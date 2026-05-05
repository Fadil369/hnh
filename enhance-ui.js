const fs = require('fs');
let code = fs.readFileSync('worker.js', 'utf8');

const originalActions = `<div class="actions"><a class="action" href="/givc/?lang='+e+'#eligibility"><span class="icon">270</span>'+s.eligibility+'</a><a class="action" href="/api/rcm/health"><span class="icon">RCM</span>Revenue Cycle</a><a class="action" href="/givc/network"><span class="icon">OID</span>'+s.network+'</a><a class="action" href="/api/fhir/Practitioner/'+(i||"DRV-S85MNP")+'"><span class="icon">FHIR</span>Practitioner</a></div>`;

// Wait, the string in worker.js might be slightly different:
// <div class="actions"><a class="action" href="/api/nphies/270"><span class="icon">270</span>'+s.eligibility+'</a><a class="action" href="/api/rcm/health"><span class="icon">RCM</span>Revenue Cycle</a><a class="action" href="/givc/network"><span class="icon">OID</span>'+s.network+'</a><a class="action" href="/api/fhir/Practitioner/'+(i||"DRV-S85MNP")+'"><span class="icon">FHIR</span>Practitioner</a></div>
// Wait, the previous sed replace was: d=d.replace('href="/api/nphies/270"','href="/givc/?lang='+e+'#eligibility"')

const newActions = `<div class="actions"><a class="action" href="/api/nphies/270"><span class="icon">270</span>'+s.eligibility+'</a><a class="action" href="/api/rcm/health"><span class="icon">RCM</span>Revenue Cycle</a><a class="action" href="/givc/network"><span class="icon">OID</span>'+s.network+'</a><a class="action" href="javascript:void(0)" onclick="fetch(\\'/api/rcm/auto-appeal-batch\\',{method:\\'POST\\'}).then(r=>r.json()).then(d=>alert(d.message)).catch(e=>alert(e))"><span class="icon">🤖</span>Auto Appeal</a><a class="action" href="/api/fhir/Practitioner/'+(i||"DRV-S85MNP")+'"><span class="icon">FHIR</span>Practitioner</a></div>`;

// We'll just replace `<div class="actions">...</div>` using a regex.
code = code.replace(/<div class="actions">.*?<\/div>/, newActions);

fs.writeFileSync('worker.js', code);
console.log('UI enhanced.');
