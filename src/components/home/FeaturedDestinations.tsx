import React from 'react';
import { useStore } from '../../services/storeContext';
import { formatINR } from '../../utils/helpers';
import { handleImageError } from '../../utils/imageFallback';
import { 
  ArrowRight, 
  MapPin, 
  Sparkles, 
  Compass, 
  Layers,
  ChevronRight 
} from 'lucide-react';

interface FeaturedDestinationsProps {
  onNavigate: (path: string) => void;
}

export const FeaturedDestinations: React.FC<FeaturedDestinationsProps> = ({ onNavigate }) => {
  const { destinations, packages } = useStore();

  const publishedDestinations = destinations.filter(d => d.isPublished);

  return (
    <section className="py-12 sm:py-16 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-200/60 px-3.5 py-1 rounded-full text-xs font-bold text-[#0D7F86] uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#0D7F86]" />
            <span>Featured International Hubs</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#071B33] tracking-tight">
            Explore Asia with <span className="text-[#0D7F86]">Kovai Compass Holidays</span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
            From vibrant city experiences to tropical escapes and cultural adventures, discover destinations designed around your journey.
          </p>
        </div>

        {/* Destination Cards Grid (5 destinations - Singapore emphasized as primary flagship) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedDestinations.map((dest, index) => {
            const count = packages.filter(p => p.isPublished && (p.destinationSlug === dest.slug || p.destination.toLowerCase().includes(dest.name.toLowerCase()))).length;
            const isSingapore = dest.slug === 'singapore';

            return (
              <div
                key={dest.id}
                onClick={() => onNavigate(`/destinations/${dest.slug}`)}
                className={`group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border ${
                  isSingapore 
                    ? 'border-[#C99A2E]/60 ring-2 ring-[#C99A2E]/20 lg:col-span-1' 
                    : 'border-slate-200'
                } flex flex-col justify-between`}
              >
                {/* Destination Image Box */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {isSingapore && (
                      <span className="bg-[#C99A2E] text-[#071B33] text-[11px] font-extrabold px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Flagship Focus
                      </span>
                    )}
                    <span className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md border border-white/20">
                      {count} {count === 1 ? 'Package' : 'Packages'} Available
                    </span>
                  </div>

                  {/* Starting Price Pill (Only if specified) */}
                  {dest.startingPriceEstimate && (
                    <div className="absolute bottom-4 right-4 bg-[#071B33]/90 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-amber-500/30 shadow">
                      From {formatINR(dest.startingPriceEstimate)}
                    </div>
                  )}

                  {/* Country Name & Tagline Overlay */}
                  <div className="absolute bottom-4 left-4 right-20 text-left">
                    <h3 className="font-display text-2xl font-bold text-white tracking-wide group-hover:text-amber-300 transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-slate-200 font-medium line-clamp-1">
                      {dest.tagline}
                    </p>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {dest.shortDescription}
                  </p>

                  {/* Highlights pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {dest.highlights.slice(0, 3).map((hl, i) => (
                      <span key={i} className="text-[11px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded border border-slate-200">
                        {hl}
                      </span>
                    ))}
                    {dest.highlights.length > 3 && (
                      <span className="text-[11px] text-teal-700 font-semibold px-1 py-0.5">
                        +{dest.highlights.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Link */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0D7F86] group-hover:text-[#C99A2E] transition-colors">
                    <span>Explore {dest.name} Itineraries</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
