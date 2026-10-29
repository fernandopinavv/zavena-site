/*
 * Zavena: comportamento da página inicial. Sem dependências.
 * Revelação ao rolar, cabeçalho fixo, barra de progresso, link ativo e inclinação do celular.
 * Sem este arquivo a página continua completa e legível.
 */
(function () {
  'use strict';
  window.__zv = 1; // sinaliza ao fallback do HTML que o script carregou

  var doc = document;
  var root = doc.documentElement;
  var header = doc.querySelector('.site-header');
  var bar = doc.querySelector('.progress');
  var reduced = root.classList.contains('motion-reduced');

  function motionOff() { return root.classList.contains('motion-off'); }

  /* Revelação ao rolar */
  var targets = [].slice.call(doc.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('is-visible'); });
  }

  /* Cabeçalho, progresso e link ativo */
  var spyLinks = [].slice.call(doc.querySelectorAll('.site-nav a[href^="#"]'));
  var spy = spyLinks.map(function (a) { return { a: a, el: doc.getElementById(a.getAttribute('href').slice(1)) }; })
    .filter(function (x) { return x.el; });
  var ticking = false;

  function onScroll() {
    ticking = false;
    var y = window.pageYOffset || root.scrollTop;
    var max = root.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle('is-scrolled', y > 24);
    if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
    var current = null;
    spy.forEach(function (s) { if (s.el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = s.a; });
    spyLinks.forEach(function (a) {
      if (a === current) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }
  function request() { if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); } }
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  onScroll();

  /* Inclinação suave do celular reservado (só com mouse e sem movimento reduzido) */
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (fine && !reduced) {
    [].slice.call(doc.querySelectorAll('.shot')).forEach(function (shot) {
      var frame = shot.querySelector('.shot__frame');
      if (!frame) return;
      shot.addEventListener('pointermove', function (e) {
        if (motionOff()) return;
        var r = shot.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        frame.style.setProperty('--ry', (px * 10).toFixed(2) + 'deg');
        frame.style.setProperty('--rx', (-py * 8).toFixed(2) + 'deg');
      });
      shot.addEventListener('pointerleave', function () {
        frame.style.setProperty('--rx', '0deg');
        frame.style.setProperty('--ry', '0deg');
      });
    });
  }
})();
