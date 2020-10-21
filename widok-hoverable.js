const $ = require('cash-dom');

const createHoverable = (function () {
  class Hoverable {
    constructor(element) {
      this.element = $(element);
      this.hasHoveredClass = false;
      this.isTouched = false;

      this.element.on({
        mouseenter: this.activate.bind(this),
        mouseleave: this.deactivate.bind(this),
      });
      this.element[0].addEventListener('touchend', () => {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.isTouched = false;
        }, 100);
      });
      this.element[0].addEventListener(
        'touchstart',
        () => {
          this.isTouched = true;
          clearTimeout(this.timeout);
          this.deactivate();
        },
        { passive: true }
      );
    }

    activate() {
      if (this.hasHoveredClass) return;
      if (this.isTouched) return;
      this.element.addClass('hovered');
      this.hasHoveredClass = true;
    }

    deactivate() {
      if (!this.hasHoveredClass) return;
      this.element.removeClass('hovered');
      this.hasHoveredClass = false;
    }
  }

  return function (options) {
    return new Hoverable(options);
  };
})();

if (typeof module !== 'undefined') module.exports = createHoverable;
