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

// Helper function to resolve initial path from URL, hash, or search parameters
const getActiveRoute = (): string => {
  if (typeof window === 'undefined') return '/';

  // 1. Check Query Parameters (e.g. ?admin, ?page=admin, ?route=/admin)
  const params = new URLSearchParams(window.location.search);
  if (params.has('admin') || params.get('page') === 'admin' || params.get('view') === 'admin') {
    return '/admin';
  }
  const paramRoute = params.get('route') || params.get('page');
  if (paramRoute) {
    return paramRoute.startsWith('/') ? paramRoute : `/${paramRoute}`;
  }

  // 2. Check Hash (e.g. #/admin or #admin)
  const rawHash = window.location.hash.replace(/^#\/?/, '');
  if (rawHash === 'admin' || rawHash.startsWith('admin/')) {
    return '/admin';
  }
  if (rawHash) {
    return rawHash.startsWith('/') ? rawHash : `/${rawHash}`;
  }

  // 3. Check Standard Pathname
  let path = window.location.pathname || '/';
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  return path;
};

export default function App() {
  const { settings } = useStore();

  // Router path state initialized from window location
  const [currentPath, setCurrentPath] = useState<string>(getActiveRoute);

  // Handle popstate and hashchange for robust URL changes
  useEffect(() => {
    const handleUrlChange = () => {
      setCurrentPath(getActiveRoute());
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    // Discrete shortcut: Alt + A or Ctrl + Alt + A to access Admin CMS instantly
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'a') || (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        navigate('/admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
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
    const company = settings?.companyName || 'Kovai Compass Holidays';
    if (currentPath === '/' || currentPath === '') {
      document.title = `${company} | ${settings?.secondaryTagline || 'International Tour Packages'}`;
    } else if (currentPath.startsWith('/destinations/')) {
      const slug = (currentPath || '').replace('/destinations/', '');
      document.title = `${slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Destinations'} Holidays | ${company}`;
    } else if (currentPath === '/destinations') {
      document.title = `International Destinations | ${company}`;
    } else if (currentPath.startsWith('/packages/')) {
      document.title = `Tour Package Details | ${company}`;
    } else if (currentPath === '/packages') {
      document.title = `Holiday Packages & Itineraries | ${company}`;
    } else if (currentPath === '/custom-tours') {
      document.title = `Custom Holiday Planning | ${company}`;
    } else if (currentPath === '/travel-guide') {
      document.title = `Travel Guide & Visa Tips | ${company}`;
    } else if (currentPath.startsWith('/travel-guide/')) {
      document.title = `Travel Article | ${company}`;
    } else if (currentPath === '/about') {
      document.title = `About Us | ${company}`;
    } else if (currentPath === '/contact') {
      document.title = `Contact Our Travel Desk | ${company}`;
    } else if (currentPath === '/admin') {
      document.title = `Admin Management | ${company}`;
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
    if (currentPath === '/admin' || currentPath.startsWith('/admin')) {
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

  const isAdminRoute = currentPath === '/admin' || currentPath.startsWith('/admin');

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
