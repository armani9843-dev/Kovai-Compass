import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  Destination, 
  TourPackage, 
  BlogPost, 
  Testimonial, 
  FAQItem, 
  SiteSettings, 
  Enquiry, 
  CustomTripRequest,
  EnquiryStatus 
} from '../types';
import { 
  INITIAL_SETTINGS, 
  INITIAL_DESTINATIONS, 
  INITIAL_PACKAGES, 
  INITIAL_BLOG_POSTS, 
  INITIAL_TESTIMONIALS, 
  INITIAL_FAQS, 
  INITIAL_SAMPLE_ENQUIRIES 
} from '../data/initialData';
import { firestore, isFirebaseConfigured } from './firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  setDoc, 
  doc, 
  deleteDoc, 
  onSnapshot 
} from 'firebase/firestore';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface StoreContextType {
  // Data
  settings: SiteSettings;
  destinations: Destination[];
  packages: TourPackage[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  enquiries: Enquiry[];
  customTrips: CustomTripRequest[];
  
  // Loading & State
  isLoading: boolean;
  isFirebaseActive: boolean;
  
  // Auth
  isAdminLoggedIn: boolean;
  adminUserEmail: string | null;
  adminLogin: (password: string, email?: string) => Promise<boolean>;
  adminLogout: () => void;
  
  // Actions - Enquiries & Custom Trips
  createEnquiry: (enquiry: Omit<Enquiry, 'id' | 'referenceNumber' | 'createdAt' | 'status'>) => Promise<Enquiry>;
  createCustomTrip: (trip: Omit<CustomTripRequest, 'id' | 'referenceNumber' | 'createdAt' | 'status'>) => Promise<CustomTripRequest>;
  updateEnquiryStatus: (id: string, status: EnquiryStatus, notes?: string, staff?: string) => Promise<void>;
  deleteEnquiry: (id: string) => Promise<void>;
  updateCustomTripStatus: (id: string, status: EnquiryStatus, notes?: string) => Promise<void>;
  deleteCustomTrip: (id: string) => Promise<void>;
  
  // Actions - CMS
  savePackage: (pkg: TourPackage) => Promise<void>;
  deletePackage: (id: string) => Promise<void>;
  duplicatePackage: (id: string) => Promise<TourPackage>;
  saveDestination: (dest: Destination) => Promise<void>;
  deleteDestination: (id: string) => Promise<void>;
  saveBlogPost: (post: BlogPost) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  saveTestimonial: (test: Testimonial) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  saveFAQ: (faq: FAQItem) => Promise<void>;
  deleteFAQ: (id: string) => Promise<void>;
  updateSettings: (newSettings: SiteSettings) => Promise<void>;
  
  // Tools & Modals
  resetToInitialDemoData: () => void;
  exportDatabaseJSON: () => string;
  importDatabaseJSON: (jsonStr: string) => boolean;
  
  // Modal states
  isEnquiryModalOpen: boolean;
  openEnquiryModal: (prefill?: { destination?: string; packageId?: string; packageTitle?: string }) => void;
  closeEnquiryModal: () => void;
  enquiryPrefill: { destination?: string; packageId?: string; packageTitle?: string } | null;
  
  lastSubmittedEnquiry: Enquiry | CustomTripRequest | null;
  isConfirmationModalOpen: boolean;
  closeConfirmationModal: () => void;
  
  // Toast notifications
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SETTINGS: 'kch_settings_v1',
  DESTINATIONS: 'kch_destinations_v1',
  PACKAGES: 'kch_packages_v1',
  BLOGS: 'kch_blogs_v1',
  TESTIMONIALS: 'kch_testimonials_v1',
  FAQS: 'kch_faqs_v1',
  ENQUIRIES: 'kch_enquiries_v1',
  CUSTOM_TRIPS: 'kch_custom_trips_v1',
  ADMIN_SESSION: 'kch_admin_session_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [destinations, setDestinations] = useState<Destination[]>(INITIAL_DESTINATIONS);
  const [packages, setPackages] = useState<TourPackage[]>(INITIAL_PACKAGES);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [faqs, setFaqs] = useState<FAQItem[]>(INITIAL_FAQS);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(INITIAL_SAMPLE_ENQUIRIES);
  const [customTrips, setCustomTrips] = useState<CustomTripRequest[]>([]);
  
  // Auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUserEmail, setAdminUserEmail] = useState<string | null>(null);

  // Modal & Notification states
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryPrefill, setEnquiryPrefill] = useState<{ destination?: string; packageId?: string; packageTitle?: string } | null>(null);
  const [lastSubmittedEnquiry, setLastSubmittedEnquiry] = useState<Enquiry | CustomTripRequest | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Toast Helpers
  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Load Initial Data
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (savedSettings) setSettings(JSON.parse(savedSettings));

      const savedDestinations = localStorage.getItem(STORAGE_KEYS.DESTINATIONS);
      if (savedDestinations) setDestinations(JSON.parse(savedDestinations));

      const savedPackages = localStorage.getItem(STORAGE_KEYS.PACKAGES);
      if (savedPackages) setPackages(JSON.parse(savedPackages));

      const savedBlogs = localStorage.getItem(STORAGE_KEYS.BLOGS);
      if (savedBlogs) setBlogPosts(JSON.parse(savedBlogs));

      const savedTestimonials = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      if (savedTestimonials) setTestimonials(JSON.parse(savedTestimonials));

      const savedFaqs = localStorage.getItem(STORAGE_KEYS.FAQS);
      if (savedFaqs) setFaqs(JSON.parse(savedFaqs));

      const savedEnquiries = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      if (savedEnquiries) setEnquiries(JSON.parse(savedEnquiries));

      const savedCustomTrips = localStorage.getItem(STORAGE_KEYS.CUSTOM_TRIPS);
      if (savedCustomTrips) setCustomTrips(JSON.parse(savedCustomTrips));

      const savedSession = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
      if (savedSession) {
        const session = JSON.parse(savedSession);
        if (session && session.isLoggedIn) {
          setIsAdminLoggedIn(true);
          setAdminUserEmail(session.email || 'admin@kovaicompassholidays.com');
        }
      }
    } catch (e) {
      console.warn('Local storage load warning:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync state helpers
  const saveToLocal = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(`Error saving to localStorage for ${key}`, e);
    }
  };

  // Helper to generate Reference IDs
  const generateReferenceId = () => {
    const year = new Date().getFullYear();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `KCH-${year}-${randomDigits}`;
  };

  // Admin Auth Handlers
  const adminLogin = async (password: string, email: string = 'admin@kovaicompassholidays.com'): Promise<boolean> => {
    // Allows standard password "admin123" or custom key
    if (password === 'admin123' || password === 'kovai2026' || password.length >= 6) {
      setIsAdminLoggedIn(true);
      setAdminUserEmail(email);
      saveToLocal(STORAGE_KEYS.ADMIN_SESSION, { isLoggedIn: true, email });
      addToast('Welcome to Kovai Compass Holidays CMS', 'success');
      return true;
    }
    addToast('Invalid administrator password', 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminUserEmail(null);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    addToast('Signed out of admin dashboard', 'info');
  };

  // Enquiries
  const createEnquiry = async (enquiryData: Omit<Enquiry, 'id' | 'referenceNumber' | 'createdAt' | 'status'>): Promise<Enquiry> => {
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      referenceNumber: generateReferenceId(),
      createdAt: new Date().toISOString(),
      status: 'New'
    };

    const updated = [newEnquiry, ...enquiries];
    setEnquiries(updated);
    saveToLocal(STORAGE_KEYS.ENQUIRIES, updated);

    // If Firestore active
    if (firestore) {
      try {
        await addDoc(collection(firestore, 'enquiries'), newEnquiry);
      } catch (err) {
        console.warn('Firestore write fallback used:', err);
      }
    }

    setLastSubmittedEnquiry(newEnquiry);
    setIsEnquiryModalOpen(false);
    setIsConfirmationModalOpen(true);
    addToast(`Enquiry ${newEnquiry.referenceNumber} submitted successfully!`, 'success');
    return newEnquiry;
  };

  const createCustomTrip = async (tripData: Omit<CustomTripRequest, 'id' | 'referenceNumber' | 'createdAt' | 'status'>): Promise<CustomTripRequest> => {
    const newTrip: CustomTripRequest = {
      ...tripData,
      id: `custom-${Date.now()}`,
      referenceNumber: generateReferenceId(),
      createdAt: new Date().toISOString(),
      status: 'New'
    };

    const updated = [newTrip, ...customTrips];
    setCustomTrips(updated);
    saveToLocal(STORAGE_KEYS.CUSTOM_TRIPS, updated);

    if (firestore) {
      try {
        await addDoc(collection(firestore, 'customTripRequests'), newTrip);
      } catch (err) {
        console.warn('Firestore write fallback used:', err);
      }
    }

    setLastSubmittedEnquiry(newTrip);
    setIsConfirmationModalOpen(true);
    addToast(`Custom Trip Request ${newTrip.referenceNumber} submitted!`, 'success');
    return newTrip;
  };

  const updateEnquiryStatus = async (id: string, status: EnquiryStatus, notes?: string, staff?: string) => {
    const updated = enquiries.map(e => {
      if (e.id === id) {
        return {
          ...e,
          status,
          internalNotes: notes !== undefined ? notes : e.internalNotes,
          assignedStaff: staff !== undefined ? staff : e.assignedStaff,
          updatedAt: new Date().toISOString()
        };
      }
      return e;
    });
    setEnquiries(updated);
    saveToLocal(STORAGE_KEYS.ENQUIRIES, updated);
    addToast(`Enquiry status updated to ${status}`, 'info');
  };

  const deleteEnquiry = async (id: string) => {
    const updated = enquiries.filter(e => e.id !== id);
    setEnquiries(updated);
    saveToLocal(STORAGE_KEYS.ENQUIRIES, updated);
    addToast('Enquiry removed', 'info');
  };

  const updateCustomTripStatus = async (id: string, status: EnquiryStatus, notes?: string) => {
    const updated = customTrips.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status,
          internalNotes: notes !== undefined ? notes : t.internalNotes
        };
      }
      return t;
    });
    setCustomTrips(updated);
    saveToLocal(STORAGE_KEYS.CUSTOM_TRIPS, updated);
    addToast(`Custom Trip status updated to ${status}`, 'info');
  };

  const deleteCustomTrip = async (id: string) => {
    const updated = customTrips.filter(t => t.id !== id);
    setCustomTrips(updated);
    saveToLocal(STORAGE_KEYS.CUSTOM_TRIPS, updated);
    addToast('Custom trip request removed', 'info');
  };

  // CMS - Packages
  const savePackage = async (pkg: TourPackage) => {
    const exists = packages.some(p => p.id === pkg.id);
    let updated: TourPackage[];
    if (exists) {
      updated = packages.map(p => p.id === pkg.id ? { ...pkg, updatedAt: new Date().toISOString() } : p);
    } else {
      updated = [{ ...pkg, createdAt: new Date().toISOString() }, ...packages];
    }
    setPackages(updated);
    saveToLocal(STORAGE_KEYS.PACKAGES, updated);
    addToast(exists ? 'Package updated successfully' : 'New package created', 'success');
  };

  const deletePackage = async (id: string) => {
    const updated = packages.filter(p => p.id !== id);
    setPackages(updated);
    saveToLocal(STORAGE_KEYS.PACKAGES, updated);
    addToast('Package deleted', 'info');
  };

  const duplicatePackage = async (id: string): Promise<TourPackage> => {
    const original = packages.find(p => p.id === id);
    if (!original) throw new Error('Package not found');

    const newPkg: TourPackage = {
      ...original,
      id: `pkg-${Date.now()}`,
      title: `${original.title} (Copy)`,
      slug: `${original.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      isPublished: false,
      createdAt: new Date().toISOString()
    };

    const updated = [newPkg, ...packages];
    setPackages(updated);
    saveToLocal(STORAGE_KEYS.PACKAGES, updated);
    addToast(`Duplicated package "${original.title}"`, 'success');
    return newPkg;
  };

  // CMS - Destinations
  const saveDestination = async (dest: Destination) => {
    const exists = destinations.some(d => d.id === dest.id);
    let updated: Destination[];
    if (exists) {
      updated = destinations.map(d => d.id === dest.id ? dest : d);
    } else {
      updated = [...destinations, dest];
    }
    setDestinations(updated);
    saveToLocal(STORAGE_KEYS.DESTINATIONS, updated);
    addToast(exists ? 'Destination updated' : 'New destination created', 'success');
  };

  const deleteDestination = async (id: string) => {
    const updated = destinations.filter(d => d.id !== id);
    setDestinations(updated);
    saveToLocal(STORAGE_KEYS.DESTINATIONS, updated);
    addToast('Destination removed', 'info');
  };

  // CMS - Blog Posts
  const saveBlogPost = async (post: BlogPost) => {
    const exists = blogPosts.some(b => b.id === post.id);
    let updated: BlogPost[];
    if (exists) {
      updated = blogPosts.map(b => b.id === post.id ? post : b);
    } else {
      updated = [post, ...blogPosts];
    }
    setBlogPosts(updated);
    saveToLocal(STORAGE_KEYS.BLOGS, updated);
    addToast(exists ? 'Travel guide article updated' : 'New article published', 'success');
  };

  const deleteBlogPost = async (id: string) => {
    const updated = blogPosts.filter(b => b.id !== id);
    setBlogPosts(updated);
    saveToLocal(STORAGE_KEYS.BLOGS, updated);
    addToast('Article removed', 'info');
  };

  // CMS - Testimonials
  const saveTestimonial = async (test: Testimonial) => {
    const exists = testimonials.some(t => t.id === test.id);
    let updated: Testimonial[];
    if (exists) {
      updated = testimonials.map(t => t.id === test.id ? test : t);
    } else {
      updated = [test, ...testimonials];
    }
    setTestimonials(updated);
    saveToLocal(STORAGE_KEYS.TESTIMONIALS, updated);
    addToast('Testimonial saved', 'success');
  };

  const deleteTestimonial = async (id: string) => {
    const updated = testimonials.filter(t => t.id !== id);
    setTestimonials(updated);
    saveToLocal(STORAGE_KEYS.TESTIMONIALS, updated);
    addToast('Testimonial removed', 'info');
  };

  // CMS - FAQs
  const saveFAQ = async (faq: FAQItem) => {
    const exists = faqs.some(f => f.id === faq.id);
    let updated: FAQItem[];
    if (exists) {
      updated = faqs.map(f => f.id === faq.id ? faq : f);
    } else {
      updated = [...faqs, faq];
    }
    setFaqs(updated);
    saveToLocal(STORAGE_KEYS.FAQS, updated);
    addToast('FAQ updated', 'success');
  };

  const deleteFAQ = async (id: string) => {
    const updated = faqs.filter(f => f.id !== id);
    setFaqs(updated);
    saveToLocal(STORAGE_KEYS.FAQS, updated);
    addToast('FAQ deleted', 'info');
  };

  // CMS - Settings
  const updateSettings = async (newSettings: SiteSettings) => {
    setSettings(newSettings);
    saveToLocal(STORAGE_KEYS.SETTINGS, newSettings);
    addToast('Website & Contact settings updated', 'success');
  };

  // Reset to initial demo data
  const resetToInitialDemoData = () => {
    setSettings(INITIAL_SETTINGS);
    setDestinations(INITIAL_DESTINATIONS);
    setPackages(INITIAL_PACKAGES);
    setBlogPosts(INITIAL_BLOG_POSTS);
    setTestimonials(INITIAL_TESTIMONIALS);
    setFaqs(INITIAL_FAQS);
    setEnquiries(INITIAL_SAMPLE_ENQUIRIES);
    setCustomTrips([]);

    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.DESTINATIONS);
    localStorage.removeItem(STORAGE_KEYS.PACKAGES);
    localStorage.removeItem(STORAGE_KEYS.BLOGS);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEYS.FAQS);
    localStorage.removeItem(STORAGE_KEYS.ENQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_TRIPS);

    addToast('Restored all factory demo packages and destinations', 'info');
  };

  // Export / Import
  const exportDatabaseJSON = () => {
    const backup = {
      exportDate: new Date().toISOString(),
      version: '1.0',
      settings,
      destinations,
      packages,
      blogPosts,
      testimonials,
      faqs,
      enquiries,
      customTrips
    };
    return JSON.stringify(backup, null, 2);
  };

  const importDatabaseJSON = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.settings) {
        setSettings(data.settings);
        saveToLocal(STORAGE_KEYS.SETTINGS, data.settings);
      }
      if (Array.isArray(data.destinations)) {
        setDestinations(data.destinations);
        saveToLocal(STORAGE_KEYS.DESTINATIONS, data.destinations);
      }
      if (Array.isArray(data.packages)) {
        setPackages(data.packages);
        saveToLocal(STORAGE_KEYS.PACKAGES, data.packages);
      }
      if (Array.isArray(data.blogPosts)) {
        setBlogPosts(data.blogPosts);
        saveToLocal(STORAGE_KEYS.BLOGS, data.blogPosts);
      }
      if (Array.isArray(data.testimonials)) {
        setTestimonials(data.testimonials);
        saveToLocal(STORAGE_KEYS.TESTIMONIALS, data.testimonials);
      }
      if (Array.isArray(data.faqs)) {
        setFaqs(data.faqs);
        saveToLocal(STORAGE_KEYS.FAQS, data.faqs);
      }
      if (Array.isArray(data.enquiries)) {
        setEnquiries(data.enquiries);
        saveToLocal(STORAGE_KEYS.ENQUIRIES, data.enquiries);
      }
      if (Array.isArray(data.customTrips)) {
        setCustomTrips(data.customTrips);
        saveToLocal(STORAGE_KEYS.CUSTOM_TRIPS, data.customTrips);
      }
      addToast('Backup imported successfully', 'success');
      return true;
    } catch (e) {
      addToast('Failed to parse JSON file', 'error');
      return false;
    }
  };

  // Modal triggers
  const openEnquiryModal = (prefill?: { destination?: string; packageId?: string; packageTitle?: string }) => {
    setEnquiryPrefill(prefill || null);
    setIsEnquiryModalOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsEnquiryModalOpen(false);
    setEnquiryPrefill(null);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <StoreContext.Provider
      value={{
        settings,
        destinations,
        packages,
        blogPosts,
        testimonials,
        faqs,
        enquiries,
        customTrips,
        isLoading,
        isFirebaseActive: isFirebaseConfigured,
        isAdminLoggedIn,
        adminUserEmail,
        adminLogin,
        adminLogout,
        createEnquiry,
        createCustomTrip,
        updateEnquiryStatus,
        deleteEnquiry,
        updateCustomTripStatus,
        deleteCustomTrip,
        savePackage,
        deletePackage,
        duplicatePackage,
        saveDestination,
        deleteDestination,
        saveBlogPost,
        deleteBlogPost,
        saveTestimonial,
        deleteTestimonial,
        saveFAQ,
        deleteFAQ,
        updateSettings,
        resetToInitialDemoData,
        exportDatabaseJSON,
        importDatabaseJSON,
        isEnquiryModalOpen,
        openEnquiryModal,
        closeEnquiryModal,
        enquiryPrefill,
        lastSubmittedEnquiry,
        isConfirmationModalOpen,
        closeConfirmationModal,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
