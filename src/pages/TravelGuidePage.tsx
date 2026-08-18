import React, { useState } from 'react';
import { useStore } from '../services/storeContext';
import { handleImageError } from '../utils/imageFallback';
import { 
  FileText, 
  Sparkles, 
  Search, 
  ArrowRight, 
  ChevronRight, 
  Tag, 
  Calendar, 
  User, 
  Compass 
} from 'lucide-react';

interface TravelGuidePageProps {
  onNavigate: (path: string) => void;
}

export const TravelGuidePage: React.FC<TravelGuidePageProps> = ({ onNavigate }) => {
  const { blogPosts } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'Visa & Entry Requirements', 'Singapore Travel Guide', 'Family Travel Tips', 'Packing & Culture'];

  const filteredPosts = blogPosts.filter(post => {
    if (!post.isPublished) return false;
    if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return post.title.toLowerCase().includes(q) || post.shortDescription.toLowerCase().includes(q) || post.tags.some(t => t.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#071B33] via-[#0B2748] to-[#0D7F86] text-white py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center space-y-2.5">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold px-3 py-0.5 rounded-full">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Travel Advice & Tips</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
            International Travel Guide & Visa Tips
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm max-w-2xl mx-auto">
            Practical advice, visa guidelines, seasonal tips, and itinerary planning insights curated by our destination experts.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Category Tabs & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0D7F86] text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat === 'all' ? 'All Articles' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search guide topics..."
              className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7F86]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <div
              key={post.id}
              onClick={() => onNavigate(`/travel-guide/${post.slug}`)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="relative h-52 overflow-hidden">
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

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] text-slate-400 font-medium mb-1">
                    {post.publishedDate} • {post.readTime}
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#071B33] group-hover:text-[#0D7F86] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 mt-2 leading-relaxed">
                    {post.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0D7F86]">
                  <span>Read Article</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
