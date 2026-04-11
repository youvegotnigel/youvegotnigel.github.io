/**
 * TypeWriter
 *
 * Cycles through an array of strings, typing then deleting each
 * one into a target element. A separate cursor element handles
 * the blinking effect via CSS so it's always visible regardless
 * of the typing state.
 */
export default class TypeWriter {
  #el;
  #config;
  #state;
  #timerId;

  /**
   * @param {object} options
   * @param {string}   options.selector     - CSS selector for the text element
   * @param {string[]} options.texts        - Array of strings to cycle through
   * @param {number}   options.typeSpeed    - Ms per character while typing
   * @param {number}   options.deleteSpeed  - Ms per character while deleting
   * @param {number}   options.pauseAfter   - Ms to pause at end of a full word
   * @param {number}   options.startDelay   - Ms before the first character is typed
   */
  constructor({
    selector    = '.typewriter-text',
    texts       = ['Test Automation Specialist', 'QA Engineer', 'SDET', 'CI/CD Advocate'],
    typeSpeed   = 75,
    deleteSpeed = 42,
    pauseAfter  = 2200,
    startDelay  = 900,
  } = {}) {
    this.#config = { selector, texts, typeSpeed, deleteSpeed, pauseAfter, startDelay };
    this.#state  = { textIdx: 0, charIdx: 0, deleting: false };
    this.#timerId = null;
  }

  init() {
    this.#el = document.querySelector(this.#config.selector);
    if (!this.#el) return;
    this.#timerId = setTimeout(() => this.#tick(), this.#config.startDelay);
  }

  destroy() {
    clearTimeout(this.#timerId);
  }

  // ── Private ────────────────────────────────────────────────
  #tick() {
    const { texts, typeSpeed, deleteSpeed, pauseAfter } = this.#config;
    const { textIdx, charIdx, deleting } = this.#state;
    const current = texts[textIdx];

    if (deleting) {
      this.#el.textContent = current.slice(0, charIdx - 1);
      this.#state.charIdx--;
    } else {
      this.#el.textContent = current.slice(0, charIdx + 1);
      this.#state.charIdx++;
    }

    let delay = deleting ? deleteSpeed : typeSpeed;

    // Finished typing — pause then switch to deleting
    if (!deleting && this.#state.charIdx === current.length) {
      delay = pauseAfter;
      this.#state.deleting = true;
    }
    // Finished deleting — move to next string
    else if (deleting && this.#state.charIdx === 0) {
      this.#state.deleting = false;
      this.#state.textIdx  = (textIdx + 1) % texts.length;
      delay = 420;
    }

    this.#timerId = setTimeout(() => this.#tick(), delay);
  }
}
