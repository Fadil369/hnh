const fs = require('fs');
let code = fs.readFileSync('worker.js', 'utf8');

const scheduledCode = `
  async scheduled(event, env, ctx) {
    console.log("Cron trigger started at:", event.cron);
    
    // 1. RCM / NPHIES Automation: Auto-fetch claim statuses (276) and Remittance Advices (835)
    try {
      if (env.NPHIES_MIRROR_URL) {
        console.log("Fetching NPHIES batch status updates...");
        // This is a simulated background job to pull latest statuses from the mirror.
        // It helps keep the local D1 cache in sync without human interaction.
        const rcmUpdate = await fetch(env.NPHIES_MIRROR_URL + "/api/rcm/sync-remittance", {
          method: "POST",
          headers: { "Authorization": "Bearer " + (env.API_KEY || "") }
        });
        if(rcmUpdate.ok) console.log("RCM Sync successful.");
      }
    } catch(e) {
      console.error("NPHIES Cron error:", e);
    }
    
    // 2. Patient Automation: Send appointment reminders
    try {
      if (env.HIS_DB) {
        console.log("Checking for tomorrow's appointments to send reminders...");
        // In a real system, we'd query HIS_DB for tomorrow's appointments and push to WhatsApp/MailLinc.
        // For demonstration of workflow enhancement:
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tStr = tomorrow.toISOString().split('T')[0];
        
        const q = "SELECT * FROM appointments WHERE appointment_date = ? AND status = 'scheduled'";
        const apps = await env.HIS_DB.prepare(q).bind(tStr).all();
        if (apps && apps.results) {
           console.log("Found " + apps.results.length + " appointments to remind.");
           for(const app of apps.results) {
             // Mock call to maillinc or givc-portal for WhatsApp sending
             console.log("Sending reminder to patient: " + app.patient_id + " for clinic: " + app.clinic_name);
           }
        }
      }
    } catch(e) {
      console.error("Patient Reminder Cron error:", e);
    }
  }
`;

// Inject into the export statement
code = code.replace(
  'var It={async fetch(u,a,e){',
  'var It={' + scheduledCode + ',\n  async fetch(u,a,e){'
);

fs.writeFileSync('worker.js', code);
console.log('Cron scheduler added.');
