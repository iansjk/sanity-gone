import { createMedia } from "@artsy/fresnel";
import { rawBreakpointValues } from "./theme-helpers";

const AppMedia = createMedia({
  breakpoints: {
    base: 0,
    ...rawBreakpointValues,
  },
});

export const mediaStyle = AppMedia.createMediaStyle();
export const { Media, MediaContextProvider } = AppMedia;
