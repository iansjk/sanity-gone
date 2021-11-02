import { Theme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ThemeProvider as EmotionThemeProvider, Global } from "@emotion/react";
import emotionNormalize from "emotion-normalize";

export default function TopLayout({
  children,
  theme,
}: {
  children: React.ReactChildren;
  theme: Theme;
}): React.ReactElement {
  return (
    <MuiThemeProvider theme={theme}>
      <EmotionThemeProvider theme={theme}>
        <Global styles={emotionNormalize} />
        {children}
      </EmotionThemeProvider>
    </MuiThemeProvider>
  );
}
