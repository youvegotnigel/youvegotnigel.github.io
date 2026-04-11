/**
 * ScrollAnimator
 *
 * Uses IntersectionObserver to fade/slide elements in as they
 * enter the viewport. Stagger delay is applied per-group so
 * cards in the same section animate in sequence.
 *
 * Usage: add class="animate" (or "animate from-left" / "animate from-right")
 * to any element. The class "visible" is toggled on by the observer.
 */
export default class ScrollAnimator {
  #observer;

  constructor({ threshold = 0.12, rootMargin = '0px 0px -55px 0px' } = {}) {
    this.#observer = new IntersectionObserver(
      (entries) => this.#onIntersect(entries),
      { threshold, rootMargin }
    );
  }

  init() {
    // Apply per-group stagger before observing
    this.#applyStagger('.experience__grid', 80);
    this.#applyStagger('.projects__grid',   90);
    this.#applyStagger('.about__stats',     70);
    this.#applyStagger('.contact__links',   60);

    document.querySelectorAll('.animate').forEach(el => {
      this.#observer.observe(el);
    });
  }

  // ── Private ────────────────────────────────────────────────
  #onIntersect(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      this.#observer.unobserve(entry.target); // animate once
    });
  }

  /** Set incremental transition-delay on direct .animate children of a container. */
  #applyStagger(containerSelector, stepMs) {
    document.querySelectorAll(containerSelector).forEach(container => {
      const children = container.querySelectorAll(':scope > .animate');
      children.forEach((child, i) => {
        child.style.transitionDelay = `${i * stepMs}ms`;
      });
    });
  }
}
