import React from 'react';

// Safe fallback placeholder for images in case of CDN failure, slow connection, or offline mode
export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80';

// SVG Placeholder Data URI for instant offline zero-network fallback
export const SVG_FALLBACK_DATA_URI = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20500%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23071B33%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%230D7F86%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22url(%23g)%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22sans-serif%22%20font-size%3D%2222%22%20font-weight%3D%22bold%22%20fill%3D%22%23C99A2E%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3EKovai%20Compass%20Holidays%3C%2Ftext%3E%3C%2Fsvg%3E';

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, customFallback?: string) => {
  const target = e.currentTarget;
  if (!target.dataset.hasFailed) {
    target.dataset.hasFailed = 'true';
    target.src = customFallback || SVG_FALLBACK_DATA_URI;
  }
};
