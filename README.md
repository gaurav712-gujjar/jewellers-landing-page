# Aabharan — Jewelry Landing Page

Static site, no build step. Deploy as-is to GitHub Pages, Netlify, Vercel, or any static host.

## Structure
```
index.html          Markup only
css/style.css        All styles
data/images.js       Every image URL used on the site, in one place
data/content.js      Product names, weights, making %, prices, copy, gold/silver rate inputs
js/app.js            Rendering + interactions (reads from the two data files)
```

## Swapping images
Open `data/images.js`. Every image on the site is a key → URL pair, grouped by
section (hero, categories, style, silver, gold, artificial, bestSellers,
trending, reviewAvatars). Replace any URL with your own photo (e.g.
`assets/img/ring-01.jpg` if you add a local images folder, or a CDN link) —
nothing else in the code needs to change as long as the key name stays the same.

Currently every URL points to LoremFlickr, a free keyword-based stock photo
service, so the page shows real, relevant photography out of the box.

## Updating gold/silver rates or prices
Open `data/content.js`:
- `GOLD_RATE_PER_GRAM_22K` / `SILVER_RATE_PER_GRAM_925` — today's metal rates
- Each product has `w` (weight in grams) and `mk` (making charge, e.g. `.18` = 18%)
- Price shown = `weight × rate × (1 + making%) × 1.03 GST`, calculated live in `js/app.js`
- Artificial jewelry uses a flat `price` field instead (no metal weight)

## Local preview
Just open `index.html` in a browser — no server or build tools required.
