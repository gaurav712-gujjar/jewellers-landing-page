# Raani Haar — Landing Page

Static jewellery landing page for **Raani Haar** — *Where Tradition Meets Timeless Luxury.*

Hallmarked gold, certified diamonds, 925 sterling silver and hand-finished artificial jewellery. No build step, no dependencies, no server. Open `index.html` and it works.

---

## Contents

- [What's in the box](#whats-in-the-box)
- [File structure](#file-structure)
- [Running locally](#running-locally)
- [Customising](#customising)
  - [Your WhatsApp number](#1-your-whatsapp-number-required)
  - [Metal rates and prices](#2-metal-rates-and-prices)
  - [Products](#3-products)
  - [Images](#4-images)
  - [Categories](#5-categories)
  - [Copy and reviews](#6-copy-and-reviews)
  - [Brand colours](#7-brand-colours)
- [The cart](#the-cart)
- [The WhatsApp checkout](#the-whatsapp-checkout)
- [Deploying](#deploying)
- [Pre-launch checklist](#pre-launch-checklist)
- [Known limitations](#known-limitations)
- [Browser support](#browser-support)

---

## What's in the box

| Section | What it does |
|---|---|
| **Hero** | Auto-scrolling image carousel, pauses on hover, zooms gently as you scroll |
| **Categories** | 16 circular thumbnails in a horizontal swipe strip |
| **Shop by Style** | Asymmetric 5-card editorial grid |
| **Pure Silver** | 4 products, prices calculated live from weight × rate |
| **Gold** | 4 products, same live pricing |
| **Diamonds** | 4 certified products, flat pricing |
| **Artificial** | 4 products, flat pricing |
| **Best Sellers** | 4 mixed products across all metals |
| **Trending Looks** | 4-panel editorial image strip |
| **Reviews** | Horizontally scrolling customer testimonials |
| **Cart** | Slide-in drawer, quantity controls, persists on refresh |
| **Checkout** | Name / phone / city / notes → sends the order to WhatsApp |
| **Floating WhatsApp** | Corner button for direct enquiries, appears after scrolling |

Everything is mobile-first. The drawer goes full-width under 820px, the product grid drops to 2-up at 560px and 1-up at 380px, and every tappable element is at least 44px tall.

---

## File structure

```
raani-haar/
├── index.html          Markup only — no content lives here
├── css/
│   └── style.css       All styles
├── data/
│   ├── content.js      Products, prices, rates, copy, reviews
│   └── images.js       Every image URL, grouped by section
├── js/
│   └── app.js          Rendering, cart logic, interactions
└── README.md
```

**Load order matters.** `index.html` loads these three at the bottom of `<body>`:

```html
<script src="data/images.js"></script>
<script src="data/content.js"></script>
<script src="js/app.js"></script>
```

`app.js` reads from the first two, so it must come last. Don't reorder.

**Keep folder names lowercase.** GitHub Pages runs on Linux and is case-sensitive. `Css/` will work on your Windows laptop and break the moment you deploy.

---

## Running locally

Double-click `index.html`. That's it.

No `npm install`, no dev server, no build step. The browser loads the three JS files directly and renders everything.

For a slightly better experience (proper relative paths, no `file://` quirks), serve it:

```bash
# Python 3
python3 -m http.server 8000

# or Node
npx serve
```

Then open `http://localhost:8000`.

---

## Customising

### 1. Your WhatsApp number **(required)**

Open `data/content.js`. The very first thing you'll see:

```js
const WHATSAPP_NUMBER = "919999999999";   // ← REPLACE
```

**Format:** country code first, digits only. No `+`, no spaces, no dashes.

| Country | Format | Example |
|---|---|---|
| India | `91` + 10 digits | `919876543210` |
| UAE | `971` + 9 digits | `971501234567` |
| UK | `44` + 10 digits | `447700900123` |
| USA | `1` + 10 digits | `14155552671` |

If you leave the placeholder, two things happen:
- The checkout button copies the order to the clipboard instead of opening WhatsApp, and shows a toast saying so
- The floating WhatsApp button hides itself entirely

Also change the pre-filled message:

```js
const WHATSAPP_MESSAGE = "Hi Raani Haar, I'd like to know more about your collection.";
```

---

### 2. Metal rates and prices

Still in `data/content.js`:

```js
const GOLD_RATE_PER_GRAM_22K = 14200;   // ₹ per gram
const SILVER_RATE_PER_GRAM_925 = 230;   // ₹ per gram
```

Update these whenever the market moves. Every gold and silver price on the page recalculates automatically on the next page load.

**The formula**, applied in `js/app.js`:

```
price = weight × rate × (1 + making%) × 1.03
```

The `1.03` is 3% GST. The `making%` comes from each product's `mk` field — `.18` means 18%.

**Worked example** — a 3.2g gold ring with 12% making:

```
3.2 × 14200 × 1.12 × 1.03 = ₹52,409
```

Each metal card shows this breakdown under the price, so buyers can see exactly how the number was built.

---

### 3. Products

Four arrays in `data/content.js`, one per section.

**Metal products** (silver, gold) use weight and making charge:

```js
const goldProducts = [
  { name: "Classic Solitaire Ring", meta: "22K Gold · 3.2g", w: 3.2, mk: .12 },
  { name: "Jhumka Earrings",        meta: "22K Gold · 6.8g", w: 6.8, mk: .18 },
];
```

| Field | Meaning |
|---|---|
| `name` | Display name **and** the lookup key in `data/images.js` |
| `meta` | Small grey line under the name — purity, weight, certification |
| `w` | Weight in grams |
| `mk` | Making charge as a decimal — `.18` = 18% |

**Flat-price products** (diamonds, artificial) skip the calculation:

```js
const diamondProducts = [
  { name: "Solitaire Halo Ring", meta: "18K White Gold · 0.50ct · IGI", price: 68500, tag: "IGI CERTIFIED" },
];
```

| Field | Meaning |
|---|---|
| `price` | Final price in rupees — no calculation applied |
| `tag` | Optional badge in the top-left of the card |

**Best sellers** can reference either system:

```js
const bestProducts = [
  { name: "Bridal Kundan Set",       meta: "Best seller · Artificial", price: 3999 },
  { name: "Everyday Gold Studs",     meta: "22K Gold · 1.8g", w: 1.8, mk: .20, gold: true },
  { name: "Sterling Charm Bracelet", meta: "925 Silver · 15g", w: 15, mk: .28, silver: true },
];
```

Add `gold: true` or `silver: true` to pull from the live rate. Otherwise it uses `price`.

---

### 4. Images

Every image URL lives in `data/images.js`, grouped by section. Nothing is hardcoded in the markup or CSS.

```js
const IMAGES = {
  hero:       [ "...", "..." ],
  categories: { "Rings": "...", "Earrings": "..." },
  style:      { "Bridal Heritage": "...", "Office Edit": "..." },
  silver:     { "Oxidised Kada": "..." },
  gold:       { "Classic Solitaire Ring": "..." },
  diamonds:   { "Solitaire Halo Ring": "..." },
  artificial: { "Oxidised Jhumkas": "..." },
  bestSellers:{ "Bridal Kundan Set": "..." },
  trending:   { "Festive Radiance": "..." },
  reviewAvatars: { "Ananya Rao": "..." }
};
```

**To swap a photo:** replace the URL. Nothing else changes.

**To use your own file:** drop it in an `assets/img/` folder and point at it:

```js
"Oxidised Kada": "assets/img/silver-kada-01.jpg",
```

**Fallback:** if any URL fails to load, `app.js` swaps in a neutral "Raani Haar" placeholder. A dead link never shows a broken-image icon.

**Sizing tips:**

| Section | Recommended | Ratio |
|---|---|---|
| Hero | 900 × 1080 | portrait, tall |
| Categories | 300 × 300 | square |
| Style cards | 700 × 900 (tall) / 700 × 560 (wide) | mixed |
| Product cards | 600 × 600 | square |
| Trending | 500 × 700 | portrait 3:4 |
| Avatars | 100 × 100 | square |

Keep files under ~150KB each. Compress with [Squoosh](https://squoosh.app) before uploading.

**Currently every URL points to Unsplash.** The four diamond URLs in particular were never verified — open them in a browser once before you launch.

---

### 5. Categories

```js
const CATEGORY_NAMES = [
  "Rings", "Earrings", "Diamonds", "Pendants", "Chains", "Bracelets",
  "Bangles", "Necklaces", "Nose Pins", "Kadas", "Men's Jewellery",
  "Kids' Jewellery", "Watches & Accessories", "Anklets", "Gold Coins",
  "Mangalsutras"
];
```

Each name needs a matching key in `IMAGES.categories`. The anchor ID is generated automatically — `"Watches & Accessories"` becomes `#cat-watches-accessories`.

The header's mega menu pulls from the same array, so adding a category updates both the strip and the dropdown.

---

### 6. Copy and reviews

Also in `data/content.js`:

- `trendLooks` — the four Trending panel titles and subtitles
- `reviews` — customer name, location, star rating, testimonial

Star ratings are 1–5. The renderer fills the remainder with hollow stars automatically.

---

### 7. Brand colours

Top of `css/style.css`:

```css
:root{
  --ivory:#F8F4EC;
  --paper:#FBF8F2;
  --charcoal:#26221E;
  --teal:#1E3A34;
  --maroon:#6E2733;
  --maroon-deep:#4E1B24;
  --platinum:#EDF0F1;
  --platinum-ink:#2C5A66;
  --gold:#A9793C;
  --gold-light:#C89A5C;
  --line:#E3DACB;
}
```

Change a value once and it propagates everywhere. The four section backgrounds are `--teal` (silver), `--maroon-deep` (gold), `--platinum` (diamonds), `--charcoal` (trending).

---

## The cart

### How it works

- Cart state is `{ productId: quantity }`, stored in `localStorage` under the key `rh_cart`
- It survives page refreshes and browser restarts
- Nothing is sent anywhere until the customer submits the checkout form

### Product IDs

Generated automatically from the section and product name:

| Section | ID pattern | Example |
|---|---|---|
| Silver | `silver-{slug}` | `silver-oxidised-kada` |
| Gold | `gold-{slug}` | `gold-jhumka-earrings` |
| Diamonds | `diamond-{slug}` | `diamond-tennis-bracelet` |
| Artificial | `art-{slug}` | `art-kundan-choker-set` |
| Best sellers | `best-{slug}` | `best-bridal-kundan-set` |

Rename a product and its ID changes — **the old cart entry is silently dropped** on the next load. That's intentional: a renamed product is a different product.

### Add to Cart vs Buy Now

| | Add to Cart | Buy Now |
|---|---|---|
| Adds the item | Yes | Yes (if not already present) |
| Opens the drawer | Cart view | Checkout view directly |
| Toast | Yes | No |
| Best for | Browsing | Decided buyers |

### Clearing the cart manually

Open the browser console:

```js
localStorage.removeItem('rh_cart');
location.reload();
```

Useful when you're testing and want a clean slate.

---

## The WhatsApp checkout

When the customer submits the form, this is what gets sent:

```
*New Order — Raani Haar*

2× Classic Solitaire Ring — ₹104,818
1× Jhumka Earrings — ₹21,540

*Total: ₹126,358*

Name: Priya Sharma
Phone: +91 98765 43210
City: Mumbai
Notes: Ring size 14, deliver before Friday
```

It opens `https://wa.me/{number}?text={encoded}` in a new tab. On desktop that goes to WhatsApp Web; on mobile it opens the app directly.

After the WhatsApp tab opens, the cart clears and the success screen shows.

### Important

**This is not a payment system.** No money changes hands on the site. The order arrives in your WhatsApp inbox and you close the sale manually.

For Indian jewellery that's the right model — buyers want a conversation before paying, especially for gold where the rate moves daily. Building real payments would need a backend and a Razorpay or Stripe business account.

---

## Deploying

### GitHub Pages (recommended)

Free forever, no bandwidth limits that matter, no commercial-use restrictions.

```bash
cd raani-haar
git init
git add .
git status              # ← check for .DS_Store, Thumbs.db, huge files
git commit -m "Raani Haar landing page"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/raani-haar.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: Deploy from a branch → main → / (root) → Save.**

Live at `https://YOUR-USERNAME.github.io/raani-haar/` in about two minutes.

**Every push updates the live site automatically.** Hard-refresh (`Ctrl+Shift+R`) before deciding a change didn't work — the browser caches aggressively.

### Netlify Drop (quick share)

For a link you can send someone in 90 seconds:

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the project folder in
3. Get a URL

Fine for a preview. For a permanent business site, use GitHub Pages.

### Not Vercel

Vercel's free Hobby tier prohibits commercial use. A jewellery business qualifies as commercial, so you'd need their $20/month Pro plan. Skip it.

### Custom domain

1. Buy the domain (Namecheap, GoDaddy, BigRock — roughly ₹800–1200/year)
2. In your repo root, create a file named `CNAME` (no extension) containing just:
   ```
   raanihaar.com
   ```
3. At your registrar, add:
   - **A records** for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **CNAME** for `www` → `YOUR-USERNAME.github.io`
4. Wait for DNS (15 min – 24 hrs), then tick **Enforce HTTPS** in Settings → Pages

---

## Pre-launch checklist

**Must do**

- [ ] Set `WHATSAPP_NUMBER` in `data/content.js`
- [ ] Test the full flow on a real phone: add to cart → checkout → WhatsApp opens
- [ ] Verify the four diamond image URLs open in a browser
- [ ] Confirm folder names are lowercase (`css/`, `data/`, `js/`)
- [ ] Delete `.DS_Store` / `Thumbs.db` before committing

**Should do**

- [ ] Swap in your own product photography
- [ ] Decide the newsletter form — wire it to Formspree, or remove it
- [ ] Test on a 375px-wide window (small phone)
- [ ] Check the mega menu on desktop — all 16 links reachable

**Nice to have**

- [ ] Add a 404 page
- [ ] Write an About page
- [ ] Wire the Search and Bag icons, or remove them

---

## Known limitations

**Cart prices freeze at page load.** If a customer adds a gold ring today at ₹14,200/g and returns in three days after you've changed the rate, their cart still shows today's price. For a quote-based business that's arguably correct — you're honouring the number they saw. Live rates would need a backend.

**The newsletter form doesn't submit anywhere.** It has `onsubmit="return false;"`. Wire it to Formspree or replace it with a WhatsApp link.

**Search and Bag icons are decorative.** They have no handlers. Every jewellery site has them, so nobody clicks expecting much — but they are non-functional.

**Product "View" links are gone.** They were replaced by the Add to Cart / Buy Now buttons. When you build category pages, you'll want a way to reach a product detail view.

**No analytics.** Add a snippet before launch if you want to know what people look at.

---

## Browser support

Tested and working in:

- Chrome / Edge 90+
- Firefox 88+
- Safari 14+ (desktop and iOS)
- Samsung Internet 14+

Uses `IntersectionObserver`, CSS custom properties, `aspect-ratio`, and `localStorage` — all widely supported. No polyfills needed for anything released after 2021.

`backdrop-filter` on the header and cart overlay degrades gracefully — older browsers get a solid background instead of a blur.

---

## Licence

Your content, your code. Photography is licensed under the [Unsplash License](https://unsplash.com/license) — free for commercial use, no attribution required, but you can't resell the photos as stock.

Replace them with your own product shots as soon as you can. That's the single biggest upgrade available to this page.

---

**Raani Haar** — *Where Tradition Meets Timeless Luxury*