import React, { useState, useEffect } from 'react';
import { useStore } from '../../services/storeContext';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  ChevronRight, 
  ChevronLeft,
  Calendar,
  Send
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (path: string) => void;
}

const HERO_SLIDES = [
  {
    id: 'singapore',
    title: 'Singapore',
    tagline: 'Flagship Destination • Urban Wonder',
    subtitle: 'Futuristic gardens, Sentosa Island, Universal Studios, and Michelin-star street food.',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=2000&q=85',
    link: '/destinations/singapore'
  },
  {
    id: 'sri-lanka',
    title: 'Sri Lanka',
    tagline: 'Culture, Nature & Island Escapes',
    subtitle: 'Sigiriya Rock Fortress, misty Nuwara Eliya tea hills, and golden Bentota beaches.',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=2000&q=85',
    link: '/destinations/sri-lanka'
  },
  {
    id: 'malaysia',
    title: 'Malaysia',
    tagline: 'City Life & Mountain Escapes',
    subtitle: 'Glittering Petronas Twin Towers, Genting Highlands cable cars, and Batu Caves.',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=2000&q=85',
    link: '/destinations/malaysia'
  },
  {
    id: 'thailand',
    title: 'Thailand',
    tagline: 'Tropical Beaches & Vibrant Cities',
    subtitle: 'Chao Phraya dinner cruises, Coral Island speedboat rides, and Bangkok temples.',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=2000&q=85',
    link: '/destinations/thailand'
  },
  {
    id: 'cambodia',
    title: 'Cambodia',
    tagline: 'Ancient Wonders & Heritage',
    subtitle: 'Majestic sunrise over Angkor Wat, mystical Ta Prohm, and Tonle Sap lake.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    link: '/destinations/cambodia'
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { openEnquiryModal } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative w-full overflow-hidden bg-[#071B33]">
      {/* Background Image Carousel with Smooth Transitions */}
      {HERO_SLIDES.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{ transitionProperty: 'opacity, transform', transitionDuration: '1.2s' }}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Cinematic Multi-layer Dark Gradient Overlays for High Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#071B33] via-[#071B33]/70 to-[#071B33]/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#071B33] via-[#071B33]/80 to-transparent" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-5 sm:pt-7 pb-12 sm:pb-16 text-left w-full">
        <div className="max-w-3xl space-y-4 sm:space-y-4.5">
          {/* Trust Eyebrow Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#0B2748]/90 border border-[#C99A2E]/50 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-amber-300 backdrop-blur-md shadow-md max-w-full">
            <Compass className="w-3.5 h-3.5 text-[#C99A2E] animate-spin shrink-0" style={{ animationDuration: '12s' }} />
            <span className="truncate">International Holidays • Customized Tours • Travel Support</span>
          </div>

          {/* Luxury Main Heading */}
          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18] drop-shadow-md">
            Discover Extraordinary Journeys Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E1BC63] via-[#F6D365] to-[#C99A2E]">Asia</span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-lg text-slate-200 leading-relaxed font-light max-w-2xl drop-shadow">
            Curated international holidays, unforgettable experiences, and personalized travel planning with <span className="font-semibold text-amber-300">Kovai Compass Holidays</span>.
          </p>

          {/* Slide Indicator Snippet */}
          <div className="inline-block bg-black/40 border border-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs text-slate-200">
            <span className="text-amber-400 font-bold uppercase tracking-wider">{slide.tagline}:</span>{' '}
            <span className="text-slate-300">{slide.subtitle}</span>
          </div>

          {/* Primary & Secondary Call to Actions */}
          <div className="pt-1 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('/packages')}
              className="btn-gold-gradient flex items-center gap-2 text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer font-extrabold"
            >
              <span>Explore Tour Packages</span>
              <ArrowRight className="w-4 h-4 text-[#071B33]" />
            </button>

            <button
              onClick={() => openEnquiryModal()}
              className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl border border-white/30 backdrop-blur-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span>Plan My Trip</span>
            </button>
          </div>
        </div>

        {/* Carousel Navigation Bar (Bottom) */}
        <div className="pt-6 sm:pt-8 flex flex-wrap items-center justify-between gap-3">
          {/* Destination Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {HERO_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all backdrop-blur-md ${
                  idx === currentSlide
                    ? 'btn-gold-gradient font-bold shadow-md scale-105'
                    : 'bg-black/30 text-slate-300 hover:bg-black/50 border border-white/10'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* Prev / Next arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-lg bg-black/40 hover:bg-black/60 text-white border border-white/10 backdrop-blur-md transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-lg bg-black/40 hover:bg-black/60 text-white border border-white/10 backdrop-blur-md transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
