import React from 'react';
import { useStore } from '../../services/storeContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const bgColors = {
          success: 'bg-emerald-800 text-white border-emerald-600',
          error: 'bg-rose-800 text-white border-rose-600',
          info: 'bg-[#071B33] text-white border-teal-600',
        };

        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-rose-300 shrink-0" />,
          info: <Info className="w-5 h-5 text-amber-400 shrink-0" />,
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-2xl border text-sm flex items-start justify-between gap-3 animate-fadeIn ${bgColors[toast.type]}`}
          >
            <div className="flex items-start gap-2.5">
              {icons[toast.type]}
              <p className="leading-snug text-xs sm:text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/70 hover:text-white p-0.5"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
