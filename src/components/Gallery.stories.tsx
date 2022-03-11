import { Story, Meta } from "@storybook/react";
import Gallery, { GalleryProps } from "./Gallery";
export default {
  title: "Gallery",
  component: Gallery,
} as Meta;

export const Default: Story<GalleryProps> = (args) => <Gallery {...args} />;
Default.args = {
  images: [
    {
      src: "https://media.discordapp.net/attachments/735954618076495914/951961145370091541/image3.png",
      alt: "1 layer",
    },
    {
      src: "https://media.discordapp.net/attachments/735954618076495914/951961145584013312/image1.png",
      alt: "2 layers",
    },
    {
      src: "https://media.discordapp.net/attachments/735954618076495914/951961144594161674/image4.png",
      alt: "3 layers",
    },
  ],
};
