// taken mostly verbatim from https://stackoverflow.com/a/65081431/821285
export const NEXT_PUBLIC_GOOGLE_ANALYTICS_ID =
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!;
const isProductionEnvironment = process.env.NODE_ENV === "production";
if (isProductionEnvironment && NEXT_PUBLIC_GOOGLE_ANALYTICS_ID == null) {
  throw new Error(
    "NEXT_PUBLIC_GOOGLE_ANALYTICS_ID is not set in a production environment"
  );
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL): void => {
  window.gtag("config", NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
    page_path: url,
  });
};

interface GTagEvent {
  action: string;
  category: string;
  label: string;
  value: number;
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent): void => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
