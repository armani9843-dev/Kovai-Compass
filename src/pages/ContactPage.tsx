import React, { useState } from 'react';
import { useStore } from '../services/storeContext';
import { createWhatsAppUrl } from '../utils/helpers';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  ShieldCheck, 
  ExternalLink,
  Compass
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { settings, createEnquiry, addToast } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: 'Singapore',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappHref = createWhatsAppUrl(settings?.whatsappNumber, { type: 'general' });
  const phoneClean = (settings?.phone || '+91 98430 12345').toString().replace(/[^0-9+]/g, '');
  const phoneDisplay = settings?.phoneDisplay || settings?.phone || '+91 98430 12345';
  const whatsappDisplay = settings?.whatsappDisplay || settings?.phoneDisplay || '+91 98430 12345';

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
        adults: 2,
        children: 0,
        message: formData.message,
        source: 'Contact Form',
      });
      setFormData({
        name: '',
        phone: '',
        email: '',
        destination: 'Singapore',
        message: '',
      });
    } catch (err) {
      console.error(err);
      addToast('Failed to submit contact enquiry. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#071B33] via-[#0B2748] to-[#0D7F86] text-white py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center space-y-2.5">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold px-3 py-0.5 rounded-full">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Get in Touch</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
            Contact Kovai Compass Holidays
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm max-w-2xl mx-auto">
            Our travel specialists in Coimbatore are here to assist with international vacation plans, custom itineraries, and offline bookings.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          {/* Contact Details & Info (Left) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="font-display text-2xl font-bold text-[#071B33]">
                Office & Contact Desk
              </h2>

              <div className="space-y-5 text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-[#C99A2E] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-0.5">Office Address</h4>
                    <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                      {settings.companyName}<br />
                      {settings.officeAddress},<br />
                      {settings.city}, {settings.state} - {settings.postalCode}, {settings.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-teal-50 text-[#0D7F86] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-0.5">Direct Phone</h4>
                    <a href={`tel:${phoneClean}`} className="text-xs sm:text-sm text-slate-700 hover:text-[#0D7F86] font-medium">
                      {phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-0.5">WhatsApp Desk</h4>
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-emerald-700 hover:underline font-semibold flex items-center gap-1">
                      <span>{settings.whatsappDisplay}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-0.5">Email Inquiries</h4>
                    <a href={`mailto:${settings.email}`} className="text-xs sm:text-sm text-slate-700 hover:text-[#0D7F86] block">
                      {settings.email}
                    </a>
                    {settings.supportEmail && (
                      <a href={`mailto:${settings.supportEmail}`} className="text-xs text-slate-500 hover:text-[#0D7F86] block mt-0.5">
                        {settings.supportEmail}
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-0.5">Working Hours</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {settings.businessHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Box */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm h-64 relative">
              <iframe
                title="Google Maps Office Location"
                src={settings.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Quick Enquiry Form (Right) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-[#0D7F86] uppercase tracking-wider">Direct Message</span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#071B33] mt-1">
                  Send Us an Inquiry
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Leave a message with your destination of interest and contact details. We will respond promptly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Anand Kumar"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#0D7F86] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Phone / WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98430 12345"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#0D7F86] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="anand@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#0D7F86] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Destination of Interest
                    </label>
                    <select
                      value={formData.destination}
                      onChange={e => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#0D7F86]"
                    >
                      <option value="Singapore">Singapore (Flagship)</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Singapore & Malaysia">Singapore & Malaysia Twin Tour</option>
                      <option value="Sri Lanka">Sri Lanka</option>
                      <option value="Thailand">Thailand</option>
                      <option value="Cambodia">Cambodia</option>
                      <option value="Custom Multi-Country">Other Custom Destination</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Your Message / Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your tentative dates, number of travellers, or specific requests..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#0D7F86] focus:outline-none"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>No payment required. We will reach out with a personalized offline quote.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold-gradient w-full sm:w-auto flex items-center justify-center gap-2 font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#071B33]" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
