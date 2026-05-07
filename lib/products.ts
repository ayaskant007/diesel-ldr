export type ProductCategory = 'LIPS' | 'EYES' | 'CHEEKS' | 'GLOW';
export type PackagingType = 'cigarette-box' | 'zippo-lighter' | 'pencil' | 'denim-wrap' | 'engraved-compact';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  shade: string;
  shadeHex: string;
  price: number;
  description: string;
  tagline: string;
  packagingType: PackagingType;
  packagingStory: string;
  images: string[];
  ingredients: string;
  orbColor: string;
  relatedSlugs: string[];
}

export const products: Product[] = [
  {
    id: '1', slug: 'west-coast-lipstick',
    name: 'LIPSTICK – WEST COAST', category: 'LIPS',
    shade: 'Warm Terracotta Red', shadeHex: '#C45434', price: 35,
    tagline: 'The colour of a Pacific sunset at last call.',
    description: 'A bold, creamy terracotta red that wears like a second skin. Long-wearing. Zero compromise.',
    packagingType: 'cigarette-box',
    packagingStory: 'Aged cream cardstock mimicking a vintage soft-pack cigarette box. Warning labels replaced by product philosophy. The tube styled as an industrial filter cylinder.',
    images: ['/images/products/west-coast-lipstick.jpg'],
    ingredients: 'Ricinus Communis Seed Oil, Caprylic/Capric Triglyceride, Cera Alba, Euphorbia Cerifera Cera, Silica, Tocopheryl Acetate.',
    orbColor: '#C45434', relatedSlugs: ['cherry-cola-lip-liner', 'venice-bitch-eye-liner'],
  },
  {
    id: '2', slug: 'summer-bummer-blush',
    name: 'BLUSH – SUMMER BUMMER', category: 'CHEEKS',
    shade: 'Dusky Coral-Peach', shadeHex: '#D4836A', price: 42,
    tagline: 'The warmth of golden hour, compressed.',
    description: 'A soft coral-peach blush that melts into skin. Buildable. Breathable. Earned.',
    packagingType: 'zippo-lighter',
    packagingStory: 'Distressed-metal Zippo-style compact with functional flip-top hinge. Diesel D logo deep-engraved into base.',
    images: ['/images/products/summer-bummer-blush.jpg'],
    ingredients: 'Talc, Mica, Silica, Magnesium Stearate, Titanium Dioxide, Kaolin, Iron Oxides.',
    orbColor: '#D4836A', relatedSlugs: ['art-deco-highlighter', 'west-coast-lipstick'],
  },
  {
    id: '3', slug: 'cherry-cola-lip-liner',
    name: 'LIP LINER – CHERRY COLA', category: 'LIPS',
    shade: 'Deep Maroon', shadeHex: '#7A1F2E', price: 22,
    tagline: 'Dark, precise, unforgiving.',
    description: 'Deep maroon lip liner. Long-wearing, smudge-proof. Defines. Stays.',
    packagingType: 'pencil',
    packagingStory: 'Black lacquer pencil engraved with product name in condensed type. Feels like a vintage drafting pencil.',
    images: ['/images/products/cherry-cola-lip-liner.jpg'],
    ingredients: 'Cera Microcristallina, Ricinus Communis Seed Oil, Isododecane, Synthetic Wax, Iron Oxides.',
    orbColor: '#7A1F2E', relatedSlugs: ['west-coast-lipstick', 'venice-bitch-eye-liner'],
  },
  {
    id: '4', slug: 'venice-bitch-eye-liner',
    name: 'EYE LINER – VENICE BITCH', category: 'EYES',
    shade: 'Brown', shadeHex: '#6B4C3B', price: 22,
    tagline: 'The gaze of someone who has seen things.',
    description: 'Warm brown kohl-soft eyeliner. Smudgeable from the moment it touches skin.',
    packagingType: 'pencil',
    packagingStory: 'Matte black pencil with worn, industrial quality. Etched label. No frills.',
    images: ['/images/products/venice-bitch-eye-liner.jpg'],
    ingredients: 'Cera Microcristallina, Ricinus Communis Seed Oil, Hydrogenated Coconut Oil, Iron Oxides.',
    orbColor: '#4A3728', relatedSlugs: ['watercolour-eyes-palette', 'cherry-cola-lip-liner'],
  },
  {
    id: '5', slug: 'watercolour-eyes-palette',
    name: 'EYESHADOW – WATERCOLOUR EYES', category: 'EYES',
    shade: '6 Earthy Nudes', shadeHex: '#9E7E4F', price: 68,
    tagline: 'Six ways to disappear into the landscape.',
    description: 'Six earthy, blendable eyeshadows ranging from bare skin to deep dusk. Pigmented. Made to be worn.',
    packagingType: 'denim-wrap',
    packagingStory: 'Heavy-gauge denim wrapped palette, magnetic snap closure, orange contrast stitching referencing Diesel\'s denim heritage.',
    images: ['/images/products/watercolour-eyes-palette.jpg'],
    ingredients: 'Talc, Mica, Silica, Dimethicone, Magnesium Stearate, Tin Oxide, Iron Oxides.',
    orbColor: '#2B3A5C', relatedSlugs: ['venice-bitch-eye-liner', 'summer-bummer-blush'],
  },
  {
    id: '6', slug: 'art-deco-highlighter',
    name: 'HIGHLIGHTER – ART DECO', category: 'GLOW',
    shade: 'Antique Gold', shadeHex: '#C9A84C', price: 48,
    tagline: 'Not shine. Radiance.',
    description: 'Finely-milled antique gold. Catches light the way old things do — slowly, warmly, without trying.',
    packagingType: 'engraved-compact',
    packagingStory: 'Ornate engraved brass compact with Art Deco filigree pressed into the lid. Feels like something you inherit, not buy.',
    images: ['/images/products/art-deco-highlighter.jpg'],
    ingredients: 'Talc, Mica, Silica, Dimethicone, Magnesium Stearate, Bismuth Oxychloride, Iron Oxides.',
    orbColor: '#C9A84C', relatedSlugs: ['summer-bummer-blush', 'west-coast-lipstick'],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

/* ═══════════════════════════════════════════════════════════════════════
   CLOTHING
   ═══════════════════════════════════════════════════════════════════════ */

export type ClothingCategory = 'TOPS' | 'OUTERWEAR' | 'DENIM' | 'BOTTOMS' | 'ACCESSORIES';

export interface ClothingProduct {
  id: string;
  slug: string;
  name: string;
  category: ClothingCategory;
  price: number;
  description: string;
  tagline: string;
  images: string[];
  orbColor: string;
  sizes: string[];
  featured?: boolean;
}

export const clothingProducts: ClothingProduct[] = [
  {
    id: 'c1', slug: 'young-beautiful-tee',
    name: 'YOUNG & BEAUTIFUL OVERSIZED TEE', category: 'TOPS',
    price: 85,
    tagline: 'Wear the anthem.',
    description: 'Heavyweight cotton oversized tee with distressed "YOUNG & BEAUTIFUL" print. Co-branded DIESEL × LDR back tag. Dropped shoulders, raw hem.',
    images: ['/images/products/young-beautiful-tee.png'],
    orbColor: '#8B8B8B', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    featured: true,
  },
  {
    id: 'c2', slug: 'ldr-denim-jacket',
    name: 'LDR DENIM TRUCKER JACKET', category: 'OUTERWEAR',
    price: 320,
    tagline: 'Heritage, reimagined.',
    description: 'Indigo washed trucker jacket with hand-distressed details, embroidered LDR crest on chest, and signature Diesel hardware. Lined interior with campaign print.',
    images: ['/images/products/ldr-denim-jacket.png'],
    orbColor: '#3A5A8C', sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: true,
  },
  {
    id: 'c3', slug: 'west-coast-jeans',
    name: 'WEST COAST DISTRESSED JEANS', category: 'DENIM',
    price: 260,
    tagline: 'Miles on the highway, written in denim.',
    description: 'Wide-leg distressed jeans in sun-faded indigo. Raw hem, ripped knees, brass rivets. The denim equivalent of a road trip.',
    images: ['/images/products/west-coast-jeans.png'],
    orbColor: '#4A6B8A', sizes: ['24', '26', '28', '30', '32', '34'],
  },
  {
    id: 'c4', slug: 'venice-mesh-top',
    name: 'VENICE BITCH MESH TOP', category: 'TOPS',
    price: 120,
    tagline: 'Sheer confidence.',
    description: 'Black mesh long-sleeve top with subtle metallic thread running through. High neck. Fitted silhouette. Layering essential.',
    images: ['/images/products/venice-mesh-top.png'],
    orbColor: '#2A2A35', sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 'c5', slug: 'art-deco-belt',
    name: 'ART DECO CHAIN BELT', category: 'ACCESSORIES',
    price: 180,
    tagline: 'Ornament with weight.',
    description: 'Heavy brass chain belt with Art Deco geometric links and vintage-finish clasp. Adjustable length. Statement hardware.',
    images: ['/images/products/art-deco-belt.png'],
    orbColor: '#C9A84C', sizes: ['S/M', 'M/L'],
  },
  {
    id: 'c6', slug: 'summer-bummer-skirt',
    name: 'SUMMER BUMMER MINI SKIRT', category: 'BOTTOMS',
    price: 195,
    tagline: 'Short, sharp, unapologetic.',
    description: 'Distressed denim mini skirt with raw edge hem, vintage brass button fly, and faded patina. Cut high. Washed to feel lived-in.',
    images: ['/images/products/summer-bummer-skirt.png'],
    orbColor: '#7A8B9C', sizes: ['24', '26', '28', '30', '32'],
  },
  {
    id: 'c7', slug: 'cherry-cola-leather',
    name: 'CHERRY COLA LEATHER JACKET', category: 'OUTERWEAR',
    price: 480,
    tagline: 'The jacket that never leaves.',
    description: 'Cherry red genuine leather biker jacket with asymmetric silver zip, quilted lining, and tonal DIESEL emboss on back yoke. Worn-in from day one.',
    images: ['/images/products/cherry-cola-leather.jpg'],
    orbColor: '#7A1F2E', sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: true,
  },
  {
    id: 'c8', slug: 'watercolour-scarf',
    name: 'WATERCOLOUR EYES SILK SCARF', category: 'ACCESSORIES',
    price: 145,
    tagline: 'Art you wear.',
    description: '100% silk twill scarf with watercolour abstract print in earthy tones. Hand-rolled edges. 90×90cm. Can be worn as headscarf, necktie, or bag accent.',
    images: ['/images/products/watercolour-scarf.jpg'],
    orbColor: '#9E7E4F', sizes: ['ONE SIZE'],
  },
];

export function getClothingBySlug(slug: string): ClothingProduct | undefined {
  return clothingProducts.find(p => p.slug === slug);
}
