export type DestinationId = 'singapore' | 'malaysia' | 'thailand' | 'sri-lanka' | 'cambodia' | string;

export type TravelStyle = 
  | 'Family Holiday'
  | 'Honeymoon'
  | 'Luxury'
  | 'Adventure'
  | 'Friends & Groups'
  | 'Corporate'
  | 'Senior-Friendly'
  | 'Customized Trip';

export type EnquiryStatus = 
  | 'New'
  | 'Contacted'
  | 'Follow-Up'
  | 'Quoted'
  | 'Confirmed'
  | 'Cancelled'
  | 'Closed';

export interface DayItinerary {
  day: number;
  title: string;
  description: string;
  meals?: string;
  hotel?: string;
  activities?: string[];
}

export interface TourPackage {
  id: string;
  title: string;
  slug: string;
  destination: string;
  destinationSlug: string;
  durationDays: number;
  durationNights: number;
  startingPrice: number; // in INR
  currency: string;
  priceNote?: string; // e.g. "per person on twin sharing"
  heroImage: string;
  galleryImages: string[];
  shortDescription: string;
  overview: string;
  highlights: string[];
  travelStyle: TravelStyle;
  isFeatured: boolean;
  isBestSeller?: boolean;
  isLuxury?: boolean;
  isFamilyFavorite?: boolean;
  isNew?: boolean;
  isPublished: boolean;
  itinerary: DayItinerary[];
  inclusions: string[];
  exclusions: string[];
  hotelDetails?: string;
  importantNotes: string[];
  optionalAddOns?: { title: string; price?: number; description?: string }[];
  faqs?: { question: string; answer: string }[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  slug: string;
  tagline: string;
  heroImage: string;
  galleryImages: string[];
  shortDescription: string;
  longDescription: string;
  whyVisit: string[];
  topAttractions: { name: string; description: string; image: string }[];
  bestTimeToVisit: string;
  travelTips: string[];
  highlights: string[];
  faqs: { question: string; answer: string }[];
  isPublished: boolean;
  isPopular?: boolean;
  startingPriceEstimate?: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Enquiry {
  id: string;
  referenceNumber: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  packageId?: string;
  packageTitle?: string;
  travelDate?: string;
  adults: number;
  children: number;
  duration?: string;
  budget?: string;
  travelStyle?: string;
  message?: string;
  source: 'Package Page' | 'Homepage Planner' | 'Destination Page' | 'Custom Tour' | 'Contact Form' | 'Direct';
  status: EnquiryStatus;
  assignedStaff?: string;
  internalNotes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CustomTripRequest {
  id: string;
  referenceNumber: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  departureCity: string;
  preferredTravelDate: string;
  returnDate?: string;
  durationDays?: number;
  adults: number;
  children: number;
  budget: string;
  hotelCategory: '3 Star Standard' | '4 Star Premium' | '5 Star Luxury' | 'Luxury Boutique';
  travelStyle: TravelStyle;
  interests: string[];
  specialRequests?: string;
  status: EnquiryStatus;
  assignedStaff?: string;
  internalNotes?: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  shortDescription: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  publishedDate: string;
  isFeatured: boolean;
  isPublished: boolean;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  destination: string;
  rating: number; // 1-5
  travelDate: string;
  review: string;
  customerPhoto?: string;
  tourPackageName?: string;
  location?: string; // e.g. "Chennai, India" or "Coimbatore"
  isVerified: boolean;
  isPublished: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Booking & Payments' | 'Customization' | 'Visas & Documentation' | 'Singapore' | 'International Travel';
  order?: number;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  secondaryTagline: string;
  primaryMarket: string;
  domain: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string; // international digits without + or dashes for wa.me e.g. "919876543210"
  whatsappDisplay: string;
  email: string;
  supportEmail?: string;
  officeAddress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  googleBusinessProfileUrl: string;
  googleMapsEmbedUrl: string;
  businessHours: string;
  announcementText?: string;
  showAnnouncement?: boolean;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    twitter?: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
  adminUsername?: string;
  adminPassword?: string;
}
