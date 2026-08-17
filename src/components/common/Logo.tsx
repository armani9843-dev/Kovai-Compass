import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'auto';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  showTagline = true,
  size = 'md',
  className = '',
}) => {
  // Dimensions based on size
  const iconSizes = {
    sm: 'w-5 h-5 sm:w-6 sm:h-6',
    md: 'w-6 h-6 min-[380px]:w-7 min-[380px]:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9',
    lg: 'w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13',
  };

  const titleSizes = {
    sm: 'text-[9px] sm:text-xs tracking-normal sm:tracking-wide',
    md: 'text-[9.5px] min-[340px]:text-[10.5px] min-[375px]:text-[11.5px] min-[420px]:text-[12.5px] sm:text-base md:text-lg tracking-normal min-[340px]:tracking-wide sm:tracking-wider',
    lg: 'text-base sm:text-xl md:text-2xl tracking-wider sm:tracking-widest',
  };

  const taglineSizes = {
    sm: 'text-[4.5px] sm:text-[6px] tracking-[0.05em]',
    md: 'text-[5px] min-[340px]:text-[5.5px] min-[375px]:text-[6px] min-[420px]:text-[7px] sm:text-[8.5px] md:text-[9.5px] tracking-[0.04em] min-[340px]:tracking-[0.06em] sm:tracking-[0.14em] md:tracking-[0.2em]',
    lg: 'text-[8.5px] sm:text-xs tracking-[0.18em] sm:tracking-[0.22em]',
  };

  const isDarkVariant = variant === 'dark';

  return (
    <div className={`flex items-center gap-1.5 min-[360px]:gap-2 sm:gap-3 select-none min-w-0 max-w-full overflow-visible ${className}`}>
      {/* Official Compass Symbol in Royal Gold & Navy */}
      <div className={`relative shrink-0 flex items-center justify-center ${iconSizes[size]}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          {/* Outer Compass Outer Ring */}
          <circle cx="50" cy="50" r="46" stroke="url(#goldGradient)" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="41" stroke={isDarkVariant ? '#94A3B8' : '#0B2748'} strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
          <circle cx="50" cy="50" r="33" stroke="url(#goldGradient)" strokeWidth="1.5" />

          {/* Compass 8-Point Star */}
          {/* North Point */}
          <polygon points="50,6 54,42 50,47" fill="url(#goldGradient)" />
          <polygon points="50,6 46,42 50,47" fill="#071B33" />
          
          {/* South Point */}
          <polygon points="50,94 46,58 50,53" fill="url(#goldGradient)" />
          <polygon points="50,94 54,58 50,53" fill="#071B33" />

          {/* East Point */}
          <polygon points="94,50 58,54 53,50" fill="url(#goldGradient)" />
          <polygon points="94,50 58,46 53,50" fill="#071B33" />

          {/* West Point */}
          <polygon points="6,50 42,46 47,50" fill="url(#goldGradient)" />
          <polygon points="6,50 42,54 47,50" fill="#071B33" />

          {/* Secondary 4 Diagonal Points */}
          {/* NE Point */}
          <polygon points="78,22 53,44 56,48" fill="#E1BC63" opacity="0.9" />
          <polygon points="78,22 49,42 53,44" fill="#0B2748" opacity="0.9" />

          {/* NW Point */}
          <polygon points="22,22 47,44 44,48" fill="#E1BC63" opacity="0.9" />
          <polygon points="22,22 51,42 47,44" fill="#0B2748" opacity="0.9" />

          {/* SE Point */}
          <polygon points="78,78 53,56 56,52" fill="#E1BC63" opacity="0.9" />
          <polygon points="78,78 49,58 53,56" fill="#0B2748" opacity="0.9" />

          {/* SW Point */}
          <polygon points="22,78 47,56 44,52" fill="#E1BC63" opacity="0.9" />
          <polygon points="22,78 51,58 47,56" fill="#0B2748" opacity="0.9" />

          {/* Center Jewel Core */}
          <circle cx="50" cy="50" r="7" fill="url(#goldGradient)" />
          <circle cx="50" cy="50" r="4" fill="#071B33" />
          <circle cx="50" cy="50" r="2" fill="#FFFFFF" />

          {/* Cardinal Directions subtle marks */}
          <text x="50" y="16" fontSize="6" fontWeight="bold" fill="#C99A2E" textAnchor="middle" fontFamily="sans-serif">N</text>

          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F6D365" />
              <stop offset="50%" stopColor="#C99A2E" />
              <stop offset="100%" stopColor="#8C6212" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-1.5 leading-tight whitespace-nowrap">
          <span className={`font-brand-title font-bold uppercase whitespace-nowrap ${titleSizes[size]} ${isDarkVariant ? 'text-white' : 'text-[#071B33]'}`}>
            KOVAI <span className="text-[#C99A2E]">COMPASS</span> HOLIDAYS
          </span>
        </div>

        {showTagline && (
          <p className={`font-semibold uppercase tracking-[0.14em] sm:tracking-[0.2em] whitespace-nowrap mt-0.5 ${taglineSizes[size]} ${isDarkVariant ? 'text-amber-200/80' : 'text-[#0D7F86]'}`}>
            GUIDING JOURNEYS • CREATING MEMORIES
          </p>
        )}
      </div>
    </div>
  );
};
