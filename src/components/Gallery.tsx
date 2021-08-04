import parse from "html-react-parser";
import { Element } from "domhandler/lib/node";
import { css } from "@emotion/react";
import { Fragment, useState } from "react";
import GalleryItem from "./GalleryItem";
import GalleryItemFullSizeModal from "./GalleryItemFullSizeModal";

export interface GalleryProps {
  contents: string; // htmlstring
}

const Gallery: React.FC<GalleryProps> = (props) => {
  const { contents } = props;
  const [open, setOpen] = useState(false);
  const [activeUrl, setActiveUrl] = useState("");

  return (
    <Fragment>
      <div css={styles}>
        {parse(contents, {
          replace: (domNode) => {
            if (domNode instanceof Element && domNode.name === "img") {
              return (
                <GalleryItem
                  url={domNode.attribs.src}
                  alt={domNode.attribs.alt}
                  onClick={() => {
                    setActiveUrl(domNode.attribs.src);
                    setOpen(true);
                  }}
                />
              );
            }
          },
        })}
      </div>
      <GalleryItemFullSizeModal
        url={activeUrl}
        open={open}
        onClose={() => setOpen(false)}
      />
    </Fragment>
  );
};
export default Gallery;

const styles = css`
  display: flex;
  justify-content: flex-start;
`;
