document.documentElement.classList.add('has-js');

document.addEventListener('DOMContentLoaded', function () {
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Ticker dinámico con los artículos reales (nada inventado) ---
  var tickerTrack = document.getElementById('ticker-track');
  var articleRows = document.querySelectorAll('.article-row');
  if (tickerTrack && articleRows.length) {
    var buildTickerItem = function (row) {
      var titleEl = row.querySelector('.article-row__title');
      var metaEl = row.querySelector('.article-row__meta');
      var category = '';
      if (metaEl) {
        var parts = metaEl.innerHTML.split(/<br\s*\/?>/i);
        category = parts.length > 1 ? parts[parts.length - 1].replace(/<[^>]+>/g, '').trim() : '';
      }
      var span = document.createElement('span');
      span.className = 'ticker__item';
      var b = document.createElement('b');
      b.textContent = category.toUpperCase();
      span.appendChild(b);
      span.appendChild(document.createTextNode(' ' + (titleEl ? titleEl.textContent.trim() : '')));
      return span;
    };
    var tickerItems = Array.prototype.map.call(articleRows, buildTickerItem);
    // duplicado para el loop continuo
    tickerItems.concat(tickerItems.map(function (el) { return el.cloneNode(true); })).forEach(function (el) {
      tickerTrack.appendChild(el);
    });
  }

  // --- Scroll reveal ---
  var revealEls = document.querySelectorAll('[data-reveal], [data-reveal-list]');
  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  // --- Suma automática de estadísticas (a partir de stats.js) ---
  if (window.BALANCIO_STATS && Array.isArray(window.BALANCIO_STATS)) {
    var totals = window.BALANCIO_STATS.reduce(function (acc, item) {
      acc.apps += item.apps || 0;
      acc.neobancos += item.neobancos || 0;
      acc.comisionesOcultas += item.comisionesOcultas || 0;
      acc.recomendacionesPago += item.recomendacionesPago || 0;
      return acc;
    }, { apps: 0, neobancos: 0, comisionesOcultas: 0, recomendacionesPago: 0 });

    var setStat = function (id, value) {
      var el = document.getElementById(id);
      if (el) el.setAttribute('data-count-to', value);
    };
    setStat('stat-apps', totals.apps);
    setStat('stat-neobancos', totals.neobancos);
    setStat('stat-comisiones', totals.comisionesOcultas);
    setStat('stat-recomendaciones', totals.recomendacionesPago);
  }

  // --- Animated counters (ledger card stats) — se animan al cargar, sin depender del scroll ---
  var counters = document.querySelectorAll('[data-count-to]');
  var animateCount = function (el) {
    var target = parseInt(el.getAttribute('data-count-to'), 10) || 0;
    if (prefersReduced) {
      el.textContent = target;
      return;
    }
    var duration = 900;
    var start = null;
    var step = function (ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  counters.forEach(animateCount);
});
