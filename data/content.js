/* ============================================================
   CONTENT DATA — Raani Haar
   Product info, pricing inputs and copy.
   Image URLs live in data/images.js.
   ============================================================ */

// ── Contact ───────────────────────────────────────────────
// Country code first, digits only. No +, no spaces, no dashes.
// India example: 91 followed by the 10-digit number.
const WHATSAPP_NUMBER = "919351101199";   // ← REPLACE with your business number
const WHATSAPP_MESSAGE = "Hi Raani Haar, I'd like to know more about your collection.";

// ── Live metal rates ──────────────────────────────────────
const GOLD_RATE_PER_GRAM_22K = 14200;   // ₹
const SILVER_RATE_PER_GRAM_925 = 230;   // ₹

// ── Categories (16) ───────────────────────────────────────
const CATEGORY_NAMES = [
  "Rings", "Earrings", "Diamonds", "Pendants", "Chains", "Bracelets",
  "Bangles", "Necklaces", "Nose Pins", "Kadas", "Men's Jewellery",
  "Kids' Jewellery", "Watches & Accessories", "Anklets", "Gold Coins",
  "Mangalsutras"
];

// ── Products ──────────────────────────────────────────────
const silverProducts = [
  { name: "Oxidised Kada",      meta: "925 Silver · 45g", w: 45, mk: .25 },
  { name: "Temple Anklet Pair", meta: "925 Silver · 30g", w: 30, mk: .30 },
  { name: "Minimal Band Ring",  meta: "925 Silver · 6g",  w: 6,  mk: .35 },
  { name: "Rope Chain",         meta: "925 Silver · 20g", w: 20, mk: .22 },
];

const goldProducts = [
  { name: "Classic Solitaire Ring", meta: "22K Gold · 3.2g", w: 3.2, mk: .12 },
  { name: "Jhumka Earrings",        meta: "22K Gold · 6.8g", w: 6.8, mk: .18 },
  { name: "Temple Mangalsutra",     meta: "22K Gold · 8.5g", w: 8.5, mk: .20 },
  { name: "Rope Gold Chain",        meta: "22K Gold · 12g",  w: 12,  mk: .10 },
];

// diamonds use a flat price — carat pricing is quoted per stone
const diamondProducts = [
  { name: "Solitaire Halo Ring",   meta: "18K White Gold · 0.50ct · IGI", price: 68500,  tag: "IGI CERTIFIED" },
  { name: "Classic Stud Earrings", meta: "18K Gold · 0.30ct pair · IGI",  price: 42000,  tag: "IGI CERTIFIED" },
  { name: "Tennis Bracelet",       meta: "18K White Gold · 1.00ct · GIA", price: 132000, tag: "GIA CERTIFIED" },
  { name: "Diamond Line Pendant",  meta: "18K Gold · 0.25ct · IGI",       price: 31500,  tag: "IGI CERTIFIED" },
];

const artProducts = [
  { name: "Oxidised Jhumkas",      meta: "Anti-tarnish plated",     price: 549 },
  { name: "Kundan Choker Set",     meta: "Nickel-free alloy",       price: 2499 },
  { name: "AD Stone Necklace Set", meta: "Anti-tarnish plated",     price: 3299 },
  { name: "Pearl Drop Earrings",   meta: "Freshwater pearl finish", price: 399 },
];

const bestProducts = [
  { name: "Bridal Kundan Set",       meta: "Best seller · Artificial", price: 3999 },
  { name: "Everyday Gold Studs",     meta: "22K Gold · 1.8g", w: 1.8, mk: .20, gold: true },
  { name: "Sterling Charm Bracelet", meta: "925 Silver · 15g", w: 15, mk: .28, silver: true },
  { name: "Solitaire Halo Ring",     meta: "18K White Gold · 0.50ct", price: 68500 },
];

// ── Editorial ─────────────────────────────────────────────
const trendLooks = [
  { title: "Festive Radiance", sub: "22K temple sets" },
  { title: "Bridal Heritage",  sub: "Kundan & polki" },
  { title: "Office Edit",      sub: "Minimal diamond studs" },
  { title: "Weekend Layers",   sub: "Silver stacking" },
];

// ── Reviews ───────────────────────────────────────────────
const reviews = [
  { name: "Ananya Rao",   loc: "Bengaluru · Verified Buyer", stars: 5, text: "The gold rate at checkout matched exactly what was shown on the product page. No last-minute surprises — bought a mangalsutra for my wedding and it's beautifully finished." },
  { name: "Kavya Menon",  loc: "Kochi · Verified Buyer",     stars: 5, text: "Ordered a silver kada as a gift. The packaging and the hallmark certificate made it feel like a proper jewellery store purchase, not an online order." },
  { name: "Rohit Sharma", loc: "Jaipur · Verified Buyer",    stars: 4, text: "Got a gold chain for my father. Delivery took a day longer than promised, but the quality and finish are genuinely premium." },
  { name: "Priya Iyer",   loc: "Chennai · Verified Buyer",   stars: 5, text: "Bought a 0.5ct solitaire for my anniversary. The IGI certificate came in the box and the price breakdown was on the invoice line by line — that's rare." },
  { name: "Devansh Patel",loc: "Ahmedabad · Verified Buyer", stars: 5, text: "Their artificial line is surprisingly good — got a kundan set for a wedding and nobody could tell it wasn't real gold. Also picked up two gold coins at a fair rate." },
];