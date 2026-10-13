/* ==========================================================
   script.js
   Small progressive enhancements for the portfolio:
   - scroll progress bar and header shadow
   - back-to-top button
   - scroll-reveal animation
   - typing effect for headings marked with data-typing
   - fade transition between pages
   Everything is skipped or simplified when the visitor prefers
   reduced motion, and the site works if this file fails to load.
   ========================================================== */
(function () {
  "use strict";

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  /* ---------- Scroll progress bar, header shadow, back-to-top ---------- */
  function setupScrollUi() {
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    var topBtn = document.createElement("button");
    topBtn.type = "button";
    topBtn.className = "back-to-top";
    topBtn.setAttribute("aria-label", "Back to top");
    topBtn.textContent = "↑";
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
    document.body.appendChild(topBtn);

    var header = document.querySelector(".site-header");
    var ticking = false;

    function update() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var max =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var progress = max > 0 ? Math.min(scrollTop / max, 1) : 0;

      bar.style.transform = "scaleX(" + progress + ")";
      if (header) header.classList.toggle("scrolled", scrollTop > 10);
      topBtn.classList.toggle("show", scrollTop > 400);
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Scroll reveal ---------- */
  function setupReveal() {
    var targets = document.querySelectorAll(
      ".profile-sidebar .sidebar-content > *, .content-header, .cv-block, .site-footer"
    );
    if (!targets.length) return;

    Array.prototype.forEach.call(targets, function (el) {
      el.classList.add("reveal");
      if (el.closest(".profile-sidebar")) el.classList.add("reveal-left");
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(targets, function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        var delay = 0;
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.style.setProperty("--reveal-delay", delay + "ms");
          entry.target.classList.add("is-visible");
          delay = Math.min(delay + 90, 450);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    Array.prototype.forEach.call(targets, function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Typing effect (add data-typing to a heading) ---------- */
  function setupTyping() {
    var els = document.querySelectorAll("[data-typing]");
    Array.prototype.forEach.call(els, function (el) {
      var full = el.textContent.trim();
      if (!full || reduceMotion) return;

      // Keep the final text available to screen readers and stop layout jumping.
      el.setAttribute("aria-label", full);
      el.style.minHeight = el.offsetHeight + "px";
      el.textContent = "";
      el.classList.add("typing-caret");

      var i = 0;
      function step() {
        i += 1;
        el.textContent = full.slice(0, i);
        if (i < full.length) {
          window.setTimeout(step, 55);
        } else {
          window.setTimeout(function () {
            el.classList.remove("typing-caret");
          }, 2500);
        }
      }
      window.setTimeout(step, 500);
    });
  }

  /* ---------- Fade between pages ---------- */
  function setupPageTransitions() {
    if (reduceMotion) return;

    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      var link = e.target.closest && e.target.closest("a[href]");
      if (!link) return;
      if (link.target && link.target !== "_self") return;
      if (link.hasAttribute("download")) return;
      if (link.protocol !== window.location.protocol) return;
      if (link.host !== window.location.host) return;

      var from = window.location.href.split("#")[0];
      var to = link.href.split("#")[0];
      if (from === to) return; // same page (anchor link): let the browser scroll

      e.preventDefault();
      document.body.classList.add("page-leaving");
      window.setTimeout(function () {
        window.location.href = link.href;
      }, 220);
    });

    // Coming back with the browser's back button: undo the fade-out.
    window.addEventListener("pageshow", function (e) {
      if (e.persisted) document.body.classList.remove("page-leaving");
    });
  }

  ready(function () {
    setupScrollUi();
    setupReveal();
    setupTyping();
    setupPageTransitions();
  });
})();
