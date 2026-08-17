import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useStore } from '../../services/storeContext';
import { createWhatsAppUrl } from '../../utils/helpers';

interface WhatsAppFloatingButtonProps {
  currentPath?: string;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({ currentPath }) => {
  const { settings } = useStore();
  const [isTooltipVisible, setIsTooltipVisible] = useState(true);

  // Dynamic context based on current path
  let contextType: 'package' | 'destination' | 'custom' | 'general' = 'general';
  if (currentPath?.startsWith('/packages/')) contextType = 'package';
  else if (currentPath?.startsWith('/destinations/')) contextType = 'destination';
  else if (currentPath === '/custom-tours') contextType = 'custom';

  const whatsappHref = createWhatsAppUrl(settings.whatsappNumber, {
    type: contextType
  });

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end max-w-[calc(100vw-2rem)]">
      {/* Floating Tooltip */}
      {isTooltipVisible && (
        <div className="mb-2.5 bg-white text-slate-800 text-xs px-3 py-2 rounded-xl shadow-xl border border-teal-100 flex items-center gap-2 max-w-[260px] sm:max-w-xs animate-bounce select-none">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <span className="font-medium text-slate-700">Need immediate package assistance? Chat on WhatsApp!</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsTooltipVisible(false);
            }} 
            className="text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300"
        title="Chat with Kovai Compass Holidays on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        {/* Subtle pulsing outer ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />

        {/* WhatsApp Official Logo SVG */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-7 h-7 text-white fill-white transition-transform group-hover:scale-110 drop-shadow-md"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M18.403 5.638A8.955 8.955 0 0 0 12.053 3c-4.968 0-9.01 4.042-9.012 9.014a8.97 8.97 0 0 0 1.393 4.836L3 21l4.237-1.372a8.99 8.99 0 0 0 4.811 1.38h.005c4.968 0 9.009-4.043 9.011-9.015a8.948 8.948 0 0 0-2.661-6.355Zm-6.35 13.684h-.004a7.48 7.48 0 0 1-3.818-1.045l-.273-.163-2.502.819.673-2.438-.179-.285a7.476 7.476 0 0 1-1.146-3.987c.002-4.135 3.366-7.498 7.505-7.498a7.46 7.46 0 0 1 5.304 2.2 7.46 7.46 0 0 1 2.197 5.304c-.002 4.135-3.366 7.493-7.757 7.493Zm4.108-5.614c-.225-.113-1.332-.658-1.538-.733-.207-.076-.357-.113-.508.113-.15.225-.582.733-.713.884-.132.15-.264.169-.49.056-.225-.113-.95-.35-1.81-1.117-.669-.597-1.121-1.334-1.252-1.56-.132-.226-.014-.348.099-.46.102-.101.226-.263.338-.395.113-.131.15-.225.226-.375.075-.15.038-.282-.019-.395-.057-.113-.508-1.222-.696-1.674-.183-.44-.37-.38-.508-.387-.131-.007-.282-.008-.432-.008s-.395.056-.602.282c-.207.226-.789.771-.789 1.88 0 1.109.808 2.181.921 2.332.113.15 1.59 2.428 3.852 3.404.538.232.958.37 1.286.474.54.172 1.032.148 1.42.09.434-.065 1.332-.545 1.52-1.072.188-.526.188-.978.132-1.072-.057-.094-.207-.15-.432-.263Z"
          />
        </svg>

        {/* Hover Label */}
        <span className="absolute right-16 bg-[#071B33] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-teal-900/60">
          WhatsApp Us Direct
        </span>
      </a>
    </div>
  );
};
