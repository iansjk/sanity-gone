import "@emotion/react";

import { defaultTheme } from "./theme";

declare module "@emotion/react" {
  export interface Theme {
    palette: typeof defaultTheme.palette;
    typography: typeof defaultTheme.typography;
    spacing: typeof defaultTheme.spacing;
    breakpoints: typeof defaultTheme.breakpoints;
    containerWidth: string;
    contentY: string;
  }
}
