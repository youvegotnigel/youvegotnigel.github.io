/**
 * main.js — Application entry point
 *
 * Instantiates each component class and calls init()
 * after the DOM is ready.
 */

import Navigation    from './components/Navigation.js';
import ScrollAnimator from './components/ScrollAnimator.js';
import TypeWriter    from './components/TypeWriter.js';

class App {
  #nav;
  #animator;
  #typeWriter;

  constructor() {
    this.#nav        = new Navigation();
    this.#animator   = new ScrollAnimator();
    this.#typeWriter = new TypeWriter({
      texts: [
        'Test Automation Specialist',
        'QA Engineer',
        'SDET',
        'CI/CD Advocate',
      ],
    });
  }

  init() {
    this.#nav.init();
    this.#animator.init();
    this.#typeWriter.init();
  }
}

document.addEventListener('DOMContentLoaded', () => new App().init());
