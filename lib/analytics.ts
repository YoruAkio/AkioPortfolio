'use client';

type AnalyticsValue = string | number | boolean;

declare global {
  interface Window {
    umami?: {
      track: (
        eventName: string,
        eventData?: Record<string, AnalyticsValue>
      ) => void;
    };
  }
}

// @note track custom umami events safely after the script loads
export function trackUmamiEvent(
  eventName: string,
  eventData?: Record<string, AnalyticsValue | undefined>
) {
  if (typeof window === 'undefined' || typeof window.umami?.track !== 'function') {
    return;
  }

  const payload = Object.fromEntries(
    Object.entries(eventData ?? {}).filter(([, value]) => value !== undefined)
  ) as Record<string, AnalyticsValue>;

  if (Object.keys(payload).length > 0) {
    window.umami.track(eventName, payload);
    return;
  }

  window.umami.track(eventName);
}
