import React, { useState } from 'react';
import { useStore } from '../services/storeContext';
import { formatINR, slugify } from '../utils/helpers';
import { 
  Lock, 
  Unlock, 
  Inbox, 
  Compass, 
  MapPin, 
  FileText, 
  Star, 
  Settings, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Trash2, 
  Eye, 
  Edit3, 
  Plus, 
  Download, 
  RefreshCw,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  Phone,
  MessageCircle,
  Mail,
  Copy,
  Check,
  ExternalLink,
  HelpCircle,
  Key
} from 'lucide-react';
import { EnquiryStatus, TourPackage, Destination, BlogPost, Testimonial, FAQItem } from '../types';

interface AdminPageProps {
  onNavigate: (path: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const {
    settings,
    updateSettings,
    enquiries,
    updateEnquiryStatus,
    deleteEnquiry,
    customTrips,
    updateCustomTripStatus,
    deleteCustomTrip,
    packages,
    savePackage,
    deletePackage,
    duplicatePackage,
    destinations,
    saveDestination,
    blogPosts,
    saveBlogPost,
    deleteBlogPost,
    testimonials,
    saveTestimonial,
    deleteTestimonial,
    faqs,
    saveFAQ,
    deleteFAQ,
    resetToInitialDemoData,
    exportDatabaseJSON,
    importDatabaseJSON,
    addToast
  } = useStore();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('kch_admin_auth') === 'true';
  });
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Active CMS Tab
  const [activeTab, setActiveTab] = useState<'enquiries' | 'custom-trips' | 'packages' | 'destinations' | 'blogs' | 'testimonials' | 'faqs' | 'settings'>('enquiries');

  // Search & Filter state for enquiries
  const [enquirySearch, setEnquirySearch] = useState('');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<string>('all');

  // Modals for CMS editing
  const [editingPkg, setEditingPkg] = useState<TourPackage | null>(null);
  const [isNewPkg, setIsNewPkg] = useState(false);

  const [editingDest, setEditingDest] = useState<Destination | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isNewBlog, setIsNewBlog] = useState(false);

  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isNewTestimonial, setIsNewTestimonial] = useState(false);

  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [isNewFaq, setIsNewFaq] = useState(false);

  // Admin Account & Password change state
  const [adminUsernameSetting, setAdminUsernameSetting] = useState(() => {
    return localStorage.getItem('kch_admin_username') || 'armani@kovaiholidays.com';
  });
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [confirmAdminPassword, setConfirmAdminPassword] = useState('');

  // Stored admin credentials
  const getStoredUsername = () => {
    return (localStorage.getItem('kch_admin_username') || 'armani@kovaiholidays.com').trim().toLowerCase();
  };

  const getStoredPassword = () => {
    return localStorage.getItem('kch_admin_custom_password') || 'Kovai@2026!Admin';
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validUsername = getStoredUsername();
    const validPassword = getStoredPassword();
    const enteredUser = usernameInput.trim().toLowerCase();
    const enteredPass = passwordInput.trim();

    const isUserValid = enteredUser === validUsername;
    const isPassValid = enteredPass === validPassword;

    if (isUserValid && isPassValid) {
      setIsAuthenticated(true);
      sessionStorage.setItem('kch_admin_auth', 'true');
      sessionStorage.setItem('kch_admin_user', enteredUser || validUsername);
      addToast(`Welcome back, ${enteredUser || validUsername}!`, 'success');
    } else if (!isUserValid) {
      addToast('Invalid username / email. Please check your credentials.', 'error');
    } else {
      addToast('Incorrect password. Please try again.', 'error');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('kch_admin_auth');
    sessionStorage.removeItem('kch_admin_user');
    addToast('Logged out of Admin Portal.', 'info');
  };

  const handleSaveAdminAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUsernameSetting || !adminUsernameSetting.includes('@')) {
      addToast('Please enter a valid administrator email address.', 'error');
      return;
    }
    localStorage.setItem('kch_admin_username', adminUsernameSetting.trim().toLowerCase());

    if (newAdminPassword) {
      if (newAdminPassword.length < 4) {
        addToast('Password must be at least 4 characters long.', 'error');
        return;
      }
      if (newAdminPassword !== confirmAdminPassword) {
        addToast('New passwords do not match.', 'error');
        return;
      }
      localStorage.setItem('kch_admin_custom_password', newAdminPassword);
      setNewAdminPassword('');
      setConfirmAdminPassword('');
    }

    addToast('Administrator login credentials updated successfully!', 'success');
  };

  // CSV Export for Enquiries
  const handleExportEnquiriesCSV = () => {
    if (enquiries.length === 0) {
      addToast('No enquiries available to export.', 'info');
      return;
    }
    const headers = ['Ref ID', 'Name', 'Phone', 'Email', 'Destination', 'Package', 'Travel Date', 'Adults', 'Children', 'Status', 'Message', 'Created At'];
    const rows = enquiries.map(e => [
      e.referenceNumber,
      `"${(e.name || '').replace(/"/g, '""')}"`,
      `"${e.phone || ''}"`,
      `"${e.email || ''}"`,
      `"${e.destination || ''}"`,
      `"${(e.packageTitle || '').replace(/"/g, '""')}"`,
      `"${e.travelDate || ''}"`,
      e.adults,
      e.children,
      e.status,
      `"${(e.message || '').replace(/"/g, '""')}"`,
      `"${e.createdAt || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `kovai_compass_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Leads CSV exported successfully!', 'success');
  };

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter(enq => {
    const matchesSearch = 
      enq.name.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      enq.phone.includes(enquirySearch) ||
      enq.referenceNumber.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      enq.destination.toLowerCase().includes(enquirySearch.toLowerCase());
    
    const matchesStatus = enquiryStatusFilter === 'all' || enq.status.toLowerCase() === enquiryStatusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#071B33] via-[#0B2748] to-[#071B33] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-amber-50 text-[#C99A2E] border border-amber-200 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#0D7F86] font-bold">Kovai Compass Holidays</span>
            <h1 className="font-display text-2xl font-extrabold text-[#071B33] mt-1">Admin CMS Portal</h1>
            <p className="text-xs text-slate-500 mt-1.5">Sign in to manage lead enquiries, tour packages, destination guides, and website settings.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#0D7F86]" />
                <span>Admin Username / Email</span>
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={e => setUsernameInput(e.target.value)}
                placeholder="Enter administrator email..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#0D7F86] focus:outline-none"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#0D7F86]" />
                <span>Admin Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  placeholder="Enter administrator password..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#0D7F86] focus:outline-none pr-14"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold px-1 py-0.5"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-gold-gradient w-full font-bold text-sm py-3 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Sign In to Admin Workspace
            </button>
          </form>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('/')}
              className="text-xs text-slate-500 hover:text-[#0D7F86] font-medium transition-colors"
            >
              ← Return to Live Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      {/* Top Admin Header */}
      <div className="bg-[#071B33] text-white py-3.5 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-4 shadow-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#C99A2E] text-[#071B33] rounded-xl shadow">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-sm sm:text-base leading-tight">Kovai Compass CMS Workspace</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] text-amber-300 font-mono flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                <span>{sessionStorage.getItem('kch_admin_user') || 'armani@kovaiholidays.com'}</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-[10px] text-slate-400 font-mono">/admin</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-1.5 text-xs text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-800 px-3 py-2 rounded-xl transition-all border border-slate-700 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">View Live Site</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-rose-200 hover:text-white bg-rose-950/60 hover:bg-rose-900 border border-rose-800/80 px-3 py-2 rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Metric Summary Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-slate-900">{enquiries.length}</div>
              <div className="text-xs text-slate-500 font-medium">Total Inquiries</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-slate-900">{customTrips.length}</div>
              <div className="text-xs text-slate-500 font-medium">Custom Trips</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-slate-900">{packages.length}</div>
              <div className="text-xs text-slate-500 font-medium">Tour Packages</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-slate-900">{testimonials.length}</div>
              <div className="text-xs text-slate-500 font-medium">Client Reviews</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          {[
            { id: 'enquiries', label: `Inquiries (${enquiries.length})`, icon: Inbox },
            { id: 'custom-trips', label: `Custom Requests (${customTrips.length})`, icon: Compass },
            { id: 'packages', label: `Tour Packages (${packages.length})`, icon: MapPin },
            { id: 'destinations', label: `Destinations (${destinations.length})`, icon: GlobeIcon },
            { id: 'blogs', label: `Travel Guides (${blogPosts.length})`, icon: FileText },
            { id: 'testimonials', label: `Reviews (${testimonials.length})`, icon: Star },
            { id: 'settings', label: 'Site Settings & CMS Password', icon: Settings },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#071B33] text-amber-300 shadow'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Enquiries CMS */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="font-display text-xl font-bold text-[#071B33]">Customer Tour Enquiries</h2>
                <p className="text-xs text-slate-500">Live incoming leads from website package pages and trip planner forms.</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportEnquiriesCSV}
                  className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by customer name, phone, ref number or destination..."
                  value={enquirySearch}
                  onChange={e => setEnquirySearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#0D7F86] focus:outline-none"
                />
              </div>

              <select
                value={enquiryStatusFilter}
                onChange={e => setEnquiryStatusFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-700"
              >
                <option value="all">All Statuses ({enquiries.length})</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="quoted">Quoted</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {filteredEnquiries.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-600">No matching inquiries found.</p>
                <p className="text-xs text-slate-400 mt-1">Try clearing search filters.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">Ref ID</th>
                      <th className="p-3.5">Customer Contact</th>
                      <th className="p-3.5">Destination & Package</th>
                      <th className="p-3.5">Travel Details</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Instant Connect</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredEnquiries.map(enq => {
                      const cleanPhone = (enq.phone || '').toString().replace(/[^0-9]/g, '');
                      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                        `Hello ${enq.name || 'Traveler'}, greetings from Kovai Compass Holidays! Regarding your holiday inquiry for ${enq.destination || 'your trip'} (Ref: ${enq.referenceNumber || ''}): We would be delighted to share a customized itinerary.`
                      )}`;

                      return (
                        <tr key={enq.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5">
                            <span className="font-mono font-bold text-xs bg-teal-50 border border-teal-200 text-[#0D7F86] px-2 py-1 rounded-md">
                              {enq.referenceNumber}
                            </span>
                            <div className="text-[10px] text-slate-400 mt-1">
                              {enq.createdAt ? new Date(enq.createdAt).toLocaleDateString() : 'Recent'}
                            </div>
                          </td>

                          <td className="p-3.5">
                            <div className="font-bold text-slate-900">{enq.name}</div>
                            <div className="text-xs text-slate-500 font-mono">{enq.phone}</div>
                            <div className="text-[11px] text-slate-400">{enq.email}</div>
                          </td>

                          <td className="p-3.5">
                            <div className="font-bold text-[#071B33]">{enq.destination}</div>
                            {enq.packageTitle && (
                              <div className="text-xs text-teal-700 font-medium">{enq.packageTitle}</div>
                            )}
                            {enq.message && (
                              <div className="text-[11px] text-slate-500 italic line-clamp-1 mt-0.5">
                                "{enq.message}"
                              </div>
                            )}
                          </td>

                          <td className="p-3.5 text-xs">
                            <div className="font-medium text-slate-800">
                              {enq.travelDate ? enq.travelDate : 'Flexible Dates'}
                            </div>
                            <div className="text-slate-500">
                              {enq.adults} Adults {enq.children > 0 ? `• ${enq.children} Kids` : ''}
                            </div>
                            {enq.budget && (
                              <div className="text-[11px] text-amber-700 font-semibold">{enq.budget}</div>
                            )}
                          </td>

                          <td className="p-3.5">
                            <select
                              value={enq.status}
                              onChange={e => updateEnquiryStatus(enq.id, e.target.value as EnquiryStatus)}
                              className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border focus:outline-none ${
                                enq.status === 'New'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : enq.status === 'Contacted'
                                  ? 'bg-blue-50 text-blue-800 border-blue-300'
                                  : enq.status === 'Quoted'
                                  ? 'bg-purple-50 text-purple-800 border-purple-300'
                                  : enq.status === 'Confirmed'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : 'bg-slate-100 text-slate-700 border-slate-300'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Follow-Up">Follow-Up</option>
                              <option value="Quoted">Quoted</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Cancelled">Cancelled</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>

                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-emerald-50 hover:bg-[#25D366] text-emerald-700 hover:text-white rounded-lg border border-emerald-200 transition-all"
                                title="Chat on WhatsApp"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </a>

                              <a
                                href={`tel:${(enq.phone || '').toString().replace(/[^0-9+]/g, '')}`}
                                className="p-2 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-lg border border-blue-200 transition-all"
                                title="Call Customer"
                              >
                                <Phone className="w-4 h-4" />
                              </a>

                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete inquiry for ${enq.name}?`)) {
                                    deleteEnquiry(enq.id);
                                  }
                                }}
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                title="Delete Inquiry"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Custom Trip Requests */}
        {activeTab === 'custom-trips' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="font-display text-xl font-bold text-[#071B33]">Custom Trip Requests ({customTrips.length})</h2>
              <p className="text-xs text-slate-500">Detailed submissions from the custom holiday builder.</p>
            </div>

            {customTrips.length === 0 ? (
              <p className="text-center py-12 text-slate-500 text-sm">No custom trip requests submitted yet.</p>
            ) : (
              <div className="space-y-4">
                {customTrips.map(trip => {
                  const cleanPhone = (trip.phone || '').toString().replace(/[^0-9]/g, '');
                  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                    `Hello ${trip.name || 'Traveler'}, greetings from Kovai Compass Holidays! We reviewed your custom holiday plan for ${trip.destination || 'your vacation'} (${trip.durationDays || 'Multi'} Days for ${trip.adults || 2} Adults). We are preparing your quotation.`
                  )}`;

                  return (
                    <div key={trip.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-xs bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md border border-amber-300">
                            {trip.referenceNumber}
                          </span>
                          <h3 className="font-bold text-slate-900 text-base">{trip.name}</h3>
                          <span className="text-xs text-slate-500">({trip.email} • {trip.phone})</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs font-bold bg-[#25D366] text-white px-3 py-1.5 rounded-lg shadow-sm"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-white" />
                            <span>WhatsApp</span>
                          </a>

                          <select
                            value={trip.status}
                            onChange={e => updateCustomTripStatus(trip.id, e.target.value as any)}
                            className="text-xs font-bold px-2 py-1.5 rounded-lg bg-white border border-slate-300"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Quoted">Quoted</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete request from ${trip.name}?`)) {
                                deleteCustomTrip(trip.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 pt-2 border-t border-slate-200">
                        <div>
                          <strong>Destination:</strong> {trip.destination}<br />
                          <strong>Duration:</strong> {trip.durationDays} Days ({trip.adults} Adults, {trip.children} Children)
                        </div>
                        <div>
                          <strong>Hotel Category:</strong> {trip.hotelCategory}<br />
                          <strong>Holiday Type:</strong> {trip.travelStyle}
                        </div>
                        <div>
                          <strong>Approx Travel Date:</strong> {trip.preferredTravelDate || 'Flexible'}<br />
                          <strong>Departure City:</strong> {trip.departureCity || 'Coimbatore / India'}
                        </div>
                      </div>

                      {trip.interests && trip.interests.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-[11px] font-semibold text-slate-500">Interests:</span>
                          {trip.interests.map((it, i) => (
                            <span key={i} className="text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                              {it}
                            </span>
                          ))}
                        </div>
                      )}

                      {trip.specialRequests && (
                        <div className="text-xs bg-amber-50/80 p-2.5 rounded-lg border border-amber-200 text-amber-900">
                          <strong>Client Notes:</strong> {trip.specialRequests}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Tour Packages Manager */}
        {activeTab === 'packages' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="font-display text-xl font-bold text-[#071B33]">Tour Packages Manager ({packages.length})</h2>
                <p className="text-xs text-slate-500">Create, edit prices, update highlights, and toggle active itineraries.</p>
              </div>

              <button
                onClick={() => {
                  setEditingPkg({
                    id: `pkg-${Date.now()}`,
                    title: '',
                    slug: '',
                    destination: 'Singapore',
                    destinationSlug: 'singapore',
                    durationDays: 4,
                    durationNights: 3,
                    startingPrice: 45000,
                    currency: 'INR',
                    priceNote: 'per person on twin sharing',
                    heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
                    galleryImages: [],
                    shortDescription: '',
                    overview: '',
                    highlights: ['Airport transfers in private AC vehicle', '4-Star central hotel with breakfast', 'English speaking local guide'],
                    travelStyle: 'Family Holiday',
                    isFeatured: true,
                    isPublished: true,
                    itinerary: [
                      { day: 1, title: 'Arrival & Welcome', description: 'Arrive at airport, private transfer to hotel.' }
                    ],
                    inclusions: ['Accommodation', 'Daily Breakfast', 'Sightseeing Transfers', 'Visa Assistance'],
                    exclusions: ['Airfare', 'Personal Expenses', 'Travel Insurance'],
                    importantNotes: ['Valid passport with 6 months validity required']
                  });
                  setIsNewPkg(true);
                }}
                className="btn-gold-gradient flex items-center gap-1.5 text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#071B33]" />
                <span>Add New Tour Package</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packages.map(pkg => (
                <div key={pkg.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
                  <div className="flex items-start gap-3">
                    <img src={pkg.heroImage} alt={pkg.title} className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold bg-[#0D7F86] text-white px-2 py-0.5 rounded">
                          {pkg.destination}
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold">
                          {pkg.durationDays}D / {pkg.durationNights}N
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug truncate mt-1">{pkg.title}</h4>
                      <p className="text-xs font-extrabold text-[#071B33] mt-1">
                        {formatINR(pkg.startingPrice)} <span className="text-[10px] font-normal text-slate-500">/ person</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          savePackage({ ...pkg, isPublished: !pkg.isPublished });
                          addToast(`Package status updated to ${pkg.isPublished ? 'Draft' : 'Published'}`, 'info');
                        }}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-md transition-colors ${
                          pkg.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {pkg.isPublished ? 'Published' : 'Draft'}
                      </button>

                      <button
                        onClick={() => {
                          savePackage({ ...pkg, isFeatured: !pkg.isFeatured });
                          addToast(`Featured status toggled`, 'info');
                        }}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${
                          pkg.isFeatured ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {pkg.isFeatured ? '⭐ Featured' : 'Standard'}
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingPkg({ ...pkg });
                          setIsNewPkg(false);
                        }}
                        className="p-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-700 text-xs font-bold flex items-center gap-1"
                        title="Edit Package"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#0D7F86]" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete package "${pkg.title}"?`)) {
                            deletePackage(pkg.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Destinations CMS */}
        {activeTab === 'destinations' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="font-display text-xl font-bold text-[#071B33]">Destinations ({destinations.length})</h2>
              <p className="text-xs text-slate-500">Update country taglines, estimated prices, and hero banners.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map(d => (
                <div key={d.id} className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 space-y-3 flex flex-col justify-between">
                  <div>
                    <img src={d.heroImage} alt={d.name} className="w-full h-36 object-cover" />
                    <div className="p-4 space-y-1.5">
                      <h3 className="font-bold text-[#071B33] text-base">{d.name} ({d.country})</h3>
                      <p className="text-xs text-amber-700 font-semibold">{d.tagline}</p>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1">{d.shortDescription}</p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold">
                    <span>Est. {formatINR(d.startingPriceEstimate || 0)}</span>
                    <button
                      onClick={() => setEditingDest({ ...d })}
                      className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3 text-[#0D7F86]" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Blogs & Guides CMS */}
        {activeTab === 'blogs' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="font-display text-xl font-bold text-[#071B33]">Travel Guides & Blog Posts ({blogPosts.length})</h2>
                <p className="text-xs text-slate-500">Manage visa tips, destination guides, and articles.</p>
              </div>

              <button
                onClick={() => {
                  setEditingBlog({
                    id: `blog-${Date.now()}`,
                    title: '',
                    slug: `guide-${Date.now()}`,
                    shortDescription: '',
                    content: '',
                    author: 'Kovai Compass Travel Desk',
                    publishedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    category: 'Singapore Visa & Tips',
                    readTime: '4 min read',
                    featuredImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
                    isPublished: true,
                    isFeatured: false,
                    tags: ['Travel Tips', 'Holiday Planning']
                  });
                  setIsNewBlog(true);
                }}
                className="btn-gold-gradient flex items-center gap-1 text-xs font-extrabold px-3.5 py-2 rounded-xl cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#071B33]" />
                <span>Add Article</span>
              </button>
            </div>

            <div className="space-y-3">
              {blogPosts.map(post => (
                <div key={post.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={post.featuredImage} alt={post.title} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <span className="text-[10px] font-bold text-[#0D7F86] uppercase">{post.category}</span>
                      <h4 className="font-bold text-slate-900 text-sm">{post.title}</h4>
                      <p className="text-xs text-slate-500">{post.publishedDate} • {post.readTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingBlog({ ...post });
                        setIsNewBlog(false);
                      }}
                      className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3 text-[#0D7F86]" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Delete blog post "${post.title}"?`)) {
                          deleteBlogPost(post.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: Testimonials CMS */}
        {activeTab === 'testimonials' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="font-display text-xl font-bold text-[#071B33]">Client Reviews & Testimonials ({testimonials.length})</h2>
                <p className="text-xs text-slate-500">Customer feedback displayed on homepage and destination pages.</p>
              </div>

              <button
                onClick={() => {
                  setEditingTestimonial({
                    id: `test-${Date.now()}`,
                    customerName: '',
                    location: 'Coimbatore, India',
                    destination: 'Singapore & Malaysia',
                    rating: 5,
                    review: '',
                    travelDate: 'Recent',
                    isPublished: true,
                    isVerified: true
                  });
                  setIsNewTestimonial(true);
                }}
                className="btn-gold-gradient flex items-center gap-1 text-xs font-extrabold px-3.5 py-2 rounded-xl cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#071B33]" />
                <span>Add Review</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map(t => (
                <div key={t.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-sm">{t.customerName}</h4>
                      <span className="text-xs text-amber-500 font-bold">{'★'.repeat(t.rating)}</span>
                    </div>
                    <p className="text-xs text-slate-500">{t.location} • {t.destination}</p>
                    <p className="text-xs text-slate-700 italic leading-relaxed">"{t.review}"</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      {t.isVerified ? 'Verified' : 'Review'}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingTestimonial({ ...t });
                          setIsNewTestimonial(false);
                        }}
                        className="p-1 text-xs text-slate-600 hover:text-[#0D7F86]"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this testimonial?')) {
                            deleteTestimonial(t.id);
                          }
                        }}
                        className="p-1 text-xs text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: Site Settings & Password Management */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              <h2 className="font-display text-xl font-bold text-[#071B33]">Agency Contact & Website Configuration</h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1">
                    Announcement Banner Text (Running Marquee)
                  </label>
                  <input
                    type="text"
                    value={settings.announcementText}
                    onChange={e => updateSettings({ announcementText: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#0D7F86]"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">This text automatically animates from left to right on the top announcement bar.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1">
                      Direct Phone Number
                    </label>
                    <input
                      type="text"
                      value={settings.phoneDisplay}
                      onChange={e => updateSettings({ phoneDisplay: e.target.value, phone: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1">
                      WhatsApp Number (with country code)
                    </label>
                    <input
                      type="text"
                      value={settings.whatsappNumber}
                      onChange={e => updateSettings({ whatsappNumber: e.target.value, whatsappDisplay: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1">
                      Primary Email
                    </label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={e => updateSettings({ email: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1">
                      Business Hours
                    </label>
                    <input
                      type="text"
                      value={settings.businessHours}
                      onChange={e => updateSettings({ businessHours: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1">
                    Office Address (Coimbatore)
                  </label>
                  <input
                    type="text"
                    value={settings.officeAddress}
                    onChange={e => updateSettings({ officeAddress: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                  />
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      if (window.confirm('Reset all demo packages, reviews, and settings to factory defaults?')) {
                        resetToInitialDemoData();
                        addToast('Database reset to initial demo state.', 'info');
                      }
                    }}
                    className="flex items-center gap-2 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-4 py-2.5 rounded-xl hover:bg-rose-100 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset All Content to Initial Demo Data</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Admin Account & Security Settings Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#071B33]">
                  <ShieldCheck className="w-5 h-5 text-[#0D7F86]" />
                  <h3 className="font-display font-bold text-base">Admin Login Credentials</h3>
                </div>
                <p className="text-xs text-slate-500">Configure the username/email and password used to sign in to this CMS dashboard.</p>

                <form onSubmit={handleSaveAdminAccount} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#0D7F86]" />
                      <span>Administrator Email / Username</span>
                    </label>
                    <input
                      type="email"
                      value={adminUsernameSetting}
                      onChange={e => setAdminUsernameSetting(e.target.value)}
                      placeholder="armani@kovaiholidays.com"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white text-slate-900 font-medium"
                      required
                    />
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-[#C99A2E]" />
                      <span>New Password (optional)</span>
                    </label>
                    <input
                      type="password"
                      value={newAdminPassword}
                      onChange={e => setNewAdminPassword(e.target.value)}
                      placeholder="Leave blank to keep current password"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    />
                  </div>

                  {newAdminPassword && (
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmAdminPassword}
                        onChange={e => setConfirmAdminPassword(e.target.value)}
                        placeholder="Re-type new password"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                        required
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn-gold-gradient w-full font-bold text-xs py-2.5 rounded-xl shadow cursor-pointer"
                  >
                    Update Admin Credentials
                  </button>
                </form>
              </div>

              {/* Direct CMS Link Reference */}
              <div className="bg-[#071B33] text-white p-6 rounded-3xl space-y-3">
                <h4 className="font-bold text-sm text-amber-300">Direct Link to CMS:</h4>
                <p className="text-xs text-slate-300">Save this private URL to access your Content Management System directly:</p>
                <div className="bg-slate-900/80 p-2.5 rounded-xl text-xs font-mono text-teal-300 flex items-center justify-between border border-slate-700">
                  <span className="truncate">https://www.kovaicompassholidays.com/admin</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('https://www.kovaicompassholidays.com/admin');
                      addToast('CMS URL copied to clipboard!', 'success');
                    }}
                    className="text-amber-400 hover:text-amber-300 ml-2"
                    title="Copy Link"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">Unlisted from the public website for security. Only authorized administrators with the login credentials can sign in.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: Edit Package */}
      {editingPkg && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-display font-bold text-xl text-[#071B33]">
                {isNewPkg ? 'Add New Tour Package' : `Edit Package: ${editingPkg.title}`}
              </h3>
              <button onClick={() => setEditingPkg(null)} className="text-slate-400 hover:text-slate-700 text-sm font-bold">
                ✕ Close
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                if (!editingPkg.title || !editingPkg.slug) {
                  editingPkg.slug = slugify(editingPkg.title);
                }
                savePackage(editingPkg);
                setEditingPkg(null);
                addToast('Package saved successfully!', 'success');
              }}
              className="space-y-4 text-xs sm:text-sm"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Package Title</label>
                <input
                  type="text"
                  value={editingPkg.title}
                  onChange={e => setEditingPkg({ ...editingPkg, title: e.target.value, slug: slugify(e.target.value) })}
                  placeholder="e.g. 5D/4N Singapore City & Sentosa Island Extravaganza"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Destination</label>
                  <select
                    value={editingPkg.destination}
                    onChange={e => setEditingPkg({ ...editingPkg, destination: e.target.value, destinationSlug: e.target.value.toLowerCase() })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  >
                    <option value="Singapore">Singapore</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Cambodia">Cambodia</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Days / Nights</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={editingPkg.durationDays}
                      onChange={e => setEditingPkg({ ...editingPkg, durationDays: Number(e.target.value) })}
                      placeholder="Days"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                    />
                    <input
                      type="number"
                      value={editingPkg.durationNights}
                      onChange={e => setEditingPkg({ ...editingPkg, durationNights: Number(e.target.value) })}
                      placeholder="Nights"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Starting Price (₹)</label>
                  <input
                    type="number"
                    value={editingPkg.startingPrice}
                    onChange={e => setEditingPkg({ ...editingPkg, startingPrice: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-[#0D7F86]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Hero Image URL</label>
                <input
                  type="text"
                  value={editingPkg.heroImage}
                  onChange={e => setEditingPkg({ ...editingPkg, heroImage: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingPkg.shortDescription}
                  onChange={e => setEditingPkg({ ...editingPkg, shortDescription: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPkg(null)}
                  className="px-4 py-2.5 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold-gradient font-bold px-6 py-2.5 rounded-xl shadow"
                >
                  Save Tour Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit Destination */}
      {editingDest && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-display font-bold text-xl text-[#071B33]">Edit Destination: {editingDest.name}</h3>
              <button onClick={() => setEditingDest(null)} className="text-slate-400 hover:text-slate-700 text-sm font-bold">✕ Close</button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                saveDestination(editingDest);
                setEditingDest(null);
                addToast('Destination updated!', 'success');
              }}
              className="space-y-4 text-xs sm:text-sm"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingDest.tagline}
                  onChange={e => setEditingDest({ ...editingDest, tagline: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Estimated Starting Price (₹)</label>
                <input
                  type="number"
                  value={editingDest.startingPriceEstimate || 0}
                  onChange={e => setEditingDest({ ...editingDest, startingPriceEstimate: Number(e.target.value) })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Hero Image URL</label>
                <input
                  type="text"
                  value={editingDest.heroImage}
                  onChange={e => setEditingDest({ ...editingDest, heroImage: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setEditingDest(null)} className="px-4 py-2 text-slate-600">Cancel</button>
                <button type="submit" className="btn-gold-gradient font-bold px-6 py-2.5 rounded-xl shadow">Save Destination</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit Blog Post */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-display font-bold text-xl text-[#071B33]">
                {isNewBlog ? 'Add Travel Guide Article' : `Edit Article: ${editingBlog.title}`}
              </h3>
              <button onClick={() => setEditingBlog(null)} className="text-slate-400 hover:text-slate-700 text-sm font-bold">✕ Close</button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                saveBlogPost(editingBlog);
                setEditingBlog(null);
                addToast('Blog article saved!', 'success');
              }}
              className="space-y-4 text-xs sm:text-sm"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Article Title</label>
                <input
                  type="text"
                  value={editingBlog.title}
                  onChange={e => setEditingBlog({ ...editingBlog, title: e.target.value, slug: slugify(e.target.value) })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingBlog.category}
                    onChange={e => setEditingBlog({ ...editingBlog, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={editingBlog.readTime}
                    onChange={e => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description / Summary</label>
                <textarea
                  rows={2}
                  value={editingBlog.shortDescription}
                  onChange={e => setEditingBlog({ ...editingBlog, shortDescription: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Featured Image URL</label>
                <input
                  type="text"
                  value={editingBlog.featuredImage}
                  onChange={e => setEditingBlog({ ...editingBlog, featuredImage: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setEditingBlog(null)} className="px-4 py-2 text-slate-600">Cancel</button>
                <button type="submit" className="btn-gold-gradient font-bold px-6 py-2.5 rounded-xl shadow">Save Article</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit Testimonial */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-display font-bold text-xl text-[#071B33]">
                {isNewTestimonial ? 'Add Client Review' : 'Edit Review'}
              </h3>
              <button onClick={() => setEditingTestimonial(null)} className="text-slate-400 hover:text-slate-700 text-sm font-bold">✕ Close</button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                saveTestimonial(editingTestimonial);
                setEditingTestimonial(null);
                addToast('Review saved!', 'success');
              }}
              className="space-y-4 text-xs sm:text-sm"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  value={editingTestimonial.customerName}
                  onChange={e => setEditingTestimonial({ ...editingTestimonial, customerName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingTestimonial.location}
                    onChange={e => setEditingTestimonial({ ...editingTestimonial, location: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Destination</label>
                  <input
                    type="text"
                    value={editingTestimonial.destination}
                    onChange={e => setEditingTestimonial({ ...editingTestimonial, destination: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Review Comment</label>
                <textarea
                  rows={3}
                  value={editingTestimonial.review}
                  onChange={e => setEditingTestimonial({ ...editingTestimonial, review: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  required
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setEditingTestimonial(null)} className="px-4 py-2 text-slate-600">Cancel</button>
                <button type="submit" className="btn-gold-gradient font-bold px-6 py-2.5 rounded-xl shadow">Save Review</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper SVG Icon for Globe
function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
