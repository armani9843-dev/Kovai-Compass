import React, { useState } from 'react';
import { useStore } from '../services/storeContext';
import { formatINR } from '../utils/helpers';
import { handleImageError } from '../utils/imageFallback';
import { 
  MapPin, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  ChevronDown, 
  Send,
  Compass,
  FileCheck2,
  Clock,
  ArrowLeft
} from 'lucide-react';

interface DestinationDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const DestinationDetailPage: React.FC<DestinationDetailPageProps> = ({ slug, onNavigate }) => {
  const { destinations, packages, openEnquiryModal } = useStore();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const cleanSlug = decodeURIComponent(slug || '').trim().toLowerCase();
  const destination = destinations.find(d => d.slug.toLowerCase() === cleanSlug || d.id.toLowerCase() === cleanSlug) || destinations[0];

  if (!destination) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-[#C99A2E] flex items-center justify-center mb-4">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '20s' }} />
        </div>
        <h2 className="text-2xl font-bold text-[#071B33]">Destination Not Found</h2>
        <p className="text-sm text-slate-600 max-w-md mt-2">
          The requested destination could not be located. Explore all our Asian destinations below.
        </p>
        <button 
          onClick={() => onNavigate('/destinations')}
          className="mt-5 px-6 py-2.5 bg-[#0D7F86] hover:bg-[#071B33] text-white font-bold text-xs rounded-xl shadow transition-all"
        >
          View All Destinations
        </button>
      </div>
    );
  }

  // Packages for this destination
  const destPackages = packages.filter(
    p => p.isPublished && (p.destinationSlug === destination.slug || p.destination.toLowerCase().includes(destination.name.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Header */}
      <div className="relative min-h-[340px] sm:min-h-[380px] bg-[#071B33] flex items-end">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071B33] via-[#071B33]/70 to-black/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-8 pt-16 w-full text-white">
          <button
            onClick={() => onNavigate('/destinations')}
            className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white mb-3 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Destinations</span>
          </button>

          <div className="max-w-3xl space-y-2.5">
            <div className="inline-flex items-center gap-2 bg-[#C99A2E] text-[#071B33] px-3 py-0.5 rounded-md text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{destination.country}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {destination.name}
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
              {destination.tagline}
            </p>

            <div className="pt-1.5 flex flex-wrap gap-3">
              <button
                onClick={() => openEnquiryModal({ destination: destination.name })}
                className="bg-gradient-to-r from-[#C99A2E] to-[#E1BC63] text-[#071B33] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg hover:brightness-105 transition-all"
              >
                Plan Custom {destination.name} Trip
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="font-display text-2xl font-bold text-[#071B33]">
                Overview of {destination.name}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {destination.longDescription}
              </p>

              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0D7F86] uppercase mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>Best Time to Visit</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700">{destination.bestTimeToVisit}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#C99A2E] uppercase mb-1">
                    <FileCheck2 className="w-4 h-4" />
                    <span>Visa Guidance</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700">Full assistance for documentation & electronic visa applications.</p>
                </div>
              </div>
            </section>

            {/* Why Visit */}
            <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="font-display text-2xl font-bold text-[#071B33]">
                Why Travel to {destination.name} with Us?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.whyVisit.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Top Attractions */}
            <section className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-[#071B33]">
                Top Attractions in {destination.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {destination.topAttractions.map((att, idx) => (
                  <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <div className="h-44 overflow-hidden relative">
                      <img src={att.image} alt={att.name} className="w-full h-full object-cover" onError={handleImageError} loading="lazy" />
                    </div>
                    <div className="p-5 space-y-2">
                      <h3 className="font-display text-base font-bold text-[#071B33]">{att.name}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{att.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Available Tour Packages */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold text-[#071B33]">
                  {destination.name} Tour Packages ({destPackages.length})
                </h2>
              </div>

              {destPackages.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
                  <p className="text-slate-600 text-sm">We provide tailored custom itineraries for {destination.name}.</p>
                  <button
                    onClick={() => openEnquiryModal({ destination: destination.name })}
                    className="mt-3 px-4 py-2 bg-[#0D7F86] text-white rounded-lg text-xs font-bold"
                  >
                    Request Custom Itinerary
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {destPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => onNavigate(`/packages/${pkg.slug}`)}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="relative h-48">
                        <img src={pkg.heroImage} alt={pkg.title} className="w-full h-full object-cover" onError={handleImageError} loading="lazy" />
                        <span className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded backdrop-blur-md">
                          {pkg.durationDays}D / {pkg.durationNights}N
                        </span>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h3 className="font-display text-base font-bold text-[#071B33] line-clamp-1">{pkg.title}</h3>
                          <p className="text-xs text-slate-600 line-clamp-2 mt-1">{pkg.shortDescription}</p>
                        </div>
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-500 block">From</span>
                            <span className="text-sm font-bold text-[#071B33]">{formatINR(pkg.startingPrice)}</span>
                          </div>
                          <span className="text-xs font-bold text-[#0D7F86]">View Plan →</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Destination FAQs */}
            {destination.faqs && destination.faqs.length > 0 && (
              <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="font-display text-2xl font-bold text-[#071B33]">
                  {destination.name} Travel FAQs
                </h2>
                <div className="space-y-3">
                  {destination.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full px-5 py-3.5 text-left font-semibold text-slate-800 text-sm flex items-center justify-between"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 bg-slate-50 border-t border-slate-100">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar CTA Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md sticky top-24 space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-[#071B33]">
                  Plan Your {destination.name} Trip
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Get a personalized itinerary tailored to your dates, family preferences, and budget.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Customized daily sightseeing schedule</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Flights, 4★/5★ hotels & airport transfers</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Visa filing & travel insurance support</span>
                </div>
              </div>

              <button
                onClick={() => openEnquiryModal({ destination: destination.name })}
                className="btn-gold-gradient w-full font-bold text-sm py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#071B33]" />
                <span>Get Instant Quotation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
