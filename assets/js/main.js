/* Progressive enhancement only: the site is fully readable without JavaScript. */
(function () {
  'use strict';

  // ---- theme: light by default, dark only when the visitor chooses it ----
  var tt = document.querySelector('[data-theme-toggle]');
  if (tt) {
    var root = document.documentElement;
    var paint = function () {
      var dark = root.getAttribute('data-theme') === 'dark';
      tt.setAttribute('aria-pressed', String(dark));
      var lbl = tt.getAttribute(dark ? 'data-label-light' : 'data-label-dark');
      tt.querySelector('[data-theme-label]').textContent = lbl;
      tt.setAttribute('title', lbl);
      tt.querySelector('[data-theme-icon]').textContent = dark ? '☀' : '☾';
    };
    tt.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      paint();
    });
    paint();
  }

  // ---- main navigation: mobile toggle and sub-menu disclosure ----
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
  function closeSubs(except) {
    document.querySelectorAll('.sub-toggle[aria-expanded="true"]').forEach(function (b) {
      if (b !== except) {
        b.setAttribute('aria-expanded', 'false');
        var l = b.closest('.nav-item').querySelector('.sub-list');
        if (l) l.classList.remove('is-open');
      }
    });
  }
  document.querySelectorAll('.sub-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var list = btn.closest('.nav-item').querySelector('.sub-list');
      var open = btn.getAttribute('aria-expanded') !== 'true';
      closeSubs(btn);
      btn.setAttribute('aria-expanded', String(open));
      if (list) list.classList.toggle('is-open', open);
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-item')) closeSubs(null);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var open = document.querySelector('.sub-toggle[aria-expanded="true"]');
      closeSubs(null);
      if (open) open.focus();
    }
  });

  // ---- table of contents: collapsed on small screens ----
  if (window.matchMedia && window.matchMedia('(max-width: 959px)').matches) {
    document.querySelectorAll('.toc-details').forEach(function (d) { d.removeAttribute('open'); });
  }

  // ---- article actions ----
  document.querySelectorAll('[data-action="print"]').forEach(function (b) {
    b.addEventListener('click', function () { window.print(); });
  });
  document.querySelectorAll('[data-action="copy"]').forEach(function (b) {
    b.addEventListener('click', function () {
      var label = b.textContent;
      var done = b.getAttribute('data-done') || 'OK';
      function ok() { b.textContent = done; setTimeout(function () { b.textContent = label; }, 2000); }
      if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(ok, ok); else ok();
    });
  });

  // ---- client-side filters for listings (lesson plans, resources, media) ----
  document.querySelectorAll('[data-listing]').forEach(function (root) {
    var form = root.querySelector('[data-filters]');
    var cards = Array.prototype.slice.call(root.querySelectorAll('[data-cards] > .card'));
    var count = root.querySelector('[data-count]');
    var empty = root.querySelector('[data-empty]');
    if (!form) return;
    var selects = Array.prototype.slice.call(form.querySelectorAll('select[data-filter]'));

    function apply() {
      var shown = 0;
      cards.forEach(function (card) {
        var ok = selects.every(function (s) {
          if (!s.value) return true;
          var have = (card.getAttribute('data-' + s.getAttribute('data-filter')) || '').split(/\s+/);
          return have.indexOf(s.value) !== -1;
        });
        card.hidden = !ok;
        if (ok) shown++;
      });
      if (count) count.textContent = shown;
      if (empty) empty.hidden = shown !== 0;
      var p = new URLSearchParams();
      selects.forEach(function (s) { if (s.value) p.set(s.getAttribute('data-filter'), s.value); });
      var qs = p.toString();
      try { history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '')); } catch (e) {}
    }
    var params = new URLSearchParams(location.search);
    selects.forEach(function (s) {
      var v = params.get(s.getAttribute('data-filter'));
      if (v && Array.prototype.some.call(s.options, function (o) { return o.value === v; })) s.value = v;
      s.addEventListener('change', apply);
    });
    form.addEventListener('reset', function () { setTimeout(apply, 0); });
    apply();
  });

  // ---- glossary filter ----
  var gf = document.querySelector('[data-glossary-filter]');
  if (gf) {
    var entries = Array.prototype.slice.call(document.querySelectorAll('.gl-entry'));
    var groups = Array.prototype.slice.call(document.querySelectorAll('.letter-group'));
    var none = document.querySelector('[data-glossary-empty]');
    gf.addEventListener('input', function () {
      var q = gf.value.trim().toLocaleLowerCase('sl');
      entries.forEach(function (e) {
        var text = e.textContent.toLocaleLowerCase('sl');
        e.hidden = q !== '' && text.indexOf(q) === -1;
      });
      var any = false;
      groups.forEach(function (g) {
        var vis = g.querySelectorAll('.gl-entry:not([hidden])').length > 0;
        g.hidden = !vis;
        if (vis) any = true;
      });
      if (none) none.hidden = any;
    });
  }
})();
