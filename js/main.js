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