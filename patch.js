const fs = require('fs');
let code = fs.readFileSync('/Volumes/NetworkShare/hnh/worker.js', 'utf8');

// 1. Add WebRTC config to Be (startSession)
if (code.includes('return c({success:!0,session_id:n,room_code:i.room_code,join_url:i.join_url,started_at:s,status:"in-progress"})')) {
    code = code.replace(
        'return c({success:!0,session_id:n,room_code:i.room_code,join_url:i.join_url,started_at:s,status:"in-progress"})',
        `let webrtc_config={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"turn:turn.brainsait.org:3478",username:"hnh-video",credential:a.TURN_SECRET||"hnh-video-prod-2026"}]};return c({success:!0,session_id:n,room_code:i.room_code,join_url:i.join_url,started_at:s,status:"in-progress",webrtc_config})`
    );
}

// 2. Add incoming webhooks handlers
if (code.includes('h.post("/api/email/send",(u,a)=>je(u,a));')) {
    code = code.replace(
        'h.post("/api/email/send",(u,a)=>je(u,a));',
        'h.post("/api/email/send",(u,a)=>je(u,a));h.post("/api/webhooks/email",(u,a)=>c({success:!0,status:"tracked"}));h.post("/api/webhooks/claims",(u,a)=>c({success:!0,status:"updated"}));'
    );
}

// 3. Restrict CORS
code = code.replace(/"Access-Control-Allow-Origin":"\*"/g, '\"Access-Control-Allow-Origin\":\"https://hnh.brainsait.org\"');

fs.writeFileSync('/Volumes/NetworkShare/hnh/worker.js', code);
console.log("Patched worker.js");
