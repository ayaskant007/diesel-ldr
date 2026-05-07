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
