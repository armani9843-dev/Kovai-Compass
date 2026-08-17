import React, { useState } from 'react';
import { useStore } from '../services/storeContext';
import { 
  Sparkles, 
  Send, 
  MapPin, 
  Calendar, 
  Users, 
  Hotel, 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  DollarSign,
  Heart,
  Plane
} from 'lucide-react';
import { TravelStyle } from '../types';

interface CustomToursPageProps {
  onNavigate: (path: string) => void;
}

export const CustomToursPage: React.FC<CustomToursPageProps> = ({ onNavigate }) => {
  const { destinations, createCustomTrip, addToast } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: 'Singapore & Malaysia Twin Tour',
    departureCity: 'Coimbatore / Chennai',
    preferredTravelDate: '',
    returnDate: '',
    durationDays: 6,
    adults: 2,
    children: 0,
    budget: '₹50,000 - ₹75,000 per person',
    hotelCategory: '4 Star Premium' as '3 Star Standard' | '4 Star Premium' | '5 Star Luxury' | 'Luxury Boutique',
    travelStyle: 'Family Holiday' as TravelStyle,
    interests: ['Theme Parks & Family Attractions', 'Sightseeing & City Tours'],
    specialRequests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const interestOptions = [
    'Theme Parks & Family Attractions',
    'Sightseeing & City Tours',
    'Beaches & Watersports',
    'Wildlife & Safaris',
    'Heritage & Ancient Temples',
    'Luxury Shopping & Dining',
    'Romantic Dinners & Cruises',
    'Vegetarian / Jain Food Trails',
    'Tea Hills & Nature Treks'
  ];

  const toggleInterest = (interest: string) => {
    setFormData(prev => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return { ...prev, interests: prev.interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      addToast('Please provide your name, phone number, and email address.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await createCustomTrip({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        destination: formData.destination,
        departureCity: formData.departureCity,
        preferredTravelDate: formData.preferredTravelDate,
        returnDate: formData.returnDate,
        durationDays: Number(formData.durationDays),
        adults: Number(formData.adults),
        children: Number(formData.children),
        budget: formData.budget,
        hotelCategory: formData.hotelCategory,
        travelStyle: formData.travelStyle,
        interests: formData.interests,
        specialRequests: formData.specialRequests,
      });
    } catch (err) {
      console.error(err);
      addToast('Error submitting custom trip plan. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#071B33] via-[#0B2748] to-[#0D7F86] text-white py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center space-y-2.5">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold px-3 py-0.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>100% Bespoke Travel Planning</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
            Design Your Custom Holiday
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm max-w-2xl mx-auto">
            Tell us your dream destinations, dates, and preferences. Our travel experts will craft a completely personalized itinerary with zero obligations.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="bg-[#071B33] p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Compass className="w-6 h-6 text-[#C99A2E]" />
              <div>
                <h2 className="font-display text-lg font-bold">Custom Trip Request Form</h2>
                <p className="text-xs text-slate-300">Fast response with transparent quote</p>
              </div>
            </div>
            <span className="text-xs bg-teal-800/80 text-teal-200 px-3 py-1 rounded-full border border-teal-700">
              No Online Payment
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-5 sm:space-y-8">
            {/* Step 1: Trip & Destination */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0D7F86] text-white text-xs flex items-center justify-center">1</span>
                <span>Destinations & Schedule</span>
              </h3>

              <div className="grid grid-cols-1 min-[440px]:grid-cols-2 gap-2.5 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
                    Target Destination(s) <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.destination}
                    onChange={e => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-2.5 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#0D7F86] focus:outline-none"
                  >
                    <option value="Singapore">Singapore (Flagship City Tour)</option>
                    <option value="Singapore & Malaysia Twin Tour">Singapore & Malaysia Twin-Country</option>
                    <option value="Malaysia (Kuala Lumpur & Genting)">Malaysia (KL, Genting & Penang)</option>
                    <option value="Sri Lanka Heritage & Nature">Sri Lanka (Kandy, Nuwara Eliya & Bentota)</option>
                    <option value="Thailand Explorer (Bangkok & Pattaya/Phuket)">Thailand Explorer (Bangkok, Pattaya, Phuket)</option>
                    <option value="Cambodia Angkor Wat Discovery">Cambodia (Siem Reap & Angkor Wat)</option>
                    <option value="Multi-Country Grand Asia Tour">Multi-Country Grand Asia Tour</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
                    Departure City in India
                  </label>
                  <input
                    type="text"
                    value={formData.departureCity}
                    onChange={e => setFormData({ ...formData, departureCity: e.target.value })}
                    placeholder="e.g. Coimbatore, Chennai, Bengaluru"
                    className="w-full px-2.5 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#0D7F86] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
                    Preferred Travel Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredTravelDate}
                    onChange={e => setFormData({ ...formData, preferredTravelDate: e.target.value })}
                    className="w-full px-2.5 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#0D7F86]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
                    Total Trip Duration
                  </label>
                  <select
                    value={formData.durationDays}
                    onChange={e => setFormData({ ...formData, durationDays: Number(e.target.value) })}
                    className="w-full px-2.5 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#0D7F86]"
                  >
                    <option value={4}>4 Days / 3 Nights</option>
                    <option value={5}>5 Days / 4 Nights</option>
                    <option value={6}>6 Days / 5 Nights</option>
                    <option value={7}>7 Days / 6 Nights</option>
                    <option value={8}>8 Days / 7 Nights</option>
                    <option value={10}>10+ Days (Extended)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Travellers & Comfort */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0D7F86] text-white text-xs flex items-center justify-center">2</span>
                <span>Travellers, Hotels & Style</span>
              </h3>

              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div>
                  <label className="block text-[10.5px] sm:text-xs font-bold text-slate-700 mb-1 truncate">
                    Adults (12+)
                  </label>
                  <select
                    value={formData.adults}
                    onChange={e => setFormData({ ...formData, adults: Number(e.target.value) })}
                    className="w-full px-1.5 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#0D7F86]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, '12+ Group'].map((n, i) => (
                      <option key={i} value={typeof n === 'number' ? n : 12}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10.5px] sm:text-xs font-bold text-slate-700 mb-1 truncate">
                    Kids (0-11)
                  </label>
                  <select
                    value={formData.children}
                    onChange={e => setFormData({ ...formData, children: Number(e.target.value) })}
                    className="w-full px-1.5 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#0D7F86]"
                  >
                    {[0, 1, 2, 3, 4, 5].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Child' : 'Kids'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10.5px] sm:text-xs font-bold text-slate-700 mb-1 truncate">
                    Hotel Type
                  </label>
                  <select
                    value={formData.hotelCategory}
                    onChange={e => setFormData({ ...formData, hotelCategory: e.target.value as any })}
                    className="w-full px-1.5 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#0D7F86]"
                  >
                    <option value="3 Star Standard">3 Star</option>
                    <option value="4 Star Premium">4 Star</option>
                    <option value="5 Star Luxury">5 Star</option>
                    <option value="Luxury Boutique">Boutique</option>
                  </select>
                </div>
              </div>

              {/* Interests multi-select pills */}
              <div className="pt-1 sm:pt-2">
                <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1.5 sm:mb-2">
                  What experiences do you want to include?
                </label>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {interestOptions.map(interest => {
                    const isSelected = formData.interests.includes(interest);
                    return (
                      <button
                        type="button"
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`text-[11px] sm:text-xs px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0D7F86] text-white border-[#0D7F86] font-semibold'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{interest}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 3: Contact & Special Notes */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0D7F86] text-white text-xs flex items-center justify-center">3</span>
                <span>Contact Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full px-2.5 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#0D7F86] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98430 12345"
                    className="w-full px-2.5 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#0D7F86] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-2.5 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#0D7F86] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
                  Special Notes or Custom Requests
                </label>
                <textarea
                  rows={2}
                  value={formData.specialRequests}
                  onChange={e => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="e.g. Flight tickets from Coimbatore, vegetarian food options, wheelchair assistance..."
                  className="w-full px-2.5 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#0D7F86] focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Submission CTA */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Zero spam guarantee. Our holiday consultant will reach out with a transparent plan.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold-gradient w-full sm:w-auto flex items-center justify-center gap-2 font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#071B33]" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Custom Trip Request'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
