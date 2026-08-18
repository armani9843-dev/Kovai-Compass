import React, { useState, useMemo } from 'react';
import { useStore } from '../services/storeContext';
import { formatINR } from '../utils/helpers';
import { handleImageError } from '../utils/imageFallback';
import { 
  Compass, 
  MapPin, 
  Clock, 
  Search, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';
import { TravelStyle } from '../types';

interface PackagesPageProps {
  onNavigate: (path: string) => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({ onNavigate }) => {
  const { packages, destinations, openEnquiryModal } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'duration'>('featured');

  const filteredPackages = useMemo(() => {
    return packages
      .filter((pkg) => {
        if (!pkg.isPublished) return false;
        
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = pkg.title.toLowerCase().includes(q);
          const matchesDest = pkg.destination.toLowerCase().includes(q);
          const matchesHighlights = pkg.highlights.some(h => h.toLowerCase().includes(q));
          if (!matchesTitle && !matchesDest && !matchesHighlights) return false;
        }

        // Destination filter
        if (selectedDestination !== 'all') {
          if (pkg.destinationSlug !== selectedDestination && !pkg.destination.toLowerCase().includes(selectedDestination.toLowerCase())) {
            return false;
          }
        }

        // Travel style filter
        if (selectedStyle !== 'all') {
          if (pkg.travelStyle !== selectedStyle) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
        if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
        if (sortBy === 'duration') return a.durationDays - b.durationDays;
        // Default featured
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
  }, [packages, searchQuery, selectedDestination, selectedStyle, sortBy]);

  const travelStyles: TravelStyle[] = [
    'Family Holiday',
    'Honeymoon',
    'Luxury',
    'Adventure',
    'Friends & Groups',
    'Customized Trip'
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#071B33] via-[#0B2748] to-[#0D7F86] text-white py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center space-y-2.5">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold px-3 py-0.5 rounded-full">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Curated International Itineraries</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
            International Holiday Packages
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm max-w-2xl mx-auto">
            Discover handcrafted tour packages for Singapore, Malaysia, Thailand, Sri Lanka, and Cambodia with transparent pricing and comprehensive support.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search packages, attractions..."
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D7F86]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>

            {/* Destination filter */}
            <div>
              <select
                value={selectedDestination}
                onChange={e => setSelectedDestination(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0D7F86]"
              >
                <option value="all">All Destinations (5 Countries)</option>
                {destinations.map(d => (
                  <option key={d.id} value={d.slug}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* Travel Style */}
            <div>
              <select
                value={selectedStyle}
                onChange={e => setSelectedStyle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0D7F86]"
              >
                <option value="all">All Travel Styles</option>
                {travelStyles.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Sort by */}
            <div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0D7F86]"
              >
                <option value="featured">Featured / Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="duration">Trip Duration</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>Showing <strong className="text-slate-800">{filteredPackages.length}</strong> holiday packages</span>
            {(selectedDestination !== 'all' || selectedStyle !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedDestination('all');
                  setSelectedStyle('all');
                  setSearchQuery('');
                }}
                className="text-[#0D7F86] hover:underline font-semibold"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Packages Grid */}
        {filteredPackages.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <p className="text-slate-600 font-medium">No holiday packages matched your criteria.</p>
            <button
              onClick={() => {
                setSelectedDestination('all');
                setSelectedStyle('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#0D7F86] text-white rounded-lg text-xs font-bold"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => onNavigate(`/packages/${pkg.slug}`)}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pkg.heroImage}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {pkg.isBestSeller && (
                      <span className="bg-[#C99A2E] text-[#071B33] text-[10px] font-extrabold px-2.5 py-1 rounded shadow-md uppercase tracking-wider">
                        Bestseller
                      </span>
                    )}
                    {pkg.destinationSlug === 'singapore' && (
                      <span className="bg-[#0D7F86] text-white text-[10px] font-bold px-2 py-1 rounded shadow-md">
                        Flagship
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md border border-white/20">
                    {pkg.durationDays}D / {pkg.durationNights}N
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{pkg.destination}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-teal-300">{pkg.travelStyle}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#071B33] group-hover:text-[#0D7F86] transition-colors leading-snug line-clamp-2">
                      {pkg.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                      {pkg.shortDescription}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {pkg.highlights.slice(0, 2).map((hl, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0D7F86] shrink-0" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>

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
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
