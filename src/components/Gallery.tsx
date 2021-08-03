import parse from "html-react-parser";
import { Element } from "domhandler/lib/node";
import { css } from "@emotion/react";
import GalleryItem from "./GalleryItem";

export interface GalleryProps {
  contents: string; // htmlstring
}

const Gallery: React.FC<GalleryProps> = (props) => {
  const { contents } = props;
  return (
    <div css={styles}>
      {parse(contents, {
        replace: (domNode) => {
          if (domNode instanceof Element && domNode.name === "img") {
            return (
              <GalleryItem
                url={domNode.attribs.src}
                alt={domNode.attribs.alt}
              />
            );
          }
        },
      })}
    </div>
  );
};
export default Gallery;

const styles = css`
  display: flex;
  justify-content: flex-start;
`;
