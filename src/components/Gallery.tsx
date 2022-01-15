/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { css } from "@emotion/react";
import { Theme } from "@mui/material";
import { useState } from "react";
import GalleryItem from "./GalleryItem";
import GalleryItemFullSizeModal from "./GalleryItemFullSizeModal";

export interface GalleryProps {
  contents: JSX.Element[];
}

const Gallery: React.FC<GalleryProps> = (props) => {
  const { contents } = props;
  const [open, setOpen] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const numImages = contents.length;
  const children = contents.map((imgElement, i) => (
    <GalleryItem
      key={i}
      url={imgElement.props.src}
      alt={imgElement.props.alt}
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
