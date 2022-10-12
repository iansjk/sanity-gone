import { style } from "@vanilla-extract/css";
import { breakpoints, spacing } from "../src/theme-helpers";

export const forceHide = style({
  display: 'none !important'
})

export const headerMainWrapper = style({
  margin: 'unset !important',
  padding: `${spacing(3)} !important`,
  '@media': {
    [breakpoints.down('mobile')]: {
      padding: '0 !important'
    }
  }
})
