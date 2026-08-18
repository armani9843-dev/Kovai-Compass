import React, { useState } from 'react';
import { useStore } from '../services/storeContext';
import { formatINR, createWhatsAppUrl } from '../utils/helpers';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Send, 
  MessageCircle, 
  Hotel, 
  ShieldCheck, 
  ChevronDown, 
  FileText,
  Compass,
  AlertCircle
} from 'lucide-react';

interface PackageDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const PackageDetailPage: React.FC<PackageDetailPageProps> = ({ slug, onNavigate }) => {
  const { packages, settings, openEnquiryModal } = useStore();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [openDayIndex, setOpenDayIndex] = useState<number | null>(0);

  const pkg = packages.find(p => p.slug === slug) || packages[0];

  if (!pkg) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold text-[#071B33]">Package Not Found</h2>
        <button 
          onClick={() => onNavigate('/packages')}
          className="mt-4 px-4 py-2 bg-[#0D7F86] text-white rounded-lg"
        >
          Back to Packages
        </button>
      </div>
    );
  }

  const gallery = [pkg.heroImage, ...(pkg.galleryImages || [])];
  const whatsappHref = createWhatsAppUrl(settings.whatsappNumber, {
    type: 'package',
    title: pkg.title,
    destination: pkg.destination
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Breadcrumb Header */}
      <div className="bg-[#071B33] text-white py-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <button
            onClick={() => onNavigate('/packages')}
            className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Packages</span>
          </button>

          <span className="text-xs text-slate-400">
            {pkg.destination} • {pkg.durationDays} Days / {pkg.durationNights} Nights
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Title & Key Highlights Header */}
        <div className="space-y-2.5 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#C99A2E] text-[#071B33] text-xs font-extrabold px-3 py-0.5 rounded-md uppercase tracking-wider">
              {pkg.destination}
            </span>
            <span className="bg-teal-900/60 text-teal-300 text-xs font-semibold px-3 py-0.5 rounded-md border border-teal-800">
              {pkg.travelStyle}
            </span>
            {pkg.isBestSeller && (
              <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-md">
                ★ Bestseller
              </span>
            )}
          </div>

          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#071B33] leading-tight">
            {pkg.title}
          </h1>

          <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
            {pkg.shortDescription}
          </p>
        </div>

        {/* Gallery Showcase */}
        <div className="mb-8 space-y-2.5">
          <div className="relative h-[280px] sm:h-[400px] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <img
              src={gallery[activeImageIndex] || pkg.heroImage}
              alt={pkg.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
              {pkg.destination} Tour Experience
            </div>
          </div>

          {gallery.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-2">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`relative w-20 sm:w-24 h-14 sm:h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === i ? 'border-[#C99A2E] ring-2 ring-[#C99A2E]/30 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Grid: Details + Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Details, Itinerary, Inclusions */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="font-display text-2xl font-bold text-[#071B33]">
                Tour Overview
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {pkg.overview}
              </p>

              {/* Highlights */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Key Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {pkg.highlights.map((hl, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#0D7F86] shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Day by Day Itinerary */}
            <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold text-[#071B33]">
                  Day-by-Day Detailed Itinerary
                </h2>
                <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-md">
                  {pkg.itinerary.length} Days Plan
                </span>
              </div>

              <div className="space-y-4">
                {pkg.itinerary.map((day, idx) => {
                  const isOpen = openDayIndex === idx;
                  return (
                    <div
                      key={day.day || idx}
                      className="border border-slate-200 rounded-xl overflow-hidden shadow-sm"
                    >
                      <button
                        onClick={() => setOpenDayIndex(isOpen ? null : idx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 bg-slate-50/70 hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-[#071B33] text-amber-300 font-bold text-xs flex items-center justify-center shrink-0">
                            D{day.day}
                          </span>
                          <span className="font-bold text-sm sm:text-base text-slate-800">{day.title}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180 text-[#0D7F86]' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="p-5 text-xs sm:text-sm text-slate-600 space-y-3 bg-white border-t border-slate-200">
                          <p className="leading-relaxed whitespace-pre-line">{day.description}</p>
                          
                          {(day.meals || day.hotel) && (
                            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-500 border-t border-slate-100">
                              {day.meals && <span>🍽 <strong>Meals:</strong> {day.meals}</span>}
                              {day.hotel && <span>🏨 <strong>Stay:</strong> {day.hotel}</span>}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Inclusions & Exclusions */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-sm space-y-4">
                <h3 className="font-display text-lg font-bold text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Package Inclusions</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  {pkg.inclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-sm space-y-4">
                <h3 className="font-display text-lg font-bold text-rose-900 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span>Package Exclusions</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  {pkg.exclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold mt-0.5">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Hotel & Accommodation Notes */}
            {pkg.hotelDetails && (
              <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-display text-lg font-bold text-[#071B33] flex items-center gap-2">
                  <Hotel className="w-5 h-5 text-[#0D7F86]" />
                  <span>Accommodation & Hotel Details</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {pkg.hotelDetails}
                </p>
              </section>
            )}

            {/* Important Notes */}
            {pkg.importantNotes && pkg.importantNotes.length > 0 && (
              <section className="bg-amber-50/60 p-6 rounded-2xl border border-amber-200 shadow-sm space-y-3">
                <h3 className="font-display text-base font-bold text-amber-900 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <span>Important Travel Advisory & Notes</span>
                </h3>
                <ul className="space-y-2 text-xs text-amber-900/90">
                  {pkg.importantNotes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Pricing & Enquiry Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xl sticky top-24 space-y-6">
              <div>
                <span className="text-xs text-slate-500 font-medium block">Starting price from</span>
                <div className="text-3xl font-extrabold text-[#071B33] mt-1">
                  {formatINR(pkg.startingPrice)}
                  <span className="text-xs font-normal text-slate-500 ml-1">/ person</span>
                </div>
                {pkg.priceNote && (
                  <p className="text-[11px] text-slate-500 mt-1">{pkg.priceNote}</p>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Duration:</span>
                  <strong className="text-slate-800">{pkg.durationDays} Days / {pkg.durationNights} Nights</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Destination:</span>
                  <strong className="text-slate-800">{pkg.destination}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Travel Style:</span>
                  <strong className="text-slate-800">{pkg.travelStyle}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Booking Mode:</span>
                  <span className="text-emerald-700 font-bold">Offline / Quotation</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => openEnquiryModal({
                    destination: pkg.destination,
                    packageId: pkg.id,
                    packageTitle: pkg.title
                  })}
                  className="btn-gold-gradient w-full font-extrabold text-sm py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#071B33]" />
                  <span>Enquire for this Package</span>
                </button>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20BA56] text-white font-bold text-sm py-3 rounded-xl shadow transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>100% customizable itinerary. We adjust hotels, dates, and flight connections.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
