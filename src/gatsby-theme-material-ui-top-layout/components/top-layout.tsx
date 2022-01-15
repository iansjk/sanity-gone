import { Theme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ThemeProvider as EmotionThemeProvider, Global } from "@emotion/react";
import emotionNormalize from "emotion-normalize";

import { MediaContextProvider, mediaStyle } from "../../Media";

export default function TopLayout({
  children,
  theme,
}: {
  children: React.ReactChildren;
  theme: Theme;
}): React.ReactElement {
  return (
    <MediaContextProvider>
      <MuiThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <Global styles={emotionNormalize} />
          <Global styles={mediaStyle} />
          {children}
        </EmotionThemeProvider>
      </MuiThemeProvider>
    </MediaContextProvider>
  );
}
