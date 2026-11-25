(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  Array.prototype.forEach.call(document.querySelectorAll('.cmp'), function (fig) {
    var range = fig.querySelector('.range');
    var set = function () { fig.style.setProperty('--pos', range.value + '%'); };
    range.addEventListener('input', set);
    set();
  });
  var box = document.getElementById('lightbox');
  var img = document.getElementById('lb-img');
  var cap = document.getElementById('lb-cap');
  var opener = null;
  function open(btn) {
    opener = btn;
    img.src = btn.getAttribute('data-full');
    img.alt = btn.querySelector('img').alt;
    cap.textContent = btn.getAttribute('data-cap') || '';
    box.hidden = false;
    box.querySelector('.lb-close').focus();
  }
  function close() {
    box.hidden = true;
    img.removeAttribute('src');
    if (opener) { opener.focus(); }
  }
  Array.prototype.forEach.call(document.querySelectorAll('.thumb'), function (b) {
    b.addEventListener('click', function () { open(b); });
    b.setAttribute('role', 'button');
    b.setAttribute('tabindex', '0');
    b.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(b); }
    });
  });
  box.addEventListener('click', function (e) { if (e.target === box) { close(); } });
  box.querySelector('.lb-close').addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !box.hidden) { close(); }
  });
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) { var p = v.play(); if (p && p.catch) { p.catch(function () {}); } } else { v.pause(); }
      });
    }, { threshold: 0.4 });
    Array.prototype.forEach.call(document.querySelectorAll('video'), function (v) { io.observe(v); });
  }
  if (location.search.indexOf('check') !== -1) {
    var out = document.createElement('div');
    out.id = 'check-width';
    out.hidden = true;
    out.textContent = String(document.documentElement.scrollWidth) + '/' + String(window.innerWidth) + '/' + String(document.documentElement.scrollHeight);
    document.body.appendChild(out);
  }
}());
