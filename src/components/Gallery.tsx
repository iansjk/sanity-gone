import { css } from "@emotion/react";
import { Theme } from "@mui/material";
import { useState } from "react";
import GalleryItem from "./GalleryItem";
import GalleryItemFullSizeModal from "./GalleryItemFullSizeModal";

export interface GalleryProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
}

const Gallery: React.FC<GalleryProps> = (props) => {
  const { images } = props;
  const [open, setOpen] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const numImages = images.length;
  const children = images.map(({ src, alt }, i) => (
    <GalleryItem
      key={i}
      url={src}
      alt={alt}
      onClick={() => {
        setOpen(true);
        setActiveItemIndex(i);
      }}
    />
  ));

  return (
    <>
      <div className="gallery" css={styles}>
        {children}
      </div>
      <GalleryItemFullSizeModal
        url={children[activeItemIndex].props.url}
        caption={children[activeItemIndex].props.alt}
        open={open}
        onClose={() => setOpen(false)}
        onPrevious={() => setActiveItemIndex((index) => index - 1)}
        onNext={() => setActiveItemIndex((index) => index + 1)}
        canPrevious={activeItemIndex > 0}
        canNext={activeItemIndex < numImages - 1}
      />
    </>
  );
};
export default Gallery;

const styles = (theme: Theme) => css`
  display: flex;
  justify-content: flex-start;
  margin-top: ${theme.spacing(3)};
`;
