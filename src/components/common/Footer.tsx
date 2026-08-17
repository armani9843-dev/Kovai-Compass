import React from 'react';
import { Logo } from './Logo';
import { useStore } from '../../services/storeContext';
import { createWhatsAppUrl } from '../../utils/helpers';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  ExternalLink,
  ShieldCheck,
  Compass,
  ArrowRight
} from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { settings, destinations } = useStore();
  const currentYear = new Date().getFullYear();
  const whatsappHref = createWhatsAppUrl(settings.whatsappNumber, { type: 'general' });

  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#071B33] text-slate-300 border-t border-teal-900/50 relative overflow-hidden">
      {/* Subtle background glow decorative elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column (2 cols wide on LG) */}
          <div className="lg:col-span-2 space-y-4">
            <div onClick={() => handleNav('/')} className="cursor-pointer inline-block">
              <Logo variant="dark" size="lg" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Your compass to extraordinary journeys across Asia. We specialize in handcrafted holiday packages, Singapore family vacations, cultural tours, and customized international travel experiences.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Desk</span>
              </a>
              <a
                href={settings.googleBusinessProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-2 rounded-lg border border-slate-700 transition-colors"
              >
                <span>Google Reviews</span>
                <ExternalLink className="w-3 h-3 text-amber-400" />
              </a>
            </div>

            <div className="pt-3 flex items-center gap-2 text-xs text-amber-300/80">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>International Holidays • Customized Tours • 24/7 Travel Care</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-white text-base font-semibold mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#C99A2E]" />
              <span>Explore</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('/')} className="hover:text-amber-300 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/packages')} className="hover:text-amber-300 transition-colors">
                  Featured Holiday Packages
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/custom-tours')} className="hover:text-amber-300 transition-colors text-amber-300 font-medium">
                  Plan Custom Trip ✨
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/travel-guide')} className="hover:text-amber-300 transition-colors">
                  Travel Guides & Visa Tips
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/about')} className="hover:text-amber-300 transition-colors">
                  About Kovai Compass
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/contact')} className="hover:text-amber-300 transition-colors">
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-display text-white text-base font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span>Destinations</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              {destinations.map(d => (
                <li key={d.id}>
                  <button 
                    onClick={() => handleNav(`/destinations/${d.slug}`)} 
                    className="hover:text-amber-300 transition-colors flex items-center justify-between w-full group"
                  >
                    <span>{d.name} Tours</span>
                    <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-1" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-display text-white text-base font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Contact Desk</span>
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 text-xs leading-relaxed">
                  {settings.officeAddress}, {settings.city}, {settings.state} - {settings.postalCode}, {settings.country}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="text-xs hover:text-amber-300">
                  {settings.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="text-xs hover:text-emerald-300">
                  WhatsApp: {settings.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-xs hover:text-amber-300 truncate">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{settings.businessHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Sub-footer */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <p>© {currentYear} <span className="text-white font-semibold">{settings.companyName}</span>. All Rights Reserved.</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Primary market: {settings.primaryMarket} | Domain: {settings.domain}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button onClick={() => handleNav('/privacy-policy')} className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => handleNav('/terms-and-conditions')} className="hover:text-slate-200 transition-colors">
              Terms & Conditions
            </button>
            <span>•</span>
            <button onClick={() => handleNav('/cancellation-policy')} className="hover:text-slate-200 transition-colors">
              Cancellation Policy
            </button>
            <span>•</span>
            <button onClick={() => handleNav('/refund-policy')} className="hover:text-slate-200 transition-colors">
              Refund Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
