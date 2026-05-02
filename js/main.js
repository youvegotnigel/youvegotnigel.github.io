// Terminal streaming animation
const lines = [
  ['<span class="prompt">$</span> <span class="ok">npx playwright test --project=chromium --workers=4</span>', 0],

  ['<span class="dim">Running 6 tests using 4 workers</span>', 200],

  ['<span class="ok">Running</span> <span class="dim">api.AppointmentBookingTest</span>', 300],

  ['  <span class="pass">✓</span> <span class="dim">[api] appointment › create valid payload</span> <span class="dim">(412ms)</span>', 200],
  ['  <span class="pass">✓</span> <span class="dim">[api] appointment › reject invalid data</span> <span class="dim">(287ms)</span>', 180],
  ['  <span class="pass">✓</span> <span class="dim">[api] session › persist cookie</span> <span class="dim">(198ms)</span>', 180],


  ['<span class="ok">Running</span> <span class="dim">ui.PatientPortalE2E</span>', 300],

  ['  <span class="pass">✓</span> <span class="dim">[ui] login › MFA redirect</span> <span class="dim">(2.1s)</span>', 200],
  ['  <span class="pass">✓</span> <span class="dim">[ui] accessibility › WCAG AA</span> <span class="dim">(1.4s)</span>', 180],
  ['  <span class="pass">✓</span> <span class="dim">[ui] booking › end-to-end flow</span> <span class="dim">(3.8s)</span>', 200],

  ['<span class="ok">Running</span> <span class="dim">a11y.AuditReport</span>', 300],

  ['  <span class="pass">✓</span> <span class="dim">[a11y] home › no keyboard traps</span> <span class="dim">(2.8s)</span>', 200],
  ['  <span class="pass">✓</span> <span class="dim">[a11y] booking form › all inputs have labels</span> <span class="dim">(3.1s)</span>', 180],
  ['  <span class="pass">✓</span> <span class="dim">[a11y] modal › focus returns to trigger on close</span> <span class="dim">(2.5s)</span>', 200],

  ['<span class="dim">────────────────────────────────────────────────────────────</span>', 150],

  ['<span class="pass">9 passed</span> <span class="dim">(12.4s)</span>', 250],

  ['<span class="dim">npx playwright show-report</span>', 200],

  ['<span class="prompt">$</span> <span class="cursor"></span>', 400],
];

const termBody = document.getElementById('termBody');
let idx = 0;
function addLine() {
  if (idx >= lines.length) return;
  const [html, delay] = lines[idx];
  const div = document.createElement('div');
  div.className = 'term-line';
  div.innerHTML = html;
  div.style.animationDelay = '0s';
  termBody.appendChild(div);
  termBody.scrollTop = termBody.scrollHeight;
  idx++;
  setTimeout(addLine, delay);
}
setTimeout(addLine, 800);

// Counter animation
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = +el.dataset.count;
    let cur = 0;
    const step = Math.max(1, target / 30);
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(t); }
      el.textContent = Math.floor(cur);
    }, 35);
  });
}

const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounters();
      obs.disconnect();
    }
  });
}, { threshold: .4 });
const stat = document.querySelector('.about-stats');
if (stat) obs.observe(stat);

// Scroll fade-in
const fadeEls = document.querySelectorAll('.commit, .project, .skill-cat, .phil-card');
fadeEls.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .8s ease, transform .8s ease';
});
const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = 1;
      e.target.style.transform = 'none';
      fadeObs.unobserve(e.target);
    }
  });
}, { threshold: .15 });
fadeEls.forEach(el => fadeObs.observe(el));

// Scrollspy
const navLinks = document.querySelectorAll('.nav-links a');
const spyObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navLinks.forEach(a => a.classList.remove('active'));
    const link = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
    if (link) link.classList.add('active');
  });
}, { rootMargin: '-60px 0px -60% 0px', threshold: 0 });
document.querySelectorAll('section[id]').forEach(s => spyObs.observe(s));
