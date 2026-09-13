/* ============================================================
   APP LOGIC — Raani Haar
   Reads from data/images.js and data/content.js (loaded first).
   Renders every section, runs the cart, wires up interactions.
   ============================================================ */

/* ---------------- helpers ---------------- */
function inr(n) { return "₹" + Math.round(n).toLocaleString('en-IN'); }
function goldPrice(w, mk) { return w * GOLD_RATE_PER_GRAM_22K * (1 + mk) * 1.03; }
function silverPrice(w, mk) { return w * SILVER_RATE_PER_GRAM_925 * (1 + mk) * 1.03; }
function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

window.__RH_FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23EFE9DE'/%3E%3Ctext x='200' y='208' font-family='Georgia,serif' font-size='22' fill='%23A9793C' text-anchor='middle'%3ERaani Haar%3C/text%3E%3C/svg%3E";
const IMG_FALLBACK_ATTR = `onerror="this.onerror=null;this.src=window.__RH_FALLBACK"`;

/* ============================================================
   CART STATE
   cart = { productId: quantity }
   CART_PRODUCTS = { productId: { name, meta, price, img } }
   ============================================================ */
const CART_PRODUCTS = {};
let cart = {};

try {
  cart = JSON.parse(localStorage.getItem('rh_cart') || '{}') || {};
} catch (e) { cart = {}; }

function saveCart() {
  try { localStorage.setItem('rh_cart', JSON.stringify(cart)); } catch (e) {}
}
function cartCount() {
  return Object.values(cart).reduce((a, b) => a + b, 0);
}
function cartTotal() {
  return Object.entries(cart)
    .filter(([id]) => CART_PRODUCTS[id])
    .reduce((sum, [id, qty]) => sum + CART_PRODUCTS[id].price * qty, 0);
}

/* ============================================================
   HERO
   ============================================================ */
const heroTrack = document.getElementById('heroTrack');
const heroImgs = [...IMAGES.hero, ...IMAGES.hero];
heroTrack.innerHTML = heroImgs
  .map((src, i) => `<img src="${src}" alt="" ${i > 5 ? 'loading="lazy"' : ''} ${IMG_FALLBACK_ATTR}>`)
  .join('');

/* ============================================================
   CATEGORIES + MEGA MENU (text only)
   ============================================================ */
const catScroll = document.getElementById('catScroll');
const megaMenu = document.getElementById('megaMenu');

CATEGORY_NAMES.forEach(name => {
  const id = 'cat-' + slug(name);

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

/* ============================================================
   SHOP BY STYLE
   ============================================================ */
const styleGrid = document.querySelector('#style .style-grid');
const styleCounts = {
  "Bridal Heritage": "142 pieces",
  "Everyday Light":  "96 pieces",
  "Office Edit":     "58 pieces",
  "Festive Glow":    "120 pieces",
  "Quiet Minimal":   "74 pieces"
};
Object.entries(IMAGES.style).forEach(([name, src]) => {
  const a = document.createElement('a');
  a.className = 'style-card reveal';
  a.href = '#bestsellers';
  a.innerHTML = `<img src="${src}" alt="${name}" loading="lazy" ${IMG_FALLBACK_ATTR}>
    <div class="style-label"><span class="name">${name}</span><span class="count">${styleCounts[name] || ''}</span></div>`;
  styleGrid.appendChild(a);
});

/* ============================================================
   PRODUCT CARDS
   ============================================================ */
function productCard({ id, name, meta, price, img, tag, breakdown }) {
  CART_PRODUCTS[id] = { name, meta, price, img };

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
      </div>
      ${breakdown ? `<div class="p-break">${breakdown}</div>` : ''}
      <div class="p-actions">
        <button class="p-add" data-add="${id}">Add to Cart</button>
        <button class="p-buy" data-buy="${id}">Buy Now</button>
      </div>
    </div>`;
  return el;
}

/* ---- silver ---- */
const silverGrid = document.getElementById('silverGrid');
silverProducts.forEach(p => silverGrid.appendChild(productCard({
  id: `silver-${slug(p.name)}`,
  ...p,
  price: silverPrice(p.w, p.mk),
  img: IMAGES.silver[p.name],
  tag: "925 SILVER",
  breakdown: `${p.w}g × ₹${SILVER_RATE_PER_GRAM_925.toLocaleString('en-IN')} + ${Math.round(p.mk * 100)}% making + GST`
})));

/* ---- gold ---- */
const goldGrid = document.getElementById('goldGrid');
goldProducts.forEach(p => goldGrid.appendChild(productCard({
  id: `gold-${slug(p.name)}`,
  ...p,
  price: goldPrice(p.w, p.mk),
  img: IMAGES.gold[p.name],
  tag: "22K GOLD",
  breakdown: `${p.w}g × ₹${GOLD_RATE_PER_GRAM_22K.toLocaleString('en-IN')} + ${Math.round(p.mk * 100)}% making + GST`
})));

/* ---- diamonds ---- */
const diamondGrid = document.getElementById('diamondGrid');
diamondProducts.forEach(p => diamondGrid.appendChild(productCard({
  id: `diamond-${slug(p.name)}`,
  ...p,
  img: IMAGES.diamonds[p.name],
  breakdown: "Stone + 18K setting + certification"
})));

/* ---- artificial ---- */
const artGrid = document.getElementById('artGrid');
artProducts.forEach(p => artGrid.appendChild(productCard({
  id: `art-${slug(p.name)}`,
  ...p,
  img: IMAGES.artificial[p.name],
  tag: "ARTIFICIAL"
})));

/* ---- best sellers ---- */
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
    id: `best-${slug(p.name)}`,
    ...p,
    price,
    breakdown,
    img: IMAGES.bestSellers[p.name],
    tag: "BEST SELLER"
  }));
});

/* ============================================================
   TRENDING
   ============================================================ */
const trendGrid = document.getElementById('trendGrid');
trendLooks.forEach(t => {
  const el = document.createElement('div');
  el.className = 'trend-card reveal';
  el.innerHTML = `<img src="${IMAGES.trending[t.title]}" alt="${t.title}" loading="lazy" ${IMG_FALLBACK_ATTR}>
    <div class="trend-info"><div class="t-title">${t.title}</div><div class="t-sub">${t.sub}</div></div>`;
  trendGrid.appendChild(el);
});

/* ============================================================
   REVIEWS
   ============================================================ */
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

/* reveal on the horizontal scrollers as whole containers */
catScroll.classList.add('reveal');
reviewRow.classList.add('reveal');

/* ============================================================
   CART — UI
   ============================================================ */
const cartDrawer   = document.getElementById('cartDrawer');
const cartBody     = document.getElementById('cartBody');
const cartFoot     = document.getElementById('cartFoot');
const cartBadge    = document.getElementById('cartBadge');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartView     = document.getElementById('cartView');
const checkoutView = document.getElementById('checkoutView');
const successView  = document.getElementById('successView');

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

function openCart() {
  document.body.classList.add('cart-open');
  document.body.classList.remove('nav-open');
  cartDrawer.setAttribute('aria-hidden', 'false');
  document.getElementById('hamburgerBtn')?.setAttribute('aria-expanded', 'false');
}
function closeCart() {
  document.body.classList.remove('cart-open');
  cartDrawer.setAttribute('aria-hidden', 'true');
  setTimeout(() => {
    cartView.hidden = false;
    checkoutView.hidden = true;
    successView.hidden = true;
  }, 450);
}

function renderCart() {
  const items = Object.entries(cart).filter(([id]) => CART_PRODUCTS[id]);
  const count = cartCount();

  cartBadge.textContent = count > 99 ? '99+' : count;
  cartBadge.classList.toggle('show', count > 0);

  if (!items.length) {
    cartBody.innerHTML = `
      <div class="cart-empty">
        <p>Your cart is empty.</p>
        <a href="#categories" class="cart-empty-link" data-close-cart>Browse categories</a>
      </div>`;
    cartFoot.hidden = true;
    return;
  }

  cartBody.innerHTML = items.map(([id, qty]) => {
    const p = CART_PRODUCTS[id];
    return `
      <div class="cart-item">
        <img src="${p.img}" alt="" ${IMG_FALLBACK_ATTR}>
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-meta">${p.meta || ''}</div>
          <div class="cart-item-row">
            <div class="qty-stepper">
              <button class="qty-btn" data-act="dec" data-id="${id}" aria-label="Decrease quantity">−</button>
              <span aria-live="polite">${qty}</span>
              <button class="qty-btn" data-act="inc" data-id="${id}" aria-label="Increase quantity">+</button>
            </div>
            <div class="cart-item-price">${inr(p.price * qty)}</div>
          </div>
        </div>
        <button class="cart-item-remove" data-act="rm" data-id="${id}" aria-label="Remove ${p.name}">&times;</button>
      </div>`;
  }).join('');

  cartFoot.hidden = false;
  cartSubtotal.textContent = inr(cartTotal());
}

function addToCart(id) {
  if (!CART_PRODUCTS[id]) return;
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  delete cart[id];
  saveCart();
  renderCart();
}

function setQty(id, qty) {
  if (qty <= 0) return removeFromCart(id);
  cart[id] = qty;
  saveCart();
  renderCart();
}

function goToCheckout() {
  if (!cartCount()) return;
  document.getElementById('checkoutCount').textContent = cartCount();
  document.getElementById('checkoutTotal').textContent = inr(cartTotal());
  cartView.hidden = true;
  successView.hidden = true;
  checkoutView.hidden = false;
  checkoutView.querySelector('input')?.focus();
}

/* ---- delegated clicks: add, buy now, cart internals ---- */
document.addEventListener('click', (e) => {
  const addBtn = e.target.closest('[data-add]');
  if (addBtn) {
    const id = addBtn.dataset.add;
    addToCart(id);
    showToast(`${CART_PRODUCTS[id].name} added to cart`);
    openCart();
    return;
  }

  const buyBtn = e.target.closest('[data-buy]');
  if (buyBtn) {
    const id = buyBtn.dataset.buy;
    if (!cart[id]) addToCart(id);
    openCart();
    // brief pause so the drawer finishes sliding in before swapping views
    setTimeout(goToCheckout, 260);
    return;
  }

  const actBtn = e.target.closest('[data-act]');
  if (actBtn) {
    const { act, id } = actBtn.dataset;
    if (act === 'inc') setQty(id, (cart[id] || 0) + 1);
    if (act === 'dec') setQty(id, (cart[id] || 0) - 1);
    if (act === 'rm')  removeFromCart(id);
    return;
  }

  if (e.target.closest('[data-close-cart]')) {
    closeCart();
  }
});

/* ---- open / close ---- */
document.getElementById('bagBtn').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('cart-open')) closeCart();
});

/* ============================================================
   CHECKOUT
   ============================================================ */
document.getElementById('checkoutBtn').addEventListener('click', goToCheckout);

document.getElementById('checkoutBack').addEventListener('click', () => {
  checkoutView.hidden = true;
  cartView.hidden = false;
});

document.getElementById('checkoutForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target).entries());
  const items = Object.entries(cart).filter(([id]) => CART_PRODUCTS[id]);

  const lines = [
    '*New Order — Raani Haar*',
    '',
    ...items.map(([id, qty]) => {
      const p = CART_PRODUCTS[id];
      return `${qty}× ${p.name} — ${inr(p.price * qty)}`;
    }),
    '',
    `*Total: ${inr(cartTotal())}*`,
    '',
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `City: ${data.city}`
  ];
  if (data.notes && data.notes.trim()) lines.push(`Notes: ${data.notes.trim()}`);

  const text = encodeURIComponent(lines.join('\n'));
  const num  = String(WHATSAPP_NUMBER || '').replace(/\D/g, '');

  if (num) {
    window.open(`https://wa.me/${num}?text=${text}`, '_blank', 'noopener');
  } else {
    navigator.clipboard?.writeText(lines.join('\n'));
    showToast('WhatsApp number not set — order copied to clipboard');
  }

  cart = {};
  saveCart();
  renderCart();
  e.target.reset();

  checkoutView.hidden = true;
  successView.hidden = false;
});

document.getElementById('successClose').addEventListener('click', closeCart);

/* ============================================================
   FLOATING WHATSAPP
   ============================================================ */
(function initWhatsAppFloat() {
  const num = String(WHATSAPP_NUMBER || '').replace(/\D/g, '');
  const el = document.getElementById('waFloat');
  if (!num) { el.style.display = 'none'; return; }
  el.href = `https://wa.me/${num}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
})();

/* ============================================================
   INTERACTIONS
   ============================================================ */
const header = document.getElementById('siteHeader');
const heroSection = document.getElementById('hero');
const heroWrap = document.querySelector('.hero-track-wrap');

let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    header.classList.toggle('scrolled', window.scrollY > 40);

    const rect = heroSection.getBoundingClientRect();
    const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
    heroWrap.style.transform = `scale(${1 + progress * 0.16})`;

    // hide the WhatsApp float when the cart or checkout is open
    if (document.body.classList.contains('cart-open')) {
      document.getElementById('waFloat').classList.remove('wa-in');
    } else {
      document.getElementById('waFloat').classList.toggle('wa-in', window.scrollY > 500);
    }

    ticking = false;
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* reveal on scroll */
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in'), (i % 4) * 90);
      io.unobserve(entry.target);
    }
  });
}, { threshold: .15, rootMargin: "0px 0px -60px 0px" });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* reviews carousel */
document.getElementById('revNext').addEventListener('click', () => reviewRow.scrollBy({ left: 390, behavior: 'smooth' }));
document.getElementById('revPrev').addEventListener('click', () => reviewRow.scrollBy({ left: -390, behavior: 'smooth' }));

/* mobile menu */
const nav = document.getElementById('primaryNav');
const hamburger = document.getElementById('hamburgerBtn');

hamburger.addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open');
  hamburger.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  document.body.classList.remove('nav-open');
  hamburger.setAttribute('aria-expanded', 'false');
}));
window.addEventListener('resize', () => {
  if (window.innerWidth > 820 && document.body.classList.contains('nav-open')) {
    document.body.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

/* first paint */
renderCart();