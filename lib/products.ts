export type ProductCategory = 'LIPS' | 'EYES' | 'CHEEKS' | 'GLOW' | 'FRAGRANCE';
export type PackagingType = 'cigarette-box' | 'zippo-lighter' | 'pencil' | 'denim-wrap' | 'engraved-compact' | 'glass-bottle';

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
    id: '1', slug: 'watercolour-eyes-palette',
    name: 'EYESHADOW PALETTE', category: 'EYES',
    shade: 'WATERCOLOUR EYES', shadeHex: '#9E7E4F', price: 68,
    tagline: 'Six ways to disappear into the landscape.',
    description: 'Six earthy, blendable eyeshadows ranging from bare skin to deep dusk. Pigmented. Made to be worn.',
    packagingType: 'denim-wrap',
    packagingStory: 'Vintage rusted tin casing with embossed Diesel logo. Feels like something from the 70s.',
    images: ['/images/products/beauty_1.jpg'],
    ingredients: 'Talc, Mica, Silica, Dimethicone, Magnesium Stearate, Iron Oxides.',
    orbColor: '#2B3A5C', relatedSlugs: ['venice-bitch-eye-liner', 'born-to-die-perfume'],
  },
  {
    id: '2', slug: 'lana-del-rey-cig-box',
    name: 'CIGARETTE BOX STYLE PRODUCT', category: 'LIPS',
    shade: 'Nude / Pink', shadeHex: '#C48A80', price: 85,
    tagline: 'Smoking kills but we were born to die either way.',
    description: 'A set of soft nude lip products housed inside an iconic graphic container.',
    packagingType: 'cigarette-box',
    packagingStory: 'Iconic hard-pack cigarette box with bold graphic titling.',
    images: ['/images/products/beauty_2.jpg'],
    ingredients: 'Ricinus Communis Seed Oil, Caprylic Triglyceride, Cera Alba.',
    orbColor: '#C48A80', relatedSlugs: ['cherry-cola-lip-pencil', 'west-coast-lip-gloss'],
  },
  {
    id: '3', slug: 'west-coast-lip-gloss',
    name: 'LIP GLOSS', category: 'LIPS',
    shade: 'WEST COAST', shadeHex: '#C45434', price: 35,
    tagline: 'The colour of a Pacific sunset.',
    description: 'A glossy lip tint with a denim detail on the cap. Shines without stickiness.',
    packagingType: 'cigarette-box',
    packagingStory: 'Denim-wrapped high shine cylinder.',
    images: ['/images/products/beauty_3.jpg'],
    ingredients: 'Ricinus Communis Seed Oil, Tocopheryl Acetate.',
    orbColor: '#C45434', relatedSlugs: ['cherry-cola-lip-pencil', 'velvet-gasoline-perfume'],
  },
  {
    id: '4', slug: 'pretty-when-u-cry-mascara',
    name: 'MASCARA', category: 'EYES',
    shade: 'PRETTY WHEN U CRY', shadeHex: '#000000', price: 28,
    tagline: 'Dark, precise, tear-proof.',
    description: 'Pitch black volume that lasts through everything.',
    packagingType: 'cigarette-box',
    packagingStory: 'Sleek matte black tube with industrial type.',
    images: ['/images/products/beauty_4.jpg'],
    ingredients: 'Water, Beeswax, Iron Oxides.',
    orbColor: '#000000', relatedSlugs: ['watercolour-eyes-palette'],
  },
  {
    id: '5', slug: 'venice-bitch-eye-liner',
    name: 'BROWN LINER', category: 'EYES',
    shade: 'VENICE BITCH', shadeHex: '#6B4C3B', price: 22,
    tagline: 'The gaze of someone who has seen things.',
    description: 'Warm brown kohl-soft eyeliner. Dual-ended with blending brush.',
    packagingType: 'pencil',
    packagingStory: 'Industrial matte brown pencil barrel.',
    images: ['/images/products/beauty_5.jpg'],
    ingredients: 'Cera Microcristallina, Ricinus Communis Seed Oil.',
    orbColor: '#4A3728', relatedSlugs: ['watercolour-eyes-palette'],
  },
  {
    id: '6', slug: 'cherry-cola-lip-pencil',
    name: 'LIP PENCIL', category: 'LIPS',
    shade: 'CHERRY COLA', shadeHex: '#7A1F2E', price: 22,
    tagline: 'Dark, precise, unforgiving.',
    description: 'Deep maroon lip liner. Long-wearing, smudge-proof.',
    packagingType: 'pencil',
    packagingStory: 'Wooden pencil with metallic lettering.',
    images: ['/images/products/beauty_6.jpg'],
    ingredients: 'Cera Microcristallina, Ricinus Communis Seed Oil.',
    orbColor: '#7A1F2E', relatedSlugs: ['west-coast-lip-gloss'],
  },
  {
    id: '7', slug: 'blush-box',
    name: 'BLUSH BOX', category: 'CHEEKS',
    shade: 'Rose', shadeHex: '#D44A4A', price: 42,
    tagline: 'The warmth of golden hour.',
    description: 'A deep rose blush housed in a heavy metal compact.',
    packagingType: 'zippo-lighter',
    packagingStory: 'Heavy distressed metal compact.',
    images: ['/images/products/beauty_7.jpg'],
    ingredients: 'Talc, Mica, Silica, Magnesium Stearate.',
    orbColor: '#D44A4A', relatedSlugs: ['highlighter-box'],
  },
  {
    id: '8', slug: 'highlighter-box',
    name: 'HIGHLIGHTER BOX', category: 'GLOW',
    shade: 'Antique Gold', shadeHex: '#C9A84C', price: 48,
    tagline: 'Not shine. Radiance.',
    description: 'Finely-milled antique gold. Catches light the way old things do.',
    packagingType: 'engraved-compact',
    packagingStory: 'Heavy distressed metal compact.',
    images: ['/images/products/beauty_8.jpg'],
    ingredients: 'Talc, Mica, Silica, Bismuth Oxychloride.',
    orbColor: '#C9A84C', relatedSlugs: ['blush-box'],
  },
  {
    id: '9', slug: 'born-to-die-perfume',
    name: 'BORN TO DIE EAU DE PARFUM', category: 'FRAGRANCE',
    shade: 'WINE / TOBACCO / VANILLA', shadeHex: '#520B13', price: 145,
    tagline: 'Memories of a neon-lit motel.',
    description: 'Heavy, alluring, and dangerous. Deep cherry liquid housed in a cracked glass bottle.',
    packagingType: 'glass-bottle',
    packagingStory: 'Cracked glass finish with a silver heart pendant.',
    images: ['/images/products/perfume_born_to_die.jpg'],
    ingredients: 'Alcohol Denat., Parfum, Aqua/Water.',
    orbColor: '#B22222', relatedSlugs: ['highway-hymn-perfume', 'velvet-gasoline-perfume'],
  },
  {
    id: '10', slug: 'highway-hymn-perfume',
    name: 'HIGHWAY HYMN EAU DE TOILETTE', category: 'FRAGRANCE',
    shade: 'DESERT AIR / MOSS / AMBER', shadeHex: '#80684E', price: 120,
    tagline: 'Late night drives through the desert.',
    description: 'An expansive scent with notes of moss, amber, and dry desert air.',
    packagingType: 'glass-bottle',
    packagingStory: 'Clear heavy glass with motel keychain aesthetic.',
    images: ['/images/products/perfume_highway.jpg'],
    ingredients: 'Alcohol Denat., Parfum, Aqua/Water.',
    orbColor: '#8B4513', relatedSlugs: ['born-to-die-perfume'],
  },
  {
    id: '11', slug: 'velvet-gasoline-perfume',
    name: 'VELVET GASOLINE EAU DE PARFUM', category: 'FRAGRANCE',
    shade: 'BLACK CHERRY / LEATHER', shadeHex: '#4A0404', price: 180,
    tagline: 'A love letter to endless summers.',
    description: 'Special Edition. Notes of Black Cherry, Pink Pepper, Vanilla Bourbon, and Gasoline Accord.',
    packagingType: 'glass-bottle',
    packagingStory: 'Cracked glass finish, deep cherry liquid, exclusive box set.',
    images: ['/images/products/perfume_velvet.jpg'],
    ingredients: 'Alcohol Denat., Parfum, Aqua/Water.',
    orbColor: '#800000', relatedSlugs: ['born-to-die-perfume'],
  }
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
    id: 'c1', slug: 'west-coast-hoodie',
    name: 'WEST COAST HOODIE', category: 'TOPS',
    price: 110,
    tagline: 'Ocean breeze and old Hollywood dreams.',
    description: 'Oversized fit, acid wash hoodie. Vintage crack print. Captures the melancholy of California nights.',
    images: ['/images/products/hoodie_1.jpg'],
    orbColor: '#2B2B2B', sizes: ['S', 'M', 'L', 'XL'],
    featured: true,
  },
  {
    id: 'c2', slug: 'west-coast-jeans',
    name: 'WEST COAST JEANS', category: 'DENIM',
    price: 180,
    tagline: 'Moody nights, ocean breeze.',
    description: 'Straight fit, mid waist jeans in vintage black wash. Embroidered "Lana Del Rey" on back pocket.',
    images: ['/images/products/jeans_1.jpg', '/images/products/jeans_2.jpg'],
    orbColor: '#3A3A3A', sizes: ['24', '26', '28', '30', '32'],
    featured: true,
  },
  {
    id: 'c3', slug: 'highway-heaven-tee',
    name: 'HIGHWAY HEAVEN T-SHIRT', category: 'TOPS',
    price: 65,
    tagline: 'Classic Americana.',
    description: 'Heavyweight faded vintage black tee featuring iconic motel and car graphics.',
    images: ['/images/products/tee_1.jpg'],
    orbColor: '#4A4A4A', sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'c4', slug: 'love-is-mean-tee',
    name: 'LOVE IS MEAN T-SHIRT', category: 'TOPS',
    price: 65,
    tagline: 'Love hurts.',
    description: 'Baby tee fit with deep red cherry graphics and "Love is mean and love hurts" back hit.',
    images: ['/images/products/tee_2.jpg'],
    orbColor: '#8b0000', sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 'c5', slug: 'ride-palm-trees-tee',
    name: 'RIDE TO THE PALM TREES TEE', category: 'TOPS',
    price: 70,
    tagline: 'To the coast.',
    description: 'Vintage wash oversized tee with graphic of classic car and palm trees under moody skies.',
    images: ['/images/products/tee_3.jpg'],
    orbColor: '#2f4f4f', sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'c6', slug: 'born-to-burn-hoodie',
    name: 'BORN TO BURN ZIP HOODIE', category: 'OUTERWEAR',
    price: 130,
    tagline: 'Motel nights.',
    description: 'Acid washed zip-up hoodie featuring "Born To Burn" barbed wire text and a desolate motel graphic on the back.',
    images: ['/images/products/hoodie_2.jpg'],
    orbColor: '#36454F', sizes: ['S', 'M', 'L', 'XL'],
    featured: true,
  }
];

export function getClothingBySlug(slug: string): ClothingProduct | undefined {
  return clothingProducts.find(p => p.slug === slug);
}
