import { Story, Meta } from "@storybook/react";
import HorizontalScroller, {
  HorizontalScrollerProps,
} from "./HorizontalScroller";

import * as classes from "./storybook-styles.css";

export default {
  title: "Mobile/HorizontalScroller",
  component: HorizontalScroller,
} as Meta;

export const Default: Story<HorizontalScrollerProps> = (args) => (
  <HorizontalScroller {...args} className={classes.root} />
);
Default.args = {
  children: ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"].map((text) => (
    <div key={text} className={classes.button}>
      {text}
    </div>
  )),
};
