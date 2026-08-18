import React from 'react';
import { useStore } from '../services/storeContext';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  Send, 
  Share2, 
  Sparkles,
  Compass
} from 'lucide-react';

interface BlogPostDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const BlogPostDetailPage: React.FC<BlogPostDetailPageProps> = ({ slug, onNavigate }) => {
  const { blogPosts, openEnquiryModal, addToast } = useStore();

  const post = blogPosts.find(b => b.slug === slug) || blogPosts[0];

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold text-[#071B33]">Article Not Found</h2>
        <button 
          onClick={() => onNavigate('/travel-guide')}
          className="mt-4 px-4 py-2 bg-[#0D7F86] text-white rounded-lg"
        >
          Back to Travel Guide
        </button>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Article link copied to clipboard!', 'info');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header Bar */}
      <div className="bg-[#071B33] text-white py-6 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <button
            onClick={() => onNavigate('/travel-guide')}
            className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Travel Guides</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Share</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        {/* Article Metadata */}
        <div className="space-y-4 text-center">
          <span className="inline-block bg-[#0D7F86] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {post.category}
          </span>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071B33] leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-2">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-teal-600" />
              <span>{post.author}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-teal-600" />
              <span>{post.publishedDate}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>{post.readTime}</span>
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-md border border-slate-200 h-[320px] sm:h-[420px]">
          <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Content */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <p className="text-base sm:text-lg font-medium text-slate-700 border-l-4 border-[#0D7F86] pl-4 py-1 italic bg-teal-50/40 rounded-r-lg">
            {post.shortDescription}
          </p>

          <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
            {post.content}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-8 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-slate-400" />
              {post.tags.map((t, i) => (
                <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* CTA Box */}
        <div className="bg-gradient-to-r from-[#071B33] to-[#0D7F86] p-8 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="font-display text-2xl font-bold">Planning a Trip Soon?</h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-1">Let our travel consultants customize your itinerary and visa processing.</p>
          </div>
          <button
            onClick={() => openEnquiryModal()}
            className="bg-[#C99A2E] hover:bg-[#E1BC63] text-[#071B33] font-bold text-sm px-6 py-3 rounded-xl whitespace-nowrap shadow transition-all"
          >
            Plan My Trip Now
          </button>
        </div>
      </div>
    </div>
  );
};
