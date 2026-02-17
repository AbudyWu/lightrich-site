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

// Partners marquee: duplicate one full set for seamless looping
(function initPartnersMarquee() {
  const track = document.getElementById('partnersTrack');
  if (!track) return;
  if (track.dataset.cloned === '1') return;

  const items = Array.from(track.children);
  items.forEach(node => {
    track.appendChild(node.cloneNode(true));
  });

  track.dataset.cloned = '1';
})();

// Process flow tabs (diagram switch)
(function initProcessTabs(){
  const tabs = document.querySelectorAll('.process-tab');
  if (!tabs.length) return;

  const panels = document.querySelectorAll('.process-panel');
  const zhEl = document.querySelector('.process-current__zh');
  const enEl = document.querySelector('.process-current__en');

  const labelMap = {
    smt: { zh: 'SMT 生產製造流程', en: 'SMT Production Process Flow' },
    dip: { zh: 'DIP 生產製造流程', en: 'DIP Production Process Flow' },
    assy: { zh: '組裝 / 測試 / 包裝流程', en: 'Build / Test / Pack Process Flow' },
  };

  function setActive(key){
    tabs.forEach(t => {
      const active = t.getAttribute('data-flow') === key;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    panels.forEach(p => p.classList.toggle('is-active', p.getAttribute('data-flow') === key));

    const label = labelMap[key];
    if (label && zhEl && enEl){
      zhEl.textContent = label.zh;
      enEl.textContent = label.en;
    }
  }

  tabs.forEach(t => {
    t.addEventListener('click', () => setActive(t.getAttribute('data-flow')));
  });

  // init (keep current active, otherwise default smt)
  const current = document.querySelector('.process-tab.is-active')?.getAttribute('data-flow') || 'smt';
  setActive(current);
})();
