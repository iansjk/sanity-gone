/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import parse from "html-react-parser";
import { Element } from "domhandler/lib/node";
import { css } from "@emotion/react";
import { Fragment, useMemo, useState } from "react";
import GalleryItem from "./GalleryItem";
import GalleryItemFullSizeModal from "./GalleryItemFullSizeModal";

interface GalleryItemData {
  url: string;
  alt: string;
}

export interface GalleryProps {
  contents: string; // htmlstring
}

const Gallery: React.FC<GalleryProps> = (props) => {
  const { contents } = props;
  const [open, setOpen] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const parsed = (
    parse(contents, {
      replace: (domNode) => {
        if (domNode instanceof Element && domNode.name === "img") {
          return domNode;
        }
      },
    }) as JSX.Element[]
  ).filter((element) => element.type === "img");
  const numImages = parsed.length;
  const children = parsed.map((imgElement, i) => (
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
    <Fragment>
      <div css={styles}>{children}</div>
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
