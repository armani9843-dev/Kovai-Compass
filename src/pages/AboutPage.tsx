import React from 'react';
import { useStore } from '../services/storeContext';
import { 
  Compass, 
  ShieldCheck, 
  Award, 
  Heart, 
  Users, 
  MapPin, 
  Sparkles, 
  CheckCircle2,
  Phone,
  MessageCircle,
  Clock
} from 'lucide-react';
import { Logo } from '../components/common/Logo';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { settings, openEnquiryModal } = useStore();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#071B33] via-[#0B2748] to-[#0D7F86] text-white py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center space-y-2.5">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold px-3 py-0.5 rounded-full">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Guiding Journeys • Creating Memories</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
            About Kovai Compass Holidays
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm max-w-2xl mx-auto">
            Your dedicated international travel partner specializing in curated holiday experiences across Singapore, Malaysia, Thailand, Sri Lanka, and Cambodia.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 sm:space-y-12">
        {/* Story Section */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Logo variant="light" size="lg" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#071B33]">
              Crafting Meaningful Journeys with Care
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              At <strong className="text-slate-800">Kovai Compass Holidays</strong>, we believe travel is not just about visiting places—it is about discovering new perspectives, strengthening family bonds, and creating memories that last a lifetime.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Based in Coimbatore, India, our passionate team of holiday planners brings deep destination expertise in Southeast Asia and South Asia. Whether it’s an action-packed Singapore family adventure, a serene Sri Lanka tea-hill retreat, or a majestic Cambodian sunrise over Angkor Wat, we design every day with precision and heartfelt care.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 h-[360px]">
              <img
                src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80"
                alt="Singapore Marina Bay"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B33]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">Our Flagship Specialization</span>
                <h3 className="font-display text-2xl font-bold">Singapore & Asian Holidays</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Our Core Values */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#071B33]">
              The Kovai Compass Promise
            </h2>
            <p className="text-slate-600 text-sm">Four pillars that define every itinerary we craft for you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="p-3 bg-teal-50 text-[#0D7F86] rounded-xl w-fit">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#071B33] text-base">Thoughtful Curation</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Balanced pacing that blends iconic sightseeing with relaxed leisure for families and seniors.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="p-3 bg-amber-50 text-[#C99A2E] rounded-xl w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#071B33] text-base">Clear & Honest Pricing</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Detailed itemized quotations with no surprise fees or mandatory shopping traps.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="p-3 bg-blue-50 text-[#071B33] rounded-xl w-fit">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#071B33] text-base">Complete Visa Support</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Step-by-step assistance for Singapore e-Visa, MDAC, Sri Lanka ETA, and Thai entry documents.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl w-fit">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#071B33] text-base">Human Touch</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Direct phone & WhatsApp contact with your dedicated coordinator before and throughout your journey.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-gradient-to-r from-[#071B33] to-[#0D7F86] rounded-3xl p-10 text-white text-center space-y-6 shadow-xl">
          <h2 className="font-display text-3xl font-bold">Ready to Start Planning Your Next Vacation?</h2>
          <p className="text-slate-200 text-sm max-w-xl mx-auto">
            Contact our travel desk today for customized holiday quotes and seasonal offers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openEnquiryModal()}
              className="bg-[#C99A2E] hover:bg-[#E1BC63] text-[#071B33] font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg transition-all"
            >
              Plan My Holiday
            </button>
            <button
              onClick={() => onNavigate('/packages')}
              className="bg-white/15 hover:bg-white/25 text-white font-semibold text-sm px-6 py-3.5 rounded-xl border border-white/20 transition-all"
            >
              Explore Tour Packages
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
