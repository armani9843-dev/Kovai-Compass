import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useStore } from '../../services/storeContext';
import { createWhatsAppUrl } from '../../utils/helpers';
import { 
  CheckCircle2, 
  MessageCircle, 
  ArrowLeft, 
  Copy, 
  Sparkles, 
  Clock, 
  PhoneCall, 
  FileCheck2,
  Calendar
} from 'lucide-react';

export const SuccessConfirmation: React.FC = () => {
  const { 
    isConfirmationModalOpen, 
    closeConfirmationModal, 
    lastSubmittedEnquiry, 
    settings, 
    addToast 
  } = useStore();

  useEffect(() => {
    if (isConfirmationModalOpen) {
      // Fire celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C99A2E', '#0D7F86', '#071B33', '#E1BC63']
      });
    }
  }, [isConfirmationModalOpen]);

  if (!isConfirmationModalOpen || !lastSubmittedEnquiry) return null;

  const whatsappHref = createWhatsAppUrl(settings.whatsappNumber, {
    referenceNumber: lastSubmittedEnquiry.referenceNumber,
    destination: lastSubmittedEnquiry.destination
  });

  const copyRefNumber = () => {
    navigator.clipboard.writeText(lastSubmittedEnquiry.referenceNumber);
    addToast(`Reference ID ${lastSubmittedEnquiry.referenceNumber} copied!`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 animate-fadeIn text-center">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#071B33] via-[#0B2748] to-[#0D7F86] p-8 text-white relative">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 mb-3 shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Your Journey Starts Here.
          </h3>
          <p className="text-sm text-slate-200 mt-1 max-w-md mx-auto">
            Thank you for choosing Kovai Compass Holidays. Our international travel team is reviewing your requirements.
          </p>
        </div>

        {/* Reference ID Card */}
        <div className="p-6 space-y-6">
          <div className="bg-slate-50 border-2 border-dashed border-teal-600/40 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Official Enquiry Reference Number
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-[#071B33] tracking-wider">
                {lastSubmittedEnquiry.referenceNumber}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Destination: <span className="font-semibold text-teal-800">{lastSubmittedEnquiry.destination}</span> • For: <span className="font-semibold text-slate-700">{lastSubmittedEnquiry.name}</span>
              </div>
            </div>

            <button
              onClick={copyRefNumber}
              className="flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 shadow-sm transition-all"
            >
              <Copy className="w-3.5 h-3.5 text-teal-600" />
              <span>Copy ID</span>
            </button>
          </div>

          {/* What happens next */}
          <div className="text-left space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>What Happens Next?</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-teal-50/60 rounded-lg border border-teal-100 flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">1. Fast Review</p>
                  <p className="text-slate-600">Our tour specialist reviews flights, hotels, and attractions for your dates.</p>
                </div>
              </div>

              <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-100 flex items-start gap-2.5">
                <FileCheck2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">2. Custom Itinerary</p>
                  <p className="text-slate-600">We send a tailored day-by-day plan with transparent offline pricing.</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2.5">
                <PhoneCall className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">3. Direct Call / Chat</p>
                  <p className="text-slate-600">We connect with you on phone/WhatsApp to adjust any preferences.</p>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">4. Offline Confirmation</p>
                  <p className="text-slate-600">Confirm with peace of mind. Pay securely via offline bank transfer/office.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp Now</span>
            </a>

            <button
              onClick={closeConfirmationModal}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm px-5 py-3 rounded-xl transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Website</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
