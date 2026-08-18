import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { useStore } from '../../services/storeContext';
import { createWhatsAppUrl } from '../../utils/helpers';
import { 
  Phone, 
  MessageCircle, 
  Menu, 
  X, 
  ChevronDown, 
  Compass, 
  Sparkles, 
  Send,
  Lock,
  MapPin,
  Calendar
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { settings, destinations, openEnquiryModal, isAdminLoggedIn } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDestinationsDropdownOpen, setIsDestinationsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Destinations', 
      path: '/destinations',
      hasDropdown: true 
    },
    { name: 'Tour Packages', path: '/packages' },
    { name: 'Custom Tours', path: '/custom-tours' },
    { name: 'Travel Guide', path: '/travel-guide' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (path: string) => {
    setIsMobileMenuOpen(false);
    setIsDestinationsDropdownOpen(false);
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappHref = createWhatsAppUrl(settings.whatsappNumber, { type: 'general' });

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Running Announcement Ticker (Left to Right) */}
      {settings.showAnnouncement && (
        <div 
          onClick={() => openEnquiryModal()}
          className="bg-[#051529] text-amber-200 text-xs py-2 px-3 border-b border-amber-500/30 overflow-hidden relative select-none cursor-pointer group hover:bg-[#081e3a] transition-colors w-full max-w-full"
          title="Click to enquire about upcoming season packages"
        >
          <div className="max-w-7xl mx-auto flex items-center overflow-hidden w-full min-w-0 relative">
            {/* Left Static Indicator Badge */}
            <div className="z-10 bg-gradient-to-r from-[#BF953F] to-[#E2C775] text-[#071B33] font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded shadow-md flex items-center gap-1 shrink-0 mr-3 hidden sm:flex">
              <Sparkles className="w-3 h-3 fill-current" />
              <span>Special Offer</span>
            </div>
            
            {/* Seamless Running Marquee Strip (Left to Right) */}
            <div className="overflow-hidden whitespace-nowrap flex-1 min-w-0 flex mask-linear-gradient">
              <div className="animate-marquee-ltr flex items-center gap-10 text-xs sm:text-[13px] font-medium tracking-wide text-amber-100">
                {[1, 2, 3, 4].map((i) => (
                  <span key={i} className="flex items-center gap-3">
                    <Sparkles className="w-3.5 h-3.5 text-[#F6D365] shrink-0 animate-pulse" />
                    <span className="font-semibold text-amber-200 group-hover:text-white transition-colors">
                      Special Singapore &amp; Malaysia Holiday Packages Available for Upcoming Seasons – Enquire Today for Custom Itineraries!
                    </span>
                    <span className="text-amber-500/70 font-bold">•</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Contact Micro Bar (Desktop Only) */}
      <div className="hidden lg:block bg-[#0B2748] text-slate-300 text-xs py-1.5 px-6 border-b border-slate-700/50 w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a 
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} 
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>Call: {settings.phoneDisplay}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href={whatsappHref} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: {settings.whatsappDisplay}</span>
            </a>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{settings.city}, {settings.country}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">{settings.businessHours}</span>
            {isAdminLoggedIn && (
              <button 
                onClick={() => handleLinkClick('/admin')} 
                className="flex items-center gap-1 text-amber-300 hover:text-white transition-colors text-[11px] bg-slate-800/80 px-2 py-0.5 rounded border border-amber-500/40"
                title="Admin CMS Portal"
              >
                <Lock className="w-3 h-3 text-amber-400" />
                <span>CMS Dashboard (Active)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full max-w-full transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav shadow-lg py-2 sm:py-2.5 border-b border-teal-900/40 text-white' 
          : 'bg-[#071B33] py-2 sm:py-3.5 text-white border-b border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 flex items-center justify-between gap-1.5 sm:gap-4 min-w-0 w-full">
          {/* Logo */}
          <div 
            onClick={() => handleLinkClick('/')}
            className="cursor-pointer shrink-0"
          >
            <Logo variant="dark" size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || 
                (link.path !== '/' && currentPath.startsWith(link.path));

              if (link.hasDropdown) {
                return (
                  <div 
                    key={link.name} 
                    className="relative group"
                    onMouseEnter={() => setIsDestinationsDropdownOpen(true)}
                    onMouseLeave={() => setIsDestinationsDropdownOpen(false)}
                  >
                    <button
                      onClick={() => handleLinkClick(link.path)}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                        isActive
                          ? 'text-amber-400 bg-white/10'
                          : 'text-slate-200 hover:text-amber-300 hover:bg-white/5'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 text-teal-400" />
                    </button>

                    {/* Dropdown Menu */}
                    {isDestinationsDropdownOpen && (
                      <div className="absolute top-full left-0 w-68 pt-2 z-50 animate-fadeIn">
                        <div className="bg-[#071B33] border border-teal-900/60 rounded-xl shadow-2xl p-2.5 backdrop-blur-xl">
                          <div className="text-[11px] font-semibold text-teal-400 uppercase tracking-widest px-3 py-1 border-b border-slate-800 mb-1.5 flex items-center justify-between">
                            <span>International Hubs</span>
                            <Compass className="w-3 h-3" />
                          </div>
                          {destinations.filter(d => d.isPublished).map((dest) => (
                            <button
                              key={dest.id}
                              onClick={() => handleLinkClick(`/destinations/${dest.slug}`)}
                              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-teal-900/50 flex items-center justify-between group transition-all"
                            >
                              <div>
                                <div className="font-semibold text-white group-hover:text-amber-300 flex items-center gap-1.5">
                                  {dest.name}
                                  {dest.slug === 'singapore' && (
                                    <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/40">
                                      Flagship
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-slate-400 line-clamp-1">{dest.tagline}</div>
                              </div>
                            </button>
                          ))}
                          <div className="pt-1.5 mt-1 border-t border-slate-800">
                            <button
                              onClick={() => handleLinkClick('/destinations')}
                              className="w-full text-center text-xs font-semibold text-amber-400 hover:text-amber-300 py-1"
                            >
                              View All 5 Destinations →
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.path)}
                  className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                    isActive 
                      ? 'text-amber-400 bg-white/10' 
                      : 'text-slate-200 hover:text-amber-300 hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* Quick CTA Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* WhatsApp Quick CTA */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20BA56] text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-sm transition-all"
              title="Chat with Tour Specialist on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>

            {/* Enquire Now CTA (Golden Gradient) */}
            <button
              onClick={() => openEnquiryModal()}
              className="btn-gold-gradient flex items-center gap-1.5 text-xs sm:text-sm px-4 py-2 rounded-lg shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enquire Now</span>
            </button>
          </div>

          {/* Mobile Actions Container (Enquire + Menu Button) */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => openEnquiryModal()}
              className="btn-gold-gradient text-[10.5px] sm:text-xs font-bold px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full flex items-center gap-1 shadow-sm active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <Send className="w-3 h-3 text-[#071B33]" />
              <span>Enquire</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-200 hover:text-amber-400 p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 transition-all focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-amber-300" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#071B33] border-t border-slate-800/80 px-4 pt-3 pb-6 space-y-2 shadow-2xl max-h-[calc(100vh-100px)] overflow-y-auto">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.path)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-all ${
                  currentPath === link.path 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold' 
                    : 'text-slate-200 hover:bg-slate-800/80 active:bg-slate-800'
                }`}
              >
                <span>{link.name}</span>
                {link.hasDropdown && <span className="text-xs text-teal-400 font-normal">5 Destinations</span>}
              </button>
            ))}

            {/* Quick destination chips in mobile menu */}
            <div className="pt-2.5 pb-1 border-t border-slate-800/80">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Top Destinations</p>
              <div className="flex flex-wrap gap-1.5">
                {destinations.map(d => (
                  <button
                    key={d.id}
                    onClick={() => handleLinkClick(`/destinations/${d.slug}`)}
                    className="text-xs bg-slate-800/90 hover:bg-teal-900/60 active:scale-95 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700/80 transition-all"
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Contact & Action buttons */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA56] text-white font-bold py-2.5 rounded-xl text-sm shadow transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openEnquiryModal();
                }}
                className="btn-gold-gradient w-full flex items-center justify-center gap-2 font-extrabold py-2.5 rounded-xl text-sm shadow cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#071B33]" />
                <span>Plan My Trip / Enquire</span>
              </button>

              <div className="flex items-center justify-center text-xs text-slate-400 pt-1">
                <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-1.5 text-teal-400 hover:underline">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Desk: {settings.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
