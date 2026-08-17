import React, { useState } from 'react';
import { useStore } from '../../services/storeContext';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Sparkles, 
  Send, 
  Compass, 
  ShieldCheck, 
  Clock,
  DollarSign
} from 'lucide-react';
import { TravelStyle } from '../../types';

interface TripPlannerSearchProps {
  onNavigate?: (path: string) => void;
}

export const TripPlannerSearch: React.FC<TripPlannerSearchProps> = ({ onNavigate }) => {
  const { destinations, createEnquiry, addToast } = useStore();

  const [formData, setFormData] = useState({
    destination: 'Singapore',
    travelDate: '',
    adults: 2,
    children: 0,
    duration: '4-5 Days',
    budget: '₹45,000 - ₹65,000 per person (4-Star)',
    travelStyle: 'Family Holiday' as TravelStyle,
    name: '',
    phone: '',
    email: '',
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isExpanded) {
      setIsExpanded(true);
      return;
    }

    if (!formData.name || !formData.phone || !formData.email) {
      addToast('Please enter your contact details to receive your customized quote.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await createEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        destination: formData.destination,
        travelDate: formData.travelDate,
        adults: Number(formData.adults),
        children: Number(formData.children),
        duration: formData.duration,
        budget: formData.budget,
        travelStyle: formData.travelStyle,
        message: `Plan My Trip submission from homepage planner: ${formData.duration} trip for ${formData.adults} adults & ${formData.children} children in ${formData.destination}.`,
        source: 'Homepage Planner',
      });
      setIsExpanded(false);
    } catch (err) {
      console.error(err);
      addToast('Failed to submit enquiry. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-12 relative z-20">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#071B33] via-[#0B2748] to-[#0D7F86] px-6 py-3.5 text-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#C99A2E]" />
            <span className="font-display font-bold text-base sm:text-lg">Quick Trip Planner & Instant Enquiry</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-amber-200/90 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>No Online Payment Required • 100% Free Customized Quotation</span>
          </div>
        </div>

        {/* Search & Planner Form */}
        <form onSubmit={handleSubmit} className="p-3.5 sm:p-6 space-y-2.5 sm:space-y-4">
          <div className="grid grid-cols-1 min-[440px]:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {/* Field 1: Destination */}
            <div>
              <label className="block text-[10.5px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0D7F86]" />
                <span>Destination</span>
              </label>
              <select
                value={formData.destination}
                onChange={e => setFormData({ ...formData, destination: e.target.value })}
                className="w-full px-2.5 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0D7F86] focus:outline-none"
              >
                {destinations.map(d => (
                  <option key={d.id} value={d.name}>
                    {d.name} {d.slug === 'singapore' ? '🇸🇬 (Flagship)' : ''}
                  </option>
                ))}
                <option value="Singapore & Malaysia">Singapore & Malaysia Twin Tour</option>
                <option value="Custom Multi-Country">Custom Multi-Country Asia</option>
              </select>
            </div>

            {/* Field 2: Travel Date */}
            <div>
              <label className="block text-[10.5px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#0D7F86]" />
                <span>Travel Date</span>
              </label>
              <input
                type="date"
                value={formData.travelDate}
                onChange={e => setFormData({ ...formData, travelDate: e.target.value })}
                className="w-full px-2.5 py-1.5 sm:px-3.5 sm:py-2 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0D7F86] focus:outline-none"
              />
            </div>

            {/* Field 3: Travellers (Adults & Children) */}
            <div>
              <label className="block text-[10.5px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#0D7F86]" />
                <span>Travellers</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                <select
                  value={formData.adults}
                  onChange={e => setFormData({ ...formData, adults: Number(e.target.value) })}
                  className="w-full px-1.5 py-2 sm:px-2 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0D7F86]"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, '12+'].map((n, i) => (
                    <option key={i} value={typeof n === 'number' ? n : 12}>
                      {n} {n === 1 ? 'Adult' : 'Adults'}
                    </option>
                  ))}
                </select>

                <select
                  value={formData.children}
                  onChange={e => setFormData({ ...formData, children: Number(e.target.value) })}
                  className="w-full px-1.5 py-2 sm:px-2 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0D7F86]"
                >
                  {[0, 1, 2, 3, 4].map(n => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Child' : 'Kids'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Field 4: Travel Style */}
            <div>
              <label className="block text-[10.5px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C99A2E]" />
                <span>Travel Style</span>
              </label>
              <select
                value={formData.travelStyle}
                onChange={e => setFormData({ ...formData, travelStyle: e.target.value as TravelStyle })}
                className="w-full px-2.5 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0D7F86]"
              >
                <option value="Family Holiday">Family Holiday</option>
                <option value="Honeymoon">Honeymoon / Couple</option>
                <option value="Luxury">Luxury 5-Star</option>
                <option value="Adventure">Adventure & Sightseeing</option>
                <option value="Friends & Groups">Friends & Groups</option>
                <option value="Corporate">Corporate / Incentive</option>
                <option value="Senior-Friendly">Senior-Friendly</option>
                <option value="Customized Trip">Custom Trip</option>
              </select>
            </div>
          </div>

          {/* Secondary Row: Duration & Budget */}
          <div className="grid grid-cols-1 min-[440px]:grid-cols-2 gap-2.5 sm:gap-4 pt-0.5">
            <div>
              <label className="block text-[10.5px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#0D7F86]" />
                <span>Trip Duration</span>
              </label>
              <select
                value={formData.duration}
                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-2.5 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0D7F86]"
              >
                <option value="3-4 Days">3–4 Days (Short Escape)</option>
                <option value="4-5 Days">4–5 Days (Recommended)</option>
                <option value="6-7 Days">6–7 Days (Grand Tour)</option>
                <option value="8+ Days">8+ Days (Extended Vacation)</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>

            <div>
              <label className="block text-[10.5px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-[#C99A2E]" />
                <span>Budget Preference (Per Person)</span>
              </label>
              <select
                value={formData.budget}
                onChange={e => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-2.5 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0D7F86]"
              >
                <option value="₹30,000 - ₹45,000">₹30,000 – ₹45,000 (Standard 3-Star)</option>
                <option value="₹45,000 - ₹65,000 per person (4-Star)">₹45,000 – ₹65,000 (Premium 4-Star)</option>
                <option value="₹65,000 - ₹90,000">₹65,000 – ₹90,000 (Luxury)</option>
                <option value="₹90,000+">₹90,000+ (Ultra Luxury 5-Star)</option>
                <option value="Flexible">Flexible / Suggest Best Value</option>
              </select>
            </div>
          </div>

          {/* Contact Details Step (Revealed when clicked or expanded) */}
          {isExpanded && (
            <div className="pt-3 border-t border-slate-200 animate-fadeIn space-y-2.5">
              <div className="text-[11px] sm:text-xs font-bold text-teal-800 uppercase tracking-wider">
                Where should we send your customized itinerary & quotation?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Full Name *"
                  className="px-2.5 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0D7F86] focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Phone / WhatsApp Number *"
                  className="px-2.5 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0D7F86] focus:outline-none"
                />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email Address *"
                  className="px-2.5 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0D7F86] focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-1.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3">
            <div className="text-[11px] sm:text-xs text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Singapore, Sri Lanka, Malaysia, Thailand & Cambodia specialists</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#0D7F86] via-[#14A2AC] to-[#0D7F86] hover:from-[#09666C] hover:to-[#0D7F86] text-white font-bold text-xs sm:text-sm px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl shadow-lg transition-all transform active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{isSubmitting ? 'Planning Journey...' : isExpanded ? 'Get My Customized Quote' : 'Plan My Trip'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
