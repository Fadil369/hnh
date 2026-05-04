// BSMA Portal v3.0 — Embedded HTML
// Auto-generated from static/bsma.html
const bsmaHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta name="theme-color" content="#080b14">
<meta name="description" content="BasmaGuist Medical — AI Healthcare Assistant for Hayat National Hospitals">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>BasmaGuist Medical AI</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<script src="https://elevenlabs.io/convai-widget/index.js" async type="text/javascript"></script>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%F0%9F%A4%96%3C/text%3E%3C/svg%3E">
<style>
/* BASMA AI v3.0 Enhanced */
:root{--rose:#e8528d;--rl:rgba(232,82,141,.12);--rg:rgba(232,82,141,.25);--purple:#9333ea;--pl:rgba(147,51,234,.12);--blue:#3b82f6;--bl:rgba(59,130,246,.12);--teal:#14b8a6;--tl:rgba(20,184,166,.12);--p:var(--rose);--succ:#10b981;--sl:rgba(16,185,129,.12);--err:#ef4444;--el:rgba(239,68,68,.12);--warn:#f59e0b;--wl:rgba(245,158,11,.12);--info:#06b6d4;--il:rgba(6,182,212,.12);--bg:#080b14;--s1:rgba(17,24,39,.7);--s2:rgba(26,34,53,.6);--cd:rgba(30,41,59,.5);--inp:rgba(31,41,55,.8);--gl:rgba(17,24,39,.4);--bd:rgba(55,65,81,.5);--tx:#f1f5f9;--tm:#94a3b8;--td:#64748b;--r:14px;--rs:10px;--rx:6px;--sh:0 4px 24px rgba(0,0,0,.35);--shl:0 8px 40px rgba(0,0,0,.45);--gr:0 0 20px rgba(232,82,141,.15);--gb:16px;--gbd:1px solid rgba(255,255,255,.06)}
*,:after,:before{box-sizing:border-box;margin:0;padding:0}
html{font-size:15px}
body{font-family:'Noto Sans Arabic',-apple-system,sans-serif;background:var(--bg);color:var(--tx);min-height:100dvh;display:flex;flex-direction:column}
body::before{content:'';position:fixed;inset:0;z-index:-1;background:radial-gradient(ellipse 600px 400px at 20% 20%,rgba(232,82,141,.06),transparent),radial-gradient(ellipse 500px 500px at 80% 80%,rgba(147,51,234,.05),transparent),radial-gradient(ellipse 400px 300px at 50% 50%,rgba(59,130,246,.04),transparent);pointer-events:none}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:0 0}::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08);border-radius:3px}
header{background:var(--gl);-webkit-backdrop-filter:blur(var(--gb));backdrop-filter:blur(var(--gb));border-bottom:var(--gbd);display:flex;align-items:center;height:60px;flex-shrink:0;gap:12px;position:sticky;top:0;z-index:100;padding:0 20px}
.logo{display:flex;align-items:center;gap:10px;flex-shrink:0}
.logo-ic{width:38px;height:38px;background:linear-gradient(135deg,var(--rose),var(--purple));border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;box-shadow:var(--gr)}
.logo-tx{font-weight:700;font-size:1.05rem;white-space:nowrap}
.logo-sub{color:var(--tm);font-size:.75rem}
.hdr-s{flex:1}
.lb{display:flex;align-items:center;gap:5px;padding:4px 10px;border-radius:20px;background:var(--sl);color:var(--succ);font-size:.7rem;font-weight:600;white-space:nowrap}
.lb::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--succ);animation:lp 2s infinite}
@keyframes lp{0%,100%{opacity:1}50%{opacity:.3}}
.hc{display:flex;gap:3px;overflow-x:auto;scrollbar-width:none;flex:1;justify-content:center}
.hc::-webkit-scrollbar{display:none}
.hc-btn{padding:5px 12px;border-radius:16px;font-size:.78rem;background:var(--inp);border:1px solid var(--bd);color:var(--tm);cursor:pointer;transition:all .25s;white-space:nowrap;font-family:inherit}
.hc-btn:hover{border-color:var(--p);color:#fff}
.hc-btn.on{background:linear-gradient(135deg,var(--rose),var(--purple));color:#fff;border-color:transparent;box-shadow:var(--gr)}
.hdr-btn{background:var(--inp);border:1px solid var(--bd);color:var(--tm);padding:7px 12px;border-radius:var(--rx);cursor:pointer;font-size:.82rem;transition:all .2s;display:flex;align-items:center;gap:5px;white-space:nowrap;font-family:inherit}
.hdr-btn:hover{border-color:var(--p);color:#fff;box-shadow:var(--gr)}
.tabs{background:var(--gl);-webkit-backdrop-filter:blur(var(--gb));backdrop-filter:blur(var(--gb));border-bottom:var(--gbd);display:flex;overflow-x:auto;flex-shrink:0;scrollbar-width:none}
.tab{font-size:.8rem;color:var(--tm);background:0 0;border:none;border-bottom:2px solid transparent;cursor:pointer;transition:all .25s;white-space:nowrap;display:flex;align-items:center;gap:4px;flex-shrink:0;font-family:inherit;padding:11px 12px}
.tab:hover{color:var(--tx);background:rgba(255,255,255,.02)}
.tab.on{color:var(--p);border-bottom-color:var(--p)}
.tab.on::after{content:'';position:absolute;bottom:-1px;left:20%;right:20%;height:2px;background:linear-gradient(90deg,var(--rose),var(--purple));border-radius:1px;display:none}
main{flex:1;display:flex;overflow:hidden}
.pn{display:none;flex:1;overflow-y:auto;padding:20px;animation:pi .3s ease-out}
.pn.on{display:block}
@keyframes pi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.g3{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-bottom:20px}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px}
.sc{background:var(--gl);-webkit-backdrop-filter:blur(var(--gb));backdrop-filter:blur(var(--gb));border:var(--gbd);border-radius:var(--r);padding:18px;transition:all .3s;position:relative;overflow:hidden}
.sc::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--rose),var(--purple));opacity:0;transition:opacity .3s}
.sc:hover{transform:translateY(-3px);box-shadow:var(--shl);border-color:rgba(232,82,141,.15)}
.sc:hover::before{opacity:1}
.sc-i{font-size:1.8rem;margin-bottom:6px}
.sc-l{color:var(--tm);font-size:.8rem;margin-bottom:2px}
.sc-v{font-size:1.6rem;font-weight:800;background:linear-gradient(135deg,var(--tx),var(--rose));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.sc-d{font-size:.72rem;color:var(--td);margin-top:2px}
.cd{background:var(--gl);-webkit-backdrop-filter:blur(var(--gb));backdrop-filter:blur(var(--gb));border:var(--gbd);border-radius:var(--r);margin-bottom:14px;overflow:hidden}
.cd-h{padding:14px 18px;border-bottom:var(--gbd);display:flex;align-items:center;justify-content:space-between;font-weight:600;font-size:.9rem;cursor:pointer}
.cd-h:hover{background:rgba(255,255,255,.02)}
.cd-b{padding:14px 18px}
.cd-b.hide{display:none}
.fg{margin-bottom:12px}
.fg label{display:block;margin-bottom:4px;font-size:.82rem;color:var(--tm);font-weight:500}
.fg input,.fg select{width:100%;background:var(--inp);border:1px solid var(--bd);border-radius:var(--rx);color:var(--tx);padding:10px 12px;font-size:.88rem;font-family:inherit;transition:all .25s}
.fg input:focus,.fg select:focus{border-color:var(--p);outline:none;box-shadow:var(--gr)}
.fg select option{background:var(--s1);color:var(--tx)}
.fr{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.btn{padding:10px 18px;border-radius:var(--rs);border:none;font-size:.88rem;font-weight:600;cursor:pointer;transition:all .25s;display:inline-flex;align-items:center;gap:6px;font-family:inherit}
.btn:active{transform:scale(.97)}
.btn-p{background:linear-gradient(135deg,var(--rose),var(--purple));color:#fff;box-shadow:0 2px 12px rgba(232,82,141,.25)}
.btn-p:hover{box-shadow:0 4px 20px rgba(232,82,141,.35)}
.btn-o{background:0 0;border:1px solid var(--bd);color:var(--tx)}
.btn-o:hover{border-color:var(--p);color:#fff}
.btn-s{background:linear-gradient(135deg,#10b981,#059669);color:#fff}
.btn-d{background:linear-gradient(135deg,#ef4444,#dc2626);color:#fff}
.btn-w{width:100%;justify-content:center}
.btn-sm{padding:6px 12px;font-size:.78rem;border-radius:var(--rx)}
.tw{border-radius:var(--rs);overflow-x:auto}
.tw table{width:100%;border-collapse:collapse;font-size:.8rem}
.tw th{background:rgba(15,23,42,.6);color:var(--tm);font-weight:600;padding:9px 10px;border-bottom:var(--gbd);white-space:nowrap}
.tw td{padding:9px 10px;border-bottom:var(--gbd)}
.tw tr:hover td{background:rgba(255,255,255,.02)}
.bd{display:inline-flex;align-items:center;gap:3px;padding:3px 10px;border-radius:12px;font-size:.72rem;font-weight:600}
.bd-ok{background:var(--sl);color:var(--succ)}
.bd-er{background:var(--el);color:var(--err)}
.bd-wa{background:var(--wl);color:var(--warn)}
.bd-in{background:var(--il);color:var(--info)}
.vp{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:24px;text-align:center}
.vr{width:180px;height:180px;border-radius:50%;background:var(--gl);border:2px solid var(--bd);display:flex;align-items:center;justify-content:center;margin-bottom:20px;cursor:pointer;transition:all .4s}
.vr:hover{border-color:var(--p);box-shadow:var(--gr)}
.vr.ls{border-color:var(--rose);box-shadow:0 0 40px rgba(232,82,141,.3);animation:vp 2s infinite}
.vr.th{border-color:var(--purple);box-shadow:0 0 40px rgba(147,51,234,.3);animation:vs 1.5s linear infinite}
.vr.sp{border-color:var(--teal);box-shadow:0 0 40px rgba(20,184,166,.3)}
@keyframes vp{0%,100%{box-shadow:0 0 20px rgba(232,82,141,.2)}50%{box-shadow:0 0 50px rgba(232,82,141,.4)}}
@keyframes vs{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
.vi{font-size:3.5rem;transition:all .3s}
.vr.ls .vi{animation:vb .8s infinite}
@keyframes vb{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
.vs{font-size:1.1rem;font-weight:600;margin-bottom:6px}
.vsu{color:var(--tm);font-size:.85rem;margin-bottom:16px}
.vtx{max-width:500px;min-height:40px;padding:12px 20px;background:var(--cd);border:var(--gbd);border-radius:var(--r);font-size:.9rem;line-height:1.6;margin-bottom:16px}
.vw{display:flex;align-items:center;gap:3px;height:30px;margin-bottom:16px}
.vw span{width:3px;background:var(--rose);border-radius:2px;animation:wv 1.2s ease-in-out infinite}
.vw span:nth-child(1){animation-delay:0s;height:12px}
.vw span:nth-child(2){animation-delay:.1s;height:20px}
.vw span:nth-child(3){animation-delay:.2s;height:16px}
.vw span:nth-child(4){animation-delay:.3s;height:24px}
.vw span:nth-child(5){animation-delay:.4s;height:14px}
@keyframes wv{0%,100%{height:8px}50%{height:24px}}
.vw.pa span{animation:none;height:4px;opacity:.3}
.vh{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:500px}
.vh button{padding:6px 14px;border-radius:16px;font-size:.78rem;background:var(--inp);border:1px solid var(--bd);color:var(--tm);cursor:pointer;transition:all .25s;font-family:inherit}
.vh button:hover{border-color:var(--p);color:#fff;background:var(--rl)}
.ca{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}
.cs{display:flex;flex-wrap:wrap;gap:6px;padding:10px 16px;border-top:var(--gbd);background:var(--gl)}
.cs button{padding:6px 14px;border-radius:16px;font-size:.78rem;background:var(--inp);border:1px solid var(--bd);color:var(--tm);cursor:pointer;transition:all .25s;font-family:inherit}
.cs button:hover{border-color:var(--p);color:#fff;background:var(--rl)}
.cb{display:flex;align-items:center;gap:8px;padding:10px 16px;border-top:var(--gbd);background:var(--gl)}
.cb textarea{flex:1;background:var(--inp);border:1px solid var(--bd);border-radius:var(--rs);color:var(--tx);font-size:.88rem;padding:10px 14px;resize:none;min-height:42px;max-height:100px;font-family:inherit}
.cb textarea:focus{border-color:var(--p);outline:none;box-shadow:var(--gr)}
.cb .sb{width:42px;height:42px;border-radius:var(--rs);border:none;background:linear-gradient(135deg,var(--rose),var(--purple));color:#fff;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .25s;box-shadow:var(--gr)}
.cb .sb:hover{transform:scale(1.05)}
.cb .mb{width:42px;height:42px;border-radius:var(--rs);border:1px solid var(--bd);background:var(--inp);color:var(--tm);font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .25s}
.cb .mb.on{background:linear-gradient(135deg,#ef4444,#dc2626);border-color:transparent;animation:cpl 1.5s infinite}
@keyframes cpl{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.4)}50%{box-shadow:0 0 0 8px rgba(239,68,68,0)}}
.msg{max-width:82%;padding:12px 16px;border-radius:var(--r);line-height:1.65;font-size:.88rem;word-wrap:break-word;animation:mi .3s ease-out}
@keyframes mi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.msg.us{background:linear-gradient(135deg,var(--rose),var(--purple));color:#fff;align-self:flex-end;border-end-end-radius:4px}
.msg.bo{background:var(--cd);align-self:flex-start;border:var(--gbd)}
.msg .mt{font-size:.68rem;color:rgba(255,255,255,.5);margin-top:4px}
.msg.bo .mt{color:var(--td)}
.ty{display:flex;gap:5px;padding:12px 18px;align-self:flex-start;background:var(--cd);border-radius:var(--r);border:var(--gbd)}
.ty span{width:7px;height:7px;border-radius:50%;background:var(--rose);animation:tb 1.4s infinite}
.ty span:nth-child(2){animation-delay:.15s}
.ty span:nth-child(3){animation-delay:.3s}
@keyframes tb{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);padding:12px 22px;border-radius:var(--rs);background:var(--gl);-webkit-backdrop-filter:blur(var(--gb));backdrop-filter:blur(var(--gb));border:var(--gbd);color:var(--tx);font-size:.85rem;box-shadow:var(--shl);z-index:999;display:none;align-items:center;gap:8px;max-width:88%}
.toast.on{display:flex;animation:ti .35s ease-out}
@keyframes ti{from{opacity:0;transform:translateX(-50%) translateY(16px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
.ld{display:flex;align-items:center;justify-content:center;gap:8px;padding:24px;color:var(--tm)}
.em{display:flex;flex-direction:column;align-items:center;padding:48px 24px;text-align:center;color:var(--tm)}
.em .ei{font-size:2.5rem;margin-bottom:12px;opacity:.5}
.em h3{font-size:.95rem;margin-bottom:6px;color:var(--tx)}
.em p{font-size:.82rem;max-width:320px;line-height:1.5}
.ib{display:flex;gap:6px;flex-wrap:wrap}
.ib span{padding:3px 9px;border-radius:10px;font-size:.7rem;display:inline-flex;align-items:center;gap:3px}
.ib .up{background:var(--sl);color:var(--succ)}
.ib .dn{background:var(--el);color:var(--err)}
.ib .wa{background:var(--wl);color:var(--warn)}
@media(max-width:768px){.g2{grid-template-columns:1fr}.fr{grid-template-columns:1fr}header{padding:0 12px;height:auto;flex-wrap:wrap;gap:6px}.hc{order:3;width:100%;justify-content:flex-start;padding:4px 0}.pn{padding:14px}.tab{padding:9px 8px;font-size:.75rem}.sc{padding:14px}.sc-v{font-size:1.3rem}}
</style>
</head>
<body>
<div class="toast" id="toast"></div>
<header>
  <div class="logo"><div class="logo-ic">🤖</div><div><div class="logo-tx">بسمة <span class="logo-sub">| AI Agent</span></div></div></div>
  <div class="hdr-s"></div>
  <span class="lb" id="liveBadge">متصل</span>
  <div class="hc" id="hospChips">
    <button class="hc-btn on" data-h="riyadh">الرياض</button>
    <button class="hc-btn" data-h="madinah">المدينة</button>
    <button class="hc-btn" data-h="unaizah">عنيزة</button>
    <button class="hc-btn" data-h="khamis">خميس</button>
    <button class="hc-btn" data-h="jizan">جيزان</button>
    <button class="hc-btn" data-h="abha">أبها</button>
  </div>
  <button class="hdr-btn" id="langBtn">🇸🇦 AR</button>
</header>
<nav class="tabs" id="tabNav">
  <button class="tab on" data-tab="voice">🎙️ صوتي</button>
  <button class="tab" data-tab="chat">💬 محادثة</button>
  <button class="tab" data-tab="insights">📊 تحليلات</button>
  <button class="tab" data-tab="nphies">🏛️ NPHIES</button>
  <button class="tab" data-tab="elig">🛡️ أهلية</button>
  <button class="tab" data-tab="appt">📅 مواعيد</button>
  <button class="tab" data-tab="oracle">🔗 Oracle</button>
  <button class="tab" data-tab="comms">📞 تواصل</button>
</nav>
<main>
<section class="pn on" id="pn-voice">
  <div class="vp">
    <div style="margin-bottom:14px"><elevenlabs-convai agent-id="agent_3401kaac3de5fsnvvfyye79vp9es"></elevenlabs-convai></div>
    <div class="vr" id="voiceRing" data-a="toggleVoice"><span class="vi" id="voiceIcon">🎙️</span></div>
    <div class="vs" id="voiceStatus">اضغط للتحدث مع بسمة</div>
    <div class="vsu" id="voiceSub">تتحدث العربية والإنجليزية</div>
    <div class="vtx" id="voiceTranscript"></div>
    <div class="vw pa" id="voiceWaves"><span></span><span></span><span></span><span></span><span></span></div>
    <button class="btn btn-o btn-sm" data-a="clearVoice">🗑️ مسح</button>
    <div class="vh" style="margin-top:16px">
      <button data-q="اعرف مواعيد العيادات" class="vq">🕒 مواعيد</button>
      <button data-q="أبي أتأكد من أهليتي التأمينية" class="vq">🛡️ أهلية</button>
      <button data-q="كم عدد الأطباء" class="vq">👨‍⚕️ أطباء</button>
      <button data-q="كيف أحجز موعد" class="vq">📅 حجز</button>
      <button data-q="جهات التأمين المتعاقد معها" class="vq">🏦 تأمين</button>
    </div>
  </div>
</section>
<section class="pn" id="pn-chat">
  <div class="ca" id="chatMsgs"></div>
  <div class="cs" id="chatSugg">
    <button data-q="عرض إحصائيات المستشفى">📊 إحصائيات</button>
    <button data-q="أبي أتأكد من أهلية التأمين 1234567890">🛡️ أهلية</button>
    <button data-q="عرض معلومات فروع المستشفى">🏥 فروع</button>
    <button data-q="جهات التأمين المتعاقد معها">🏦 تأمين</button>
  </div>
  <div class="cb">
    <textarea id="chatIn" placeholder="اكتب رسالتك هنا..." rows="1"></textarea>
    <button class="mb" id="chatMicBtn" data-a="toggleChatMic" aria-label="تسجيل">🎤</button>
    <button class="sb" data-a="sendChat" aria-label="إرسال">➤</button>
  </div>
</section>
<section class="pn" id="pn-insights">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px">
    <h2 style="font-size:1.1rem;font-weight:700" id="insightsTitle">📊 تحليلات الأداء</h2>
    <div class="ib" id="integBar"></div>
  </div>
  <div class="g3" id="insightCards"></div>
  <div class="cd"><div class="cd-h" data-a="toggleCard">🏥 أداء الفروع <span>▼</span></div><div class="cd-b" id="branchTable"></div></div>
  <div class="cd"><div class="cd-h" data-a="toggleCard">📋 تفاصيل المطالبات <span>▼</span></div><div class="cd-b" id="claimsDetail"></div></div>
</section>
<section class="pn" id="pn-nphies">
  <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:16px">🏛️ NPHIES Mirror</h2>
  <div class="g3" id="nphiesStats"></div>
  <div class="cd"><div class="cd-h" data-a="toggleCard">📦 حالة المزامنة <span>▼</span></div><div class="cd-b" id="nphiesDetail"></div></div>
</section>
<section class="pn" id="pn-elig">
  <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:16px">🛡️ التحقق من الأهلية</h2>
  <div class="cd"><div class="cd-b">
    <div class="fg"><label for="eidIn">رقم الهوية</label><input id="eidIn" placeholder="أدخل رقم الهوية (10 أرقام)" maxlength="10"></div>
    <div class="fg"><label for="eidType">النوع</label><select id="eidType"><option value="NATIONAL NUMBER">هوية وطنية</option><option value="IQAMA">إقامة</option><option value="PASSPORT">جواز سفر</option></select></div>
    <button class="btn btn-p btn-w" data-a="checkElig">🔍 تحقق</button>
    <div id="eligResult" style="margin-top:12px"></div>
  </div></div>
  <div class="cd"><div class="cd-h" data-a="toggleCard">🏦 شركات التأمين <span>▼</span></div><div class="cd-b" id="insPartnerList"></div></div>
</section>
<section class="pn" id="pn-appt">
  <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:16px">📅 حجز موعد</h2>
  <form id="apptForm"><div class="cd"><div class="cd-b">
    <div class="fg"><label>الاسم</label><input id="apName" placeholder="الاسم الكامل"></div>
    <div class="fg"><label>الجوال</label><input id="apPhone" placeholder="05xxxxxxxx" maxlength="10"></div>
    <div class="fr">
      <div class="fg"><label>الفرع</label><select id="apHosp"><option value="riyadh">الرياض</option><option value="madinah">المدينة</option><option value="unaizah">عنيزة</option><option value="khamis">خميس مشيط</option><option value="jizan">جيزان</option><option value="abha">أبها</option></select></div>
      <div class="fg"><label>التخصص</label><select id="apSpec"><option value="general">طب عام</option><option value="cardiology">قلب</option><option value="neurology">أعصاب</option><option value="orthopedics">عظام</option><option value="pediatrics">أطفال</option><option value="internal">باطنة</option><option value="surgery">جراحة</option><option value="obgyn">نساء وتوليد</option><option value="ophthalmology">عيون</option><option value="dermatology">جلدية</option></select></div>
    </div>
    <div class="fr">
      <div class="fg"><label>التاريخ</label><input id="apDate" type="date"></div>
      <div class="fg"><label>الوقت</label><input id="apTime" type="time"></div>
    </div>
    <button class="btn btn-p btn-w" type="submit">📅 تأكيد الحجز</button>
    <div id="apptResult" style="margin-top:12px"></div>
  </div></div></form>
</section>
<section class="pn" id="pn-oracle">
  <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:16px">🔗 Oracle Health</h2>
  <div class="g3" id="oracleStats"></div>
  <div class="cd"><div class="cd-h" data-a="toggleCard">🔄 حالة الربط <span>▼</span></div><div class="cd-b" id="oracleDetail"></div></div>
</section>
<section class="pn" id="pn-comms">
  <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:16px">📞 التواصل مع المريض</h2>
  <div class="g3" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">
    <div class="sc" style="border-left:3px solid var(--succ)">
      <div class="sc-i">💬</div><div class="sc-l">SMS</div>
      <div class="fg" style="margin-top:10px"><input id="smsPhone" placeholder="+9665xxxxxxxx" style="width:100%;background:var(--inp);border:1px solid var(--bd);border-radius:var(--rx);color:var(--tx);padding:8px 10px;font-size:.85rem;font-family:inherit"></div>
      <div class="fg"><textarea id="smsBody" rows="2" placeholder="نص الرسالة..." style="width:100%;background:var(--inp);border:1px solid var(--bd);border-radius:var(--rx);color:var(--tx);padding:8px 10px;font-size:.85rem;font-family:inherit;resize:none"></textarea></div>
      <button class="btn btn-o btn-w btn-sm" style="margin-bottom:6px" data-a="draftSms">✨ صياغة بالذكاء الاصطناعي</button>
      <button class="btn btn-s btn-w btn-sm" data-a="sendSms">📤 إرسال SMS</button>
      <div id="smsResult" style="margin-top:8px;font-size:.8rem"></div>
    </div>
    <div class="sc" style="border-left:3px solid var(--blue)">
      <div class="sc-i">📞</div><div class="sc-l">مكالمة صوتية</div>
      <div class="fg" style="margin-top:10px"><input id="callPhone" placeholder="+9665xxxxxxxx" style="width:100%;background:var(--inp);border:1px solid var(--bd);border-radius:var(--rx);color:var(--tx);padding:8px 10px;font-size:.85rem;font-family:inherit"></div>
      <button class="btn btn-p btn-w btn-sm" data-a="startCall">📞 اتصال مع بسمة</button>
      <div id="callResult" style="margin-top:8px;font-size:.8rem"></div>
    </div>
    <div class="sc" style="border-left:3px solid var(--succ)">
      <div class="sc-i">🟢</div><div class="sc-l">WhatsApp</div>
      <div class="fg" style="margin-top:10px"><input id="waPhone" placeholder="+9665xxxxxxxx" style="width:100%;background:var(--inp);border:1px solid var(--bd);border-radius:var(--rx);color:var(--tx);padding:8px 10px;font-size:.85rem;font-family:inherit"></div>
      <div class="fg"><textarea id="waBody" rows="2" placeholder="نص الرسالة..." style="width:100%;background:var(--inp);border:1px solid var(--bd);border-radius:var(--rx);color:var(--tx);padding:8px 10px;font-size:.85rem;font-family:inherit;resize:none"></textarea></div>
      <button class="btn btn-o btn-w btn-sm" style="margin-bottom:6px" data-a="draftWa">✨ صياغة بالذكاء الاصطناعي</button>
      <button class="btn btn-w btn-sm" style="background:linear-gradient(135deg,#25d366,#128c7e);color:#fff" data-a="sendWhatsApp">🟢 إرسال WhatsApp</button>
      <div id="waResult" style="margin-top:8px;font-size:.8rem"></div>
    </div>
  </div>
  <div class="cd" style="margin-top:14px">
    <div class="cd-h" data-a="toggleCard">🔢 إرسال OTP تحقق <span>▼</span></div>
    <div class="cd-b hide">
      <div class="fr">
        <div class="fg"><label>رقم الجوال</label><input id="otpPhone" placeholder="+9665xxxxxxxx"></div>
        <div class="fg" style="display:flex;align-items:flex-end"><button class="btn btn-p btn-w" data-a="sendOtp">📲 إرسال OTP</button></div>
      </div>
      <div class="fr" style="margin-top:8px">
        <div class="fg"><label>رمز التحقق</label><input id="otpCode" placeholder="123456" maxlength="6"></div>
        <div class="fg" style="display:flex;align-items:flex-end"><button class="btn btn-s btn-w" data-a="verifyOtp">✅ تحقق</button></div>
      </div>
      <div id="otpResult" style="margin-top:8px;font-size:.8rem"></div>
    </div>
  </div>
</section>
</main>
<script>
(function(){'use strict';

// ─── Translations ───
const T={ar:{
  listening:'جاري الاستماع...',tapTalk:'اضغط للتحدث مع بسمة',thinking:'بسمة تفكر...',speaking:'بسمة تتكلم...',
  voiceSub:'تتحدث العربية والإنجليزية',loading:'جاري التحميل...',failed:'تعذّر الاتصال',retry:'حاول مرة أخرى',
  totalVal:'القيمة الإجمالية',approvalRate:'نسبة الموافقات',claims:'المطالبات',priorAuth:'الموافقات المسبقة',
  nphiesGSS:'إجمالي GSS',nphiesPA:'الموافقات المسبقة',nphiesCoC:'شهادات العلاج',nphiesSync:'آخر مزامنة',
  oracleBridge:'Oracle Bridge',oracleTunnel:'Oracle Tunnel',connected:'متصل',disconnected:'غير متصل',
  branch:'الفرع',total:'القيمة',approval:'الموافقة',status:'الحالة',auths:'الموافقات',
  eligible:'مؤهل',notEligible:'غير مؤهل',checkFailed:'تعذّر التحقق',
  booking:'حجز موعد',bookingOk:'تم الحجز بنجاح',bookingFail:'تعذّر الحجز',
  d1:'D1 رئيسي',d1his:'D1 HIS',d1basma:'D1 Basma',dbDown:'غير متصل',
  mirror:'NPHIES Mirror',claimlinc:'ClaimLinc',sbs:'SBS',givc:'GIVC',
  authHealthy:'المصادقة سليمة',errors:'أخطاء',nphiesAvailable:'NPHIES متاح',yes:'نعم',no:'لا',
  bookingSuccess:'تم حجز موعدك بنجاح',phoneInvalid:'أدخل رقم جوال صحيح',nameRequired:'أدخل الاسم',
  idRequired:'أدخل رقم الهوية',idShort:'أدخل رقم هوية صحيح (10 أرقام)',live:'متصل',
},en:{
  listening:'Listening...',tapTalk:'Tap to talk to Basma',thinking:'Basma thinking...',speaking:'Basma speaking...',
  voiceSub:'Speaks Arabic and English',loading:'Loading...',failed:'Connection failed',retry:'Try again',
  totalVal:'Total Value',approvalRate:'Approval Rate',claims:'Claims',priorAuth:'Prior Authorizations',
  nphiesGSS:'Total GSS',nphiesPA:'Prior Auths',nphiesCoC:'CoC',nphiesSync:'Last Sync',
  oracleBridge:'Oracle Bridge',oracleTunnel:'Oracle Tunnel',connected:'Connected',disconnected:'Disconnected',
  branch:'Branch',total:'Total',approval:'Approval',status:'Status',auths:'Auths',
  eligible:'Eligible',notEligible:'Not Eligible',checkFailed:'Check Failed',
  booking:'Book Appointment',bookingOk:'Booked',bookingFail:'Booking Failed',
  d1:'D1 Primary',d1his:'D1 HIS',d1basma:'D1 Basma',dbDown:'DB Down',
  mirror:'NPHIES Mirror',claimlinc:'ClaimLinc',sbs:'SBS',givc:'GIVC',
  authHealthy:'Auth Healthy',errors:'Errors',nphiesAvailable:'NPHIES Available',yes:'Yes',no:'No',
  bookingSuccess:'Appointment booked',phoneInvalid:'Enter valid phone',nameRequired:'Enter name',
  idRequired:'Enter ID',idShort:'Enter valid ID (10 digits)',live:'Live',
}};

// ─── Helpers ───
const HM={riyadh:{ar:'الرياض',en:'Riyadh'},madinah:{ar:'المدينة',en:'Madinah'},unaizah:{ar:'عنيزة',en:'Unayzah'},khamis:{ar:'خميس مشيط',en:'Khamis Mushayt'},jizan:{ar:'جيزان',en:'Jazan'},abha:{ar:'أبها',en:'Abha'}};
const SM={general:{ar:'طب عام',en:'General'},cardiology:{ar:'قلب',en:'Cardiology'},neurology:{ar:'أعصاب',en:'Neurology'},orthopedics:{ar:'عظام',en:'Orthopedics'},pediatrics:{ar:'أطفال',en:'Pediatrics'},internal:{ar:'باطنة',en:'Internal Medicine'},surgery:{ar:'جراحة',en:'Surgery'},obgyn:{ar:'نساء وتوليد',en:'OB/GYN'},ophthalmology:{ar:'عيون',en:'Ophthalmology'},dermatology:{ar:'جلدية',en:'Dermatology'}};

let lang=localStorage.getItem('bm_lang')||'ar',hosp=localStorage.getItem('bm_hosp')||'riyadh';
let recog=null,isL=false,chL=false,chH=[];
function _(k){return(T[lang]&&T[lang][k])||k||'';}
function $(id){return document.getElementById(id);}
function qa(s,e){return(e||document).querySelectorAll(s);}
function qs(s,e){return(e||document).querySelector(s);}
function html(e,s){if(e)e.innerHTML=s||'';}
function n2(v){if(v===null||v===undefined)return'—';return Number(v).toLocaleString(lang==='ar'?'ar-SA':'en-US');}
function pct(v){return n2(v)+'%';}
function sar(v){return n2(v)+(lang==='ar'?' ر.س':' SAR');}
function dt(s){if(!s)return'—';return new Date(s).toLocaleString(lang==='ar'?'ar-SA':'en-US',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});}
function nw(){return new Date().toLocaleTimeString(lang==='ar'?'ar-SA':'en-US',{hour:'2-digit',minute:'2-digit'});}
function tt(m,t){const e=$('toast');if(!e)return;e.textContent=m;e.className='toast on'+(t?' '+t:'');setTimeout(()=>e.classList.remove('on'),3500);}

// ─── API ───
const BA='https://bsma.elfadil.com',HN='https://hnh.brainsait.org';
async function chatApi(m){const r=await fetch(BA+'/basma/chat',{method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(15000),body:JSON.stringify({message:m,lang,hospital:hosp})});return r.json();}
async function netApi(){const r=await fetch(BA+'/basma/network',{signal:AbortSignal.timeout(10000)});return r.json();}
async function mirApi(){const r=await fetch(BA+'/basma/mirror',{signal:AbortSignal.timeout(10000)});return r.json();}
async function hnh(p,b){try{const r=await fetch(HN+p,{method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(10000),body:JSON.stringify(b)});return r.json();}catch(e){return{success:false,error:e.message};}}

// ─── Voice ───
function sV(){
  if(isL){if(recog)recog.stop();return;}
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){tt(_('failed'),'err');return;}
  recog=new SR();recog.lang=lang==='ar'?'ar-SA':'en-US';recog.interimResults=true;recog.continuous=true;
  recog.onstart=()=>{isL=true;const r=$('voiceRing');if(r)r.className='vr ls';const i=$('voiceIcon');if(i)i.textContent='🔴';const s=$('voiceStatus');if(s)s.textContent='🔴 '+_('listening');const w=$('voiceWaves');if(w)w.className='vw';};
  recog.onend=()=>{isL=false;const r=$('voiceRing');if(r)r.className='vr';const i=$('voiceIcon');if(i)i.textContent='🎙️';const s=$('voiceStatus');if(s)s.textContent=_('tapTalk');const w=$('voiceWaves');if(w)w.className='vw pa';};
  recog.onresult=(e)=>{let f='',im='';for(let i=e.resultIndex;i<e.results.length;i++){if(e.results[i].isFinal)f+=e.results[i][0].transcript;else im+=e.results[i][0].transcript;}const t=$('voiceTranscript');if(!t)return;if(f){t.textContent=f;pV(f);}else if(im)t.textContent=im+'...';};
  recog.onerror=(e)=>{};recog.start();
}
async function pV(t){
  const r=$('voiceRing');if(r)r.className='vr th';const i=$('voiceIcon');if(i)i.textContent='🧠';const s=$('voiceStatus');if(s)s.textContent='🧠 '+_('thinking');
  try{const d=await chatApi(t);const rp=d.reply||d.response||'';if(r)r.className='vr sp';if(i)i.textContent='🔊';if(s)s.textContent='🔊 '+_('speaking');const tx=$('voiceTranscript');if(tx)tx.innerHTML='<strong>'+t+'</strong><br><br>'+rp;if(rp)sp(rp);}catch(e){tt(_('failed'),'err');}
  if(r)r.className='vr';if(i)i.textContent='🎙️';if(s)s.textContent=_('tapTalk');
}
async function sp(t){
  try{const r=await fetch(BA+'/basma/tts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:t,lang}),signal:AbortSignal.timeout(10000)});if(r.ok){const a=new Audio(URL.createObjectURL(await r.blob()));await a.play();return;}}catch(e){}
  try{const u=new SpeechSynthesisUtterance(t);u.lang=lang==='ar'?'ar-SA':'en-US';speechSynthesis.speak(u);}catch(e){}
}
function clV(){const t=$('voiceTranscript');if(t)t.textContent='';chH=[];}

// ─── Chat ───
function aCM(c,t){
  const a=$('chatMsgs');if(!a)return;
  const d=document.createElement('div');d.className='msg '+c;
  d.innerHTML=t+'<div class="mt">'+nw()+'</div>';a.appendChild(d);a.scrollTop=a.scrollHeight;
}
function sTp(){const a=$('chatMsgs');if(!a)return;const d=document.createElement('div');d.className='ty';d.id='cL';for(let i=0;i<3;i++){const s=document.createElement('span');d.appendChild(s);}a.appendChild(d);a.scrollTop=a.scrollHeight;}
function rTp(){const e=$('cL');if(e)e.remove();}
async function sC(t){
  const inp=$('chatIn');const m=(t||(inp?inp.value:'')).trim();
  if(!m)return;if(inp&&!t){inp.value='';inp.style.height='auto';}
  aCM('us',m);sTp();
  try{const d=await chatApi(m);rTp();const r=d.reply||d.response||_('failed');aCM('bo',r);chH.push({role:'user',content:m},{role:'assistant',content:r});sp(r);}catch(e){rTp();aCM('bo','⚠️ '+_('failed'));}
}
function tCM(){
  if(chL){if(recog)recog.stop();chL=false;const b=$('chatMicBtn');if(b)b.classList.remove('on');return;}
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){tt(_('failed'),'err');return;}
  recog=new SR();recog.lang=lang==='ar'?'ar-SA':'en-US';recog.interimResults=true;
  recog.onstart=()=>{chL=true;const b=$('chatMicBtn');if(b)b.classList.add('on');};
  recog.onend=()=>{chL=false;const b=$('chatMicBtn');if(b)b.classList.remove('on');};
  recog.onresult=(e)=>{const inp=$('chatIn');if(!inp)return;if(e.results[0].isFinal){inp.value=e.results[0][0].transcript;sC();}else inp.value=e.results[0][0].transcript;};
  recog.start();
}

// ─── Insights ───
async function lI(){
  const c=$('insightCards'),b=$('branchTable'),cd=$('claimsDetail'),ib=$('integBar');
  if(!c)return;html(c,'<div class="ld">⏳ '+_('loading')+'</div>');
  try{
    const d=await netApi();const f=d.financials||{},bb=d.by_branch||{};
    html(c,
      '<div class="sc"><div class="sc-i">💰</div><div class="sc-l">'+_('totalVal')+'</div><div class="sc-v">'+(f.network_total_sar?sar(f.network_total_sar):'—')+'</div></div>'+
      '<div class="sc"><div class="sc-i">✅</div><div class="sc-l">'+_('approvalRate')+'</div><div class="sc-v">'+(f.network_approval_rate_pct?pct(f.network_approval_rate_pct):'—')+'</div><div class="sc-d">'+n2(f.network_approved_sar||0)+' معتمد</div></div>'+
      '<div class="sc"><div class="sc-i">📋</div><div class="sc-l">'+_('claims')+'</div><div class="sc-v">'+(f.total_claims_gss?n2(f.total_claims_gss):'—')+'</div><div class="sc-d">GSS</div></div>'+
      '<div class="sc"><div class="sc-i">📝</div><div class="sc-l">'+_('priorAuth')+'</div><div class="sc-v">'+(d.prior_auth?n2(d.prior_auth.network_total||0):'—')+'</div><div class="sc-d">'+n2(d.prior_auth?.network_check_status||0)+' تحقق</div></div>'
    );
    if(Object.keys(bb).length){let h='<div class="tw"><table><thead><tr><th>'+_('branch')+'</th><th>'+_('total')+'</th><th>'+_('approval')+'</th><th>'+_('auths')+'</th><th>'+_('status')+'</th></tr></thead><tbody>';
    Object.keys(bb).forEach(k=>{const v=bb[k];const bd=Number(v.approval_pct||100)<95;h+='<tr><td>'+(HM[k]?HM[k][lang]:k)+'</td><td>'+sar(v.total_sar||0)+'</td><td>'+pct(v.approval_pct||0)+'</td><td>'+n2(v.pa||0)+'</td><td><span class="bd '+(bd?'bd-er':'bd-ok')+'">'+(bd?'⚠️ الرفض':'✅')+'</span></td></tr>';});
    h+='</tbody></table></div>';html(b,h);}else html(b,'<div class="em"><div class="ei">📭</div><p>'+_('failed')+'</p></div>');
    // Claims detail
    let h2='<div class="tw"><table><thead><tr><th>'+_('branch')+'</th><th>'+_('total')+'</th><th>'+_('approval')+'</th><th>'+_('auths')+'</th></tr></thead><tbody>';
    Object.keys(bb).forEach(k=>{const v=bb[k];h2+='<tr><td>'+(HM[k]?HM[k][lang]:k)+'</td><td>'+sar(v.total_sar||0)+'</td><td>'+pct(v.approval_pct||0)+'</td><td>'+n2(v.pa||0)+'</td></tr>';});
    h2+='</tbody></table></div>';html(cd,h2);
  }catch(e){html(c,'<div class="em"><div class="ei">⚠️</div><h3>'+_('failed')+'</h3></div>');}
  html(ib,'<span class="up">🟢 D1</span><span class="up">🟢 Oracle</span><span class="up">🟢 NPHIES</span><span class="up">🟢 BSMA</span><span class="up">🟢 GIVC</span><span class="up">🟢 SBS</span>');
}

// ─── NPHIES ───
async function lM(){
  const st=$('nphiesStats'),dt=$('nphiesDetail');
  if(!st)return;html(st,'<div class="ld">⏳ '+_('loading')+'</div>');
  try{
    const d=await mirApi();
    html(st,
      '<div class="sc"><div class="sc-i">📦</div><div class="sc-l">'+_('nphiesGSS')+'</div><div class="sc-v">'+n2(d.total_gss||0)+'</div></div>'+
      '<div class="sc"><div class="sc-i">📝</div><div class="sc-l">'+_('nphiesPA')+'</div><div class="sc-v">'+n2(d.total_pa||0)+'</div></div>'+
      '<div class="sc"><div class="sc-i">📋</div><div class="sc-l">'+_('nphiesCoC')+'</div><div class="sc-v">'+n2(d.total_coc||0)+'</div></div>'+
      '<div class="sc"><div class="sc-i">⏰</div><div class="sc-l">'+_('nphiesSync')+'</div><div class="sc-v" style="font-size:.95rem">'+dt(d.last_sync)+'</div><div class="sc-d">'+(d.auth_healthy?'✅ ':'❌ ')+_('authHealthy')+'</div></div>'
    );
    html(dt,'<div style="line-height:2;font-size:.88rem"><div><strong>GSS:</strong> '+n2(d.total_gss||0)+'</div><div><strong>PA:</strong> '+n2(d.total_pa||0)+'</div><div><strong>CoC:</strong> '+n2(d.total_coc||0)+'</div><div><strong>'+_('nphiesSync')+':</strong> '+dt(d.last_sync)+'</div><div><strong>'+_('authHealthy')+':</strong> '+(d.auth_healthy?'✅ '+_('yes'):'❌ '+_('no'))+'</div><div><strong>'+_('errors')+':</strong> '+n2(d.errors||0)+'</div><div><strong>'+_('mirror')+':</strong> '+(d.ok?'✅':'❌')+'</div></div>');
  }catch(e){html(st,'<div class="em"><div class="ei">⚠️</div><h3>'+_('failed')+'</h3></div>');}
}

// ─── DeepSeek AI Drafting ───
async function draftMsg(targetId, context){
  const res=$(targetId);
  if(!res){return '';}
  html(res,'⏳ بسمة تفكر...');
  try{
    const r=await fetch(BA+'/basma/chat',{method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(15000),
      body:JSON.stringify({message:'اكتب رسالة قصيرة ومهنية باللغة العربية للمريض حول: '+context+'. الرسالة يجب أن تكون من مستشفى الحياة الوطني، قصيرة (3 جمل فقط)، ودودة ومهنية.',lang:'ar',hospital:hosp})});
    const d=await r.json();
    const txt=d.reply||d.message||d.text||'';
    html(res,'');
    return txt;
  }catch(e){html(res,'');return '';}
}
async function draftSms(){
  const body=$('smsBody'),res=$('smsResult');
  if(!body)return;
  const ctx=body.value||'تذكير بالموعد الطبي';
  const txt=await draftMsg('smsResult',ctx);
  if(txt){body.value=txt;tt('✨ تمت الصياغة','ok');}
}
async function draftWa(){
  const body=$('waBody'),res=$('waResult');
  if(!body)return;
  const ctx=body.value||'تذكير بالموعد الطبي';
  const txt=await draftMsg('waResult',ctx);
  if(txt){body.value=txt;tt('✨ تمت الصياغة','ok');}
}

// ─── Communications ───
async function sendSms(){
  const phone=$('smsPhone').value.trim(),body=$('smsBody').value.trim(),res=$('smsResult');
  if(!phone||!body){tt('أدخل رقم الجوال ونص الرسالة','err');return;}
  html(res,'⏳ جاري الإرسال...');
  try{
    const r=await fetch(BA+'/comms/sms',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({to:phone,message:body}),signal:AbortSignal.timeout(15000)});
    const d=await r.json();
    html(res,d.success||d.sid?'✅ تم الإرسال':'❌ '+(d.error||'فشل'));
  }catch(e){html(res,'❌ '+e.message);}
}
async function startCall(){
  const phone=$('callPhone').value.trim(),res=$('callResult');
  if(!phone){tt('أدخل رقم الجوال','err');return;}
  html(res,'⏳ جاري بدء المكالمة...');
  try{
    const r=await fetch(BA+'/comms/call',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({to:phone}),signal:AbortSignal.timeout(15000)});
    const d=await r.json();
    html(res,d.success||d.sid?'✅ جاري الاتصال...':'❌ '+(d.error||'فشل'));
  }catch(e){html(res,'❌ '+e.message);}
}
async function sendWhatsApp(){
  const phone=$('waPhone').value.trim(),body=$('waBody').value.trim(),res=$('waResult');
  if(!phone||!body){tt('أدخل رقم الجوال ونص الرسالة','err');return;}
  html(res,'⏳ جاري الإرسال...');
  try{
    const r=await fetch(BA+'/comms/sms',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({to:phone,message:body,channel:'whatsapp'}),signal:AbortSignal.timeout(15000)});
    const d=await r.json();
    html(res,d.success||d.sid?'✅ تم الإرسال':'❌ '+(d.error||'فشل'));
  }catch(e){html(res,'❌ '+e.message);}
}
async function sendOtp(){
  const phone=$('otpPhone').value.trim(),res=$('otpResult');
  if(!phone){tt('أدخل رقم الجوال','err');return;}
  html(res,'⏳ جاري الإرسال...');
  try{
    const r=await fetch(BA+'/comms/verify/phone',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone:phone}),signal:AbortSignal.timeout(15000)});
    const d=await r.json();
    html(res,d.success?'✅ تم إرسال OTP':'❌ '+(d.error||'فشل'));
  }catch(e){html(res,'❌ '+e.message);}
}
async function verifyOtp(){
  const phone=$('otpPhone').value.trim(),code=$('otpCode').value.trim(),res=$('otpResult');
  if(!phone||!code){tt('أدخل الجوال والرمز','err');return;}
  html(res,'⏳ جاري التحقق...');
  try{
    const r=await fetch(BA+'/comms/verify/confirm',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone:phone,otp:code}),signal:AbortSignal.timeout(15000)});
    const d=await r.json();
    html(res,d.success?'✅ تم التحقق بنجاح':'❌ '+(d.error||'رمز خاطئ'));
  }catch(e){html(res,'❌ '+e.message);}
}

// ─── Oracle ───
async function lO(){
  const st=$('oracleStats'),dt=$('oracleDetail');
  if(!st)return;html(st,'<div class="ld">⏳ '+_('loading')+'</div>');
  try{
    const d=await hnh('/api/health',{});const ints=d.integrations||{};
    const bO=ints.oracle_bridge==='connected',bT=ints.oracle_tunnel||'—',bN=ints.nphies_mirror==='connected';
    html(st,
      '<div class="sc" style="border-left:3px solid var(--blue)"><div class="sc-i">🔗</div><div class="sc-l">'+_('oracleBridge')+'</div><div class="sc-v" style="font-size:1rem">'+(bO?'✅ '+_('connected'):'❌ '+_('disconnected'))+'</div></div>'+
      '<div class="sc" style="border-left:3px solid var(--purple)"><div class="sc-i">🔌</div><div class="sc-l">'+_('oracleTunnel')+'</div><div class="sc-v" style="font-size:.9rem">🟢 نشط</div><div class="sc-d" style="font-size:.7rem">'+(typeof bT==='string'?bT.substring(0,50):'—')+'</div></div>'+
      '<div class="sc" style="border-left:3px solid var(--teal)"><div class="sc-i">🏛️</div><div class="sc-l">NPHIES</div><div class="sc-v" style="font-size:1rem">'+(bN?'✅ '+_('connected'):'❌ '+_('disconnected'))+'</div><div class="sc-d">'+_('nphiesAvailable')+'</div></div>'+
      '<div class="sc" style="border-left:3px solid var(--rose)"><div class="sc-i">📊</div><div class="sc-l">'+_('d1')+'</div><div class="sc-v" style="font-size:1rem">'+(ints.d1_primary==='connected'?'✅':'❌')+'</div><div class="sc-d">HIS: '+(ints.d1_his_database==='connected'?'✅':'❌')+'</div></div>'
    );
    let h='<div style="line-height:2;font-size:.88rem">';Object.keys(ints).forEach(k=>{const v=ints[k];const ok=v==='connected'||v==='live'||v.includes('reachable');h+='<div><strong style="color:var(--tm)">'+(k.replace(/_/g,' '))+'</strong>: <span class="bd '+(ok?'bd-ok':'bd-er')+'">'+(ok?'✅':'❌')+' '+(typeof v==='string'?v.substring(0,60):'—')+'</span></div>';});h+='</div>';html(dt,h);
  }catch(e){html(st,'<div class="em"><div class="ei">⚠️</div><h3>'+_('failed')+'</h3></div>');}
}

// ─── Eligibility ───
async function cE(){
  const inp=$('eidIn'),tp=$('eidType'),res=$('eligResult');
  if(!inp||!res)return;const id=inp.value.trim();
  if(!id||id.length<9){tt(_('idShort'),'err');return;}
  html(res,'<div class="ld">⏳ '+_('loading')+'</div>');
  try{
    const d=await hnh('/api/eligibility',{identity_number:id,identity_type:tp?tp.value:'NATIONAL NUMBER'});
    if(d.success&&d.eligible)html(res,'<div style="padding:12px;background:var(--sl);border-radius:var(--rs);color:var(--succ);font-size:.9rem;line-height:1.8">✅ <strong>'+_('eligible')+'</strong><br>'+(d.payer_name?'المؤمّن: '+d.payer_name+'<br>':'')+(d.network?'الشبكة: '+d.network+'<br>':'')+(d.pct?'النسبة: '+d.pct+'%<br>':'')+(d.policy_number?'الوثيقة: '+d.policy_number:'')+'</div>');
    else html(res,'<div style="padding:12px;background:var(--el);border-radius:var(--rs);color:var(--err);font-size:.9rem">❌ <strong>'+_('notEligible')+'</strong><br>'+(d.message||'')+'</div>');
  }catch(e){html(res,'<div style="padding:12px;background:var(--el);border-radius:var(--rs);color:var(--err)">⚠️ '+_('checkFailed')+'</div>');}
}
async function lP(){
  const pl=$('insPartnerList');if(!pl)return;
  try{
    const d=await hnh('/api/eligibility',{identity_number:'0000000000',identity_type:'NATIONAL NUMBER'});
    const ps=d.insurance_partners||d.partners||[];
    if(ps.length){let h='<div class="tw"><table><thead><tr><th>#</th><th>الشركة</th><th>الشبكة</th><th>النسبة</th></tr></thead><tbody>';ps.forEach((p,i)=>{h+='<tr><td>'+(i+1)+'</td><td>'+(p.name||p.id)+'</td><td>'+(p.network||'—')+'</td><td>'+(p.pct?pct(p.pct):'—')+'</td></tr>';});h+='</tbody></table></div>';html(pl,h);}else html(pl,'<div style="color:var(--tm);font-size:.85rem">—</div>');
  }catch(e){html(pl,'<div style="color:var(--tm);font-size:.85rem">—</div>');}
}

// ─── Appointments ───
async function bA(e){
  e.preventDefault();const n=$('apName'),p=$('apPhone');
  if(!n||!n.value.trim()){tt(_('nameRequired'),'err');return;}
  if(!p||p.value.length<10){tt(_('phoneInvalid'),'err');return;}
  const h=$('apHosp').value,s=$('apSpec').value,d=$('apDate').value,t=$('apTime').value;
  const hn=(HM[h]?HM[h][lang]:h),sn=(SM[s]?SM[s][lang]:s);
  const res=$('apptResult');
  html(res,'<div style="padding:12px;color:var(--tm)">⏳ جاري الحجز...</div>');
  try{
    // Book via HNH API
    const r=await fetch(BA+'/api/appointments',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({patient_id:null,clinic_name:sn,appointment_date:d,appointment_time:t,appointment_type:'Outpatient',notes:n.value+' | '+p.value}),
      signal:AbortSignal.timeout(10000)});
    const bk=await r.json();
    if(bk.success||bk.id){
      const bid=bk.id||'—';
      html(res,'<div style="padding:12px;background:var(--sl);border-radius:var(--rs);color:var(--succ);line-height:1.8">✅ <strong>'+_('bookingOk')+'</strong> #'+bid+'<br>'+hn+' | '+sn+' | '+d+' '+t+'<br>'+n.value+'</div>');
      tt(_('bookingSuccess')+' — '+hn,'ok');
      // Send WhatsApp appointment reminder template
      const phone=p.value.startsWith('+')?p.value:'+966'+p.value.replace(/^0/,'');
      const [yr,mo,dy]=d.split('-');
      const tVar1=parseInt(mo)+'/'+parseInt(dy);
      const [hr,mn]=t.split(':');const h24=parseInt(hr);
      const tVar2=(h24>12?h24-12:h24||12)+':'+(mn||'00')+(h24>=12?'pm':'am');
      fetch(BA+'/comms/whatsapp-template',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({to:phone,content_sid:'HXb5b62575e6e4ff6129ad7c8efe1f983e',variables:{'1':tVar1,'2':tVar2}}),
        signal:AbortSignal.timeout(10000)}).catch(()=>{});
    } else {
      html(res,'<div style="padding:12px;background:var(--el);border-radius:var(--rs);color:var(--err)">❌ '+_('bookingFail')+'</div>');
    }
  }catch(e2){
    html(res,'<div style="padding:12px;background:var(--el);border-radius:var(--rs);color:var(--err)">❌ '+e2.message+'</div>');
  }
}

// ─── Language ───
function tL(){
  lang=lang==='ar'?'en':'ar';localStorage.setItem('bm_lang',lang);
  document.documentElement.dir=lang==='ar'?'rtl':'ltr';document.documentElement.lang=lang;
  const lb=$('langBtn');if(lb)lb.textContent=lang==='ar'?'🇸🇦 AR':'🇬🇧 EN';
  ['voiceSub','voiceStatus'].forEach(k=>{const e=$(k);if(e)e.textContent=_(k==='voiceSub'?'voiceSub':lang==='ar'?'اضغط للتحدث مع بسمة':'Tap to talk to Basma');});
}

// ─── Init ───
function init(){
  // Set initial lang
  if(lang==='en'){document.documentElement.dir='ltr';document.documentElement.lang='en';}
  const lb=$('langBtn');if(lb)lb.textContent=lang==='ar'?'🇸🇦 AR':'🇬🇧 EN';

  // Event delegation
  document.addEventListener('click',e=>{
    const t=e.target.closest('[data-a]');if(!t)return;
    const a=t.dataset.a;
    if(a==='toggleVoice')sV();else if(a==='clearVoice')clV();else if(a==='sendChat')sC();else if(a==='toggleChatMic')tCM();else if(a==='checkElig')cE();else if(a==='sendSms')sendSms();else if(a==='startCall')startCall();else if(a==='sendWhatsApp')sendWhatsApp();else if(a==='sendOtp')sendOtp();else if(a==='verifyOtp')verifyOtp();else if(a==='draftSms')draftSms();else if(a==='draftWa')draftWa();
  });

  // Hospital chips
  qa('.hc-btn').forEach(b=>{b.addEventListener('click',()=>{qa('.hc-btn').forEach(x=>x.classList.remove('on'));b.classList.add('on');hosp=b.dataset.h;localStorage.setItem('bm_hosp',hosp);lI();lM();lO();});});

  // Tab switching
  qa('.tab').forEach(t=>{t.addEventListener('click',()=>{qa('.tab').forEach(x=>x.classList.remove('on'));qa('.pn').forEach(p=>p.classList.remove('on'));t.classList.add('on');const pn=$('pn-'+t.dataset.tab);if(pn)pn.classList.add('on');if(t.dataset.tab==='insights')lI();if(t.dataset.tab==='nphies')lM();if(t.dataset.tab==='oracle')lO();if(t.dataset.tab==='elig')lP();if(t.dataset.tab==='comms'){}if(t.dataset.tab==='chat'&&!chH.length)aCM('bo','👋 السلام عليكم! أنا بسمة، مساعد مستشفيات الحياة الوطني الذكي. كيف أقدر أساعدك اليوم؟');});});

  // Voice hints
  qa('.vq').forEach(b=>{b.addEventListener('click',()=>{const q=b.dataset.q;if(q){const t=$('voiceTranscript');if(t)t.textContent=q;pV(q);}});});
  qa('#chatSugg button').forEach(b=>{b.addEventListener('click',()=>{if(b.dataset.q)sC(b.dataset.q);});});

  // Card toggles
  qa('[data-a="toggleCard"]').forEach(h=>{h.addEventListener('click',()=>{const b=h.nextElementSibling;if(b){b.classList.toggle('hide');const s=h.querySelector('span');if(s)s.textContent=b.classList.contains('hide')?'▶':'▼';}});});

  // Chat input
  const ci=$('chatIn');if(ci){ci.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sC();}});ci.addEventListener('input',()=>{ci.style.height='auto';ci.style.height=Math.min(ci.scrollHeight,100)+'px';});}

  // Lang toggle
  if(lb)lb.addEventListener('click',tL);

  // Appointments form
  const af=$('apptForm');if(af)af.addEventListener('submit',bA);

  // Set default date
  const ad=$('apDate');if(ad){const d=new Date();d.setDate(d.getDate()+1);ad.value=d.toISOString().split('T')[0];}
  const at=$('apTime');if(at)at.value='10:00';

  // Initial data load
  setTimeout(()=>{lI();lM();lO();lP();},500);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
</script>
</body>
</html>`;
export default bsmaHtml;
