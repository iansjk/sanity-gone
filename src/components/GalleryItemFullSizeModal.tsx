import { css, Theme } from "@emotion/react";
import { transparentize } from "polished";
import ReactDOM from "react-dom";
import CloseIcon from "./icons/CloseIcon";
import NextArrow from "./icons/NextArrow";
import PreviousArrow from "./icons/PreviousArrow";

interface Props {
  url: string;
  caption: string;
  open: boolean;
  onClose: () => void;
}

const GalleryItemFullSizeModal: React.VFC<Props> = (props) => {
  const { url, caption, open, onClose } = props;
  const filename = url.split("/").slice(-1)[0];

  return ReactDOM.createPortal(
    <div aria-modal="true" className="overlay" css={styles} hidden={!open}>
      <button
        className="close-modal-button"
        aria-label="Close"
        onClick={() => onClose()}
      >
        <CloseIcon aria-hidden="true" />
      </button>
      <div className="modal-content">
        <h2 className="caption" aria-label={`Image, full size: ${caption}`}>
          {caption}
        </h2>
        <button aria-label="Previous image" className="previous-button">
          <PreviousArrow />
        </button>
        <img src={url} alt="" />
        <button aria-label="Next image" className="next-button">
          <NextArrow />
        </button>
        <div className="topbar">
          <span className="filename" aria-label={`Filename: ${filename}`}>
            {filename}
          </span>
          <span aria-hidden="true">Full Resolution</span>
        </div>
      </div>
    </div>,
    document.body
  );
};
export default GalleryItemFullSizeModal;

const styles = (theme: Theme) => css`
  position: fixed;
  overflow-y: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${transparentize(0.34, theme.palette.background)};

  .close-modal-button {
    position: absolute;
    right: ${theme.spacing(4)};
    top: ${theme.spacing(4)};
    padding: 0;
    margin: 0;
    border: 0;
    background-color: unset;
    line-height: 1;
    cursor: pointer;
  }

  .modal-content {
    position: absolute;
    left: 50vw;
    top: 50vh;
    transform: translateX(-50%) translateY(-50%);
    width: 70%;
    height: 80%;
    background: ${transparentize(0.34, theme.palette.mid)};

    display: grid;
    grid-template-rows: max-content 1fr max-content;
    grid-template-columns: max-content 1fr max-content 1fr max-content;
    grid-template-areas:
      "topbar topbar topbar topbar topbar"
      "previous spacerL image spacerR next"
      "bottombar bottombar bottombar bottombar bottombar";

    .topbar {
      grid-area: topbar;
    }

    .previous-button {
      grid-area: previous;
    }

    .next-button {
      grid-area: next;
    }

    .caption {
      grid-area: bottombar;
    }

    img {
      grid-area: image;
    }
  }
`;
