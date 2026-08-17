import React, { useState, useEffect } from 'react';
import { useStore } from '../../services/storeContext';
import { 
  X, 
  Send, 
  Calendar, 
  Users, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Compass 
} from 'lucide-react';

export const EnquiryModal: React.FC = () => {
  const { 
    isEnquiryModalOpen, 
    closeEnquiryModal, 
    enquiryPrefill, 
    destinations, 
    createEnquiry, 
    addToast 
  } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: 'Singapore',
    travelDate: '',
    adults: 2,
    children: 0,
    duration: '4-5 Days',
    budget: '₹40,000 - ₹60,000 per person',
    travelStyle: 'Family Holiday',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (enquiryPrefill) {
      setFormData(prev => ({
        ...prev,
        destination: enquiryPrefill.destination || prev.destination,
        message: enquiryPrefill.packageTitle 
          ? `I am enquiring about the "${enquiryPrefill.packageTitle}" tour package.` 
          : prev.message,
      }));
    }
  }, [enquiryPrefill]);

  if (!isEnquiryModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      addToast('Please fill in your name, phone number, and email.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await createEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        destination: formData.destination,
        packageId: enquiryPrefill?.packageId,
        packageTitle: enquiryPrefill?.packageTitle,
        travelDate: formData.travelDate,
        adults: Number(formData.adults),
        children: Number(formData.children),
        duration: formData.duration,
        budget: formData.budget,
        travelStyle: formData.travelStyle,
        message: formData.message,
        source: enquiryPrefill?.packageTitle ? 'Package Page' : 'Direct'
      });
    } catch (err) {
      console.error(err);
      addToast('Error submitting enquiry. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-hidden animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200/80 flex flex-col max-h-[92vh] sm:max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#071B33] via-[#0B2748] to-[#0D7F86] text-white px-4 py-3 sm:px-6 sm:py-4 relative shrink-0">
          <button
            onClick={closeEnquiryModal}
            className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 sm:p-2 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex items-center gap-1.5 text-amber-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-0.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Kovai Compass Travel Desk</span>
          </div>

          <h3 className="font-display text-base sm:text-xl md:text-2xl font-bold text-white leading-tight">
            {enquiryPrefill?.packageTitle ? (
              <span>Enquire: <span className="text-amber-300">{enquiryPrefill.packageTitle}</span></span>
            ) : (
              <span>Plan Your International Holiday</span>
            )}
          </h3>

          <p className="text-[11px] sm:text-xs text-slate-200 mt-0.5 line-clamp-1 sm:line-clamp-none">
            Share your preferences. Our holiday consultants will prepare a customized quotation within hours.
          </p>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-2.5 sm:space-y-3.5 overscroll-contain">
          {/* Row 1: Name & Phone */}
          <div className="grid grid-cols-1 min-[440px]:grid-cols-2 gap-2 sm:gap-3.5">
            <div>
              <label className="block text-[10.5px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ramesh Krishnan"
                className="w-full px-2.5 py-1.5 sm:px-3.5 sm:py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D7F86] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-[10.5px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone / WhatsApp <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98430 12345"
                  className="w-full pl-2.5 pr-7 py-1.5 sm:pl-3.5 sm:pr-8 sm:py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D7F86] focus:border-transparent transition-all"
                />
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 sm:top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: Email & Destination */}
          <div className="grid grid-cols-1 min-[440px]:grid-cols-2 gap-2 sm:gap-3.5">
            <div>
              <label className="block text-[10.5px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ramesh@example.com"
                  className="w-full pl-2.5 pr-7 py-1.5 sm:pl-3.5 sm:pr-8 sm:py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D7F86] focus:border-transparent transition-all"
                />
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 sm:top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[10.5px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Destination <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.destination}
                onChange={e => setFormData({ ...formData, destination: e.target.value })}
                className="w-full px-2.5 py-1.5 sm:px-3.5 sm:py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D7F86] focus:border-transparent transition-all"
              >
                {destinations.map(d => (
                  <option key={d.id} value={d.name}>
                    {d.name} {d.name === 'Singapore' ? '🇸🇬 (Flagship)' : ''}
                  </option>
                ))}
                <option value="Singapore & Malaysia">Singapore & Malaysia Twin-Country</option>
                <option value="Other Customized Asia Tour">Other Customized Destination</option>
              </select>
            </div>
          </div>

          {/* Row 3: Travel Date & Passenger Count (Compact 3-column on mobile) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3.5">
            <div>
              <label className="block text-[10.5px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 truncate">
                Travel Date
              </label>
              <input
                type="date"
                value={formData.travelDate}
                onChange={e => setFormData({ ...formData, travelDate: e.target.value })}
                className="w-full px-1.5 py-1.5 sm:px-3 sm:py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0D7F86] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10.5px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 truncate">
                Adults (12+)
              </label>
              <select
                value={formData.adults}
                onChange={e => setFormData({ ...formData, adults: Number(e.target.value) })}
                className="w-full px-1.5 py-1.5 sm:px-3 sm:py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0D7F86]"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, '12+ (Group)'].map((n, i) => (
                  <option key={i} value={typeof n === 'number' ? n : 12}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10.5px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 truncate">
                Kids (0-11)
              </label>
              <select
                value={formData.children}
                onChange={e => setFormData({ ...formData, children: Number(e.target.value) })}
                className="w-full px-1.5 py-1.5 sm:px-3 sm:py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0D7F86]"
              >
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Child' : 'Kids'}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 4: Travel Style & Budget */}
          <div className="grid grid-cols-1 min-[440px]:grid-cols-2 gap-2 sm:gap-3.5">
            <div>
              <label className="block text-[10.5px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Holiday Type
              </label>
              <select
                value={formData.travelStyle}
                onChange={e => setFormData({ ...formData, travelStyle: e.target.value })}
                className="w-full px-2.5 py-1.5 sm:px-3.5 sm:py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0D7F86]"
              >
                <option value="Family Holiday">Family Holiday with Kids/Seniors</option>
                <option value="Honeymoon">Romantic / Honeymoon</option>
                <option value="Luxury">Luxury & 5-Star Experience</option>
                <option value="Friends & Groups">Friends / Group Vacation</option>
                <option value="Corporate">Corporate / Incentive Tour</option>
                <option value="Customized Trip">Customized Flexible Tour</option>
              </select>
            </div>

            <div>
              <label className="block text-[10.5px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Budget (Per Person)
              </label>
              <select
                value={formData.budget}
                onChange={e => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-2.5 py-1.5 sm:px-3.5 sm:py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0D7F86]"
              >
                <option value="₹30,000 - ₹45,000">₹30,000 – ₹45,000 (Standard)</option>
                <option value="₹45,000 - ₹65,000">₹45,000 – ₹65,000 (Premium 4-Star)</option>
                <option value="₹65,000 - ₹90,000">₹65,000 – ₹90,000 (Luxury)</option>
                <option value="₹90,000+">₹90,000+ (Ultra Luxury)</option>
                <option value="Flexible">Flexible / Suggest Best Value</option>
              </select>
            </div>
          </div>

          {/* Row 5: Notes & Requests */}
          <div>
            <label className="block text-[10.5px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Specific Requirements (Optional)
            </label>
            <textarea
              rows={2}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              placeholder="e.g. Vegetarian food preferences, Universal Studios tickets, flight assistance..."
              className="w-full px-2.5 py-1.5 sm:px-3.5 sm:py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0D7F86] focus:outline-none resize-none"
            />
          </div>

          {/* Trust Note */}
          <div className="flex items-center gap-1.5 text-[10.5px] sm:text-xs text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>No online payment needed. Our consultant will send a free transparent quote.</span>
          </div>

          {/* Modal Footer / Actions */}
          <div className="pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-end gap-2 sm:gap-3 sticky bottom-0 bg-white/95 backdrop-blur-xs -mx-3 -mb-3 sm:-mx-5 sm:-mb-5 p-3 sm:p-4">
            <button
              type="button"
              onClick={closeEnquiryModal}
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold-gradient flex items-center gap-1.5 font-bold text-xs sm:text-sm px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-[#071B33]" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Travel Enquiry'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
