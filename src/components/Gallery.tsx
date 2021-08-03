import parse, { attributesToProps } from "html-react-parser";
import { Element } from "domhandler/lib/node";
import { css, Theme } from "@emotion/react";

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
              <div className="gallery-image">
                <img {...attributesToProps(domNode.attribs)} />
                <span className="image-caption" aria-hidden="true">
                  {domNode.attribs.alt}
                </span>
              </div>
            );
          }
        },
      })}
    </div>
  );
};
export default Gallery;

const styles = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;

  .gallery-image {
    display: flex;
    flex-direction: column;
    align-items: center;

    .image-caption {
      display: inline-block;
    }
  }
`;
