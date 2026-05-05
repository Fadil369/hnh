const fs = require('fs');
let code = fs.readFileSync('worker.js', 'utf8');

const autoAppealCode = `
h.post("/api/rcm/auto-appeal-batch", async (u, a) => {
  try {
    let req = await u.json();
    let batchId = req.batch_id || "BAT-2026-NB-00004295-OT";
    
    // Simulating batch fetch
    let claims = [];
    if (a.DB) {
      let res = await a.DB.prepare("SELECT * FROM claims WHERE batch_number = ? AND status = 'rejected'").bind(batchId).all();
      if (res && res.results) claims = res.results;
    }
    
    if (claims.length === 0) {
      return c({ success: true, message: "No rejected claims found in batch to auto-appeal.", processed: 0 });
    }
    
    let appealed = 0;
    let results = [];
    
    for(let claim of claims) {
      // Create mock request to /api/rcm/appeal/generate
      let mockReq = new Request("https://internal/appeal", {
        method: "POST",
        body: JSON.stringify({
           claim_id: claim.claim_id || claim.claim_number,
           rejection_code: claim.rejection_code || "MN-1-1",
           payer: claim.payer_name,
           rejection_amount_sr: claim.total_amount
        })
      });
      let appealData = await (await re(mockReq)).json();
      
      // If strong or medium, auto resubmit
      if (appealData.appeal_strength !== "weak") {
         let mockResubmit = new Request("https://internal/resubmit", {
           method: "POST",
           body: JSON.stringify({ claim_id: claim.claim_id, action: "auto_appeal", appeal_data: appealData })
         });
         let resubmitResult = await (await pe(mockResubmit, a, {}, [claim.claim_id])).json();
         appealed++;
         results.push({ claim_id: claim.claim_id, status: "Appealed", details: resubmitResult });
      } else {
         results.push({ claim_id: claim.claim_id, status: "Skipped", reason: "Weak appeal strength" });
      }
    }
    
    return c({
      success: true,
      batch_id: batchId,
      total_rejected: claims.length,
      auto_appealed: appealed,
      results: results,
      message: "Automated batch appeal process completed."
    });
  } catch(e) {
    return c({ success: false, error: e.message }, 500);
  }
});
`;

// Inject before h.post("/api/rcm/appeal/generate",u=>re(u));
code = code.replace(
  'h.post("/api/rcm/appeal/generate",u=>re(u));',
  'h.post("/api/rcm/appeal/generate",u=>re(u));\n' + autoAppealCode
);

fs.writeFileSync('worker.js', code);
console.log('Auto appeal endpoint added.');
