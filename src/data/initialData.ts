import { Destination, TourPackage, BlogPost, Testimonial, FAQItem, SiteSettings, Enquiry } from '../types';

export const INITIAL_SETTINGS: SiteSettings = {
  companyName: 'Kovai Compass Holidays',
  tagline: 'GUIDING JOURNEYS • CREATING MEMORIES',
  secondaryTagline: 'Your Compass to Extraordinary Journeys',
  primaryMarket: 'India',
  domain: 'kovaicompassholidays.com',
  phone: '+91 98430 12345',
  phoneDisplay: '+91 98430 12345',
  whatsappNumber: '919843012345',
  whatsappDisplay: '+91 98430 12345',
  email: 'info@kovaicompassholidays.com',
  supportEmail: 'tours@kovaicompassholidays.com',
  officeAddress: 'Avinashi Road, Race Course / Peelamedu',
  city: 'Coimbatore',
  state: 'Tamil Nadu',
  country: 'India',
  postalCode: '641018',
  googleBusinessProfileUrl: 'https://maps.google.com/?q=Kovai+Compass+Holidays',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125322.44173167191!2d76.88483289069502!3d11.014298150493035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  businessHours: 'Monday – Saturday: 9:30 AM – 7:30 PM | Sunday: On Appointment',
  showAnnouncement: true,
  announcementText: '✨ Special Singapore & Malaysia Holiday Packages Available for Upcoming Seasons – Enquire Today for Custom Itineraries!',
  socialLinks: {
    facebook: 'https://facebook.com/kovaicompassholidays',
    instagram: 'https://instagram.com/kovaicompassholidays',
    youtube: 'https://youtube.com/@kovaicompassholidays',
    linkedin: 'https://linkedin.com/company/kovaicompassholidays',
  },
  seo: {
    metaTitle: 'Kovai Compass Holidays | Curated International Tour Packages & Holidays',
    metaDescription: 'Discover international holidays to Singapore, Sri Lanka, Malaysia, Thailand & Cambodia with Kovai Compass Holidays. Tailor-made itineraries, visa support, and 24/7 travel care.',
    keywords: 'Singapore holiday packages, Malaysia tour packages from India, Sri Lanka family tours, Thailand holidays, Cambodia Angkor Wat tour, Coimbatore travel agency, international tour operators',
  }
};

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: 'dest-singapore',
    name: 'Singapore',
    country: 'Singapore',
    slug: 'singapore',
    tagline: 'Luxury, City & Family Adventures',
    heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1920&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription: 'Marvel at futuristic architecture, world-class theme parks, tranquil gardens, and vibrant culinary culture in Asia’s most modern destination.',
    longDescription: 'Singapore is our flagship destination, offering a captivating blend of futuristic skyline marvels, lush tropical gardens, world-renowned attractions like Marina Bay Sands and Gardens by the Bay, thrilling island entertainment at Sentosa, and family adventures at Universal Studios. Whether you seek a luxurious couples getaway or a family holiday packed with wonders, Singapore delivers an effortless, safe, and breathtaking journey.',
    whyVisit: [
      'World-famous Marina Bay Sands, Supertree Grove & Cloud Forest',
      'Thrills for all ages at Universal Studios Singapore & Sentosa Island',
      'World’s first Night Safari and Singapore Zoo wildlife experiences',
      'Michelin-starred dining to iconic street hawker food trails',
      'Effortless cleanliness, safety, English fluency, and fast transfers'
    ],
    topAttractions: [
      {
        name: 'Gardens by the Bay & Supertrees',
        description: 'Spectacular futuristic nature park featuring the Flower Dome, Cloud Forest, and nightly Garden Rhapsody light show.',
        image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Sentosa Island & Universal Studios',
        description: 'Premier resort island featuring thrilling theme park rides, S.E.A. Aquarium, Cable Car, and sandy beaches.',
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Marina Bay & SkyPark Observation Deck',
        description: 'Iconic architectural marvel offering 360-degree panoramic views of the city skyline and harbor.',
        image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Mandai Wildlife Reserve & Night Safari',
        description: 'An immersive nocturnal safari encounter with fascinating wildlife in their naturalistic habitats.',
        image: 'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?auto=format&fit=crop&w=800&q=80'
      }
    ],
    bestTimeToVisit: 'November to July is ideal for sightseeing and festive celebrations, though Singapore remains vibrant year-round.',
    travelTips: [
      'Singapore operates efficient metro (MRT) and ride-hailing services.',
      'Light summer clothing with comfortable walking shoes is recommended.',
      'Indian vegetarian and Halal dining are easily accessible across all prime districts.'
    ],
    highlights: ['Gardens by the Bay', 'Universal Studios', 'Sentosa Island', 'Night Safari', 'Marina Bay', 'Jewel Changi'],
    faqs: [
      {
        question: 'Do Indian passport holders require a visa for Singapore?',
        answer: 'Yes, Indian citizens require an approved Singapore e-Visa prior to departure. Our team assists with complete visa documentation, submission, and verification.'
      },
      {
        question: 'Is Singapore suitable for elderly travellers and toddlers?',
        answer: 'Absolutely. Singapore is recognized globally for barrier-free accessibility, smooth paved walkways, wheelchair/stroller accessibility across all major attractions and transport.'
      }
    ],
    isPublished: true,
    isPopular: true,
    startingPriceEstimate: 42000,
    seoTitle: 'Singapore Tour Packages | Kovai Compass Holidays',
    seoDescription: 'Explore custom Singapore holiday packages including Universal Studios, Sentosa Island, Gardens by the Bay, and luxury stays with Kovai Compass Holidays.'
  },
  {
    id: 'dest-sri-lanka',
    name: 'Sri Lanka',
    country: 'Sri Lanka',
    slug: 'sri-lanka',
    tagline: 'Culture, Nature & Island Escapes',
    heroImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1920&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription: 'Immerse in ancient UNESCO rock fortresses, mist-covered tea plantations, golden beaches, and warm hospitality.',
    longDescription: 'Sri Lanka is an island treasure trove brimming with ancient heritage, lush highland tea estates in Nuwara Eliya and Ella, dramatic UNESCO heritage sites like Sigiriya Rock Fortress, and sun-kissed coastal paradises in Bentota and Galle.',
    whyVisit: [
      'Marvel at the ancient 5th-century Sigiriya Lion Rock Fortress',
      'Scenic train ride through emerald Ceylon tea plantations',
      'Golden coastal resorts and water sports along Bentota beach',
      'Rich cultural heritage at the Sacred Temple of the Tooth in Kandy',
      'Diverse wildlife safaris at Yala National Park for leopard spotting'
    ],
    topAttractions: [
      {
        name: 'Sigiriya Rock Fortress',
        description: 'An ancient palace fortress perched atop a sheer 200-metre granite cliff with historic frescoes.',
        image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Nuwara Eliya & Tea Country',
        description: 'Known as "Little England", featuring cool misty hills, colonial architecture, and cascading waterfalls.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Bentota Beach & Madu River Safari',
        description: 'Tropical golden sands, thrilling water sports, and tranquil boat rides through mangrove forests.',
        image: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=800&q=80'
      }
    ],
    bestTimeToVisit: 'December to April for West and South Coast (Colombo, Bentota, Galle); May to September for East Coast.',
    travelTips: [
      'Direct short flights connect South India (Chennai/Bangalore) to Colombo in just over an hour.',
      'Carry light woollens for the cool hill country of Nuwara Eliya.'
    ],
    highlights: ['Sigiriya Rock', 'Kandy Temple', 'Nuwara Eliya Hills', 'Bentota Beach', 'Galle Dutch Fort'],
    faqs: [
      {
        question: 'Is an ETA / Visa required for visiting Sri Lanka?',
        answer: 'Yes, travellers must obtain an electronic travel authorization (ETA) online before arrival. Our team provides end-to-end guidance.'
      }
    ],
    isPublished: true,
    isPopular: true,
    startingPriceEstimate: 34000,
    seoTitle: 'Sri Lanka Tour Packages | Kovai Compass Holidays',
    seoDescription: 'Handcrafted Sri Lanka tour packages covering Colombo, Kandy, Nuwara Eliya, Sigiriya, and Bentota beaches with private chauffeur-guide.'
  },
  {
    id: 'dest-malaysia',
    name: 'Malaysia',
    country: 'Malaysia',
    slug: 'malaysia',
    tagline: 'City Life, Islands & Cultural Wonders',
    heroImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1920&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription: 'Glittering Petronas Twin Towers, cool mountain breezes at Genting Highlands, sacred Batu Caves, and tropical Langkawi.',
    longDescription: 'Malaysia provides a harmonious blend of energetic metropolis lifestyle in Kuala Lumpur, mountainous amusement at Genting Highlands with its SkyWorld theme park and cable car, spiritual wonder at Batu Caves, and idyllic beach leisure in Langkawi and Penang.',
    whyVisit: [
      'Iconic Petronas Twin Towers & KL Tower skyline views',
      'Genting Highlands SkyWorlds Theme Park & Awana SkyWay Cable Car',
      'Colossal Lord Murugan statue & vibrant steps at Batu Caves',
      'Tax-free island paradise and cable car at Langkawi',
      'Rich multi-cultural street food and heritage in Penang'
    ],
    topAttractions: [
      {
        name: 'Petronas Twin Towers & KLCC',
        description: 'World tallest twin skyscrapers offering Skybridge access and a sprawling surrounding urban park.',
        image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Genting Highlands & SkyWorlds',
        description: 'Resort city high in the Titiwangsa Mountains featuring outdoor theme parks, casinos, and cool breezes.',
        image: 'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Batu Caves & Rainbow Steps',
        description: 'Limestone hill featuring a series of caves, a golden 140-foot statue, and 272 colourful steps.',
        image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80'
      }
    ],
    bestTimeToVisit: 'March to October for West coast & Kuala Lumpur; great year-round urban destination.',
    travelTips: [
      'Combine Kuala Lumpur with Singapore for an exceptional dual-country vacation via comfortable express coach or short flight.',
      'Genting Highlands requires light jackets due to cooler mountain temperatures.'
    ],
    highlights: ['Petronas Towers', 'Genting Highlands', 'Batu Caves', 'Putrajaya', 'Langkawi Island'],
    faqs: [
      {
        question: 'Can we combine Malaysia and Singapore in one holiday?',
        answer: 'Yes! Our Singapore + Malaysia Twin-Country itinerary is among our most popular and seamless holiday experiences.'
      }
    ],
    isPublished: true,
    isPopular: true,
    startingPriceEstimate: 36000,
    seoTitle: 'Malaysia Tour Packages | Kovai Compass Holidays',
    seoDescription: 'Curated Malaysia holiday packages featuring Kuala Lumpur, Genting Highlands, Batu Caves, and Langkawi with customized private tours.'
  },
  {
    id: 'dest-thailand',
    name: 'Thailand',
    country: 'Thailand',
    slug: 'thailand',
    tagline: 'Tropical Beaches & Vibrant Experiences',
    heroImage: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1920&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription: 'Ornate golden temples in Bangkok, turquoise island waters in Coral Island and Phuket, vibrant night bazaars, and world-class hospitality.',
    longDescription: 'Thailand welcomes travellers with radiant warmth, magnificent Buddhist temples like Wat Pho and Wat Arun, sensational cruises along the Chao Phraya River, crystal clear turquoise waters at Coral Island and Phi Phi, and unmatched shopping bargains in Bangkok.',
    whyVisit: [
      'Chao Phraya River luxury dinner cruises with illuminated temple views',
      'Speedboat trips to Coral Island with parasailing, seawalking & snorkeling',
      'Safari World and Marine Park family fun in Bangkok',
      'Majestic Grand Palace and Reclining Buddha temple complexes',
      'World-famous Thai hospitality and vibrant night markets'
    ],
    topAttractions: [
      {
        name: 'Coral Island (Koh Larn) & Pattaya Bay',
        description: 'A paradise for water enthusiasts offering white sand beaches, parasailing, and coral reef excursions.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Bangkok Temples & Chao Phraya River',
        description: 'Explore the Grand Palace, Wat Arun, and enjoy an evening dinner cruise under glittering night lights.',
        image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Safari World & Marine Park',
        description: 'Open safari drive-through with wild animals and entertaining dolphin, sea lion, and stunt shows.',
        image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80'
      }
    ],
    bestTimeToVisit: 'November to April when the weather is warm, pleasant, and dry for island excursions.',
    travelTips: [
      'Dress modestly covering shoulders and knees when visiting Thai temples.',
      'Indian restaurants and vegetarian choices are widespread across Bangkok and Pattaya.'
    ],
    highlights: ['Bangkok City Tour', 'Coral Island', 'Chao Phraya Cruise', 'Safari World', 'Pattaya Floating Market'],
    faqs: [
      {
        question: 'Are Visa-on-Arrival or e-Visas available for Thailand?',
        answer: 'Yes, Indian tourists enjoy convenient Visa-on-Arrival / visa exemption schemes subject to Thai immigration policies. We guide on all mandatory documents.'
      }
    ],
    isPublished: true,
    isPopular: true,
    startingPriceEstimate: 32000,
    seoTitle: 'Thailand Tour Packages | Kovai Compass Holidays',
    seoDescription: 'Book Bangkok & Pattaya holiday packages with Coral Island speedboat tour, Chao Phraya dinner cruise, and city sightseeing.'
  },
  {
    id: 'dest-cambodia',
    name: 'Cambodia',
    country: 'Cambodia',
    slug: 'cambodia',
    tagline: 'Ancient Wonders & Cultural Discovery',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription: 'Witness the sunrise over Angkor Wat, enigmatic smiling stone faces at Bayon, and the jungle-embraced ruins of Ta Prohm.',
    longDescription: 'Cambodia is home to one of humankind’s greatest architectural triumphs — the Angkor archaeological complex. Discover ancient Khmer civilization, serene sunrise views over Angkor Wat, tree roots entwined through Ta Prohm (Tomb Raider temple), and peaceful boat cruises along Tonle Sap Lake.',
    whyVisit: [
      'Awe-inspiring sunrise over Angkor Wat, the largest religious monument in the world',
      'The mystical tree roots strangling the stone corridors of Ta Prohm',
      'The 216 giant smiling bodhisattva faces carved into Bayon Temple',
      'Floating villages and traditional lifestyle along Tonle Sap Lake',
      'Enchanting Apsara classical dance performances with traditional dinner'
    ],
    topAttractions: [
      {
        name: 'Angkor Wat Grand Complex',
        description: 'A 12th-century masterpiece of classical Khmer architecture with sprawling bas-reliefs and iconic towers.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Ta Prohm (Jungle Temple)',
        description: 'Left largely in its atmospheric state surrounded by massive silk-cotton trees and strangler figs.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Bayon Temple & Angkor Thom',
        description: 'The monumental fortified royal city featuring stone face towers and the Terrace of the Elephants.',
        image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80'
      }
    ],
    bestTimeToVisit: 'November to March provides cool, dry conditions ideal for exploring the stone temple complexes.',
    travelTips: [
      'Wear respectful attire covering knees and shoulders inside temple sanctuaries.',
      'Wake up early to catch the world-renowned sunrise over Angkor Wat reflecting in the lotus ponds.'
    ],
    highlights: ['Angkor Wat Sunrise', 'Ta Prohm', 'Bayon Temple', 'Tonle Sap Floating Village', 'Siem Reap Night Market'],
    faqs: [
      {
        question: 'How do Indian tourists obtain a visa for Cambodia?',
        answer: 'Cambodia offers convenient e-Visa online or Visa-on-Arrival at Siem Reap and Phnom Penh international airports.'
      }
    ],
    isPublished: true,
    isPopular: false,
    startingPriceEstimate: 38000,
    seoTitle: 'Cambodia Angkor Wat Tour Packages | Kovai Compass Holidays',
    seoDescription: 'Experience Siem Reap, Angkor Wat sunrise, Ta Prohm, and cultural tours with Kovai Compass Holidays.'
  }
];

export const INITIAL_PACKAGES: TourPackage[] = [
  {
    id: 'pkg-singapore-family-escape',
    title: 'Singapore Family Escape',
    slug: 'singapore-family-escape',
    destination: 'Singapore',
    destinationSlug: 'singapore',
    durationDays: 4,
    durationNights: 3,
    startingPrice: 42500,
    currency: 'INR',
    priceNote: 'per person on twin sharing (sample estimate)',
    heroImage: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription: 'The ultimate family adventure featuring Universal Studios, Gardens by the Bay, Sentosa Island, and Singapore city sights.',
    overview: 'Designed specifically for families and first-time visitors, this 4-day package brings you the absolute best of Singapore with seamless private airport transfers, comfortable hotel accommodation, and guaranteed pre-booked admissions to top attractions like Universal Studios and Gardens by the Bay.',
    highlights: [
      'Full-Day Universal Studios Singapore Admission Pass with Express option',
      'Gardens by the Bay (Flower Dome & Cloud Forest)',
      'Sentosa Island Cable Car ride and Wings of Time night show',
      'Singapore City Orientation (Merlion Park, Marina Bay, Little India)',
      'Daily international breakfast and private round-trip airport transfers'
    ],
    travelStyle: 'Family Holiday',
    isFeatured: true,
    isBestSeller: true,
    isFamilyFavorite: true,
    isLuxury: false,
    isNew: false,
    isPublished: true,
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Singapore & Evening Gardens by the Bay',
        description: 'Arrive at Singapore Changi Airport. Meet our representative for a comfortable private transfer to your hotel. After check-in and relaxation, head to Gardens by the Bay to explore the spectacular Flower Dome and misty Cloud Forest, concluding with the mesmerizing Supertree light show.',
        meals: 'Breakfast at hotel (from Day 2)',
        hotel: '4-Star Central Singapore Hotel (e.g. Boss Hotel / Furama Riverfront or similar)',
        activities: ['Airport pickup', 'Hotel Check-in', 'Gardens by the Bay', 'Supertree Grove Light Show']
      },
      {
        day: 2,
        title: 'Full Day Universal Studios Singapore at Sentosa',
        description: 'Enjoy a hearty breakfast before heading to Sentosa Island for a full day of thrilling rides, live performances, and movie-themed zones at Universal Studios Singapore. Enjoy iconic rides including Transformers 3D, Battlestar Galactica, and Jurassic Park Rapids.',
        meals: 'Daily Breakfast',
        hotel: '4-Star Central Singapore Hotel',
        activities: ['Sentosa Island Transfer', 'Full Day Universal Studios Pass', 'Wings of Time Show (Optional)']
      },
      {
        day: 3,
        title: 'Singapore City Tour & Sentosa Highlights',
        description: 'Morning guided city tour covering Merlion Park, Marina Bay panoramic viewpoints, Padang, and Little India. Afternoon transfer to Sentosa Island via Scenic Cable Car. Visit S.E.A. Aquarium or Madame Tussauds, followed by the enchanting Wings of Time laser & water show.',
        meals: 'Daily Breakfast',
        hotel: '4-Star Central Singapore Hotel',
        activities: ['City Orientation Tour', 'Merlion Park Photo Stop', 'Sentosa Cable Car', 'Wings of Time Laser Show']
      },
      {
        day: 4,
        title: 'Jewel Changi Discovery & Departure',
        description: 'After breakfast, check out from the hotel. Private transfer to Changi Airport. Spend leisure time marveling at the HSBC Rain Vortex at Jewel Changi and shopping before boarding your flight back home with wonderful memories.',
        meals: 'Daily Breakfast',
        activities: ['Hotel Checkout', 'Jewel Changi Rain Vortex', 'Changi Airport Transfer']
      }
    ],
    inclusions: [
      '3 Nights accommodation in selected 4-Star hotel with daily breakfast',
      'Return airport transfers on private basis',
      'Admission ticket to Universal Studios Singapore (1-Day Pass)',
      'Admission to Gardens by the Bay (Flower Dome & Cloud Forest)',
      'Sentosa Island tour with one-way Cable Car and Wings of Time show',
      'Half-day guided city orientation tour on shared/private basis',
      '24/7 dedicated telephone / WhatsApp travel assistance throughout the trip'
    ],
    exclusions: [
      'International airfare & Singapore e-Visa fees',
      'Lunches & dinners unless specified in inclusions',
      'Personal expenses (laundry, telephone, tips, extra activities)',
      'Travel insurance (highly recommended)'
    ],
    hotelDetails: 'Stay at carefully inspected 4-Star properties located centrally near MRT stations with easy access to Indian dining options.',
    importantNotes: [
      'Passport must be valid for at least 6 months from the date of departure.',
      'Singapore e-Visa processing takes 3–5 working days.',
      'Itinerary sequence can be customized based on flight schedules.'
    ],
    optionalAddOns: [
      { title: 'Night Safari with Tram Ride & Creature Show', price: 3800, description: 'Evening nocturnal wildlife tram experience' },
      { title: 'Marina Bay Sands SkyPark Observation Deck Ticket', price: 2400, description: 'Panoramic 360-degree city skyline observation' },
      { title: 'Upgrade to 5-Star Hotel (Marina Bay / Orchard)', price: 15000, description: 'Luxury hotel room upgrade' }
    ],
    faqs: [
      {
        question: 'Can we add Night Safari to this package?',
        answer: 'Yes, Night Safari or River Wonders can be added on Day 1 or Day 3 evening. Simply mention this when requesting your quote.'
      },
      {
        question: 'Are vegetarian / Jain meals easily available near the hotel?',
        answer: 'Yes, all our chosen hotels in Singapore are located within 5–10 minutes of reputed Indian vegetarian, Jain, and Halal restaurants.'
      }
    ],
    seoTitle: 'Singapore Family Escape Package 4D3N | Kovai Compass Holidays',
    seoDescription: 'Book our bestselling 4 Days 3 Nights Singapore Family Holiday Package featuring Universal Studios, Sentosa Island, Gardens by the Bay & hotel stays.'
  },
  {
    id: 'pkg-singapore-sentosa-highlights',
    title: 'Singapore Highlights & Sentosa Leisure',
    slug: 'singapore-sentosa-highlights',
    destination: 'Singapore',
    destinationSlug: 'singapore',
    durationDays: 5,
    durationNights: 4,
    startingPrice: 52000,
    currency: 'INR',
    priceNote: 'per person on twin sharing (sample estimate)',
    heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Comprehensive 5-day holiday covering Universal Studios, Night Safari, S.E.A. Aquarium, Marina Bay Sands SkyPark & leisure shopping.',
    overview: 'A relaxed and thorough holiday itinerary offering the perfect mix of high-energy theme parks, nocturnal wildlife encounters, awe-inspiring architectural marvels, and leisure shopping on Orchard Road and Bugis Street.',
    highlights: [
      'Universal Studios Singapore Full-Day Experience',
      'World-famous Night Safari with Tram Ride',
      'Marina Bay Sands SkyPark Observation Deck',
      'Gardens by the Bay Double Conservatories',
      'S.E.A. Aquarium & Sentosa Cable Car',
      'Leisure shopping time on Orchard Road & Mustafa Centre'
    ],
    travelStyle: 'Family Holiday',
    isFeatured: true,
    isBestSeller: false,
    isLuxury: true,
    isFamilyFavorite: true,
    isPublished: true,
    itinerary: [
      {
        day: 1,
        title: 'Arrival, Check-in & Night Safari Adventure',
        description: 'Arrive at Changi Airport. Private transfer to your hotel. Evening pickup for the world renowned Night Safari. Board the guided tram to observe nocturnal wildlife in their natural open habitats, followed by the Creatures of the Night presentation.',
        meals: 'Breakfast at hotel (from Day 2)',
        hotel: '4-Star Premium Hotel',
        activities: ['Changi Pickup', 'Check-in', 'Night Safari Tram Experience']
      },
      {
        day: 2,
        title: 'Gardens by the Bay & Marina Bay Sands SkyPark',
        description: 'Morning city tour covering Merlion Park, Little India, Chinatown. Afternoon visit to Gardens by the Bay (Flower Dome & Cloud Forest). Sunset ascension to Marina Bay Sands SkyPark Observation Deck for panoramic city views.',
        meals: 'Daily Breakfast',
        hotel: '4-Star Premium Hotel',
        activities: ['City Tour', 'Gardens by the Bay', 'MBS SkyPark']
      },
      {
        day: 3,
        title: 'Full Day Universal Studios Singapore',
        description: 'Full day of thrilling cinematic adventures across 6 themed zones at Universal Studios Singapore on Sentosa Island. Enjoy family rides, rollercoasters, and street shows.',
        meals: 'Daily Breakfast',
        hotel: '4-Star Premium Hotel',
        activities: ['Universal Studios 1-Day Pass']
      },
      {
        day: 4,
        title: 'S.E.A. Aquarium, Sentosa Cable Car & Leisure Shopping',
        description: 'Morning visit to S.E.A. Aquarium, home to over 100,000 marine animals. Ride the scenic Singapore Cable Car. Afternoon free for shopping at Orchard Road and 24-hour shopping at Mustafa Centre.',
        meals: 'Daily Breakfast',
        hotel: '4-Star Premium Hotel',
        activities: ['S.E.A. Aquarium', 'Cable Car Ride', 'Orchard Road Shopping']
      },
      {
        day: 5,
        title: 'Jewel Changi & Departure',
        description: 'Check out of hotel. Transfer to Changi Airport. Visit the iconic Jewel Rain Vortex waterfall and Canopy Park before boarding flight.',
        meals: 'Daily Breakfast',
        activities: ['Jewel Changi', 'Flight Departure']
      }
    ],
    inclusions: [
      '4 Nights 4-Star hotel accommodation with breakfast',
      'Roundtrip airport transfers in private air-conditioned vehicle',
      'Universal Studios Singapore One-Day Pass',
      'Night Safari with Tram Ride & Show ticket',
      'Gardens by the Bay (Flower Dome & Cloud Forest)',
      'Marina Bay Sands SkyPark Ticket',
      'Sentosa Cable Car and S.E.A. Aquarium Tickets'
    ],
    exclusions: ['Airfare, Visa, Personal Expenses, Travel Insurance'],
    importantNotes: ['Customizable for couples, families with seniors or young kids.'],
    seoTitle: 'Singapore Highlights & Sentosa 5D4N Tour | Kovai Compass Holidays',
    seoDescription: '5 Days 4 Nights Singapore package covering Night Safari, Universal Studios, Marina Bay Sands SkyPark, and Gardens by the Bay.'
  },
  {
    id: 'pkg-sri-lanka-cultural-escape',
    title: 'Sri Lanka Cultural Escape & Scenic Hills',
    slug: 'sri-lanka-cultural-escape',
    destination: 'Sri Lanka',
    destinationSlug: 'sri-lanka',
    durationDays: 5,
    durationNights: 4,
    startingPrice: 35000,
    currency: 'INR',
    priceNote: 'per person on twin sharing (sample estimate)',
    heroImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Explore Sigiriya Rock Fortress, Temple of the Tooth in Kandy, misty Nuwara Eliya tea hills, and Bentota beaches.',
    overview: 'A scenic and cultural voyage traversing Sri Lanka’s UNESCO world heritage treasures, royal hill stations, lush Ceylon tea plantations, and relaxing golden coastlines with a dedicated private air-conditioned vehicle and chauffeur-guide.',
    highlights: [
      'Climb the iconic 5th-century Sigiriya Lion Rock Fortress',
      'Sacred Temple of the Tooth Relic & Cultural Dance in Kandy',
      'Visit Pinnawala Elephant Orphanage / Millenium Elephant Foundation',
      'Scenic drive through Nuwara Eliya tea estates & waterfalls',
      'Bentota Beach & Madu River boat safari with fish therapy'
    ],
    travelStyle: 'Customized Trip',
    isFeatured: true,
    isBestSeller: true,
    isLuxury: false,
    isPublished: true,
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Colombo & Transfer to Kandy via Pinnawala',
        description: 'Arrive at Bandaranaike International Airport in Colombo. Meet your private chauffeur-guide. Drive to Kandy, stopping en route at Pinnawala Elephant Orphanage. Evening cultural dance performance in Kandy.',
        meals: 'Dinner at hotel',
        hotel: '4-Star Hill Resort in Kandy',
        activities: ['Airport Pickup', 'Pinnawala Elephants', 'Kandy Dance Show']
      },
      {
        day: 2,
        title: 'Kandy Temple of the Tooth & Sigiriya Excursion',
        description: 'Morning visit to the sacred Temple of the Tooth Relic. Excursion to climb the awe-inspiring Sigiriya Rock Fortress, admiring ancient frescoes and breathtaking panoramic views.',
        meals: 'Breakfast & Dinner',
        hotel: '4-Star Resort in Kandy / Sigiriya',
        activities: ['Temple of Tooth Relic', 'Sigiriya Rock Climbing', 'Spice Garden Visit']
      },
      {
        day: 3,
        title: 'Kandy to Nuwara Eliya "Little England"',
        description: 'Scenic mountain drive to Nuwara Eliya past cascading Ramboda Falls and emerald tea gardens. Visit a working Ceylon Tea Factory, Gregory Lake, and colonial Victoria Park.',
        meals: 'Breakfast & Dinner',
        hotel: 'Colonial 4-Star Resort in Nuwara Eliya',
        activities: ['Tea Factory & Plantation Tour', 'Ramboda Falls', 'Gregory Lake Boat Ride']
      },
      {
        day: 4,
        title: 'Nuwara Eliya to Bentota Beach Escape',
        description: 'Descend from the cool misty hills towards the tropical golden coast of Bentota. Experience a tranquil Madu River boat safari through mangrove tunnels, visit a Turtle Conservation Hatchery, and relax on the beach.',
        meals: 'Breakfast & Dinner',
        hotel: '4-Star Beach Resort in Bentota',
        activities: ['Madu River Mangrove Safari', 'Turtle Hatchery', 'Beach Relaxation']
      },
      {
        day: 5,
        title: 'Bentota to Colombo City Tour & Departure',
        description: 'Transfer to Colombo for a city orientation tour covering Galle Face Green, Independence Square, Gangaramaya Temple, and shopping at Odel. Evening transfer to airport for departure flight.',
        meals: 'Breakfast',
        activities: ['Colombo City Tour', 'Shopping at Odel', 'Airport Drop-off']
      }
    ],
    inclusions: [
      '4 Nights accommodation in 4-Star standard hotels with daily breakfast and dinner',
      'Entire tour in dedicated private air-conditioned vehicle with English/Tamil-speaking chauffeur guide',
      'All sightseeing and transfers as per itinerary',
      'All government taxes and toll charges'
    ],
    exclusions: ['Airfare, Sri Lanka ETA Visa, Entry monument tickets, Lunches, Personal expenses'],
    importantNotes: ['Can be customized to include Ella train ride or Yala National Park safari.'],
    seoTitle: 'Sri Lanka 5D4N Cultural & Scenic Tour | Kovai Compass Holidays',
    seoDescription: 'Discover Sri Lanka with our 5-day tour covering Kandy, Sigiriya Rock, Nuwara Eliya tea hills, and Bentota beach.'
  },
  {
    id: 'pkg-malaysia-kl-genting',
    title: 'Malaysia Kuala Lumpur & Genting Highlands',
    slug: 'malaysia-kl-genting',
    destination: 'Malaysia',
    destinationSlug: 'malaysia',
    durationDays: 4,
    durationNights: 3,
    startingPrice: 36000,
    currency: 'INR',
    priceNote: 'per person on twin sharing (sample estimate)',
    heroImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Petronas Twin Towers, Batu Caves, Genting SkyWorlds Theme Park, Awana SkyWay Cable Car & Putrajaya.',
    overview: 'An action-packed Malaysian escape taking you from the cosmopolitan skyscrapers of Kuala Lumpur to the misty heights and thrilling theme parks of Genting Highlands.',
    highlights: [
      'Genting Highlands Day Trip with Awana SkyWay Cable Car Ride',
      'Photo stop and temple visit at sacred Batu Caves',
      'Kuala Lumpur City Tour (Petronas Towers, King’s Palace, National Mosque)',
      'En-route tour of administrative capital Putrajaya',
      'Shopping at Bukit Bintang and Central Market'
    ],
    travelStyle: 'Family Holiday',
    isFeatured: true,
    isBestSeller: false,
    isLuxury: false,
    isPublished: true,
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Kuala Lumpur & Putrajaya Tour',
        description: 'Arrive at KLIA. Meet representative for transfer to hotel. En route, enjoy a brief photo stop at Putrajaya to view Putra Mosque and Perdana Putra. Check in at hotel in Kuala Lumpur.',
        meals: 'Breakfast at hotel (from Day 2)',
        hotel: '4-Star Hotel in Bukit Bintang / KLCC area',
        activities: ['KLIA Airport Pickup', 'Putrajaya Photo Stop', 'Hotel Check-in']
      },
      {
        day: 2,
        title: 'Genting Highlands Excursion & Batu Caves',
        description: 'Morning excursion to Genting Highlands. Stop at the famous Batu Caves to see the golden Lord Murugan statue. Board the Awana SkyWay cable car gliding over ancient rainforests. Enjoy leisure time at Genting SkyWorlds or SkyAvenue mall.',
        meals: 'Daily Breakfast',
        hotel: '4-Star Hotel in Kuala Lumpur',
        activities: ['Batu Caves Visit', 'Awana SkyWay Cable Car', 'Genting Highlands Theme Park']
      },
      {
        day: 3,
        title: 'Kuala Lumpur City Tour & KL Tower',
        description: 'Comprehensive half-day city tour covering Petronas Twin Towers photo stop, King’s Palace (Istana Negara), National Monument, Merdeka Square, and KL Tower observation ticket.',
        meals: 'Daily Breakfast',
        hotel: '4-Star Hotel in Kuala Lumpur',
        activities: ['KL City Tour', 'Petronas Towers Photo Stop', 'KL Tower Observation Deck']
      },
      {
        day: 4,
        title: 'Leisure Shopping & Departure',
        description: 'Breakfast at hotel. Free time for last-minute shopping at Pavilion Mall or Sungei Wang Plaza. Transfer to KLIA for your return flight.',
        meals: 'Daily Breakfast',
        activities: ['Shopping', 'Airport Drop-off']
      }
    ],
    inclusions: [
      '3 Nights accommodation in 4-Star hotel in KL with daily breakfast',
      'Return airport transfers on private / shared AC coach basis',
      'Genting Highlands Day Tour with 2-way Awana SkyWay Cable Car tickets',
      'Batu Caves photo stop',
      'Half-day Kuala Lumpur city tour with KL Tower ticket'
    ],
    exclusions: ['Airfare, Malaysia Tourist e-Visa / MDAC, Tourism tax (payable directly at hotel), Lunches & dinners'],
    importantNotes: ['Can easily be combined with Singapore via luxury coach or flight.'],
    seoTitle: 'Malaysia Kuala Lumpur & Genting 4D3N Package | Kovai Compass Holidays',
    seoDescription: 'Experience Kuala Lumpur, Batu Caves, and Genting Highlands with our best-value Malaysia tour package.'
  },
  {
    id: 'pkg-thailand-bangkok-pattaya',
    title: 'Thailand Bangkok & Pattaya Tropical Escape',
    slug: 'thailand-bangkok-pattaya',
    destination: 'Thailand',
    destinationSlug: 'thailand',
    durationDays: 5,
    durationNights: 4,
    startingPrice: 32500,
    currency: 'INR',
    priceNote: 'per person on twin sharing (sample estimate)',
    heroImage: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Coral Island Speedboat Tour in Pattaya, Chao Phraya Princess Dinner Cruise, Safari World & Bangkok city temples.',
    overview: 'A vibrant holiday featuring turquoise waters and thrilling watersports in Pattaya followed by rich cultural temples, grand wildlife parks, and an illuminated river dinner cruise in Bangkok.',
    highlights: [
      'Coral Island (Koh Larn) Speedboat tour with Indian buffet lunch',
      'Alcazar Cabaret Show VIP ticket in Pattaya',
      'Chao Phraya River Princess Luxury Dinner Cruise in Bangkok',
      'Full day Safari World & Marine Park with buffet lunch',
      'Bangkok Temple Tour (Golden Buddha & Marble Temple)'
    ],
    travelStyle: 'Friends & Groups',
    isFeatured: true,
    isBestSeller: true,
    isLuxury: false,
    isPublished: true,
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Bangkok & Transfer to Pattaya',
        description: 'Arrive at Suvarnabhumi / Don Mueang Airport. Meet our guide and transfer to Pattaya (approx 2 hrs). Check in at your resort. Evening visit to the glamorous Alcazar Show.',
        meals: 'Breakfast (from Day 2)',
        hotel: '4-Star Beach Resort in Pattaya',
        activities: ['Airport Pickup', 'Transfer to Pattaya', 'Alcazar Show']
      },
      {
        day: 2,
        title: 'Coral Island Speedboat Tour with Water Activities',
        description: 'Board a speedboat to Coral Island (Koh Larn). Enjoy white sandy beaches and crystal-clear waters. Participate in optional parasailing, undersea walking, or banana boat rides. Return for Indian buffet lunch.',
        meals: 'Breakfast & Indian Lunch',
        hotel: '4-Star Beach Resort in Pattaya',
        activities: ['Speedboat to Coral Island', 'Watersports', 'Indian Buffet Lunch']
      },
      {
        day: 3,
        title: 'Pattaya to Bangkok & Chao Phraya Dinner Cruise',
        description: 'Check out of Pattaya hotel and transfer to Bangkok. Check in to your hotel. Evening luxury dinner cruise aboard Chao Phraya Princess with live music and illuminated temple views.',
        meals: 'Breakfast & Dinner Cruise',
        hotel: '4-Star Hotel in Central Bangkok (Pratunam/Sukhumvit)',
        activities: ['Transfer to Bangkok', 'Chao Phraya Dinner Cruise']
      },
      {
        day: 4,
        title: 'Safari World & Marine Park Full Day',
        description: 'Full day at Thailand’s greatest open zoo and leisure park. Drive through the open safari, enjoy the dolphin show, sea lion show, and Hollywood cowboy stunt show.',
        meals: 'Breakfast & Buffet Lunch',
        hotel: '4-Star Hotel in Central Bangkok',
        activities: ['Safari World Drive', 'Marine Park Shows', 'Buffet Lunch']
      },
      {
        day: 5,
        title: 'Bangkok City Temple Tour & Departure',
        description: 'Morning guided tour of Wat Traimit (Golden Buddha) and Wat Benchamabophit (Marble Temple). Free time for shopping at MBK or Pratunam before airport transfer.',
        meals: 'Breakfast',
        activities: ['Temple Tour', 'Shopping', 'Airport Departure']
      }
    ],
    inclusions: [
      '2 Nights in Pattaya 4-Star hotel + 2 Nights in Bangkok 4-Star hotel with breakfast',
      'All airport, intercity (BKK-Pattaya-BKK), and sightseeing transfers in AC vehicle',
      'Coral Island tour by speedboat with Indian lunch',
      'Alcazar Cabaret Show normal/VIP ticket',
      'Chao Phraya Princess Dinner Cruise ticket',
      'Safari World & Marine Park full-day pass with lunch',
      'Bangkok City & Temple tour'
    ],
    exclusions: ['Airfare, Thailand Visa fees, Personal expenses, Watersport fees on Coral Island'],
    importantNotes: ['Can be extended to include Phuket or Krabi upon request.'],
    seoTitle: 'Thailand Bangkok & Pattaya 5D4N Package | Kovai Compass Holidays',
    seoDescription: 'Book Thailand holiday packages covering Pattaya Coral Island, Bangkok Safari World, and Chao Phraya dinner cruise.'
  },
  {
    id: 'pkg-cambodia-angkor-discovery',
    title: 'Cambodia Heritage & Angkor Wat Discovery',
    slug: 'cambodia-angkor-discovery',
    destination: 'Cambodia',
    destinationSlug: 'cambodia',
    durationDays: 4,
    durationNights: 3,
    startingPrice: 39500,
    currency: 'INR',
    priceNote: 'per person on twin sharing (sample estimate)',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Witness the sunrise over Angkor Wat, mystical jungle temple of Ta Prohm, stone faces of Bayon & Tonle Sap Lake.',
    overview: 'An inspiring journey through the ancient Khmer Empire in Siem Reap. Experience the magic of Angkor Wat at sunrise, the root-covered ruins of Ta Prohm, the smiling stone faces of Bayon, and a floating village boat cruise on Tonle Sap.',
    highlights: [
      'Sunrise over Angkor Wat temple complex with certified Khmer historian guide',
      'Explore Ta Prohm (Tomb Raider Temple) overgrown with giant trees',
      'Angkor Thom royal city and Bayon Temple stone faces',
      'Boat cruise on Tonle Sap Lake to observe traditional floating communities',
      'Traditional Khmer Apsara Dance performance with buffet dinner'
    ],
    travelStyle: 'Customized Trip',
    isFeatured: true,
    isBestSeller: false,
    isLuxury: false,
    isPublished: true,
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Siem Reap & Artisan Village',
        description: 'Arrive at Siem Reap International Airport. Private pickup and transfer to your hotel. Afternoon visit to Artisans Angkor craft workshop and vibrant Old Market (Phsar Chas).',
        meals: 'Breakfast at hotel (from Day 2)',
        hotel: '4-Star Boutique Resort in Siem Reap',
        activities: ['Airport Pickup', 'Artisans Angkor', 'Old Market']
      },
      {
        day: 2,
        title: 'Sunrise at Angkor Wat, Ta Prohm & Bayon',
        description: 'Early morning pickup to witness sunrise over the lotus reflection ponds of Angkor Wat. Explore the central sanctuary and bas-reliefs. Continue to Ta Prohm jungle temple and the enigmatic smiling stone faces of Bayon in Angkor Thom.',
        meals: 'Breakfast at hotel & Apsara Dinner',
        hotel: '4-Star Boutique Resort in Siem Reap',
        activities: ['Angkor Wat Sunrise', 'Ta Prohm', 'Bayon Temple', 'Apsara Dance Dinner Show']
      },
      {
        day: 3,
        title: 'Tonle Sap Floating Village Boat Cruise & Banteay Srei',
        description: 'Visit the exquisitely carved pink sandstone temple of Banteay Srei. Afternoon boat expedition on Tonle Sap Lake to visit floating schools, markets, and stilt houses.',
        meals: 'Daily Breakfast',
        hotel: '4-Star Boutique Resort in Siem Reap',
        activities: ['Banteay Srei Temple', 'Tonle Sap Boat Cruise']
      },
      {
        day: 4,
        title: 'Siem Reap Departure',
        description: 'Breakfast at hotel. Free time for souvenir shopping before your private transfer to Siem Reap Airport.',
        meals: 'Daily Breakfast',
        activities: ['Shopping', 'Airport Transfer']
      }
    ],
    inclusions: [
      '3 Nights in 4-Star boutique hotel in Siem Reap with breakfast',
      'Roundtrip private airport and sightseeing transfers in AC vehicle',
      'Professional English-speaking licensed temple tour guide',
      'Tonle Sap boat cruise ticket',
      'Apsara traditional dance show with dinner'
    ],
    exclusions: ['Airfare, Cambodia e-Visa / Visa-on-Arrival, Angkor Archaeological Temple Pass ($37), Personal expenses'],
    importantNotes: ['Can be paired with Vietnam or Thailand tours.'],
    seoTitle: 'Cambodia Siem Reap & Angkor Wat 4D3N | Kovai Compass Holidays',
    seoDescription: 'Witness Angkor Wat sunrise, Bayon stone faces, Ta Prohm, and Tonle Sap lake on our curated Cambodia tour.'
  },
  {
    id: 'pkg-singapore-malaysia-twin',
    title: 'Singapore & Malaysia Twin-Country Grand Tour',
    slug: 'singapore-malaysia-twin-country',
    destination: 'Singapore & Malaysia',
    destinationSlug: 'singapore',
    durationDays: 7,
    durationNights: 6,
    startingPrice: 78000,
    currency: 'INR',
    priceNote: 'per person on twin sharing (sample estimate)',
    heroImage: 'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'The complete Southeast Asia holiday: Universal Studios Singapore, Sentosa, Night Safari, KL Petronas Towers & Genting Highlands.',
    overview: 'Experience two of Asia’s most captivating nations in one seamless 7-day holiday. Spend 3 nights in high-tech Singapore enjoying world-famous theme parks and gardens, then travel to vibrant Malaysia for 3 nights exploring Kuala Lumpur and mountain adventures in Genting.',
    highlights: [
      'Universal Studios Singapore Full Day Pass',
      'Gardens by the Bay & Sentosa Island Tour',
      'World-famous Night Safari experience in Singapore',
      'Smooth coach transfer or flight between Singapore & Kuala Lumpur',
      'Genting Highlands with Awana Cable Car & Batu Caves',
      'Petronas Twin Towers & Kuala Lumpur City Tour'
    ],
    travelStyle: 'Family Holiday',
    isFeatured: true,
    isBestSeller: true,
    isLuxury: true,
    isPublished: true,
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Singapore & Night Safari',
        description: 'Arrive in Singapore. Transfer to hotel. Evening nocturnal safari tram tour at Mandai Wildlife Reserve.',
        meals: 'Breakfast (from Day 2)',
        hotel: '4-Star Singapore Hotel',
        activities: ['Airport Pickup', 'Night Safari']
      },
      {
        day: 2,
        title: 'Universal Studios Singapore Full Day',
        description: 'Full day of thrilling rides and attractions at Universal Studios Singapore on Sentosa Island.',
        meals: 'Daily Breakfast',
        hotel: '4-Star Singapore Hotel',
        activities: ['Universal Studios 1-Day Pass']
      },
      {
        day: 3,
        title: 'Gardens by the Bay & Sentosa Highlights',
        description: 'Explore Gardens by the Bay Flower Dome & Cloud Forest. Afternoon cable car ride and Wings of Time laser show.',
        meals: 'Daily Breakfast',
        hotel: '4-Star Singapore Hotel',
        activities: ['Gardens by the Bay', 'Cable Car', 'Wings of Time']
      },
      {
        day: 4,
        title: 'Singapore to Kuala Lumpur Transfer',
        description: 'After breakfast, executive AC coach transfer crossing the Johor-Singapore Causeway to Kuala Lumpur. Check in at hotel in KL.',
        meals: 'Daily Breakfast',
        hotel: '4-Star Kuala Lumpur Hotel',
        activities: ['Intercity Transfer', 'KL Check-in', 'Evening Bukit Bintang walk']
      },
      {
        day: 5,
        title: 'Genting Highlands Excursion & Batu Caves',
        description: 'Visit Batu Caves Lord Murugan statue and 272 steps. Ascend to Genting Highlands via Awana SkyWay Cable Car for mountain entertainment.',
        meals: 'Daily Breakfast',
        hotel: '4-Star Kuala Lumpur Hotel',
        activities: ['Batu Caves', 'Awana SkyWay Cable Car', 'Genting Theme Parks']
      },
      {
        day: 6,
        title: 'Kuala Lumpur City Tour & KL Tower',
        description: 'Guided tour covering Petronas Twin Towers, King’s Palace, National Monument, and KL Tower observation deck. Evening shopping.',
        meals: 'Daily Breakfast',
        hotel: '4-Star Kuala Lumpur Hotel',
        activities: ['City Tour', 'KL Tower Ticket', 'Shopping']
      },
      {
        day: 7,
        title: 'Departure from Kuala Lumpur',
        description: 'Breakfast at hotel. Free time until airport transfer for your return flight home.',
        meals: 'Daily Breakfast',
        activities: ['Airport Transfer']
      }
    ],
    inclusions: [
      '3 Nights Singapore 4-Star + 3 Nights Kuala Lumpur 4-Star hotel with breakfast',
      'Singapore Night Safari, Universal Studios, and Gardens by the Bay tickets',
      'Sentosa Cable Car and Wings of Time tickets',
      'Comfortable transfer between Singapore and Kuala Lumpur',
      'Genting Highlands Day Tour with Awana Cable Car & Batu Caves',
      'Kuala Lumpur City Tour with KL Tower ticket',
      'All airport transfers'
    ],
    exclusions: ['International Flights, Visas for Singapore & Malaysia, Lunches & Dinners'],
    importantNotes: ['Our most popular family holiday combination.'],
    seoTitle: 'Singapore & Malaysia 7D6N Grand Tour | Kovai Compass Holidays',
    seoDescription: '7-day dual country tour package covering Universal Studios Singapore, Sentosa, Night Safari, KL Petronas Towers, and Genting Highlands.'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-singapore-visa-guide',
    title: 'Complete Guide to Singapore Visa for Indian Travellers in 2026',
    slug: 'singapore-visa-guide-for-indians',
    featuredImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Everything you need to know regarding documents, eligibility, processing times, and photo specifications for a seamless Singapore e-Visa application.',
    content: `Planning a holiday to Singapore from India? The process for obtaining a Singapore tourist visa is straightforward when handled with accurate documentation.

### Essential Document Checklist:
1. **Original Passport**: Valid for at least 6 months from the intended date of entry into Singapore.
2. **Completed Form 14A**: Duly filled and signed by the applicant.
3. **Recent Passport Photographs**: Taken against a matte white background with 80% face coverage (35mm x 45mm), without borders.
4. **Covering Letter**: Addressed to the Embassy/Consulate of Singapore stating travel dates, purpose, and itinerary.
5. **Confirmed Flight Tickets & Hotel Bookings**: Roundtrip reservation itineraries.
6. **Bank Statements**: Updated bank statements for the last 3 to 6 months with sufficient funds.

### Processing Timeline:
Singapore e-Visas typically take 3 to 5 business days for processing through authorized travel agencies like Kovai Compass Holidays.

### Pro-Tips from our Travel Experts:
* Avoid applying more than 30 days before departure, as standard tourist visas have a 30 to 60-day validity window.
* Ensure photograph requirements strictly match Singapore ICA guidelines to prevent avoidable delays.`,
    category: 'Visa Information',
    author: 'Kovai Compass Travel Desk',
    readTime: '4 min read',
    publishedDate: '2026-06-10',
    isFeatured: true,
    isPublished: true,
    tags: ['Singapore', 'Visa Guide', 'Travel Tips', 'Documentation'],
    seoTitle: 'Singapore Visa Guide for Indians 2026 | Kovai Compass Holidays',
    seoDescription: 'Step-by-step Singapore visa guide for Indian citizens. Learn about required documents, processing time, and expert tips.'
  },
  {
    id: 'blog-singapore-family-planning',
    title: 'Top 7 Things to Do in Singapore with Kids & Seniors',
    slug: 'singapore-family-holiday-guide',
    featuredImage: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Discover why Singapore is ranked as Asia’s most family-friendly holiday destination, featuring barrier-free access and thrilling theme parks.',
    content: `Singapore stands out globally as the premier international destination for multi-generational family holidays. Here are our top 7 recommendations:

1. **Universal Studios Singapore**: Thrilling rides for teens and delightful character meet-and-greets for young kids.
2. **Gardens by the Bay**: Cool indoor conservatories with gentle ramps suitable for grandparents and strollers.
3. **S.E.A. Aquarium**: Walk through transparent tunnels beneath manta rays and sharks.
4. **Singapore Zoo & Night Safari**: Open concept tram rides through nocturnal animal habitats.
5. **Sentosa Cable Car**: Enjoy panoramic views of the harbor and lush islands.
6. **Jewel Changi Canopy Park**: Relax by the indoor rainforest and bouncing nets before flying home.
7. **Merlion Park & Marina Bay Boardwalk**: An iconic family photo spot against the futuristic skyline.`,
    category: 'Family Travel',
    author: 'Kovai Compass Holidays',
    readTime: '5 min read',
    publishedDate: '2026-05-18',
    isFeatured: true,
    isPublished: true,
    tags: ['Singapore', 'Family Travel', 'Universal Studios', 'Sentosa'],
    seoTitle: 'Singapore Family Travel Guide | Kovai Compass Holidays',
    seoDescription: 'The ultimate family guide for planning a Singapore holiday with kids and elderly parents.'
  },
  {
    id: 'blog-best-time-sri-lanka',
    title: 'When is the Best Time to Visit Sri Lanka? A Month-by-Month Guide',
    slug: 'best-time-to-visit-sri-lanka',
    featuredImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Understand Sri Lanka’s dual monsoon system so you can plan the perfect beach and cultural hill country holiday.',
    content: `Because Sri Lanka experiences two distinct monsoon seasons affecting opposite coasts at different times, it is truly a year-round travel destination when you know where to go!

### West & South Coast (Bentota, Galle, Colombo):
* **Best Months**: December to April.
* Clear blue skies, calm waters ideal for swimming and water sports.

### Hill Country (Kandy, Nuwara Eliya, Ella):
* **Best Months**: January to April.
* Crisp, pleasant mountain air perfect for scenic hikes and tea plantation tours.

### Cultural Triangle (Sigiriya, Dambulla):
* **Best Months**: Year-round, especially dry from May to September.`,
    category: 'Best Time to Visit',
    author: 'Kovai Compass Travel Desk',
    readTime: '4 min read',
    publishedDate: '2026-04-22',
    isFeatured: false,
    isPublished: true,
    tags: ['Sri Lanka', 'Weather', 'Best Season', 'Travel Tips'],
    seoTitle: 'Best Time to Visit Sri Lanka | Kovai Compass Holidays',
    seoDescription: 'Find out the best season to explore Sri Lanka beaches, Kandy temples, and Nuwara Eliya tea hills.'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    customerName: 'Senthil & Family',
    destination: 'Singapore',
    tourPackageName: 'Singapore Family Escape',
    rating: 5,
    travelDate: 'May 2026',
    location: 'Coimbatore, India',
    customerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    review: 'Our 4-day Singapore trip organized by Kovai Compass Holidays was flawless. From smooth airport pickup to pre-booked tickets for Universal Studios and Gardens by the Bay, everything went like clockwork. Our kids and elderly parents were comfortable throughout.',
    isVerified: true,
    isPublished: true
  },
  {
    id: 'test-2',
    customerName: 'Priya & Vignesh',
    destination: 'Singapore & Sentosa',
    tourPackageName: 'Singapore Highlights & Sentosa Leisure',
    rating: 5,
    travelDate: 'June 2026',
    location: 'Chennai, India',
    customerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    review: 'The personalized itinerary design for our honeymoon in Singapore was extraordinary. The hotel recommendations in Marina Bay and private transfers made us feel pampered. Special thanks to the team for 24/7 WhatsApp assistance during our travel.',
    isVerified: true,
    isPublished: true
  },
  {
    id: 'test-3',
    customerName: 'Dr. Rajesh Kumar',
    destination: 'Sri Lanka',
    tourPackageName: 'Sri Lanka Cultural Escape',
    rating: 5,
    travelDate: 'April 2026',
    location: 'Tirupur, India',
    customerPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    review: 'Sigiriya, Nuwara Eliya, and Bentota were breathtaking. Having our own dedicated vehicle and polite chauffeur-guide made the whole experience relaxed and culturally informative. Highly recommend Kovai Compass Holidays for international packages.',
    isVerified: true,
    isPublished: true
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Booking & Payments',
    question: 'How do I book or confirm a holiday package?',
    answer: 'Simply click "Enquire Now" or "Plan My Trip" on any package or destination. Submit your dates, passenger details, and preferences. Our travel specialists will review your requirements, customize the itinerary, share a detailed quotation, and assist with offline confirmation and documentation.'
  },
  {
    id: 'faq-2',
    category: 'Booking & Payments',
    question: 'Do I need to pay online through the website?',
    answer: 'No online payment gateway is required on our website. All bookings and payments are handled securely through direct bank transfers, UPI, or office visits after your customized itinerary is confirmed with our travel consultant.'
  },
  {
    id: 'faq-3',
    category: 'Customization',
    question: 'Can I customize the hotel category, duration, and sightseeing days?',
    answer: 'Absolutely! Every single package can be customized. You can upgrade hotel ratings (3★, 4★, 5★ luxury), add or remove attraction days, include private vehicles, or add specific theme parks based on your budget and preference.'
  },
  {
    id: 'faq-4',
    category: 'Visas & Documentation',
    question: 'Do you assist with international visas and flight bookings?',
    answer: 'Yes, we provide end-to-end assistance including visa document verification, submission guidance for Singapore, Malaysia, Thailand, Sri Lanka, and Cambodia, as well as competitive flight booking options.'
  },
  {
    id: 'faq-5',
    category: 'Singapore',
    question: 'Why is Singapore the most recommended destination for family vacations?',
    answer: 'Singapore offers top-tier safety, world-class cleanliness, English communication, wheelchair and stroller accessibility everywhere, and diverse entertainment from Universal Studios to Night Safari that captivates both children and senior travellers.'
  },
  {
    id: 'faq-6',
    category: 'General',
    question: 'What kind of support is available during our trip abroad?',
    answer: 'You will have 24/7 direct WhatsApp and phone support with our dedicated operations desk, plus local on-ground representatives and drivers at your destination to ensure immediate assistance.'
  }
];

export const INITIAL_SAMPLE_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-101',
    referenceNumber: 'KCH-2026-8491',
    name: 'Manoj Sundaram',
    email: 'manoj.sundaram@example.com',
    phone: '+91 98421 55678',
    destination: 'Singapore',
    packageId: 'pkg-singapore-family-escape',
    packageTitle: 'Singapore Family Escape',
    travelDate: '2026-10-15',
    adults: 2,
    children: 2,
    duration: '4 Days / 3 Nights',
    budget: '₹1,50,000 - ₹2,00,000',
    travelStyle: 'Family Holiday',
    message: 'Looking for a 4-star hotel near Little India with tickets to Universal Studios and Night Safari for my 8 and 12-year-old kids.',
    source: 'Package Page',
    status: 'New',
    createdAt: '2026-08-14T09:30:00Z',
    internalNotes: 'First-time international traveller. Prefers Indian vegetarian breakfast.'
  },
  {
    id: 'enq-102',
    referenceNumber: 'KCH-2026-8492',
    name: 'Kavitha Ramachandran',
    email: 'kavitha.r@example.com',
    phone: '+91 94432 99812',
    destination: 'Malaysia & Singapore',
    packageId: 'pkg-singapore-malaysia-twin',
    packageTitle: 'Singapore & Malaysia Twin-Country Grand Tour',
    travelDate: '2026-11-05',
    adults: 4,
    children: 0,
    duration: '7 Days / 6 Nights',
    budget: '₹3,00,000+',
    travelStyle: 'Friends & Groups',
    message: 'Group of 4 adults travelling for vacation. Need 2 double rooms.',
    source: 'Homepage Planner',
    status: 'Contacted',
    assignedStaff: 'Travel Desk Team',
    createdAt: '2026-08-13T14:15:00Z',
    internalNotes: 'Contacted on WhatsApp; shared preliminary itinerary PDF.'
  }
];
