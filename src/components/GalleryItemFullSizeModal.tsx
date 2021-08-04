import { css, Theme } from "@emotion/react";
import { transparentize } from "polished";
import ReactDOM from "react-dom";
import CloseIcon from "./icons/CloseIcon";

interface Props {
  open: boolean;
  onClose: () => void;
}

const GalleryItemFullSizeModal: React.VFC<Props> = (props) => {
  const { open, onClose } = props;
  return ReactDOM.createPortal(
    <div aria-modal="true" className="overlay" css={styles} hidden={!open}>
      <button
        className="close-modal-button"
        aria-label="Close"
        onClick={() => onClose()}
      >
        <CloseIcon aria-hidden="true" />
      </button>
      <div className="modal-content">This is a modal dialog!</div>
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
    width: 1408px;
    height: 795px;
    background: ${transparentize(0.34, theme.palette.mid)};

    display: grid;
    grid-template-rows: max-content 1fr max-content;
    grid-template-columns: max-content 1fr max-content 1fr max-content;
  }
`;
