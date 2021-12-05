import { css, Theme } from "@mui/material";
import { Story, Meta } from "@storybook/react";
import HorizontalScroller, {
  HorizontalScrollerProps,
} from "./HorizontalScroller";

export default {
  title: "Mobile/HorizontalScroller",
  component: HorizontalScroller,
} as Meta;

export const Default: Story<HorizontalScrollerProps> = (args) => (
  <HorizontalScroller {...args} css={styles} />
);
Default.args = {
  children: [
    <button key="0">Lorem</button>,
    <button key="1">Ipsum</button>,
    <button key="2">Dolor</button>,
    <button key="3">Sit</button>,
    <button key="4">Amet</button>,
  ],
};

const styles = (theme: Theme) => css`
  margin: ${theme.spacing(0, -3)};

  .scroller-contents > button {
    padding: ${theme.spacing(2, 3)};

    & + button {
      margin-left: ${theme.spacing(1.5)};
    }
  }
`;
