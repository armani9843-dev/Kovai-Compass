import React, { useState, useEffect } from 'react';
import { useStore } from './services/storeContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { WhatsAppFloatingButton } from './components/common/WhatsAppFloatingButton';
import { EnquiryModal } from './components/common/EnquiryModal';
import { SuccessConfirmation } from './components/common/SuccessConfirmation';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { DestinationsPage } from './pages/DestinationsPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { PackagesPage } from './pages/PackagesPage';
import { PackageDetailPage } from './pages/PackageDetailPage';
import { CustomToursPage } from './pages/CustomToursPage';
import { TravelGuidePage } from './pages/TravelGuidePage';
import { BlogPostDetailPage } from './pages/BlogPostDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { PolicyPages } from './pages/PolicyPages';

export default function App() {
  const { settings } = useStore();

  // Router path state initialized from window location
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Handle popstate for browser back / forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Sync document title based on current route
  useEffect(() => {
    if (currentPath === '/') {
      document.title = `${settings.companyName} | ${settings.secondaryTagline || 'International Tour Packages'}`;
    } else if (currentPath.startsWith('/destinations/')) {
      const slug = currentPath.replace('/destinations/', '');
      document.title = `${slug.charAt(0).toUpperCase() + slug.slice(1)} Holidays | ${settings.companyName}`;
    } else if (currentPath === '/destinations') {
      document.title = `International Destinations | ${settings.companyName}`;
    } else if (currentPath.startsWith('/packages/')) {
      document.title = `Tour Package Details | ${settings.companyName}`;
    } else if (currentPath === '/packages') {
      document.title = `Holiday Packages & Itineraries | ${settings.companyName}`;
    } else if (currentPath === '/custom-tours') {
      document.title = `Custom Holiday Planning | ${settings.companyName}`;
    } else if (currentPath === '/travel-guide') {
      document.title = `Travel Guide & Visa Tips | ${settings.companyName}`;
    } else if (currentPath.startsWith('/travel-guide/')) {
      document.title = `Travel Article | ${settings.companyName}`;
    } else if (currentPath === '/about') {
      document.title = `About Us | ${settings.companyName}`;
    } else if (currentPath === '/contact') {
      document.title = `Contact Our Travel Desk | ${settings.companyName}`;
    } else if (currentPath === '/admin') {
      document.title = `Admin Management | ${settings.companyName}`;
    }
  }, [currentPath, settings]);

  // Route matching renderer
  const renderRoute = () => {
    // 1. Home
    if (currentPath === '/' || currentPath === '') {
      return <HomePage onNavigate={navigate} />;
    }

    // 2. Destinations
    if (currentPath === '/destinations') {
      return <DestinationsPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith('/destinations/')) {
      const slug = currentPath.replace('/destinations/', '');
      return <DestinationDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 3. Tour Packages
    if (currentPath === '/packages') {
      return <PackagesPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith('/packages/')) {
      const slug = currentPath.replace('/packages/', '');
      return <PackageDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 4. Custom Tours Builder
    if (currentPath === '/custom-tours') {
      return <CustomToursPage onNavigate={navigate} />;
    }

    // 5. Travel Guide / Blogs
    if (currentPath === '/travel-guide') {
      return <TravelGuidePage onNavigate={navigate} />;
    }
    if (currentPath.startsWith('/travel-guide/')) {
      const slug = currentPath.replace('/travel-guide/', '');
      return <BlogPostDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 6. About & Contact
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (currentPath === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }

    // 7. Admin CMS
    if (currentPath === '/admin') {
      return <AdminPage onNavigate={navigate} />;
    }

    // 8. Policy Pages
    if (currentPath === '/privacy') {
      return <PolicyPages type="privacy" onNavigate={navigate} />;
    }
    if (currentPath === '/terms') {
      return <PolicyPages type="terms" onNavigate={navigate} />;
    }
    if (currentPath === '/cancellation') {
      return <PolicyPages type="cancellation" onNavigate={navigate} />;
    }
    if (currentPath === '/refund') {
      return <PolicyPages type="refund" onNavigate={navigate} />;
    }

    // Fallback default to HomePage
    return <HomePage onNavigate={navigate} />;
  };

  const isAdminRoute = currentPath === '/admin';

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-[#F8FAFC] w-full max-w-full overflow-x-hidden">
      {/* Global Top Navbar (except on Admin portal for clean workspace) */}
      {!isAdminRoute && (
        <Navbar currentPath={currentPath} onNavigate={navigate} />
      )}

      {/* Main Page Body */}
      <main className="flex-grow w-full max-w-full overflow-x-hidden">
        {renderRoute()}
      </main>

      {/* Global Footer (except on Admin) */}
      {!isAdminRoute && (
        <Footer onNavigate={navigate} />
      )}

      {/* Persistent WhatsApp Floating Button */}
      <WhatsAppFloatingButton />

      {/* Global Modals & Notifications */}
      <EnquiryModal />
      <SuccessConfirmation />
      <ToastContainer />
    </div>
  );
}
