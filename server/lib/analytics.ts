// Server-side analytics helper (for backend event tracking)
export function trackEvent(
  action: string,
  category?: string,
  label?: string,
  value?: number
) {
  // Server-side analytics tracking can be added here
  // For now, just log the event
  console.log(`[Analytics] ${action}`, { category, label, value });
}
