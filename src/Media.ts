import { createMedia } from "@artsy/fresnel";
import { customBreakpoints } from "./theme";

const AppMedia = createMedia({
  breakpoints: {
    base: 0,
    ...customBreakpoints,
  },
});

export const mediaStyle = AppMedia.createMediaStyle();
export const { Media, MediaContextProvider } = AppMedia;
