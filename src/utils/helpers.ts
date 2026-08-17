/**
 * Helper utilities for Kovai Compass Holidays
 */

export const formatINR = (amount?: number): string => {
  if (amount === undefined || amount === null || isNaN(amount)) return 'On Request';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const createWhatsAppUrl = (
  phoneNumber: string, 
  context?: { 
    type?: 'package' | 'destination' | 'custom' | 'general';
    title?: string; 
    destination?: string;
    referenceNumber?: string;
  }
): string => {
  // Clean phone number: remove +, -, spaces
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');

  let message = 'Hello Kovai Compass Holidays! ';

  if (context?.referenceNumber) {
    message += `I recently submitted an enquiry with Reference ID: *${context.referenceNumber}*. I would like to discuss the next steps.`;
  } else if (context?.type === 'package' && context.title) {
    message += `I am interested in the *${context.title}* package for ${context.destination || 'my upcoming vacation'}. Please share detailed itinerary and pricing.`;
  } else if (context?.type === 'destination' && context.destination) {
    message += `I am planning a trip to *${context.destination}*. Could you please share available tour packages and customized options?`;
  } else if (context?.type === 'custom') {
    message += `I would like to plan a *customized international holiday*. Please connect me with a travel specialist.`;
  } else {
    message += `I would like to enquire about your international holiday packages to Singapore, Malaysia, Thailand, Sri Lanka & Cambodia.`;
  }

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
};

export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

export const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch (e) {
    return dateString;
  }
};
