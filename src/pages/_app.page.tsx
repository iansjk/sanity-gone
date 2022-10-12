import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";

import { NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, pageview } from "../utils/gtag";
import { MediaContextProvider } from "../Media";

import type { AppProps } from "next/app";
import "normalize.css";

const isProductionEnvironment = process.env.NODE_ENV === "production";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  // pass route change events to Google Analytics
  // from https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js
  const router = useRouter();

  useEffect(() => {
    let handleRouteChange: ((url: URL) => void) | null = null;
    if (isProductionEnvironment) {
      handleRouteChange = (url: URL) => {
        pageview(url);
      };
      router.events.on("routeChangeComplete", handleRouteChange);
    }
    return () => {
      if (handleRouteChange != null) {
        router.events.off("routeChangeComplete", handleRouteChange);
      }
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      {/* Global Site Tag (gtag.js) - Google Analytics */}
      {/* from https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js */}
      {isProductionEnvironment && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
            }}
          />
        </>
      )}
      <MediaContextProvider>
        <Component {...pageProps} />
      </MediaContextProvider>
    </>
  );
}
