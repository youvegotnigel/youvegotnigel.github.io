/**
 * Navigation
 *
 * Responsibilities:
 *  - Hamburger toggle (mobile)
 *  - Close menu on outside click or link click
 *  - Scroll-spy: highlights the active nav link
 *  - Adds `.scrolled` to <header> for backdrop-blur effect
 */
export default class Navigation {
  #header;
  #hamburgerIcon;
  #menuLinks;
  #sections;
  #allNavLinks;

  constructor() {
    this.#header       = document.getElementById('header');
    this.#hamburgerIcon = document.querySelector('.hamburger-icon');
    this.#menuLinks    = document.querySelector('.menu-links');
    this.#sections     = document.querySelectorAll('section[id]');
    this.#allNavLinks  = document.querySelectorAll('.nav__links a, .menu-links a');
  }

  init() {
    this.#bindHamburger();
    this.#bindScrollBehavior();
    this.#bindScrollSpy();
  }

  // ── Public so it can be called externally if needed ──────
  toggleMenu() {
    const open = this.#menuLinks.classList.toggle('open');
    this.#hamburgerIcon.classList.toggle('open', open);
    this.#hamburgerIcon.setAttribute('aria-expanded', open);
  }

  // ── Private ───────────────────────────────────────────────
  #bindHamburger() {
    this.#hamburgerIcon?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    // Close when a mobile link is clicked
    this.#menuLinks?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        this.#menuLinks.classList.remove('open');
        this.#hamburgerIcon.classList.remove('open');
        this.#hamburgerIcon.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#hamburger-nav')) {
        this.#menuLinks?.classList.remove('open');
        this.#hamburgerIcon?.classList.remove('open');
        this.#hamburgerIcon?.setAttribute('aria-expanded', 'false');
      }
    });
  }

  #bindScrollBehavior() {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        this.#header?.classList.toggle('scrolled', window.scrollY > 20);
        ticking = false;
      });
      ticking = true;
    }, { passive: true });
  }

  #bindScrollSpy() {
    const navHeight = this.#header?.offsetHeight ?? 70;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.#setActive(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0, rootMargin: `-${navHeight}px 0px -62% 0px` }
    );
    this.#sections?.forEach(s => observer.observe(s));
  }

  #setActive(hash) {
    this.#allNavLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === hash);
    });
  }
}
