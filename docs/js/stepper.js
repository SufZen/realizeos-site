/**
 * Stepper — Multi-step wizard for static HTML pages
 * Reusable vanilla JS module. No dependencies.
 *
 * Usage:
 *   const wizard = new Stepper({
 *     container: '.worksheet',
 *     steps: '[data-step]',
 *     progress: '[data-stepper-progress]',
 *     storageKey: 'ws_step',
 *     anchorAliases: { 'lite': 4, 'full': 5 },
 *     onStepChange: (index, el) => {}
 *   });
 */
(function () {
  'use strict';

  function Stepper(opts) {
    this.container = document.querySelector(opts.container);
    if (!this.container) return;

    this.stepSelector = opts.steps || '[data-step]';
    this.progressMount = opts.progress ? document.querySelector(opts.progress) : null;
    this.storageKey = opts.storageKey || 'stepper_current';
    this.onStepChange = opts.onStepChange || null;
    this.anchorAliases = opts.anchorAliases || {};
    this.tierAttr = 'data-step-condition';
    this.currentTier = opts.initialTier || null;

    this.allSteps = Array.prototype.slice.call(this.container.querySelectorAll(this.stepSelector));
    this.steps = this._filterSteps();
    this.currentIndex = 0;

    this._readInitialStep();
    this._buildProgressBar();
    this._buildNavBar();
    this._showStep(this.currentIndex, false);
    this._bindEvents();

    window.__stepper = this;
  }

  /* --- Tier filtering --- */

  Stepper.prototype._filterSteps = function () {
    var self = this;
    if (!this.currentTier) {
      return this.allSteps.filter(function (el) {
        var cond = el.getAttribute(self.tierAttr);
        return !cond;
      });
    }
    return this.allSteps.filter(function (el) {
      var cond = el.getAttribute(self.tierAttr);
      if (!cond) return true;
      // format: "tier:full"
      var parts = cond.split(':');
      return parts.length === 2 && parts[1] === self.currentTier;
    });
  };

  Stepper.prototype.setTier = function (tier) {
    this.currentTier = tier;
    this.steps = this._filterSteps();
    if (this.currentIndex >= this.steps.length) {
      this.currentIndex = this.steps.length - 1;
    }
    this._updateProgressBar();
    this._updateNavButtons();
    this._syncVisibility();
  };

  Stepper.prototype.recalculate = function () {
    this.steps = this._filterSteps();
    if (this.currentIndex >= this.steps.length) {
      this.currentIndex = this.steps.length - 1;
    }
    this._updateProgressBar();
    this._showStep(this.currentIndex, false);
  };

  /* --- Initial step resolution --- */

  Stepper.prototype._readInitialStep = function () {
    var hash = location.hash.replace('#', '');

    // 1. Check stepper hash (#step-N)
    if (hash.indexOf('step-') === 0) {
      var n = parseInt(hash.replace('step-', ''), 10);
      if (n >= 1 && n <= this.steps.length) {
        this.currentIndex = n - 1;
        return;
      }
    }

    // 2. Check anchor aliases
    if (hash && this.anchorAliases[hash] !== undefined) {
      var aliasStep = this.anchorAliases[hash];
      if (aliasStep >= 1 && aliasStep <= this.steps.length) {
        this.currentIndex = aliasStep - 1;
        return;
      }
    }

    // 3. Check localStorage
    var saved = localStorage.getItem(this.storageKey);
    if (saved !== null) {
      var idx = parseInt(saved, 10);
      if (idx >= 0 && idx < this.steps.length) {
        this.currentIndex = idx;
        return;
      }
    }
  };

  /* --- Step display --- */

  Stepper.prototype._showStep = function (index, animate) {
    if (typeof animate === 'undefined') animate = true;

    // Hide all steps
    for (var i = 0; i < this.allSteps.length; i++) {
      this.allSteps[i].classList.add('stepper-step');
      this.allSteps[i].classList.remove('stepper-step--active');
    }

    // Show target
    var target = this.steps[index];
    if (!target) return;
    target.classList.remove('stepper-step');
    target.classList.add('stepper-step--active');
    if (animate) {
      target.style.animation = 'none';
      target.offsetHeight; // reflow
      target.style.animation = '';
    }

    // Update URL hash
    if (animate) {
      history.pushState(null, '', '#step-' + (index + 1));
    } else {
      history.replaceState(null, '', '#step-' + (index + 1));
    }

    // Persist
    localStorage.setItem(this.storageKey, index.toString());

    // Scroll to top
    window.scrollTo({ top: 0, behavior: animate ? 'smooth' : 'auto' });

    // Update UI
    this._updateProgressBar();
    this._updateNavButtons();

    // Callback
    if (this.onStepChange) {
      this.onStepChange(index, target);
    }
  };

  Stepper.prototype._syncVisibility = function () {
    for (var i = 0; i < this.allSteps.length; i++) {
      this.allSteps[i].classList.add('stepper-step');
      this.allSteps[i].classList.remove('stepper-step--active');
    }
    var target = this.steps[this.currentIndex];
    if (target) {
      target.classList.remove('stepper-step');
      target.classList.add('stepper-step--active');
    }
  };

  /* --- Navigation --- */

  Stepper.prototype.next = function () {
    if (this.currentIndex < this.steps.length - 1) {
      this.currentIndex++;
      this._showStep(this.currentIndex);
    }
  };

  Stepper.prototype.back = function () {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this._showStep(this.currentIndex);
    }
  };

  Stepper.prototype.goTo = function (stepNumber) {
    // stepNumber is 1-indexed
    var index = stepNumber - 1;
    if (index >= 0 && index < this.steps.length) {
      this.currentIndex = index;
      this._showStep(this.currentIndex);
    }
  };

  /* --- Progress bar --- */

  Stepper.prototype._buildProgressBar = function () {
    if (!this.progressMount) return;

    var html = '<div class="stepper-progress__inner">';
    html += '<div class="stepper-progress__steps">';
    for (var i = 0; i < this.steps.length; i++) {
      html += '<div class="stepper-progress__dot" data-dot="' + i + '"></div>';
    }
    html += '</div>';
    html += '<span class="stepper-progress__label"></span>';
    html += '</div>';

    this.progressMount.innerHTML = html;
    this.progressMount.classList.add('stepper-progress');
  };

  Stepper.prototype._updateProgressBar = function () {
    if (!this.progressMount) return;

    var dots = this.progressMount.querySelectorAll('.stepper-progress__dot');
    // Rebuild dots if step count changed (tier switch)
    if (dots.length !== this.steps.length) {
      this._buildProgressBar();
      dots = this.progressMount.querySelectorAll('.stepper-progress__dot');
    }

    for (var i = 0; i < dots.length; i++) {
      dots[i].className = 'stepper-progress__dot';
      if (i < this.currentIndex) {
        dots[i].classList.add('stepper-progress__dot--completed');
      } else if (i === this.currentIndex) {
        dots[i].classList.add('stepper-progress__dot--active');
      }
    }

    var label = this.progressMount.querySelector('.stepper-progress__label');
    if (label) {
      var title = this.steps[this.currentIndex].getAttribute('data-step-title') || '';
      label.innerHTML = '<strong>Step ' + (this.currentIndex + 1) + '</strong> of ' + this.steps.length;
      if (title) label.innerHTML += ' — ' + title;
    }
  };

  /* --- Nav bar --- */

  Stepper.prototype._buildNavBar = function () {
    var nav = document.createElement('div');
    nav.className = 'stepper-nav';

    nav.innerHTML =
      '<button class="stepper-nav__btn stepper-nav__btn--back" type="button">&larr; Back</button>' +
      '<span class="stepper-nav__step-title"></span>' +
      '<button class="stepper-nav__btn stepper-nav__btn--next btn--primary" type="button">Next &rarr;</button>';

    this.container.appendChild(nav);
    this.navEl = nav;
    this.backBtn = nav.querySelector('.stepper-nav__btn--back');
    this.nextBtn = nav.querySelector('.stepper-nav__btn--next');

    var self = this;
    this.backBtn.addEventListener('click', function () { self.back(); });
    this.nextBtn.addEventListener('click', function () { self.next(); });
  };

  Stepper.prototype._updateNavButtons = function () {
    if (!this.navEl) return;

    // Back button
    if (this.currentIndex === 0) {
      this.backBtn.classList.add('stepper-nav__btn--hidden');
    } else {
      this.backBtn.classList.remove('stepper-nav__btn--hidden');
    }

    // Next button
    var isLast = this.currentIndex === this.steps.length - 1;
    this.nextBtn.textContent = isLast ? 'Done' : 'Next \u2192';
    if (isLast) {
      this.nextBtn.classList.add('stepper-nav__btn--done');
    } else {
      this.nextBtn.classList.remove('stepper-nav__btn--done');
    }

    // Step title in center
    var titleEl = this.navEl.querySelector('.stepper-nav__step-title');
    if (titleEl) {
      var title = this.steps[this.currentIndex].getAttribute('data-step-title') || '';
      titleEl.textContent = title;
    }
  };

  /* --- Event binding --- */

  Stepper.prototype._bindEvents = function () {
    var self = this;

    // Browser back/forward
    window.addEventListener('popstate', function () {
      var hash = location.hash.replace('#', '');
      if (hash.indexOf('step-') === 0) {
        var n = parseInt(hash.replace('step-', ''), 10) - 1;
        if (n >= 0 && n < self.steps.length && n !== self.currentIndex) {
          self.currentIndex = n;
          self._showStep(self.currentIndex, false);
        }
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function (e) {
      if (e.ctrlKey && e.key === 'ArrowRight') { e.preventDefault(); self.next(); }
      if (e.ctrlKey && e.key === 'ArrowLeft') { e.preventDefault(); self.back(); }
    });
  };

  // Expose globally
  window.Stepper = Stepper;
})();
