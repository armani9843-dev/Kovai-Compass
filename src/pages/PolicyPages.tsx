import React from 'react';
import { useStore } from '../services/storeContext';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';

interface PolicyPageProps {
  type: 'privacy' | 'terms' | 'cancellation' | 'refund';
  onNavigate: (path: string) => void;
}

export const PolicyPages: React.FC<PolicyPageProps> = ({ type, onNavigate }) => {
  const { settings } = useStore();

  const titles = {
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    cancellation: 'Cancellation Policy',
    refund: 'Refund Policy'
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-[#071B33] text-white py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold">{titles[type]}</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {settings.companyName} • Last updated: 2026
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          {type === 'privacy' && (
            <>
              <h2 className="font-display text-xl font-bold text-[#071B33]">1. Information We Collect</h2>
              <p>
                At Kovai Compass Holidays, we collect information you voluntarily provide when submitting trip inquiries, tour customizations, or contacting our travel desk. This includes your name, email address, telephone/WhatsApp number, travel preferences, and dates.
              </p>

              <h2 className="font-display text-xl font-bold text-[#071B33]">2. Use of Information</h2>
              <p>
                We use your details exclusively for communicating travel itineraries, preparing quotations, assisting with visa documentation, and coordinating holiday arrangements. We never sell, rent, or trade your personal information with unauthorized third parties.
              </p>

              <h2 className="font-display text-xl font-bold text-[#071B33]">3. Data Security & Storage</h2>
              <p>
                Your data is stored securely and accessed only by authorized holiday coordinators for the purpose of fulfilling your vacation bookings.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <h2 className="font-display text-xl font-bold text-[#071B33]">1. Booking & Quotation Policy</h2>
              <p>
                All quotations provided by Kovai Compass Holidays are subject to availability of flights, hotel rooms, and attraction slots at the time of final offline booking. No online financial transactions are processed on this informational portal.
              </p>

              <h2 className="font-display text-xl font-bold text-[#071B33]">2. Visa & Travel Documents</h2>
              <p>
                Travelers are responsible for maintaining valid passports (minimum 6 months validity from departure date). Our team assists with document verification and electronic filing, but final visa issuance is at the sole discretion of the respective embassy or immigration authority.
              </p>

              <h2 className="font-display text-xl font-bold text-[#071B33]">3. Itinerary Variations</h2>
              <p>
                Operational itineraries may be slightly adjusted due to unforeseen weather conditions, local holidays, or flight rescheduling to ensure the highest safety and comfort for our guests.
              </p>
            </>
          )}

          {type === 'cancellation' && (
            <>
              <h2 className="font-display text-xl font-bold text-[#071B33]">1. Cancellation Timeline & Terms</h2>
              <p>
                Cancellations must be communicated in writing to our official email ({settings.email}).
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li><strong>30+ days prior to departure:</strong> Standard administrative fee applies; remaining hotel and transport balances refunded per supplier policies.</li>
                <li><strong>15–29 days prior to departure:</strong> 30%–50% package retention depending on airline ticket cancellation rules and non-refundable hotel bookings.</li>
                <li><strong>Less than 14 days or No-Show:</strong> Up to 100% cancellation charges may apply based on committed international vouchers.</li>
              </ul>
            </>
          )}

          {type === 'refund' && (
            <>
              <h2 className="font-display text-xl font-bold text-[#071B33]">1. Processing of Refunds</h2>
              <p>
                Eligible refunds arising from cancellations or supplier adjustments are processed via direct offline bank transfer (NEFT/RTGS/IMPS) back to the originating bank account within 7–14 business days following written confirmation.
              </p>
              <p>
                Unused entrance tickets or missed excursions during the tour due to personal reasons cannot be refunded once issued.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
