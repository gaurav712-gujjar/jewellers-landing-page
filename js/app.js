/* ============================================================
   APP LOGIC — Raani Haar
   Reads from data/images.js and data/content.js (loaded first)
   and renders every dynamic section, then wires up the
   scroll / carousel / menu interactions.
   ============================================================ */

/* ---------- helpers ---------- */
function inr(n) { return "₹" + Math.round(n).toLocaleString('en-IN'); }
function goldPrice(w, mk) { return w * GOLD_RATE_PER_GRAM_22K * (1 + mk) * 1.03; }
function silverPrice(w, mk) { return w * SILVER_RATE_PER_GRAM_925 * (1 + mk) * 1.03; }

// neutral placeholder if an image URL ever fails to load
window.__RH_FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23EFE9DE'/%3E%3Ctext x='200' y='208' font-family='Georgia,serif' font-size='22' fill='%23A9793C' text-anchor='middle'%3ERaani Haar%3C/text%3E%3C/svg%3E";

const IMG_FALLBACK_ATTR = `onerror="this.onerror=null;this.src=window.__RH_FALLBACK"`;

/* ---------------- HERO ---------------- */
const heroTrack = document.getElementById('heroTrack');
const heroImgs = [...IMAGES.hero, ...IMAGES.hero]; // duplicated for seamless loop
heroTrack.innerHTML = heroImgs
  .map((src, i) => `<img src="${src}" alt="" ${i > 5 ? 'loading="lazy"' : ''} ${IMG_FALLBACK_ATTR}>`)
  .join('');

/* ---------------- CATEGORIES + MEGA MENU (text only) ---------------- */
const catScroll = document.getElementById('catScroll');
const megaMenu = document.getElementById('megaMenu');

CATEGORY_NAMES.forEach(name => {
  const id = 'cat-' + name.toLowerCase().replace(/[^a-z]+/g, '-');

  const item = document.createElement('div');
  item.className = 'cat-item';
  item.id = id;
  item.innerHTML = `<div class="cat-circle"><img src="${IMAGES.categories[name]}" alt="${name}" loading="lazy" ${IMG_FALLBACK_ATTR}></div><span>${name}</span>`;
  catScroll.appendChild(item);

  const mi = document.createElement('a');
  mi.href = '#' + id;
  mi.textContent = name;
  megaMenu.appendChild(mi);
});

/* ---------------- SHOP BY STYLE ---------------- */
const styleGrid = document.querySelector('#style .style-grid');
const styleCounts = {
  "Bridal Heritage": "142 pieces",
  "Everyday Light": "96 pieces",
  "Office Edit": "58 pieces",
  "Festive Glow": "120 pieces",
  "Quiet Minimal": "74 pieces"
};
Object.entries(IMAGES.style).forEach(([name, src]) => {
  const a = document.createElement('a');
  a.className = 'style-card reveal';
  a.href = '#bestsellers';
  a.innerHTML = `<img src="${src}" alt="${name}" loading="lazy" ${IMG_FALLBACK_ATTR}>
    <div class="style-label"><span class="name">${name}</span><span class="count">${styleCounts[name] || ''}</span></div>`;
  styleGrid.appendChild(a);
});

/* ---------------- PRODUCT CARDS ---------------- */
function productCard({ name, meta, price, img, tag, breakdown }) {
  const el = document.createElement('div');
  el.className = 'product-card reveal';
  el.innerHTML = `
    <div class="product-media">
      ${tag ? `<span class="tag">${tag}</span>` : ''}
      <img src="${img}" alt="${name}" loading="lazy" ${IMG_FALLBACK_ATTR}>
    </div>
    <div class="product-body">
      <div class="p-name">${name}</div>
      <div class="p-meta">${meta}</div>
      <div class="p-price-row">
        <span class="p-price">${inr(price)}</span>
        <span class="p-cta">View</span>
      </div>
      ${breakdown ? `<div class="p-break">${breakdown}</div>` : ''}
    </div>`;
  return el;
}

/* silver */
const silverGrid = document.getElementById('silverGrid');
silverProducts.forEach(p => silverGrid.appendChild(productCard({
  ...p,
  price: silverPrice(p.w, p.mk),
  img: IMAGES.silver[p.name],
  tag: "925 SILVER",
  breakdown: `${p.w}g × ₹${SILVER_RATE_PER_GRAM_925.toLocaleString('en-IN')} + ${Math.round(p.mk * 100)}% making + GST`
})));

/* gold */
const goldGrid = document.getElementById('goldGrid');
goldProducts.forEach(p => goldGrid.appendChild(productCard({
  ...p,
  price: goldPrice(p.w, p.mk),
  img: IMAGES.gold[p.name],
  tag: "22K GOLD",
  breakdown: `${p.w}g × ₹${GOLD_RATE_PER_GRAM_22K.toLocaleString('en-IN')} + ${Math.round(p.mk * 100)}% making + GST`
})));

/* diamonds */
const diamondGrid = document.getElementById('diamondGrid');
diamondProducts.forEach(p => diamondGrid.appendChild(productCard({
  ...p,
  img: IMAGES.diamonds[p.name],
  breakdown: "Stone + 18K setting + certification"
})));

/* artificial */
const artGrid = document.getElementById('artGrid');
artProducts.forEach(p => artGrid.appendChild(productCard({
  ...p, img: IMAGES.artificial[p.name], tag: "ARTIFICIAL"
})));

/* best sellers */
const bestGrid = document.getElementById('bestGrid');
bestProducts.forEach(p => {
  let price = p.price;
  let breakdown = '';
  if (p.gold) {
    price = goldPrice(p.w, p.mk);
    breakdown = `${p.w}g × ₹${GOLD_RATE_PER_GRAM_22K.toLocaleString('en-IN')} + ${Math.round(p.mk * 100)}% making + GST`;
  }
  if (p.silver) {
    price = silverPrice(p.w, p.mk);
    breakdown = `${p.w}g × ₹${SILVER_RATE_PER_GRAM_925.toLocaleString('en-IN')} + ${Math.round(p.mk * 100)}% making + GST`;
  }
  bestGrid.appendChild(productCard({
    ...p, price, breakdown, img: IMAGES.bestSellers[p.name], tag: "BEST SELLER"
  }));
});

/* ---------------- TRENDING LOOKS ---------------- */
const trendGrid = document.getElementById('trendGrid');
trendLooks.forEach(t => {
  const el = document.createElement('div');
  el.className = 'trend-card reveal';
  el.innerHTML = `<img src="${IMAGES.trending[t.title]}" alt="${t.title}" loading="lazy" ${IMG_FALLBACK_ATTR}>
    <div class="trend-info"><div class="t-title">${t.title}</div><div class="t-sub">${t.sub}</div></div>`;
  trendGrid.appendChild(el);
});

/* ---------------- REVIEWS ---------------- */
const reviewRow = document.getElementById('reviewRow');
reviews.forEach(r => {
  const el = document.createElement('div');
  el.className = 'review-card';
  el.innerHTML = `
    <div class="stars" aria-label="${r.stars} out of 5 stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
    <p class="review-text">${r.text}</p>
    <div class="review-who">
      <img src="${IMAGES.reviewAvatars[r.name]}" alt="" loading="lazy" ${IMG_FALLBACK_ATTR}>
      <div><div class="rn">${r.name}</div><div class="rl">${r.loc}</div></div>
    </div>`;
  reviewRow.appendChild(el);
});

/* ---------------- REVEAL SETUP ----------------
   Horizontal scrollers animate as a whole container, not per item —
   otherwise off-screen items never intersect and stay invisible. */
catScroll.classList.add('reveal');
reviewRow.classList.add('reveal');

/* ---------------- INTERACTIONS ---------------- */
const header = document.getElementById('siteHeader');
const heroSection = document.getElementById('hero');
const heroWrap = document.querySelector('.hero-track-wrap');

// one rAF-throttled scroll handler for both effects
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    header.classList.toggle('scrolled', window.scrollY > 40);

    const rect = heroSection.getBoundingClientRect();
    const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
    heroWrap.style.transform = `scale(${1 + progress * 0.16})`;

    ticking = false;
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in'), (i % 4) * 90);
      io.unobserve(entry.target);
    }
  });
}, { threshold: .15, rootMargin: "0px 0px -60px 0px" });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// reviews carousel
document.getElementById('revNext').addEventListener('click', () => reviewRow.scrollBy({ left: 390, behavior: 'smooth' }));
document.getElementById('revPrev').addEventListener('click', () => reviewRow.scrollBy({ left: -390, behavior: 'smooth' }));

// mobile menu
const nav = document.getElementById('primaryNav');
const hamburger = document.getElementById('hamburgerBtn');

hamburger.addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open');
  hamburger.setAttribute('aria-expanded', String(open));
});

// close the panel whenever a link inside it is tapped
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  document.body.classList.remove('nav-open');
  hamburger.setAttribute('aria-expanded', 'false');
}));

// reset if the viewport grows past the mobile breakpoint while open
window.addEventListener('resize', () => {
  if (window.innerWidth > 820 && document.body.classList.contains('nav-open')) {
    document.body.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});