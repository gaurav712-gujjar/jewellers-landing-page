/* ============================================================
   IMAGE LIBRARY — Raani Haar
   ------------------------------------------------------------
   Every image URL used on the site lives here, in one place.
   Swap any URL for your own photo (product shoot, CDN link,
   assets/images/xyz.jpg) and nothing else needs to change.

   Sourced from Unsplash (free for commercial use):
   https://images.unsplash.com/photo-{id}
   Sizing is controlled with ?w= / &h= / &fit=crop query params.

   If any URL 404s, js/app.js swaps in a neutral "Raani Haar"
   placeholder automatically — nothing breaks.
   ============================================================ */

const IMAGES = {

  // ---------- HERO CAROUSEL ----------
  hero: [
    "https://images.unsplash.com/photo-1600685890506-593fdf55949b?w=900&h=1080&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1631982690223-8aa4be0a2497?w=900&h=1080&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1633934542430-0905ccb5f050?w=900&h=1080&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1680968921717-4abbbe793bb3?w=900&h=1080&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1758995116383-f51775896add?w=900&h=1080&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?w=900&h=1080&fit=crop&auto=format&q=80"
  ],
      
  // ---------- CATEGORY CIRCLES (17) ----------
  categories: {
    "Rings":           "https://images.unsplash.com/photo-1631982690223-8aa4be0a2497?w=300&h=300&fit=crop&auto=format&q=80",
    "Earrings":        "https://images.unsplash.com/photo-1680968921717-4abbbe793bb3?w=300&h=300&fit=crop&auto=format&q=80",
    "Diamonds":        "https://images.unsplash.com/photo-1613945407943-59cd755fd69e?q=80&w=1170&auto=format&fit=crop",
    "Pendants":        "https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?w=300&h=300&fit=crop&auto=format&q=80",
    "Chains":          "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=300&h=300&fit=crop&auto=format&q=80",
    "Bracelets":       "https://images.unsplash.com/photo-1679156271456-d6068c543ee7?w=300&h=300&fit=crop&auto=format&q=80",
    "Bangles":         "https://images.unsplash.com/photo-1758995116383-f51775896add?w=300&h=300&fit=crop&auto=format&q=80",
    "Necklaces":       "https://images.unsplash.com/flagged/photo-1570055349452-29232699cc63?w=300&h=300&fit=crop&auto=format&q=80",
    "Nose Pins":       "https://images.unsplash.com/photo-1671642883395-0ab89c3ac890?w=300&h=300&fit=crop&auto=format&q=80",
    "Kadas":           "https://images.unsplash.com/photo-1728381031272-ba3f537feadd?w=300&h=300&fit=crop&auto=format&q=80",
    "Men's Jewellery": "https://images.unsplash.com/photo-1741071520904-37ef3c0fea09?w=300&h=300&fit=crop&auto=format&q=80",
    "Kids' Jewellery": "https://images.unsplash.com/photo-1757331631646-0e1bca72b725?w=300&h=300&fit=crop&auto=format&q=80",
    "Watches & Accessories": "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=300&h=300&fit=crop&auto=format&q=80",
    "Anklets":         "https://images.unsplash.com/photo-1744722091259-ed1cf11ac97f?w=300&h=300&fit=crop&auto=format&q=80",
    "Gold Coins":      "https://images.unsplash.com/photo-1638818835387-2b212c0b540f?w=300&h=300&fit=crop&auto=format&q=80",
    "Mangalsutras":    "https://images.unsplash.com/photo-1594140700783-f9e70c7abc25?w=300&h=300&fit=crop&auto=format&q=80"
  },

  // ---------- SHOP BY STYLE ----------
  style: {
    "Bridal Heritage":  "https://images.unsplash.com/photo-1587271598589-3f91d0872f66?w=700&h=900&fit=crop&auto=format&q=80",
    "Everyday Light":   "https://images.unsplash.com/photo-1680968921717-4abbbe793bb3?w=700&h=560&fit=crop&auto=format&q=80",
    "Office Edit":      "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=700&h=560&fit=crop&auto=format&q=80",
    "Festive Glow":     "https://images.unsplash.com/photo-1594140700783-f9e70c7abc25?w=700&h=560&fit=crop&auto=format&q=80",
    "Quiet Minimal":    "https://images.unsplash.com/photo-1514612497953-05d1e5e171fa?w=700&h=560&fit=crop&auto=format&q=80"
  },

  // ---------- PURE SILVER PRODUCTS ----------
  silver: {
    "Oxidised Kada":         "https://images.unsplash.com/photo-1548790176-f46bb4d5ef7f?w=600&h=600&fit=crop&auto=format&q=80",
    "Temple Anklet Pair":    "https://images.unsplash.com/photo-1744722091259-ed1cf11ac97f?w=600&h=600&fit=crop&auto=format&q=80",
    "Minimal Band Ring":     "https://images.unsplash.com/photo-1514612497953-05d1e5e171fa?w=600&h=600&fit=crop&auto=format&q=80",
    "Rope Chain":            "https://images.unsplash.com/photo-1651395835317-d2868e8ebcac?w=600&h=600&fit=crop&auto=format&q=80"
  },

  // ---------- GOLD PRODUCTS ----------
  gold: {
    "Classic Solitaire Ring": "https://images.unsplash.com/photo-1631982690223-8aa4be0a2497?w=600&h=600&fit=crop&auto=format&q=80",
    "Jhumka Earrings":        "https://images.unsplash.com/photo-1680968921717-4abbbe793bb3?w=600&h=600&fit=crop&auto=format&q=80",
    "Temple Mangalsutra":     "https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?w=600&h=600&fit=crop&auto=format&q=80",
    "Rope Gold Chain":        "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=600&h=600&fit=crop&auto=format&q=80"
  },

  // ---------- DIAMOND PRODUCTS ----------
  // NOTE: these five URLs are new — open each in a browser once to
  // confirm they load. If one 404s the placeholder handles it, but
  // swap in your own shoot as soon as you have it.
  diamonds: {
    "Solitaire Halo Ring":   "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop&auto=format&q=80",
    "Classic Stud Earrings": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop&auto=format&q=80",
    "Tennis Bracelet":       "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop&auto=format&q=80",
    "Diamond Line Pendant":  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop&auto=format&q=80"
  },

  // ---------- ARTIFICIAL JEWELLERY PRODUCTS ----------
  artificial: {
    "Oxidised Jhumkas":        "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&h=600&fit=crop&auto=format&q=80",
    "Kundan Choker Set":       "https://images.unsplash.com/photo-1600685890506-593fdf55949b?w=600&h=600&fit=crop&auto=format&q=80",
    "AD Stone Necklace Set":   "https://images.unsplash.com/flagged/photo-1570055349452-29232699cc63?w=600&h=600&fit=crop&auto=format&q=80",
    "Pearl Drop Earrings":     "https://images.unsplash.com/photo-1671642883395-0ab89c3ac890?w=600&h=600&fit=crop&auto=format&q=80"
  },

  // ---------- BEST SELLERS ----------
  bestSellers: {
    "Bridal Kundan Set":       "https://images.unsplash.com/photo-1600685890506-593fdf55949b?w=600&h=600&fit=crop&auto=format&q=80",
    "Everyday Gold Studs":     "https://images.unsplash.com/photo-1680968921717-4abbbe793bb3?w=600&h=600&fit=crop&auto=format&q=80",
    "Sterling Charm Bracelet": "https://images.unsplash.com/photo-1548790176-f46bb4d5ef7f?w=600&h=600&fit=crop&auto=format&q=80",
    "Solitaire Halo Ring":     "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop&auto=format&q=80"
  },

  // ---------- TRENDING LOOKS (editorial) ----------
  trending: {
    "Festive Radiance": "https://images.unsplash.com/photo-1594140700783-f9e70c7abc25?w=500&h=700&fit=crop&auto=format&q=80",
    "Bridal Heritage":  "https://images.unsplash.com/photo-1587271598589-3f91d0872f66?w=500&h=700&fit=crop&auto=format&q=80",
    "Office Elegance":  "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500&h=700&fit=crop&auto=format&q=80",
    "Weekend Layers":   "https://images.unsplash.com/photo-1679156272446-30738eb5c4e7?w=500&h=700&fit=crop&auto=format&q=80"
  },

  // ---------- CUSTOMER REVIEW AVATARS ----------
  reviewAvatars: {
    "Ananya Rao":     "https://images.unsplash.com/photo-1628477116196-48afe0d209e0?w=100&h=100&fit=crop&auto=format&q=80",
    "Kavya Menon":    "https://images.unsplash.com/photo-1587538018365-2a1f8b544c08?w=100&h=100&fit=crop&auto=format&q=80",
    "Rohit Sharma":   "https://images.unsplash.com/photo-1649433658557-54cf58577c68?w=100&h=100&fit=crop&auto=format&q=80",
    "Priya Iyer":     "https://images.unsplash.com/photo-1646979200020-941e1deb2670?w=100&h=100&fit=crop&auto=format&q=80",
    "Devansh Patel":  "https://images.unsplash.com/photo-1594672830234-ba4cfe1202dc?q=80&w=1170&auto=format&fit=crop"
  }
};

