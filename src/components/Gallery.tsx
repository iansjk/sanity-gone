/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import parse from "html-react-parser";
import { Element } from "domhandler/lib/node";
import { css } from "@emotion/react";
import { Fragment, useState } from "react";
import GalleryItem from "./GalleryItem";
import GalleryItemFullSizeModal from "./GalleryItemFullSizeModal";

export interface GalleryProps {
  contents: Element[];
}

const Gallery: React.FC<GalleryProps> = (props) => {
  const { contents } = props;
  const [open, setOpen] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const numImages = contents.length;
  const children = contents.map((imgElement, i) => (
    <GalleryItem
      key={i}
      url={imgElement.attribs.src}
      alt={imgElement.attribs.alt}
      onClick={() => {
        setOpen(true);
        setActiveItemIndex(i);
      }}
    />
  ));

  return (
    <Fragment>
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
    </Fragment>
  );
};
export default Gallery;

const styles = css`
  display: flex;
  justify-content: flex-start;
`;
