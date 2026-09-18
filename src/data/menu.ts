import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'blossom-rose-cardamom-latte',
    name: 'Blossom Rose Cardamom Latte',
    subtitle: 'Signature Botanical Espresso & Distilled Rosewater',
    price: 6.50,
    category: 'Botanical Latte',
    description: 'Double shot of single-origin espresso blended with microfoamed oat milk, delicate Damask rosewater, freshly ground green cardamom, and candied organic rose petals.',
    detailedStory: 'Inspired by traditional Persian tea gardens and modern specialty coffee roasting. We hand-distill organic rose petals with fair-trade cardamom seeds to produce a fragrant syrup that complements our washed Ethiopian roast without overpowering the chocolate undertones.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=85',
    tags: ['House Signature', 'Floral Notes', 'Barista Favorite'],
    tastingNotes: ['Damask Rose', 'Green Cardamom', 'Milk Chocolate', 'Velvet Crema'],
    ingredients: ['Washed Ethiopian Espresso', 'Barista Oat Milk', 'Handcrafted Damask Rose Elixir', 'Fresh Green Cardamom Pods', 'Dried Culinary Rose Petals'],
    nutrition: {
      calories: '185 kcal',
      caffeine: '140 mg',
      dietary: 'Dairy-Free, Vegan Friendly'
    },
    options: {
      type: 'beverage',
      temperatures: ['Hot', 'Iced'],
      milks: ['Oat Milk (Barista Blend)', 'Whole Milk (Local Organic)', 'Almond Milk', 'Pistachio Milk (+ $0.75)'],
      sweetness: ['Standard (Delicate floral balance)', 'Less Sweet (50%)', 'Unsweetened', 'Extra Blossom (+ $0.50)'],
      additions: [
        { name: 'Extra Shot Espresso', price: 1.25 },
        { name: 'Vanilla Bean Caviar', price: 0.75 },
        { name: 'Rosewater Cold Foam Cap', price: 1.00 }
      ]
    },
    rating: 4.9,
    reviewsCount: 142,
    badge: 'Best Seller'
  },
  {
    id: 'honey-lavender-cold-brew',
    name: 'Honey Lavender Cold Brew',
    subtitle: '18-Hour Slow Steep with French Lavender Velvet Foam',
    price: 6.25,
    category: 'Specialty Coffee',
    description: 'Steeped for eighteen hours with roasted Kenyan peaberry beans, sweetened with local wildflower clover honey, and capped with aerated French culinary lavender cold foam.',
    detailedStory: 'Our cold extraction process extracts clean, sparkling stone-fruit notes from the Kenyan beans while eliminating bitterness. The chilled crown of lavender cold foam gently perfumes each sip as the honey-sweetened cold brew passes through.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=85',
    tags: ['Slow Brewed', 'Refreshing', 'Provence Botanicals'],
    tastingNotes: ['Blackcurrant', 'Culinary Lavender', 'Wildflower Honey', 'Candied Citrus'],
    ingredients: ['18-Hr Kenyan Peaberry Cold Brew', 'Raw California Wildflower Honey', 'Infused Lavender Sweet Cream', 'Ice Spheres'],
    nutrition: {
      calories: '140 kcal',
      caffeine: '210 mg',
      dietary: 'Gluten-Free, Vegetarian'
    },
    options: {
      type: 'beverage',
      temperatures: ['Iced'],
      milks: ['Lavender Sweet Cream (Standard)', 'Oat Lavender Foam (Dairy-Free)', 'Black with Honey Only'],
      sweetness: ['Standard Wildflower Sweetness', 'Light Honey', 'Unsweetened Cold Brew'],
      additions: [
        { name: 'Extra Lavender Foam Float', price: 1.25 },
        { name: 'Cacao Nib Dusting', price: 0.50 }
      ]
    },
    rating: 4.8,
    reviewsCount: 118,
    badge: 'Summer Favorite'
  },
  {
    id: 'pistachio-matcha-cloud',
    name: 'Pistachio Matcha Cloud',
    subtitle: 'Ceremonial Grade Uji Matcha & Sicilian Roasted Pistachio',
    price: 7.00,
    category: 'Botanical Latte',
    description: 'First-harvest Kyoto Uji ceremonial matcha whisked tableside, layered over house-made Sicilian pistachio almond cream and chilled organic milk.',
    detailedStory: 'We source single-cultivar Okumidori green tea leaves grown under shade cloths in Uji, Japan, yielding an intense vibrant jade hue and profound umami sweetness. It is paired with slow-roasted Bronte pistachios churned into a velvety emulsion.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=1200&q=85',
    tags: ['Ceremonial Matcha', 'Superfood', 'Antioxidant Rich'],
    tastingNotes: ['Bright Umami', 'Roasted Pistachio', 'Sweet Grass', 'Silky Cream'],
    ingredients: ['Ceremonial Uji Okumidori Matcha', 'House-Whipped Sicilian Pistachio Cream', 'Organic Almond Milk', 'Agave Nectar'],
    nutrition: {
      calories: '210 kcal',
      caffeine: '70 mg (L-Theanine Rich)',
      dietary: 'Plant-Based, Dairy-Free'
    },
    options: {
      type: 'beverage',
      temperatures: ['Iced', 'Hot'],
      milks: ['Almond-Pistachio House Blend', 'Oat Milk', 'Organic Whole Milk'],
      sweetness: ['Delicate (Recommended)', 'Naturally Sweetened', 'Zero Sugar'],
      additions: [
        { name: 'Extra Shot Ceremonial Matcha', price: 1.75 },
        { name: 'Crushed Salted Pistachios', price: 0.75 },
        { name: 'Vanilla Cloud Foam', price: 1.00 }
      ]
    },
    rating: 5.0,
    reviewsCount: 96,
    badge: 'Barista Special'
  },
  {
    id: 'vanilla-bean-brown-sugar-cortado',
    name: 'Vanilla Bean & Demerara Cortado',
    subtitle: 'Double Ristretto, Madagascar Pod & Caramelized Cane',
    price: 5.25,
    category: 'Specialty Coffee',
    description: 'An equal 1:1 ratio of intense double ristretto espresso and warm silky microfoam, stirred with real Madagascar vanilla bean seeds and raw Guyana demerara sugar.',
    detailedStory: 'Created for the purist coffee lover seeking depth without excessive milk volume. The natural caramel of raw Demerara sugar balances the bold chocolate notes of our signature Guatemalan and Sumatran espresso blend.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85',
    tags: ['Espresso Forward', 'Real Vanilla Caviar', 'Pure Craft'],
    tastingNotes: ['Bourbon Vanilla', 'Brown Butter', 'Toasted Hazelnut', 'Dark Cocoa'],
    ingredients: ['Double Ristretto Espresso', 'Steamed Organic Whole Milk', 'Real Madagascar Vanilla Bean Paste', 'Turbinado Sugar Crust'],
    nutrition: {
      calories: '95 kcal',
      caffeine: '155 mg',
      dietary: 'Gluten-Free'
    },
    options: {
      type: 'beverage',
      temperatures: ['Hot'],
      milks: ['Organic Whole Milk (Classic Cortado)', 'Oat Milk', 'Whole Raw Milk'],
      sweetness: ['Demerara Touch (Standard)', 'Half Sweet', 'Unsweetened Bold'],
      additions: [
        { name: 'Cinnamon Bark Dusting', price: 0.25 },
        { name: 'Double shot extra extraction', price: 1.00 }
      ]
    },
    rating: 4.9,
    reviewsCount: 88,
    badge: 'Purist Choice'
  },
  {
    id: 'wildflower-earl-grey-tart',
    name: 'Wildflower Earl Grey Tart',
    subtitle: 'Bergamot Infused White Ganache & Organic Floral Pansies',
    price: 7.50,
    category: 'Artisan Patisserie',
    description: 'Buttery French sable pastry shell filled with slow-infused Earl Grey bergamot white chocolate ganache, lemon curd center, and freshly picked organic edible blossoms.',
    detailedStory: 'Our pastry team bakes these miniature tarts each morning at 5:30 AM. Bergamot oil from Calabria is steeped in heavy cream before melting into single-origin white chocolate, balanced by an unexpected ribbon of tart lemon curd.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85',
    tags: ['Baked Fresh Daily', 'Calabrian Bergamot', 'Edible Florals'],
    tastingNotes: ['Bergamot Citrus', 'Velvety White Chocolate', 'Crisp Shortbread', 'Elderflower'],
    ingredients: ['Normandy Butter Shortcrust', 'Earl Grey Tea Infusion', 'Valrhona White Chocolate', 'Organic Meyer Lemon Curd', 'Garden Edible Pansies'],
    nutrition: {
      calories: '320 kcal',
      caffeine: '15 mg (Natural Tea)',
      dietary: 'Vegetarian'
    },
    options: {
      type: 'pastry',
      pastryServings: ['Fresh Room Temp', 'Warm & Crisp']
    },
    rating: 4.9,
    reviewsCount: 74,
    badge: 'Chef Creation'
  },
  {
    id: 'almond-croissant-orange-blossom',
    name: 'Orange Blossom Almond Croissant',
    subtitle: 'Twice-Baked French Lamination & Neroli Flower Glaze',
    price: 5.75,
    category: 'Artisan Patisserie',
    description: '72-layer European butter croissant soaked in orange blossom simple syrup, filled with rich roasted almond frangipane, and topped with toasted sliced almonds.',
    detailedStory: 'We honor traditional Parisian viennoiserie by aging our sourdough poolish for 36 hours. The croissant is baked once, soaked with fragrant Mediterranean orange blossom water, filled with creamy almond cream, and baked a second time until shattering crisp.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=85',
    tags: ['72-Layer Lamination', 'Twice-Baked', 'Mediterranean Neroli'],
    tastingNotes: ['Orange Blossom Water', 'Sweet Roasted Almond', 'Caramelized Butter', 'Flaky Sugar'],
    ingredients: ['French Cultured Butter', 'High-Protein Wheat Flour', 'California Almond Frangipane', 'Organic Orange Blossom Water', 'Powdered Sugar Snow'],
    nutrition: {
      calories: '390 kcal',
      caffeine: '0 mg',
      dietary: 'Vegetarian'
    },
    options: {
      type: 'pastry',
      pastryServings: ['Warm & Crisp', 'Fresh Room Temp']
    },
    rating: 4.8,
    reviewsCount: 163,
    badge: 'Morning Classic'
  }
];
