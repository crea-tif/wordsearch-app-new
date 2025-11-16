<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#1a5276">
<meta name="description" content="تطبيق تعليمي للعثور على أسماء الله الحسنى في شبكة من الحروف">

<!-- PWA -->
<link rel="manifest" href="manifest.json">
<link rel="icon" href="edufun-logo-512 (24).png">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

<title>الكلمات الخفية - أسماء الله الحسنى</title>
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet">
<style>
:root{
  --ink:#f1f5f9; --accent:#d4af37; --ok:#27ae60; --warn:#d4af37;
  --glass: rgba(255,255,255,0.15);
  --cell: 32px;
  --dark-blue: #1a5276;
  --navy-blue: #154360;
  --teal: #1abc9c;
  --gold: #d4af37;
  --light-gold: #f7dc6f;
  --texture-color: #1a5276;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

html, body {
  direction: rtl !important;
  unicode-bidi: embed;
}

body {
  height:100%;
  margin:0; 
  color:var(--ink);
  font-family: "Tajawal", system-ui, -apple-system, "Noto Kufi Arabic", "Cairo", Tahoma, Arial;
  background: 
    radial-gradient(circle at 20% 80%, rgba(26, 82, 118, 0.9) 0%, rgba(21, 67, 96, 0.95) 50%, rgba(26, 82, 118, 0.85) 100%),
    radial-gradient(circle at 80% 20%, rgba(26, 188, 156, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
    repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px);
  overflow-x: hidden;
  touch-action: manipulation;
  position: relative;
  text-align: right;
}

body::before{
  content:""; 
  position:fixed; 
  inset:0; 
  z-index:-1;
  background: 
    radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.1) 2px, transparent 3px),
    radial-gradient(circle at 75% 75%, rgba(212, 175, 55, 0.08) 2px, transparent 3px),
    radial-gradient(circle at 50% 50%, rgba(26, 188, 156, 0.05) 1px, transparent 2px);
  background-size: 50px 50px, 80px 80px, 30px 30px;
  pointer-events: none;
}

/* Indicateur hors ligne */
body.offline::after {
  content: "📴 وضع عدم الاتصال";
  position: fixed;
  top: 10px;
  left: 10px;
  background: #e74c3c;
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-family: Tajawal, sans-serif;
  z-index: 1000;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.container {
  max-width: 100%;
  margin: 0 auto;
  padding: 6px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: -webkit-fill-available;
  gap: 6px;
}

header, .card{
  background: linear-gradient(135deg, rgba(26, 82, 118, 0.8), rgba(21, 67, 96, 0.9));
  backdrop-filter: blur(15px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 12px;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255,255,255,0.2);
}

header {
  position: sticky;
  top: 0;
  z-index: 5;
  padding: 8px;
}

.brandbar{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.brand {
  color: var(--gold);
  font-size: 14px;
  font-weight: 800;
  font-family: "Tajawal", sans-serif;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

h1 {
  font-size: 13px;
  margin: 0; 
  color: var(--gold);
  font-weight: 700;
  font-family: "Tajawal", sans-serif;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.control-group label {
  font-size: 10px;
  font-weight: 500;
  color: #e8f6f3;
  font-family: "Tajawal", sans-serif;
  text-shadow: 0 1px 1px rgba(0,0,0,0.2);
}

select, button {
  padding: 6px 8px;
  border: 1px solid rgba(212, 175, 55, 0.4);
  background: rgba(26, 82, 118, 0.7);
  border-radius: 8px;
  font-size: 11px;
  color: white;
  font-family: "Tajawal", sans-serif;
  font-weight: 500;
  -webkit-appearance: none;
  appearance: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

select:focus, button:focus {
  outline: none;
  border-color: var(--gold);
  box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.3);
}

button.primary {
  background: linear-gradient(135deg, var(--gold), #f7dc6f);
  border-color: var(--gold);
  color: var(--navy-blue);
  font-weight: 700;
  transition: all 0.3s ease;
  grid-column: 1 / -1;
  margin-top: 2px;
  text-shadow: 0 1px 1px rgba(255,255,255,0.3);
  box-shadow: 0 3px 6px rgba(212, 175, 55, 0.4);
}

button.primary:hover, button.primary:active {
  background: linear-gradient(135deg, #c19b2e, #f4d03f);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(212, 175, 55, 0.5);
}

.grid-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 200px;
}

.grid-wrap {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  min-height: 200px;
  overflow: visible;
}

.grid {
  display: grid;
  grid-template-columns: repeat(var(--n), var(--cell));
  grid-auto-rows: var(--cell);
  gap: 3px;
  user-select: none;
  touch-action: none;
  padding: 6px;
  background: rgba(26, 82, 118, 0.3);
  border-radius: 10px;
  border: 1px solid rgba(212, 175, 55, 0.3);
  max-width: calc(100vw - 20px);
  max-height: calc(100vh - 250px);
  box-shadow: 
    inset 0 2px 4px rgba(0,0,0,0.2),
    0 4px 8px rgba(0,0,0,0.2);
  transform: scaleX(-1);
}

.cell {
  width: var(--cell);
  height: var(--cell);
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255,255,255,0.1));
  border: 1px solid rgba(212, 175, 55, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(var(--cell) * 0.38);
  font-weight: 800;
  transition: all 0.3s ease;
  color: white;
  font-family: "Tajawal", sans-serif;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transform: scaleX(-1);
  cursor: pointer;
}

.cell.preview { 
  outline: 2px dashed var(--gold); 
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.4), rgba(247, 220, 111, 0.3));
  border-color: var(--gold);
  transform: scaleX(-1) scale(1.05);
}

.cell.valid-preview { 
  outline: 2px solid var(--gold); 
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.6), rgba(247, 220, 111, 0.4));
  border-color: var(--gold);
  transform: scaleX(-1) scale(1.05);
}

.cell.hint {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.5), rgba(247, 220, 111, 0.3));
  border-color: var(--gold);
  box-shadow: 0 0 8px rgba(212, 175, 55, 0.5);
  transform: scaleX(-1);
}

.cell.found {
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.6), rgba(46, 204, 113, 0.4));
  border-color: rgba(39, 174, 96, 0.8);
  color: #e8f8ef;
  box-shadow: 0 0 8px rgba(39, 174, 96, 0.4);
  transform: scaleX(-1);
}

.cell.flash {
  animation: flashOk 1s ease-in-out 3;
  transform: scaleX(-1);
}

@keyframes flashOk {
  0%,100% { 
    background: linear-gradient(135deg, rgba(39, 174, 96, 0.6), rgba(46, 204, 113, 0.4));
    transform: scaleX(-1) scale(1);
  }
  50% { 
    background: linear-gradient(135deg, rgba(39, 174, 96, 0.9), rgba(46, 204, 113, 0.7));
    transform: scaleX(-1) scale(1.1);
    color: #fff;
  }
}

.targets-container {
  max-height: 80px;
  overflow-y: auto;
  padding: 3px;
}

.target {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 4px 0;
}

.badge {
  background: linear-gradient(135deg, rgba(26, 82, 118, 0.8), rgba(21, 67, 96, 0.9));
  border: 1px solid rgba(212, 175, 55, 0.4);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  color: white;
  font-family: "Tajawal", sans-serif;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.badge.found {
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.7), rgba(46, 204, 113, 0.5));
  border-color: rgba(39, 174, 96, 0.8);
  color: #e8f8ef;
  transform: scale(1.05);
}

.help {
  font-size: 10px;
  color: #d1f2eb;
  line-height: 1.3;
  margin-top: 6px;
  font-family: "Tajawal", sans-serif;
  padding: 0 2px;
  text-shadow: 0 1px 1px rgba(0,0,0,0.2);
}

.footer {
  font-size: 10px;
  color: #e8f6f3;
  margin-top: 4px;
  text-align: center;
  font-family: "Tajawal", sans-serif;
  font-weight: 500;
  padding: 4px;
  background: rgba(21, 67, 96, 0.5);
  border-radius: 6px;
  text-shadow: 0 1px 1px rgba(0,0,0,0.2);
}

hr {
  border: none;
  border-top: 1px solid rgba(212, 175, 55, 0.3);
  margin: 6px 0;
}

.celebration {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
  display: none;
}

.confetti {
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: var(--gold);
  opacity: 0.8;
}

@keyframes confettiFall {
  0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
}

aside.card {
  padding: 8px;
}

aside.card h3 {
  font-family: "Tajawal", sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: var(--gold);
  margin-bottom: 6px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.status-highlight {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(247, 220, 111, 0.2));
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 10px;
  border: 1px solid rgba(212, 175, 55, 0.4);
}

@media (max-width: 380px) {
  .container {
    padding: 4px;
    gap: 4px;
  }
  
  header {
    padding: 6px;
  }
  
  .brand {
    font-size: 12px;
  }
  
  h1 {
    font-size: 11px;
  }
  
  .controls {
    grid-template-columns: 1fr;
    gap: 3px;
  }
  
  select, button {
    padding: 4px 6px;
    font-size: 10px;
  }
  
  .grid-wrap {
    padding: 3px;
  }
}

@media (max-height: 600px) {
  header {
    padding: 6px;
  }
  
  .brandbar {
    margin-bottom: 4px;
  }
  
  .targets-container {
    max-height: 60px;
  }
}

@keyframes gentlePulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.brand, h1 {
  animation: gentlePulse 4s ease-in-out infinite;
}
</style>
</head>
<body>
<div class="container">
  <header>
    <div class="brandbar">
      <div class="brand">EDUFUN</div>
      <h1>الكلمات الخفية - أسماء الله الحسنى</h1>
    </div>
    <div class="controls">
      <div class="control-group">
        <label>المستوى:</label>
        <select id="level"></select>
      </div>
      <div class="control-group">
        <label>عدد الأسماء:</label>
        <select id="chunk">
          <option value="6">6</option>
          <option value="8" selected>8</option>
          <option value="10">10</option>
        </select>
      </div>
      <div class="control-group">
        <label>حجم الشبكة:</label>
        <select id="size">
          <option value="6">6×6</option>
          <option value="8" selected>8×8</option>
          <option value="10">10×10</option>
          <option value="12">12×12</option>
        </select>
      </div>
      <div class="control-group">
        <label>تلميحات:</label>
        <button id="showHints" class="primary">إظهار/إخفاء</button>
      </div>
      <button id="regen" class="primary">إعادة توليد الشبكة</button>
    </div>
  </header>

  <main class="card grid-container">
    <section class="grid-wrap">
      <div id="grid" class="grid"></div>
    </section>
    <div class="footer" id="status"></div>
  </main>

  <aside class="card">
    <h3 id="listTitle">الأسماء المستهدفة</h3>
    <div class="targets-container">
      <div id="targets" class="target"></div>
    </div>
    <hr>
    <div class="help">
      انقر على أول حرف ثم اسحب إلى آخره. الاتجاهات المسموحة: ← → ↑ ↓ ↖ ↗ ↘ ↙
    </div>
  </aside>
</div>

<div class="celebration" id="celebration"></div>

<script>
// Gestion des événements tactiles
document.addEventListener('touchstart', function(e) {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });

document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
});

const ALL_NAMES = [
  "الله","الرحمن","الرحيم","الملك","القدوس","السلام","المؤمن","المهيمن","العزيز","الجبار",
  "المتكبر","الخالق","البارئ","المصور","الغفار","القهار","الوهاب","الرزاق","الفتاح","العليم",
  "القابض","الباسط","الخافض","الرافع","المعز","المذل","السميع","البصير","الحكم","العدل",
  "اللطيف","الخبير","الحليم","العظيم","الغفور","الشكور","العلي","الكبير","الحفيظ","المقيت",
  "الحسيب","الجليل","الكريم","الرقيب","المجيب","الواسع","الحكيم","الودود","المجيد","الباعث",
  "الشهيد","الحق","الوكيل","القوي","المتين","الولي","الحميد","المحصي","المبدئ","المعيد",
  "المحيي","المميت","الحي","القيوم","الواجد","الماجد","الواحد","الصمد","القادر","المقتدر",
  "المقدم","المؤخر","الأول","الآخر","الظاهر","الباطن","الوالي","المتعالي","البر","التواب",
  "المنتقم","العفو","الرؤوف","مالك الملك","ذو الجلال والإكرام","المقسط","الجامع","الغني",
  "المغني","المانع","الضار","النافع","النور","الهادي","البديع","الباقي","الوارث","الرشيد","الصبور"
];

const gridEl = document.getElementById('grid'),
  levelSel = document.getElementById('level'),
  sizeSel = document.getElementById('size'),
  chunkSel = document.getElementById('chunk'),
  targetsEl = document.getElementById('targets'),
  statusEl = document.getElementById('status'),
  btnRegen = document.getElementById('regen'),
  btnHints = document.getElementById('showHints');

let N = +sizeSel.value, 
    CHUNK = +chunkSel.value;
let LEVELS = [], 
    cells = [], 
    board = [], 
    isWord = [], 
    targetNames = [], 
    remaining = new Set();
let hintsOn = false;

const AR_RANDOM = "ابتثجحخدذرزسشصضطظعغفقكلمنهوي";
const randLetter = () => AR_RANDOM[Math.floor(Math.random() * AR_RANDOM.length)];
const normalize = s => s.replace(/\s+/g, '').replace(/ـ/gi, '').replace(/[^\u0600-\u06FF]/g, '');

const idx = (r, c) => r * N + c;
const inBounds = (r, c) => r >= 0 && r < N && c >= 0 && c < N;

function rebuildLevels() {
  LEVELS = [];
  for (let i = 0; i < ALL_NAMES.length; i += CHUNK) {
    LEVELS.push(ALL_NAMES.slice(i, i + CHUNK));
  }
  levelSel.innerHTML = '';
  LEVELS.forEach((L, i) => {
    const o = document.createElement('option');
    o.value = i;
    o.textContent = `المستوى ${i + 1}`;
    levelSel.appendChild(o);
  });
  levelSel.value = 0;
}
rebuildLevels();

function buildGrid() {
  gridEl.innerHTML = '';
  cells = [];
  gridEl.style.setProperty('--n', N);
  
  for (let i = 0; i < N * N; i++) {
    const d = document.createElement('div');
    d.className = 'cell';
    d.dataset.index = i;
    gridEl.appendChild(d);
    cells.push(d);
  }
}

function tryPlace(word) {
  const chars = normalize(word).split(''), 
        L = chars.length;
  if (L > N) return false;
  
  const dirs = [
    { dr: 0, dc: -1 },   // ← Gauche
    { dr: 0, dc: 1 },    // → Droite  
    { dr: -1, dc: 0 },   // ↑ Haut
    { dr: 1, dc: 0 },    // ↓ Bas
    { dr: -1, dc: -1 },  // ↖ Haut-Gauche
    { dr: -1, dc: 1 },   // ↗ Haut-Droite
    { dr: 1, dc: -1 },   // ↙ Bas-Gauche
    { dr: 1, dc: 1 }     // ↘ Bas-Droite
  ];
  
  for (let t = 0; t < 300; t++) {
    const dir = dirs[Math.floor(Math.random() * dirs.length)];
    
    let rMin = 0, rMax = N, cMin = 0, cMax = N;
    
    if (dir.dr === -1) { rMin = L - 1; } 
    else if (dir.dr === 1) { rMax = N - L; }
    
    if (dir.dc === -1) { cMin = L - 1; } 
    else if (dir.dc === 1) { cMax = N - L; }
    
    if (rMin >= rMax || cMin >= cMax) continue;
    
    const r = Math.floor(Math.random() * (rMax - rMin)) + rMin;
    const c = Math.floor(Math.random() * (cMax - cMin)) + cMin;
    
    let ok = true;
    for (let k = 0; k < L; k++) {
      const rr = r + dir.dr * k, 
            cc = c + dir.dc * k;
      if (!inBounds(rr, cc) || (board[rr][cc] && board[rr][cc] !== chars[k])) {
        ok = false;
        break;
      }
    }
    
    if (!ok) continue;
    
    for (let k = 0; k < L; k++) {
      const rr = r + dir.dr * k, 
            cc = c + dir.dc * k;
      board[rr][cc] = chars[k];
      isWord[rr][cc] = true;
    }
    return true;
  }
  return false;
}

function pickSubset(a, k) {
  const x = a.slice();
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x.slice(0, Math.min(k, x.length));
}

function generate(i) {
  const base = LEVELS[i].slice(), 
        eligible = base.filter(n => normalize(n).length <= N);
  let names = pickSubset(eligible, Math.min(CHUNK, eligible.length));
  names.sort((a, b) => normalize(b).length - normalize(a).length);

  board = Array.from({ length: N }, () => Array(N).fill(null));
  isWord = Array.from({ length: N }, () => Array(N).fill(false));

  let placed = true;
  for (const nm of names) {
    if (!tryPlace(nm)) {
      placed = false;
      break;
    }
  }
  
  if (!placed) {
    for (let attempt = 0; attempt < 5 && !placed; attempt++) {
      names.pop();
      board = Array.from({ length: N }, () => Array(N).fill(null));
      isWord = Array.from({ length: N }, () => Array(N).fill(false));
      placed = true;
      for (const nm of names) {
        if (!tryPlace(nm)) {
          placed = false;
          break;
        }
      }
    }
  }

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (!board[r][c]) board[r][c] = randLetter();
    }
  }
  
  targetNames = names;
  remaining = new Set(names);
  buildGrid();
  
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      cells[idx(r, c)].textContent = board[r][c];
    }
  }
  
  renderTargets();
  updateStatus();
  applyHints();
  
  setTimeout(adjustCellSize, 100);
}

function renderTargets() {
  const listTitle = document.getElementById('listTitle');
  listTitle.textContent = `الأسماء المستهدفة (${targetNames.length})`;
  targetsEl.innerHTML = '';
  targetNames.forEach(n => {
    const b = document.createElement('span');
    b.className = 'badge';
    b.dataset.name = n;
    b.textContent = n;
    targetsEl.appendChild(b);
  });
}

function markBadgeFound(n) {
  [...targetsEl.children].forEach(x => {
    if (x.dataset.name === n) x.classList.add('found');
  });
}

function updateStatus() {
  statusEl.innerHTML = `<span class="status-highlight">المتبقي: ${remaining.size} / ${targetNames.length}</span>`;
}

function collectLine(f, t) {
  const dr = t.r - f.r;
  const dc = t.c - f.c;
  
  if (dr === 0) {
    const L = [];
    const step = dc > 0 ? 1 : -1;
    for (let c = f.c; c !== t.c + step; c += step) L.push({ r: f.r, c });
    return L;
  }
  if (dc === 0) {
    const L = [];
    const step = dr > 0 ? 1 : -1;
    for (let r = f.r; r !== t.r + step; r += step) L.push({ r, c: f.c });
    return L;
  }
  if (Math.abs(dr) === Math.abs(dc)) {
    const L = [];
    const rStep = dr > 0 ? 1 : -1;
    const cStep = dc > 0 ? 1 : -1;
    for (let i = 0; i <= Math.abs(dr); i++) {
      L.push({ r: f.r + i * rStep, c: f.c + i * cStep });
    }
    return L;
  }
  return null;
}

function textFrom(L) {
  let s = '';
  for (const p of L) s += board[p.r][p.c];
  return s;
}

function isExact(L) {
  const p = textFrom(L);
  for (const n of remaining) {
    if (normalize(n) === p) return n;
  }
  return null;
}

function isPrefix(L) {
  const p = textFrom(L);
  for (const n of remaining) {
    if (normalize(n).startsWith(p)) return true;
  }
  return false;
}

let actx = null;
function ensureAudio() {
  if (!actx) {
    actx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function tone(freq, dur = 0.12, type = 'sine', gain = 0.08, when = 0) {
  ensureAudio();
  const t = actx.currentTime + when;
  const osc = actx.createOscillator(),
        g = actx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = gain;
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(actx.destination);
  osc.start(t);
  osc.stop(t + dur);
}

function playDing() {
  tone(880, 0.10, 'triangle', 0.10, 0);
  tone(1320, 0.12, 'triangle', 0.08, 0.07);
}

function playWin() {
  [660, 880, 990, 1320].forEach((f, i) => tone(f, 0.15, 'square', 0.09, i * 0.08));
  confettiBurst();
}

function confettiBurst() {
  const celebrationEl = document.getElementById('celebration');
  celebrationEl.style.display = 'block';
  
  for (let i = 0; i < 60; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    const colors = ['#d4af37', '#f7dc6f', '#1abc9c', '#1a5276', '#27ae60'];
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = `${Math.random() * 100}%`;
    
    const size = Math.random() * 4 + 2;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.animation = `confettiFall ${2 + Math.random() * 3}s linear forwards`;
    
    celebrationEl.appendChild(confetti);
    
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
  
  setTimeout(() => {
    celebrationEl.style.display = 'none';
    celebrationEl.innerHTML = '';
  }, 5000);
}

let start = null, 
    lastPreview = [];

function posFromEl(el) {
  const i = +el.dataset.index;
  return { r: Math.floor(i / N), c: i % N };
}

function clearPreview() {
  lastPreview.forEach(p => {
    cells[idx(p.r, p.c)].classList.remove('preview', 'valid-preview');
  });
  lastPreview = [];
}

function setPreview(L, exact = false) {
  clearPreview();
  if (!L) return;
  
  L.forEach(p => {
    cells[idx(p.r, p.c)].classList.add(exact ? 'valid-preview' : 'preview');
  });
  lastPreview = L.slice();
}

gridEl.addEventListener('pointerdown', e => {
  const t = e.target.closest('.cell');
  if (!t) return;
  
  ensureAudio();
  e.preventDefault();
  gridEl.setPointerCapture(e.pointerId);
  start = posFromEl(t);
  setPreview([start], false);
});

gridEl.addEventListener('pointermove', e => {
  if (!start) return;
  
  const el = document.elementFromPoint(e.clientX, e.clientY);
  const cell = (el && el.classList && el.classList.contains('cell')) ? el : e.target.closest('.cell');
  if (!cell) return;
  
  const end = posFromEl(cell);
  const L = collectLine(start, end);
  if (!L) {
    clearPreview();
    return;
  }
  
  const exact = isExact(L);
  if (exact) {
    setPreview(L, true);
  } else if (isPrefix(L)) {
    setPreview(L, false);
  } else {
    clearPreview();
  }
});

function commitIfValid() {
  if (!start || !lastPreview.length) return;
  
  const exactName = isExact(lastPreview);
  if (exactName) {
    remaining.delete(exactName);
    lastPreview.forEach(p => {
      gridEl.children[idx(p.r, p.c)].classList.add('found', 'flash');
    });
    markBadgeFound(exactName);
    updateStatus();
    playDing();
    
    if (remaining.size === 0) {
      statusEl.innerHTML = '<span class="status-highlight">أحسنت! ✅</span>';
      playWin();
    }
    applyHints();
  }
  clearPreview();
  start = null;
}

gridEl.addEventListener('pointerup', () => commitIfValid());
gridEl.addEventListener('pointercancel', () => {
  clearPreview();
  start = null;
});

function applyHints() {
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const i = idx(r, c);
      const el = cells[i];
      const isFound = el.classList.contains('found');
      el.classList.toggle('hint', hintsOn && isWord[r][c] && !isFound);
    }
  }
}

btnHints.onclick = () => {
  hintsOn = !hintsOn;
  applyHints();
};

btnRegen.onclick = () => generate(+levelSel.value);

sizeSel.onchange = () => {
  N = +sizeSel.value;
  gridEl.style.setProperty('--n', N);
  generate(+levelSel.value);
};

chunkSel.onchange = () => {
  CHUNK = +chunkSel.value;
  rebuildLevels();
  generate(+levelSel.value);
};

levelSel.onchange = () => generate(+levelSel.value);

function adjustCellSize() {
  const gridWrap = document.querySelector('.grid-wrap');
  const gridStyles = getComputedStyle(gridEl);
  const gap = parseFloat(gridStyles.gap) || 0;
  
  const availableWidth = gridWrap.clientWidth - 15;
  const availableHeight = gridWrap.clientHeight - 15;
  
  const cellSizeByWidth = (availableWidth - gap * (N - 1)) / N;
  const cellSizeByHeight = (availableHeight - gap * (N - 1)) / N;
  
  let cellSize = Math.min(cellSizeByWidth, cellSizeByHeight);
  
  let maxCellSize;
  if (N <= 6) {
    maxCellSize = 40; 
  } else if (N <= 8) {
    maxCellSize = 35;
  } else if (N <= 10) {
    maxCellSize = 28;
  } else {
    maxCellSize = 22;
  }
  
  const minCellSize = 16;
  const finalCellSize = Math.max(minCellSize, Math.min(maxCellSize, cellSize));
  
  document.documentElement.style.setProperty('--cell', finalCellSize + 'px');
}

window.addEventListener('resize', adjustCellSize);
window.addEventListener('orientationchange', () => {
  setTimeout(adjustCellSize, 300);
});

window.addEventListener('load', () => {
  setTimeout(adjustCellSize, 100);
  setTimeout(adjustCellSize, 500);
});

// ===== SERVICE WORKER - HORS LIGNE =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js')
      .then(function(registration) {
        console.log('✅ Service Worker enregistré avec succès: ', registration.scope);
        
        // Vérifier les mises à jour
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('🔄 Nouveau Service Worker trouvé:', newWorker);
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('📦 Nouvelle version disponible! Recharger pour mettre à jour.');
            }
          });
        });
      })
      .catch(function(error) {
        console.log("❌ Échec de l'enregistrement du Service Worker: ", error);
      });

    // Vérifier quand le Service Worker est prêt
    navigator.serviceWorker.ready.then(() => {
      console.log('🎯 Service Worker prêt pour le cache hors ligne');
    });
  });

  // Surveiller les changements de connexion
  window.addEventListener('online', () => {
    console.log('🌐 Connexion rétablie');
    document.body.classList.remove('offline');
  });

  window.addEventListener('offline', () => {
    console.log('📴 Mode hors ligne activé');
    document.body.classList.add('offline');
  });
}

// Démarrer l'application
generate(0);
</script>
</body>
</html>
