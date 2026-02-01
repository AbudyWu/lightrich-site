// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  // close menu when clicking a link (mobile)
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Tabs
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    const key = btn.getAttribute('data-tab');
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('is-active'));
    const panel = document.getElementById(`tab-${key}`);
    if (panel) panel.classList.add('is-active');
  });
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Partners marquee (seamless)
(function () {
  const track = document.getElementById("partnersTrack");
  if (!track) return;

  // 只複製一次，避免熱重載或重複執行造成越長越多
  if (track.dataset.duplicated === "1") return;
  track.dataset.duplicated = "1";

  // 複製所有 logo 項目並接到尾端（配合 CSS to { translateX(-50%) } 無縫）
  const items = Array.from(track.children);
  items.forEach((node) => track.appendChild(node.cloneNode(true)));
})();

// (function () {
//   const track = document.getElementById("partnersTrack");
//   if (!track) return;

//   // 複製一份內容，做無縫輪播
//   const clone = track.cloneNode(true);
//   // 移除重複 id，避免 DOM 衝突
//   clone.removeAttribute("id");

//   track.parentElement.appendChild(clone);

//   // 把兩個 track 包起來一起跑：最簡單做法是把父層當作 flex
//   // 這裡用一個 wrapper 動態處理：若你不想動 HTML 結構，就在這裡補上
//   const marquee = track.parentElement;
//   marquee.style.display = "flex";
//   marquee.style.flexWrap = "nowrap";
//   marquee.style.width = "max-content";

//   // 讓兩段一起用同一個動畫（套用到 parent）
//   marquee.classList.add("partners__track");
//   track.style.animation = "none";
//   clone.style.animation = "none";
//   })();
