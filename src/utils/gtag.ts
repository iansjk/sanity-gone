// taken mostly verbatim from https://stackoverflow.com/a/65081431/821285
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const GA_TRACKING_ID = process.env.GOOGLE_ANALYTICS_TRACKING_ID!;
const isProduction = process.env.NODE_ENV === "production";
if (isProduction && GA_TRACKING_ID == null) {
  throw new Error(
    "GOOGLE_ANALYTICS_TRACKING_ID is not set in a production environment"
  );
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL): void => {
  window.gtag("config", GA_TRACKING_ID, {
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
