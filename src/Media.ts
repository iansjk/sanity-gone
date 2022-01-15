import { createMedia } from "@artsy/fresnel";
import { customBreakpoints } from "./gatsby-theme-material-ui-top-layout/theme";

const AppMedia = createMedia({
  breakpoints: {
    base: 0,
    ...customBreakpoints,
  },
});

export const mediaStyle = AppMedia.createMediaStyle();
export const { Media, MediaContextProvider } = AppMedia;
