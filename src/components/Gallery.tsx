import { css } from "@emotion/react";
import { Theme } from "@mui/material";
import { useRef, useState } from "react";
import GalleryItem from "./GalleryItem";
import GalleryItemFullSizeModal from "./GalleryItemFullSizeModal";

export interface GalleryProps {
  images: ImageData[];
}

export interface ImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const Gallery: React.FC<GalleryProps> = (props) => {
  const { images } = props;
  const [open, setOpen] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const galleryDivRef = useRef<HTMLDivElement>(null);

  const numImages = images.length;
  const children = images.map((imageProps, i) => (
    <GalleryItem
      key={i}
      {...imageProps}
      onClick={() => {
        setOpen(true);
        setActiveItemIndex(i);
      }}
    />
  ));

  const handleClose = () => {
    setOpen(false);
    // wait until the next JS task to restore focus
    // so that the modal's closure has taken effect
    setTimeout(() => {
      (
        galleryDivRef.current?.children[activeItemIndex] as
          | HTMLElement
          | undefined
      )?.focus();
    }, 0);
  };

  return (
    <>
      <div className="gallery" css={styles} ref={galleryDivRef}>
        {children}
      </div>
      <GalleryItemFullSizeModal
        image={children[activeItemIndex].props}
        open={open}
        onClose={handleClose}
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
