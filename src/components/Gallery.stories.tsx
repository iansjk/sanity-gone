import { Story, Meta } from "@storybook/react";
import Gallery, { GalleryProps } from "./Gallery";
export default {
  title: "Gallery",
  component: Gallery,
} as Meta;

export const Default: Story<GalleryProps> = (args) => <Gallery {...args} />;
Default.args = {
  contents: [
    <img
      key="1"
      src="//images.contentful.com/9auzhr5vyq9m/4hmACLpyzZNwMtlTglliXL/dd95759741ce7ad7eb57b22d3a3eb8f0/image.png"
      alt="1 layer"
    />,
    <img
      key="2"
      src="//images.contentful.com/9auzhr5vyq9m/6qTgZ1J6aaHdmFPfrP5X26/d699a6d9f00d6499103f8c783fc431ab/image.png"
      alt="2 layers"
    />,
    <img
      key="3"
      src="//images.contentful.com/9auzhr5vyq9m/4iNE3yB06PVzICYEcaTj4c/bdddea8fcdc87308634dc45952854844/image.png"
      alt="3 layers"
    />,
  ],
};
