const fs = require('fs');
let code = fs.readFileSync('worker.js', 'utf8');

// The problematic lines have things like:
// result("`+e.missingFields+'",false)
// result("\u2705 '+e.resultReady+'<br>"+fmt(d)
// result("'+e.failedAction+`",false)

// Fix missingFields
code = code.replace(/result\("`\+e\.missingFields\+'",false\)/g, 'result("`+e.missingFields+`",false)');

// Fix resultReady
code = code.replace(/result\("\\u2705 '\+e\.resultReady\+'<br>"/g, 'result("\\u2705 `+e.resultReady+`<br>"');

// Fix failedAction
code = code.replace(/result\("'\+e\.failedAction\+`",false\)/g, 'result("`+e.failedAction+`",false)');

fs.writeFileSync('worker.js', code);
console.log('Fixed quotes in worker.js');
