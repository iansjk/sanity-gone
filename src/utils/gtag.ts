// taken mostly verbatim from https://stackoverflow.com/a/65081431/821285
export const GOOGLE_ANALYTICS_TRACKING_ID =
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  process.env.GOOGLE_ANALYTICS_TRACKING_ID!;
const isProductionEnvironment = process.env.NODE_ENV === "production";
if (isProductionEnvironment && GOOGLE_ANALYTICS_TRACKING_ID == null) {
  throw new Error(
    "GOOGLE_ANALYTICS_TRACKING_ID is not set in a production environment"
  );
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL): void => {
  window.gtag("config", GOOGLE_ANALYTICS_TRACKING_ID, {
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
