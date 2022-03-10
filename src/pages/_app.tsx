import { ThemeProvider as MuiThemeProvider, GlobalStyles } from "@mui/material";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import emotionNormalize from "emotion-normalize";

import theme from "../theme";
import createEmotionCache from "../createEmotionCache";
import { MediaContextProvider, mediaStyle } from "../Media";

import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { GOOGLE_ANALYTICS_TRACKING_ID, pageview } from "../utils/gtag";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const isProductionEnvironment = process.env.NODE_ENV === "production";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

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
    <MediaContextProvider>
      <CacheProvider value={emotionCache}>
        <MuiThemeProvider theme={theme}>
          <EmotionThemeProvider theme={theme}>
            <GlobalStyles styles={mediaStyle} />
            <GlobalStyles styles={emotionNormalize} />
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>

            {/* Global Site Tag (gtag.js) - Google Analytics */}
            {/* from https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js */}
            {isProductionEnvironment && (
              <>
                <Script
                  strategy="afterInteractive"
                  src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_TRACKING_ID}`}
                />
                <Script
                  id="gtag-init"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GOOGLE_ANALYTICS_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
                  }}
                />
              </>
            )}

            <Component {...pageProps} />
          </EmotionThemeProvider>
        </MuiThemeProvider>
      </CacheProvider>
    </MediaContextProvider>
  );
}
