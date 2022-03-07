import { ThemeProvider as MuiThemeProvider, GlobalStyles } from "@mui/material";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import emotionNormalize from "emotion-normalize";

import theme from "../theme";
import createEmotionCache from "../createEmotionCache";
import { MediaContextProvider, mediaStyle } from "../Media";

import type { AppProps } from "next/app";
import Head from "next/head";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
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

            <Component {...pageProps} />
          </EmotionThemeProvider>
        </MuiThemeProvider>
      </CacheProvider>
    </MediaContextProvider>
  );
}
