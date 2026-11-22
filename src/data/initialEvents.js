import birthdayImg from '../assets/events/birthday.jpg';
import haldiImg from '../assets/events/haldi.jpg';
import marriageImg from '../assets/events/marriage.jpg';
import babyshowerImg from '../assets/events/babyshower.jpg';

export const initialEvents = [
  {
    id: 'evt-1',
    title: 'Royal Golden Jubilee Celebration',
    category: 'Birthday',
    price: 45000,
    guestCapacity: '40 - 80 Guests',
    rating: 4.9,
    reviewsCount: 128,
    badge: 'Best Seller',
    tagline: 'Milestone Extravaganza with Champagne & Lights',
    description: 'An opulent golden milestone experience featuring custom shimmer photo walls, multi-tiered artisanal dessert tables, ambient crystal uplighting, and a dedicated live DJ setup.',
    features: [
      'Custom 3D Shimmer Photo Arch',
      'Golden Balloon Garlands & Marquee Numbers',
      'Curated Dessert & Fondue Bar Styling',
      'DJ Sound & Ambient Moving Lights',
      'Personalized Keepsake Table Menus'
    ],
    image: birthdayImg,
    themeColor: '#0284C7'
  },
  {
    id: 'evt-2',
    title: 'Neon Starlight Glow Bash',
    category: 'Birthday',
    price: 35000,
    guestCapacity: '30 - 60 Guests',
    rating: 4.8,
    reviewsCount: 94,
    badge: 'Trending',
    tagline: 'High-Energy Futuristic Birthday Party',
    description: 'Electric atmosphere with vibrant neon signs, UV glow lounge accents, customized mirror photo booth, and interactive mocktail bar to celebrate in style.',
    features: [
      'Custom LED Neon Wall Decor',
      'UV Glow Furniture & Cocktail Tables',
      'Interactive Mirror Photobooth',
      'Haze Fog & Laser Party Lighting',
      'Glow-in-the-Dark Party Favors'
    ],
    image: birthdayImg,
    themeColor: '#38BDF8'
  },
  {
    id: 'evt-3',
    title: 'Sun-Kissed Marigold Traditional Haldi',
    category: 'Haldi',
    price: 55000,
    guestCapacity: '60 - 150 Guests',
    rating: 5.0,
    reviewsCount: 215,
    badge: 'Heritage Choice',
    tagline: 'Auspicious Blooms, Royal Swing & Sacred Hues',
    description: 'Immerse in joyful tradition with cascading marigold canopies, a carved wooden royal swing, pure brass urli rose-petal bath, organic turmeric bar, and upbeat festive dhol setup.',
    features: [
      'Authentic Fresh Marigold & Jasmine Canopies',
      'Carved Teakwood Swing with Yellow Silks',
      'Handcrafted Brass Urli Floral Installation',
      'Organic Herbal Haldi & Rosewater Station',
      'Live Dhol Beats & Traditional Folk Seating'
    ],
    image: haldiImg,
    themeColor: '#0EA5E9'
  },
  {
    id: 'evt-4',
    title: 'Boho Chic Meadow Floral Haldi',
    category: 'Haldi',
    price: 40000,
    guestCapacity: '40 - 80 Guests',
    rating: 4.9,
    reviewsCount: 88,
    badge: 'Popular',
    tagline: 'Earthy Bohemian Sunshine Celebration',
    description: 'A contemporary outdoor celebration with macrame backdrops, sunflower floral rings, rattan lounge seating, and festive sun-shaded canopies.',
    features: [
      'Macrame & Sunflower Archway Backdrop',
      'Rattan & Cane Bohemian Lounge Seating',
      'Artisanal Turmeric Scrub Gift Pouches',
      'Acoustic Playlist & Ambient Garden Lighting',
      'Chilled Summer Beverage Hydration Cart'
    ],
    image: haldiImg,
    themeColor: '#0284C7'
  },
  {
    id: 'evt-5',
    title: 'Grand Palace Royal Wedding Soiree',
    category: 'Marriage',
    price: 250000,
    guestCapacity: '150 - 400 Guests',
    rating: 5.0,
    reviewsCount: 340,
    badge: 'Signature Luxury',
    tagline: 'Regal Fairytale Mandap & Grand Reception',
    description: 'Transform your special day into royalty with a majestic floral dome mandap, cascading ivory & blush English roses, crystal chandeliers, grand candlelit aisle, and dramatic bridal entry effects.',
    features: [
      'Architectural 4-Pillar Grand Floral Dome Mandap',
      'Cascading Ivory & Blush Rose Aisle with 200+ Candles',
      'Triple Crystal Chandelier Ceiling Canopy',
      'Low-Fog Dry Ice Bridal Entry & Cold Sparkulars',
      'Dedicated Hospitality Concierge & Stage Crew'
    ],
    image: marriageImg,
    themeColor: '#0284C7'
  },
  {
    id: 'evt-6',
    title: 'Intimate Botanical Garden Wedding',
    category: 'Marriage',
    price: 150000,
    guestCapacity: '50 - 150 Guests',
    rating: 4.9,
    reviewsCount: 165,
    badge: 'Romantic',
    tagline: 'Ethereal Garden Vows Under Starlit Canopy',
    description: 'Romantic open-air marriage celebration featuring lush eucalyptus garlands, wooden pergolas, fairy-light tunnels, and acoustic live music styling.',
    features: [
      'Natural Cedarwood Pergola with Botanical Flora',
      '1,000-Bulb Starlit Fairy Tunnel Pathway',
      'Velvet Reception Chairs & Gold Rim Chargers',
      'Acoustic Strings Sound Setup',
      'Custom Calligraphy Welcome Sign & Easel'
    ],
    image: marriageImg,
    themeColor: '#0EA5E9'
  },
  {
    id: 'evt-7',
    title: 'Whimsical Starlight & Pastel Clouds Shower',
    category: 'Baby Shower',
    price: 45000,
    guestCapacity: '30 - 70 Guests',
    rating: 4.9,
    reviewsCount: 142,
    badge: 'Most Loved',
    tagline: 'Dreamy Pastel Heaven for the Mom-to-Be',
    description: 'Step into a whimsical wonderland with soft pastel cloud ceiling suspensions, glowing "Oh Baby" marquee neon, floral balloon archways, plush teddy accents, and a decadent dessert bar.',
    features: [
      'Pastel Cloudscape & Golden Star Suspensions',
      'Luminous Neon "Oh Baby" Backdrop Sign',
      'Velvet Mom-to-Be Throne & Floral Garlands',
      'Designer Treat Table with Custom Tier Cake Stand',
      'Baby Shower Games Kit & Keepsake Guest Wishes Box'
    ],
    image: babyshowerImg,
    themeColor: '#38BDF8'
  },
  {
    id: 'evt-8',
    title: 'Golden Sunshine Mom-to-Be Luncheon',
    category: 'Baby Shower',
    price: 30000,
    guestCapacity: '25 - 50 Guests',
    rating: 4.8,
    reviewsCount: 76,
    badge: 'Charming',
    tagline: 'Delicate Floral Brunch & Heartfelt Blessings',
    description: 'An elegant daytime luncheon featuring golden hoop floral wreaths, buttercup linen tablescapes, customized virgin mimosa cart, and curated family blessing seating.',
    features: [
      'Gilded Hoop Floral Wreath Centerpiece',
      'Embroidered Linen Dining Tables & Flower Bud Vases',
      'Gourmet Fruit & Virgin Mimosa Cart',
      'Pregnancy Milestone Photo Keepsake Gallery',
      'Acoustic Lounge BGM & Custom Favors'
    ],
    image: babyshowerImg,
    themeColor: '#0284C7'
  }
];

export const categoryMetadata = [
  {
    id: 'birthday',
    name: 'Birthday',
    tagline: 'Milestone Birthdays & Vibrant Bashes',
    description: 'From 1st birthdays to golden jubilees, celebrate years of memories with bespoke backdrops, cake tables, and joyous party ambiance.',
    priceFrom: '₹35,000',
    icon: '🎂',
    image: birthdayImg,
    color: '#0284C7',
    bgGradient: 'linear-gradient(135deg, rgba(224, 242, 254, 0.9), rgba(240, 249, 255, 0.6))'
  },
  {
    id: 'haldi',
    name: 'Haldi',
    tagline: 'Auspicious Rituals & Sunny Marigold Blooms',
    description: 'Drench in auspicious sunshine yellow with fragrant marigold flower showers, royal urli baths, folk beats, and traditional grace.',
    priceFrom: '₹40,000',
    icon: '🌼',
    image: haldiImg,
    color: '#0EA5E9',
    bgGradient: 'linear-gradient(135deg, rgba(224, 242, 254, 0.9), rgba(240, 249, 255, 0.6))'
  },
  {
    id: 'marriage',
    name: 'Marriage',
    tagline: 'Grand Weddings & Romantic Vows',
    description: 'Unite two souls in unmatched grandeur with breathtaking floral mandaps, crystal chandeliers, royal aisles, and fairytale elegance.',
    priceFrom: '₹1,50,000',
    icon: '💍',
    image: marriageImg,
    color: '#0284C7',
    bgGradient: 'linear-gradient(135deg, rgba(224, 242, 254, 0.9), rgba(240, 249, 255, 0.6))'
  },
  {
    id: 'babyshower',
    name: 'Baby Shower',
    tagline: 'Dreamy Pastel Cloudscapes & Blessings',
    description: 'Welcome new beginnings with sweet whimsical clouds, glowing neon marquee signs, plush thrones, and memorable games.',
    priceFrom: '₹30,000',
    icon: '🍼',
    image: babyshowerImg,
    color: '#38BDF8',
    bgGradient: 'linear-gradient(135deg, rgba(224, 242, 254, 0.9), rgba(240, 249, 255, 0.6))'
  }
];
