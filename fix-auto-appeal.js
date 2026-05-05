const fs = require('fs');
let code = fs.readFileSync('worker.js', 'utf8');

code = code.replace(
  'let req = await u.json();',
  'let req = {}; try { req = await u.json(); } catch(e) {}'
);

code = code.replace(
  "fetch(\\'/api/rcm/auto-appeal-batch\\',{method:\\'POST\\'})",
  "fetch(\\'/api/rcm/auto-appeal-batch\\',{method:\\'POST\\',headers:{\\'Content-Type\\':\\'application/json\\'},body:\\'{}\\'})"
);

fs.writeFileSync('worker.js', code);
console.log('Fixed auto-appeal endpoint.');
