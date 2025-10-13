:root {
  --bg: #f7f7f7;
  --text: #111827;
  --card: #ffffff;
  --accent: #2b73ff;
  --border: #e6eef8;
}
body {
  margin:0; font-family:Inter,system-ui,Segoe UI,Roboto,Arial; background:var(--bg); color:var(--text);
  transition: background .28s ease, color .28s ease;
}
header{background:transparent;padding:14px 20px}
.header-inner{display:flex;align-items:center;gap:12px}
.logo{background:linear-gradient(135deg,var(--accent),#3bc7ff);color:#fff;padding:10px 14px;border-radius:10px;font-weight:700}
.title-group h1{margin:0;font-size:1.2rem}
.subtitle{margin:2px 0 0;color:#6b7280;font-size:0.9rem}
.theme-btn{background:#f1f5f9;border:0;padding:8px;border-radius:8px;cursor:pointer}
.container{max-width:1000px;margin:18px auto;padding:0 16px;display:grid;grid-template-columns:1fr;gap:16px}
.card{background:var(--card);padding:16px;border-radius:12px;box-shadow:0 6px 18px rgba(12,12,20,0.06);border:1px solid var(--border)}
label{display:block;font-weight:600;margin-bottom:6px}
input, select{width:100%;padding:10px;border-radius:8px;border:1px solid #dbe9ff;background:#fbfdff}
.selectors{display:flex;align-items:flex-end;gap:12px;margin:10px 0}
.sel{flex:1}
.swap-wrap{display:flex;align-items:center}
#swap-btn{padding:8px 12px;border-radius:8px;background:var(--accent);color:#fff;border:0;cursor:pointer}
.actions{display:flex;gap:10px;margin-bottom:12px;flex-wrap:wrap}
.actions button{flex:1;min-width:120px;padding:10px;border-radius:8px;border:0;background:var(--accent);color:#fff;cursor:pointer}
.result{margin-top:8px}
.result h2{font-size:1.4rem;margin-bottom:6px}
.table-container{overflow:auto}
table{width:100%;border-collapse:collapse}
th,td{padding:8px;border-bottom:1px solid #eef6ff;text-align:center}
th{background:var(--accent);color:#fff;text-align:left;padding-left:10px}
.copy-btn-small{padding:6px 8px;border-radius:6px;border:0;background:var(--accent);color:#fff;cursor:pointer}
#history-list{margin-top:8px;list-style:disc;margin-left:18px}

/* dark (v2-like) */
body.dark-mode{
  --bg:#0f1724; --text:#e6edf3; --card:#0b1220; --accent:#57a0ff; --border:#24303c;
  background:var(--bg); color:var(--text);
}
body.dark-mode .card{background:var(--card); border-color:var(--border); box-shadow:0 10px 30px rgba(0,0,0,0.6)}
body.dark-mode input, body.dark-mode select{background:#15181d;border:1px solid #30363d;color:var(--text)}
body.dark-mode th{background:#238636}
body.dark-mode .theme-btn{background:#15181d;color:var(--text)}
@media (max-width:720px){ .selectors{flex-direction:column;align-items:stretch} .actions{flex-direction:column} }
