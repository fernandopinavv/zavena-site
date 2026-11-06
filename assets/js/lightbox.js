/*
 * Zavena: ampliação das capturas do aplicativo.
 * Aprimoramento progressivo: sem este arquivo (ou sem <dialog>) as imagens continuam estáticas e a página completa.
 * Cada captura vira um botão; o modal usa <dialog>, que já traz foco preso, Escape e inércia do fundo.
 * A imagem grande só é pedida ao abrir (não pesa no carregamento).
 */
(function () {
  'use strict';
  if (typeof HTMLDialogElement === 'undefined' || typeof document.createElement('dialog').showModal !== 'function') return;

  var doc = document;
  var root = doc.documentElement;
  var dlg = null, img, cap, ultimo = null;

  /* Maior versão declarada no srcset (a captura de 1080 px) */
  function maior(i) {
    var cand = (i.getAttribute('srcset') || '').split(',').map(function (s) { return s.trim().split(/\s+/); }).filter(function (c) { return c[0]; });
    if (!cand.length) return i.currentSrc || i.src;
    return cand.reduce(function (a, b) { return parseInt(b[1], 10) > parseInt(a[1], 10) ? b : a; })[0];
  }

  function criar() {
    dlg = doc.createElement('dialog');
    dlg.className = 'lightbox';
    dlg.innerHTML =
      '<button type="button" class="lightbox__close" aria-label="Fechar captura ampliada"><svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M5 5l10 10M15 5L5 15"/></svg></button>' +
      '<div class="lightbox__scroll"><figure class="lightbox__fig"><img class="lightbox__img" alt="" width="540" height="1000"><figcaption class="lightbox__cap"></figcaption></figure></div>';
    doc.body.appendChild(dlg);
    img = dlg.querySelector('.lightbox__img');
    cap = dlg.querySelector('.lightbox__cap');
    dlg.querySelector('.lightbox__close').addEventListener('click', function () { dlg.close(); });
    /* Clique fora da imagem (no fundo escuro ou na área de rolagem vazia) fecha */
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg || e.target.classList.contains('lightbox__scroll')) dlg.close();
    });
    dlg.addEventListener('close', function () {
      root.classList.remove('lightbox-open');
      img.removeAttribute('src');
      if (ultimo) { ultimo.focus(); ultimo = null; }
    });
  }

  function abrir(botao, foto, legenda) {
    if (!dlg) criar();
    var alt = foto.getAttribute('alt') || '';
    dlg.setAttribute('aria-label', 'Captura ampliada: ' + alt);
    img.alt = alt;
    img.src = maior(foto);
    cap.textContent = legenda || '';
    ultimo = botao;
    root.classList.add('lightbox-open');
    dlg.showModal();
    dlg.querySelector('.lightbox__scroll').scrollTop = 0;
  }

  [].slice.call(doc.querySelectorAll('.shot__frame--img')).forEach(function (frame) {
    var foto = frame.querySelector('img');
    if (!foto) return;
    var fig = frame.closest('.shot');
    var legenda = fig && fig.querySelector('figcaption') ? fig.querySelector('figcaption').textContent.trim() : '';
    var botao = doc.createElement('button');
    botao.type = 'button';
    botao.className = 'shot__zoom';
    botao.setAttribute('aria-haspopup', 'dialog');
    botao.setAttribute('aria-label', 'Ampliar captura: ' + (foto.getAttribute('alt') || ''));
    frame.insertBefore(botao, foto);
    botao.appendChild(foto);
    /* O ícone fica no canto da moldura (fora da tela), para nunca cobrir informações da captura */
    (fig || frame).insertAdjacentHTML('beforeend', '<span class="shot__zoom-icon" aria-hidden="true"><svg viewBox="0 0 20 20" focusable="false"><circle cx="8.5" cy="8.5" r="5"/><path d="M12.2 12.2L17 17M8.5 6.4v4.2M6.4 8.5h4.2"/></svg></span>');
    botao.addEventListener('click', function () { abrir(botao, foto, legenda); });
  });
})();
