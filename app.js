'use strict';

/* ---------- Data (frontend sample data only) ---------- */
const IMG = 'https://image.tmdb.org/t/p/';
const M = (id, t, y, p, b, q, r, g, d, extra = {}) => ({ id, t, y, p, b, q, r, g, d, type: 'movie', ...extra });
const S = (id, t, y, p, b, r, g, d, season, ep, extra = {}) => ({ id, t, y, p, b, r, g, d, season, ep, q: 'HD', type: 'series', ...extra });

const DB = [
  M('dune2', 'Dune: Part Two', 2024, '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', '/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg', '4K', 8.5, 'Sci-Fi', 'Paul Atreides unites with the Fremen to avenge his family and prevent a terrible future only he can foresee.'),
  M('oppen', 'Oppenheimer', 2023, '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', '/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg', 'HD', 8.3, 'Drama', 'The story of J. Robert Oppenheimer and the race to build the atomic bomb.'),
  M('dpwl', 'Deadpool & Wolverine', 2024, '/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg', '/yDHYTfA3R0jFYba4jxDMItPxOvO.jpg', 'HD', 7.6, 'Action', 'A reluctant Wade Wilson teams up with a reluctant Wolverine to save his universe.'),
  M('inside2', 'Inside Out 2', 2024, '/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg', '/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg', 'HD', 7.6, 'Comedy', 'Riley turns thirteen and a wave of brand new, unexpected emotions arrives at headquarters.'),
  M('avatar', 'Avatar: The Way of Water', 2022, '/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', '/8rpDcsfLJypbO6vREc0547VKqEv.jpg', 'HD', 7.6, 'Adventure', 'Jake Sully and Neytiri protect their family on the reef-lined waters of Pandora.'),
  M('batman', 'The Batman', 2022, '/74xTEgt7R36Fpooo50r9T25onhq.jpg', '/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg', 'HD', 7.8, 'Crime', 'Gotham\u2019s vigilante hunts a serial killer who targets the city\u2019s elite.'),
  M('inter', 'Interstellar', 2014, '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', '/xJHokMbljvjADYdit5fK5VQsXEG.jpg', 'HD', 8.7, 'Sci-Fi', 'Explorers travel through a wormhole in search of a new home for humanity.'),
  M('tdk', 'The Dark Knight', 2008, '/qJ2tW6WMUDux911r6m7haRef0WH.jpg', '/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg', 'HD', 9.0, 'Thriller', 'Batman faces the Joker, a criminal mastermind who plunges Gotham into chaos.'),
  M('spider', 'Spider-Man: Across the Spider-Verse', 2023, '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg', '/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg', 'HD', 8.4, 'Adventure', 'Miles Morales is catapulted across the Multiverse and meets a team of Spider-People.'),
  M('topgun', 'Top Gun: Maverick', 2022, '/62HCnUTziyWcpDaBO2i1DX17ljH.jpg', '/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg', 'HD', 8.2, 'Action', 'After thirty years, Maverick trains a new detachment of Top Gun graduates for a dangerous mission.'),
  M('barbie', 'Barbie', 2023, '/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg', '/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg', 'HD', 6.8, 'Comedy', 'Barbie leaves Barbieland for the real world and discovers what it means to be human.'),
  M('guard3', 'Guardians of the Galaxy Vol. 3', 2023, '/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg', '/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg', 'HD', 7.9, 'Action', 'The Guardians rally to protect one of their own in a final mission.'),
  M('pushpa', 'Pushpa 2: The Rule', 2024, '/', '/', 'HD', 7.0, 'Action', 'Pushpa Raj expands his red sandalwood empire while a rival closes in.', { cat: 'in' }),
  M('kalki', 'Kalki 2898 AD', 2024, '/', '/', 'HD', 6.8, 'Sci-Fi', 'A modern avatar of Vishnu is reborn in a dystopian future.', { cat: 'in' }),
  M('jawan', 'Jawan', 2023, '/', '/', 'HD', 7.0, 'Thriller', 'A man driven by a personal vendetta sets out to right the wrongs of society.', { cat: 'in' }),
  M('rrr', 'RRR', 2022, '/', '/', 'HD', 7.8, 'Action', 'Two legendary revolutionaries join forces against the British Raj.', { cat: 'in' }),
  M('kdrama1', 'Crash Landing on You', 2019, '/', '/', 'HD', 8.7, 'Romance', 'A South Korean heiress paraglides into North Korea and meets an army officer.', { cat: 'kr', type: 'series' }),
  M('kdrama2', 'Hometown Cha-Cha-Cha', 2021, '/', '/', 'HD', 8.5, 'Romance', 'A dentist relocates to a seaside village and meets a jack-of-all-trades.', { cat: 'kr', type: 'series' }),
  M('kdrama3', 'Vincenzo', 2021, '/', '/', 'HD', 8.4, 'Crime', 'A Korean-Italian mafia lawyer returns to Korea and takes on a corrupt conglomerate.', { cat: 'kr', type: 'series' }),
  M('kdrama4', 'Goblin', 2016, '/', '/', 'HD', 8.6, 'Romance', 'An immortal goblin searches for his bride to end his endless life.', { cat: 'kr', type: 'series' }),
  M('up1', 'Avatar: Fire and Ash', 2026, '/', '/', 'SOON', 0, 'Adventure', 'The next chapter of the Pandora saga.', { cat: 'up' }),
  M('up2', 'The Odyssey', 2026, '/', '/', 'SOON', 0, 'Adventure', 'An epic retelling of the journey home from Troy.', { cat: 'up' }),
  M('up3', 'Dune: Part Three', 2026, '/', '/', 'SOON', 0, 'Sci-Fi', 'Paul faces the consequences of his rise to power.', { cat: 'up' }),
  M('up4', 'Toy Story 5', 2026, '/', '/', 'SOON', 0, 'Comedy', 'Woody, Buzz and the gang meet a new kind of toy.', { cat: 'up' }),
  S('bb', 'Breaking Bad', 2008, '/ggFHVNu6YYI5L9pCfOacjizRGt.jpg', '/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg', 9.5, 'Crime', 'A chemistry teacher turned manufacturer builds a drug empire.', 5, 16),
  S('st', 'Stranger Things', 2016, '/49WJfeN0moxb9IPfGn8AIqMGskD.jpg', '/56v2KjBlU4XaOv9rVYEQypROD7P.jpg', 8.7, 'Sci-Fi', 'A small town uncovers secrets involving a parallel dimension.', 5, 2),
  S('got', 'Game of Thrones', 2011, '/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg', '/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg', 9.2, 'Adventure', 'Noble families wage war for control of the Iron Throne.', 8, 6),
  S('boys', 'The Boys', 2019, '/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg', '/mGVrXeIjyecj6TKmwPVpHlscEmw.jpg', 8.7, 'Action', 'Vigilantes take on corrupt superheroes who abuse their powers.', 4, 8),
  S('squid', 'Squid Game', 2021, '/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg', '/2meX1nMdScFOoV4370rqHWKmXhY.jpg', 8.0, 'Thriller', 'Players risk their lives in deadly children\u2019s games for a massive prize.', 3, 6, { cat: 'kr' }),
  S('heist', 'Money Heist', 2017, '/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg', '/gFZriCkpJYsApPZEF3jhxL4yLzG.jpg', 8.2, 'Crime', 'A criminal mastermind recruits eight thieves for an ambitious heist.', 5, 10),
  S('wed', 'Wednesday', 2022, '/9PFonBhy4cQy7Jz20NpMygczOkv.jpg', '/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg', 8.1, 'Comedy', 'Wednesday Addams investigates a murder mystery at Nevermore Academy.', 2, 8)
];
const byId = Object.fromEntries(DB.map(x => [x.id, x]));
const HERO = ['dune2', 'oppen', 'dpwl', 'st'];
const TRENDING = ['dune2', 'dpwl', 'inside2', 'oppen', 'avatar', 'batman', 'barbie', 'topgun'];
const CONTINUE = [
  { id: 'inter', pct: 64, info: '1h 49m left' },
  { id: 'st', pct: 38, info: 'S5 · E1 · 22m left' },
  { id: 'bb', pct: 82, info: 'S5 · E14 · 9m left' },
  { id: 'tdk', pct: 21, info: '2h 02m left' }
];
const LATEST = ['dpwl', 'inside2', 'dune2', 'guard3', 'spider', 'topgun', 'avatar', 'barbie', 'batman', 'oppen', 'inter', 'tdk'];
const SERIES = ['st', 'boys', 'wed', 'squid', 'heist', 'got', 'bb'];
const CATEGORIES = [
  { title: 'Popular movies', ids: ['tdk', 'inter', 'oppen', 'spider', 'topgun', 'batman'] },
  { title: 'Korean drama', ids: ['kdrama1', 'kdrama2', 'kdrama3', 'kdrama4', 'squid'] },
  { title: 'Indian movies', ids: ['pushpa', 'kalki', 'jawan', 'rrr'] },
  { title: 'Latest episodes', ids: ['st', 'boys', 'wed', 'squid', 'heist'], episodes: true },
  { title: 'Upcoming movies', ids: ['up1', 'up2', 'up3', 'up4'] },
  { title: 'Recommended for you', ids: ['guard3', 'barbie', 'avatar', 'dpwl', 'inside2', 'dune2'] }
];
const GENRES = ['All', 'Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Horror', 'Romance', 'Thriller', 'Sci-Fi'];

/* ---------- Helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const hasImg = p => p && p.length > 1;
const ICON = {
  heart: '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-9-9.2C1.8 7.4 4 4.5 7 4.5c2 0 3.6 1 5 3 1.4-2 3-3 5-3 3 0 5.200 2.900 4 6.300-2 4.800-9 9.200-9 9.200z"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path d="M7 4.500v15l13-7.500z"/></svg>',
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.500v.01"/></svg>'
};
const watchlist = new Set();
let toastTimer;

function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

function pic(path, size, alt) {
  return hasImg(path)
    ? `<img src="${IMG}${size}${path}" alt="${alt}" loading="lazy" onerror="this.remove()">`
    : '';
}

function badges(it, opts = {}) {
  const out = [];
  if (opts.isNew) out.push('<span class="badge b-new">NEW</span>');
  if (opts.season) out.push(`<span class="badge b-s">S${it.season}</span>`);
  out.push(`<span class="badge ${it.q === 'HD' ? 'b-hd' : 'b-q'}">${it.q}</span>`);
  if (opts.sub) out.push('<span class="badge b-sub">SINHALA SUB</span>');
  if (opts.ep) out.push(`<span class="badge b-ep">EP ${it.ep}</span>`);
  return out.join('');
}

function card(it, opts = {}) {
  const sub = opts.episodes ? `S${it.season} · E${it.ep}` : (it.type === 'series' && it.season ? `Season ${it.season} · ${it.y}` : it.y);
  const on = watchlist.has(it.id) ? ' on' : '';
  return `<article class="card" data-id="${it.id}" tabindex="0" role="button" aria-label="${it.t}">
    ${opts.rank ? `<span class="num" aria-hidden="true">${opts.rank}</span>` : ''}
    <div class="poster"><span class="ph">${it.t}</span>${pic(it.p, 'w342', it.t)}${badges(it, opts)}
      <button class="wl${on}" data-wl="${it.id}" aria-label="Add ${it.t} to watchlist" aria-pressed="${!!on}">${ICON.heart}</button></div>
    <h3>${it.t}</h3><small>${sub}</small></article>`;
}

function cwCard(c) {
  const it = byId[c.id];
  return `<article class="card cw" data-id="${it.id}" tabindex="0" role="button" aria-label="Resume ${it.t}">
    <div class="thumb">${pic(it.b, 'w500', it.t)}<span class="play">${ICON.play}</span>
      <div class="bar"><i style="width:${c.pct}%"></i></div></div>
    <h3>${it.t}</h3><small>${c.info}</small></article>`;
}

/* ---------- Renderers ---------- */
const ids = list => list.map(i => byId[i]);

function renderHero() {
  $('#slides').innerHTML = HERO.map((id, i) => {
    const m = byId[id];
    return `<div class="slide${i ? '' : ' on'}" data-i="${i}"><div class="bg">${pic(m.b, 'w1280', m.t)}</div>
      <div class="copy"><span class="now">NOW SHOWING</span><h1>${m.t}</h1>
      <div class="meta"><span>${m.y}</span><span class="imdb">IMDb ${m.r.toFixed(1)}</span><span class="tag">${m.g}</span><span class="tag">${m.q}</span></div>
      <p>${m.d}</p>
      <div class="btns"><button class="btn p" data-watch="${m.id}">${ICON.play} Watch now</button>
      <button class="btn g" data-id="${m.id}">${ICON.info} Details</button></div></div></div>`;
  }).join('');
  $('#dots').innerHTML = HERO.map((_, i) => `<button class="${i ? '' : 'on'}" role="tab" aria-label="Slide ${i + 1}" data-dot="${i}"></button>`).join('');
}

function renderSections() {
  $('#trendingRow').classList.add('rank');
  $('#trendingRow').innerHTML = ids(TRENDING).map((m, i) => card(m, { rank: i + 1, isNew: i < 3 })).join('');
  $('#continueRow').classList.add('wide');
  $('#continueRow').innerHTML = CONTINUE.map(cwCard).join('');
  $('#seriesRow').innerHTML = ids(SERIES).map((m, i) => card(m, { season: true, ep: true, isNew: i < 2 })).join('');
  $('#categories').innerHTML = CATEGORIES.map(c => `<section class="sec"><div class="sec-h"><h2>${c.title}</h2><a href="#" class="more" data-more>See all</a></div>
    <div class="row">${ids(c.ids).map(m => card(m, { episodes: c.episodes, ep: c.episodes, sub: !c.episodes && m.q !== 'SOON', isNew: c.title === 'Upcoming movies' })).join('')}</div></section>`).join('');
  renderGrid('All');
}

function renderGrid(genre) {
  const list = ids(LATEST).filter(m => genre === 'All' || m.g === genre);
  $('#latestGrid').innerHTML = list.length
    ? list.map((m, i) => card(m, { sub: true, isNew: i < 3 })).join('')
    : `<p class="empty" style="grid-column:1/-1">No ${genre} movies yet. Try another genre.</p>`;
}

function renderGenres() {
  $('#genres').innerHTML = GENRES.map((g, i) => `<button class="chip${i ? '' : ' on'}" data-genre="${g}">${g}</button>`).join('');
}

/* ---------- Hero slider ---------- */
const slider = {
  i: 0, timer: null, startX: 0,
  go(n) {
    const slides = $$('.slide'), dots = $$('#dots button');
    this.i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('on', k === this.i));
    dots.forEach((d, k) => d.classList.toggle('on', k === this.i));
    this.auto();
  },
  auto() {
    clearInterval(this.timer);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) this.timer = setInterval(() => this.go(this.i + 1), 6500);
  },
  init() {
    const hero = $('#hero');
    $('#dots').addEventListener('click', e => { const d = e.target.closest('[data-dot]'); if (d) this.go(+d.dataset.dot); });
    hero.addEventListener('touchstart', e => { this.startX = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - this.startX;
      if (Math.abs(dx) > 50) this.go(this.i + (dx < 0 ? 1 : -1));
    });
    hero.addEventListener('mouseenter', () => clearInterval(this.timer));
    hero.addEventListener('mouseleave', () => this.auto());
    this.auto();
  }
};

/* ---------- Overlays ---------- */
function openLayer(sel) { $(sel).hidden = false; document.body.style.overflow = 'hidden'; }
function closeLayers() {
  ['#sheet', '#drawer', '#search'].forEach(s => { $(s).hidden = true; });
  document.body.style.overflow = '';
  setTab(currentTab());
}

function openDetails(id) {
  const m = byId[id];
  if (!m) return;
  const on = watchlist.has(id);
  $('#sheet .sheet').innerHTML = `<div class="back">${pic(m.b || m.p, 'w780', m.t)}</div>
    <button class="close-x" data-close aria-label="Close">✕</button>
    <div class="in"><h2 id="sheetTitle">${m.t}</h2>
    <div class="meta"><span>${m.y}</span>${m.r ? `<span class="imdb">IMDb ${m.r.toFixed(1)}</span>` : ''}<span class="tag">${m.g}</span><span class="tag">${m.q}</span><span class="tag">Sinhala sub</span></div>
    <p>${m.d}</p>
    <div class="btns"><button class="btn p" data-watch="${id}">${ICON.play} ${m.q === 'SOON' ? 'Remind me' : 'Watch now'}</button>
    <button class="btn g" data-wl="${id}" id="sheetWl">${on ? '✓ In watchlist' : '+ Watchlist'}</button></div></div>`;
  openLayer('#sheet');
}

function renderSearch(q = '') {
  const term = q.trim().toLowerCase();
  const body = $('#searchBody');
  if (!term) {
    body.innerHTML = `<h3>Browse by genre</h3><div class="tags">${GENRES.slice(1).map(g => `<button class="chip" data-q="${g}">${g}</button>`).join('')}</div>
      <h3>Popular searches</h3><div class="tags">${['Dune', 'Stranger Things', 'Korean drama', 'Batman', 'Pushpa'].map(g => `<button class="chip" data-q="${g}">${g}</button>`).join('')}</div>`;
    return;
  }
  const hits = DB.filter(m => (m.t + ' ' + m.g + ' ' + (m.cat === 'kr' ? 'korean drama' : '') + (m.cat === 'in' ? ' indian' : '') + ' ' + m.y).toLowerCase().includes(term));
  body.innerHTML = hits.length
    ? `<h3>${hits.length} result${hits.length > 1 ? 's' : ''}</h3><div class="res">${hits.map(m => card(m, { sub: true })).join('')}</div>`
    : `<p class="empty">Nothing found for \u201c${q.replace(/</g, '&lt;')}\u201d.<br>Check the spelling or try a genre.</p>`;
}

function openSearch(q = '') {
  openLayer('#search');
  const input = $('#searchInput');
  input.value = q;
  renderSearch(q);
  setTimeout(() => input.focus(), 50);
}

/* ---------- Navigation ---------- */
const tabTargets = { home: '#home', movies: '#movies', series: '#series' };
function currentTab() { return $('#bottom .active')?.dataset.tab || 'home'; }
function setTab(t) {
  $$('#bottom button').forEach(b => b.classList.toggle('active', b.dataset.tab === t));
  $$('.top-nav a').forEach(a => a.classList.toggle('active', a.dataset.nav === t));
}
function goTo(t) {
  if (t === 'search') return openSearch();
  if (t === 'profile') return openLayer('#drawer');
  setTab(t);
  if (t === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
  else document.querySelector(tabTargets[t]).scrollIntoView({ behavior: 'smooth' });
}

function toggleWatchlist(id) {
  watchlist.has(id) ? watchlist.delete(id) : watchlist.add(id);
  const on = watchlist.has(id);
  $$(`[data-wl="${id}"]`).forEach(b => {
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', on);
    if (b.id === 'sheetWl') b.textContent = on ? '✓ In watchlist' : '+ Watchlist';
  });
  $('#wlCount').textContent = watchlist.size;
  toast(on ? `Added ${byId[id].t} to your watchlist` : `Removed ${byId[id].t} from your watchlist`);
}

function bindEvents() {
  document.addEventListener('click', e => {
    const t = e.target;
    const wl = t.closest('[data-wl]');
    if (wl) { e.stopPropagation(); return toggleWatchlist(wl.dataset.wl); }
    const watch = t.closest('[data-watch]');
    if (watch) { const m = byId[watch.dataset.watch]; closeLayers(); return toast(`Player for ${m.t} arrives in the next stage`); }
    const nav = t.closest('[data-nav]');
    if (nav) { e.preventDefault(); $('#notif').hidden = true; if (t.closest('[data-close]')) closeLayers(); return goTo(nav.dataset.nav); }
    const tab = t.closest('[data-tab]');
    if (tab) return goTo(tab.dataset.tab);
    const genre = t.closest('[data-genre]');
    if (genre) {
      $$('#genres .chip').forEach(c => c.classList.toggle('on', c === genre));
      renderGrid(genre.dataset.genre);
      return document.querySelector('#movies').scrollIntoView({ behavior: 'smooth' });
    }
    const q = t.closest('[data-q]');
    if (q) { $('#searchInput').value = q.dataset.q; return renderSearch(q.dataset.q); }
    if (t.closest('[data-more]')) { e.preventDefault(); return toast('Full listings arrive in the next stage'); }
    if (t.closest('[data-watchlist]')) { e.preventDefault(); closeLayers(); return toast(watchlist.size ? `${watchlist.size} title(s) in your watchlist` : 'Your watchlist is empty. Tap the heart on any poster.'); }
    const msg = t.closest('[data-toast]');
    if (msg) { e.preventDefault(); closeLayers(); return toast(msg.dataset.toast); }
    if (t.closest('[data-close]')) return closeLayers();
    const c = t.closest('.card[data-id], .btn[data-id]');
    if (c) { closeLayers(); return openDetails(c.dataset.id); }
    if (!t.closest('#notif, #bellBtn')) $('#notif').hidden = true;
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeLayers(); $('#notif').hidden = true; }
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.card')) { e.preventDefault(); openDetails(e.target.dataset.id); }
  });

  $('#searchBtn').addEventListener('click', () => openSearch());
  $('#searchClose').addEventListener('click', closeLayers);
  $('#searchInput').addEventListener('input', e => renderSearch(e.target.value));
  $('#bellBtn').addEventListener('click', e => { e.stopPropagation(); $('#notif').hidden = !$('#notif').hidden; $('#bellBtn .dot').hidden = true; });
  $('#profileBtn').addEventListener('click', () => openLayer('#drawer'));

  const header = $('#header');
  const sections = ['home', 'movies', 'series'].map(k => [k, document.querySelector(tabTargets[k])]);
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', scrollY > 40);
    let cur = 'home';
    sections.forEach(([k, el]) => { if (k !== 'home' && el.getBoundingClientRect().top < innerHeight * .45) cur = k; });
    if (document.body.style.overflow !== 'hidden') setTab(cur);
  }, { passive: true });
}

/* ---------- Init ---------- */
function init() {
  renderHero();
  renderGenres();
  renderSections();
  slider.init();
  bindEvents();
}
document.addEventListener('DOMContentLoaded', init);
