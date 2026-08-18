import React from 'react';
import { useStore } from '../services/storeContext';
import { formatINR } from '../utils/helpers';
import { handleImageError } from '../utils/imageFallback';
import { 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface DestinationsPageProps {
  onNavigate: (path: string) => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({ onNavigate }) => {
  const { destinations, packages, openEnquiryModal } = useStore();
  const publishedDestinations = destinations.filter(d => d.isPublished);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#071B33] via-[#0B2748] to-[#0D7F86] text-white py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>International Destinations</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            Curated Asian Destinations
          </h1>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Specializing in Singapore family holidays, Malaysia getaways, Thailand island escapes, Sri Lanka cultural tours, and Cambodia heritage expeditions.
          </p>
        </div>
      </div>

      {/* Destinations List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {publishedDestinations.map((dest, idx) => {
          const destPackages = packages.filter(
            p => p.isPublished && (p.destinationSlug === dest.slug || p.destination.toLowerCase().includes(dest.name.toLowerCase()))
          );
          const isEven = idx % 2 === 1;

          return (
            <div
              key={dest.id}
              className={`bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 ${
                dest.slug === 'singapore' ? 'ring-2 ring-[#C99A2E]/30' : ''
              }`}
            >
              {/* Image Column */}
              <div className={`lg:col-span-6 relative min-h-[320px] sm:min-h-[380px] ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  {dest.slug === 'singapore' && (
                    <span className="bg-[#C99A2E] text-[#071B33] text-xs font-extrabold px-3 py-1 rounded-lg shadow-md uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Flagship Destination
                    </span>
                  )}
                  <span className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md border border-white/20">
                    {destPackages.length} {destPackages.length === 1 ? 'Package' : 'Packages'}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                  <h2 className="font-display text-3xl font-bold tracking-wide">
                    {dest.name}
                  </h2>
                  <p className="text-amber-300 text-xs sm:text-sm font-medium mt-1">
                    {dest.tagline}
                  </p>
                </div>
              </div>

              {/* Details Column */}
              <div className={`lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                      {dest.country}
                    </span>
                    {dest.startingPriceEstimate && (
                      <span className="text-xs font-bold text-slate-600">
                        From <span className="text-base text-[#071B33] font-extrabold">{formatINR(dest.startingPriceEstimate)}</span> / person
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {dest.shortDescription}
                  </p>

                  {/* Why Visit points */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Key Highlights</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {dest.highlights.slice(0, 4).map((hl, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0D7F86] shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onNavigate(`/destinations/${dest.slug}`)}
                    className="flex items-center gap-2 bg-[#071B33] hover:bg-[#0D7F86] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all"
                  >
                    <span>View {dest.name} Itineraries & Guide</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => openEnquiryModal({ destination: dest.name })}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
                  >
                    Enquire for {dest.name}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
