import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TripPlannerSearch } from '../components/home/TripPlannerSearch';
import { FeaturedDestinations } from '../components/home/FeaturedDestinations';
import { useStore } from '../services/storeContext';
import { formatINR } from '../utils/helpers';
import { handleImageError } from '../utils/imageFallback';
import { 
  ShieldCheck, 
  Clock, 
  Award, 
  Headphones, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  MapPin, 
  Calendar, 
  ChevronRight,
  Send,
  Compass,
  FileText,
  UserCheck,
  ChevronDown
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { packages, testimonials, blogPosts, faqs, openEnquiryModal } = useStore();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Featured Packages
  const featuredPackages = packages.filter(p => p.isPublished && p.isFeatured).slice(0, 6);

  // Published Blogs preview
  const featuredBlogs = blogPosts.filter(b => b.isPublished).slice(0, 3);

  // Published Testimonials
  const publishedTestimonials = testimonials.filter(t => t.isPublished).slice(0, 3);

  // Top General FAQs
  const homeFaqs = faqs.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. Hero Carousel */}
      <HeroSection onNavigate={onNavigate} />

      {/* 2. Interactive Trip Planner Quick Form */}
      <TripPlannerSearch onNavigate={onNavigate} />

      {/* 3. Core Value Propositions & Trust Bar */}
      <section className="py-10 sm:py-12 bg-white border-y border-slate-200 mt-6 sm:mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="p-2.5 rounded-xl bg-teal-100/70 text-[#0D7F86] shrink-0">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm sm:text-base">Handcrafted Itineraries</h3>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Tailor-made itineraries designed for families, couples, and groups with balanced pacing.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="p-2.5 rounded-xl bg-amber-100/70 text-[#C99A2E] shrink-0">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm sm:text-base">Transparent Pricing</h3>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Clear itemized inclusions with zero hidden costs and offline booking security.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="p-2.5 rounded-xl bg-blue-100/70 text-[#071B33] shrink-0">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm sm:text-base">End-to-End Visa Care</h3>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Complete documentation guidance, Singapore e-Visa, Malaysia MDAC, and paperwork support.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="p-2.5 rounded-xl bg-emerald-100/70 text-emerald-700 shrink-0">
                <Headphones className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm sm:text-base">24/7 On-Trip Support</h3>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Dedicated tour coordinators reachable anytime via WhatsApp while you travel abroad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured International Destinations (5 Core Hubs) */}
      <FeaturedDestinations onNavigate={onNavigate} />

      {/* 5. Best Seller Tour Packages Showcase */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-3">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-3 py-0.5 rounded-full text-xs font-bold text-amber-800 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#C99A2E]" />
                <span>Curated Holiday Collection</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#071B33]">
                Featured Tour Packages
              </h2>
              <p className="text-slate-600 text-xs sm:text-base max-w-2xl">
                Explore our most popular, expertly planned itineraries across Singapore, Malaysia, Thailand, Sri Lanka, and Cambodia.
              </p>
            </div>

            <button
              onClick={() => onNavigate('/packages')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0D7F86] hover:text-[#071B33] transition-colors self-start md:self-auto"
            >
              <span>View All Tour Packages</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Package Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => onNavigate(`/packages/${pkg.slug}`)}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Image & Badges */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pkg.heroImage}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                  {/* Badges Top Left & Right */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {pkg.isBestSeller && (
                      <span className="bg-[#C99A2E] text-[#071B33] text-[10px] font-extrabold px-2.5 py-1 rounded shadow-md uppercase tracking-wider">
                        Bestseller
                      </span>
                    )}
                    {pkg.destinationSlug === 'singapore' && (
                      <span className="bg-[#0D7F86] text-white text-[10px] font-bold px-2 py-1 rounded shadow-md">
                        Singapore Special
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md border border-white/20">
                    {pkg.durationDays}D / {pkg.durationNights}N
                  </div>

                  {/* Destination Tag */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{pkg.destination}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-teal-300">{pkg.travelStyle}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#071B33] group-hover:text-[#0D7F86] transition-colors leading-snug line-clamp-2">
                      {pkg.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                      {pkg.shortDescription}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-1">
                    {pkg.highlights.slice(0, 2).map((hl, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0D7F86] shrink-0" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & Action */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-500 font-medium">Starting from</div>
                      <div className="text-lg font-extrabold text-[#071B33]">
                        {formatINR(pkg.startingPrice)}
                        <span className="text-[11px] font-normal text-slate-500 ml-1">/ person</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEnquiryModal({
                          destination: pkg.destination,
                          packageId: pkg.id,
                          packageTitle: pkg.title
                        });
                      }}
                      className="bg-gradient-to-r from-[#0D7F86] to-[#14A2AC] hover:from-[#071B33] hover:to-[#0D7F86] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Custom Tour Banner Promotion */}
      <section className="py-10 sm:py-12 bg-gradient-to-r from-[#071B33] via-[#0B2748] to-[#0D7F86] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3 text-left">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold px-3 py-0.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>100% Tailor-Made Travel</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                Want a Customized Multi-Country Itinerary?
              </h2>
              <p className="text-slate-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Combine Singapore & Malaysia, plan an exclusive honeymoon to Thailand, or take an extended heritage journey to Cambodia. Our travel experts tailor every detail to your schedule, budget, and family preferences.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-center">
              <button
                onClick={() => onNavigate('/custom-tours')}
                className="btn-gold-gradient font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xl transition-all transform hover:-translate-y-0.5 text-center cursor-pointer"
              >
                Build Custom Itinerary →
              </button>
              <button
                onClick={() => openEnquiryModal()}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl border border-white/20 backdrop-blur-md transition-all text-center cursor-pointer"
              >
                Talk to Travel Specialist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Customer Reviews & Testimonials */}
      <section className="py-12 sm:py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2">
            <div className="inline-flex items-center gap-1 bg-amber-100 border border-amber-200 px-3 py-0.5 rounded-full text-xs font-bold text-amber-900 uppercase">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Real Traveller Stories</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#071B33]">
              What Our Travellers Say
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Hear from families, couples, and friends who traveled across Singapore, Malaysia, and Asia with Kovai Compass Holidays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {publishedTestimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < t.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed">
                    "{t.review}"
                  </p>
                </div>

                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs sm:text-sm">{t.customerName}</h4>
                    <p className="text-[11px] text-slate-500">{t.location || 'India'} • {t.destination}</p>
                  </div>
                  {t.isVerified && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified Tour
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Travel Insights & Blog Section */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-3">
            <div>
              <div className="inline-flex items-center gap-1 bg-teal-50 border border-teal-200 px-3 py-0.5 rounded-full text-xs font-bold text-teal-800 uppercase">
                <FileText className="w-3.5 h-3.5 text-[#0D7F86]" />
                <span>Expert Travel Guides</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#071B33] mt-1.5">
                Travel Insights & Visa Advice
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/travel-guide')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0D7F86] hover:text-[#071B33]"
            >
              <span>Explore All Guides</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {featuredBlogs.map((post) => (
              <div
                key={post.id}
                onClick={() => onNavigate(`/travel-guide/${post.slug}`)}
                className="group cursor-pointer bg-[#F8FAFC] rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <span className="absolute top-3 left-3 bg-[#071B33]/85 text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-2.5">
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium mb-1">
                      {post.publishedDate} • {post.readTime}
                    </div>
                    <h3 className="font-display text-sm sm:text-base font-bold text-[#071B33] group-hover:text-[#0D7F86] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                      {post.shortDescription}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-1 text-xs font-bold text-[#0D7F86]">
                    <span>Read Full Article</span>
                    <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ Accordion */}
      <section className="py-12 sm:py-16 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 space-y-1.5">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#071B33]">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Answers to common queries regarding tour planning, bookings, and international documentation.
            </p>
          </div>

          <div className="space-y-3">
            {homeFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.id || idx}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-semibold text-slate-800 hover:text-[#0D7F86] transition-colors text-sm sm:text-base"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#0D7F86]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
