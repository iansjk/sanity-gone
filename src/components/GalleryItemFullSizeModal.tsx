import { css } from "@emotion/react";
import { Theme } from "@mui/material";
import Image from "next/image";
import { transparentize } from "polished";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import CloseIcon from "./icons/CloseIcon";
import NextArrow from "./icons/NextArrow";
import PreviousArrow from "./icons/PreviousArrow";

interface Props {
  url: string;
  caption: string;
  open: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  canPrevious: boolean;
  canNext: boolean;
}

const GalleryItemFullSizeModal: React.VFC<Props> = (props) => {
  const {
    url: rawUrl,
    caption,
    open,
    onClose,
    canNext,
    canPrevious,
    onNext,
    onPrevious,
  } = props;
  const url = rawUrl.startsWith("//") ? `https:${rawUrl}` : rawUrl;
  const filename = url.split("/").slice(-1)[0];
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (open) {
      const listener = (e: KeyboardEvent) => {
        switch (e.key) {
          case "Left":
          case "ArrowLeft":
            e.preventDefault();
            if (canPrevious) {
              onPrevious();
            }
            e.stopPropagation();
            break;
          case "Right":
          case "ArrowRight":
            e.preventDefault();
            if (canNext) {
              onNext();
            }
            e.stopPropagation();
            break;
          case "Esc":
          case "Escape":
            e.preventDefault();
            onClose();
            e.stopPropagation();
            break;
        }
      };
      document.addEventListener("keydown", listener);
      for (let i = 0; i < document.body.children.length; i++) {
        const child = document.body.children.item(i);
        if (child !== overlayRef.current) {
          child?.setAttribute("inert", "true");
        }
      }
      if (!previousFocusRef.current) {
        // @ts-expect-error it is now safe to set ref.current, see https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
        previousFocusRef.current = document.activeElement;
      }
      if (!overlayRef.current?.contains(document.activeElement)) {
        setTimeout(() => {
          closeButtonRef.current?.focus();
        }, 0);
      }
      return () => {
        document.removeEventListener("keydown", listener);
        for (let i = 0; i < document.body.children.length; i++) {
          const child = document.body.children.item(i);
          child?.removeAttribute("inert");
        }
        setTimeout(() => {
          if (
            previousFocusRef.current &&
            previousFocusRef instanceof HTMLElement
          ) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            previousFocusRef.current.focus();
            // @ts-expect-error it is now safe to set ref.current, see https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
            previousFocusRef.current = null;
          }
        }, 0);
      };
    }
  }, [canNext, canPrevious, onClose, onNext, onPrevious, open]);

  const handleOverlayClick: React.MouseEventHandler = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return !open
    ? null
    : ReactDOM.createPortal(
        <div
          className="gallery-modal-overlay"
          css={styles}
          hidden={!open}
          ref={overlayRef}
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-modal-title"
        >
          <button
            className="close-modal-button"
            aria-label="Close"
            onClick={onClose}
            ref={closeButtonRef}
          >
            <CloseIcon aria-hidden="true" />
          </button>
          {canPrevious && (
            <button
              className="previous-image-button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
            >
              <PreviousArrow aria-hidden="true" />
            </button>
          )}
          <div className="fullsize-image-wrapper">
            <Image src={url} alt="" layout="fill" objectFit="scale-down" />
          </div>
          {canNext && (
            <button
              className="next-image-button"
              aria-label="Next image"
              disabled={!canNext}
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
            >
              <NextArrow aria-hidden="true" />
            </button>
          )}
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
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(${theme.spacing(1)});
  z-index: 100;

  .fullsize-image-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .close-modal-button,
  .previous-image-button,
  .next-image-button {
    position: absolute;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: ${theme.spacing(1)};
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 1;
    cursor: pointer;

    &:hover {
      background-color: ${transparentize(
        0.25,
        theme.palette.midtoneDarker.main
      )};

      svg path {
        fill: ${theme.palette.white.main};
        stroke: ${theme.palette.white.main};
      }
    }
  }

  .close-modal-button {
    top: ${theme.spacing(3)};
    left: ${theme.spacing(3)};

    svg {
      width: 12px;
      height: 12px;
    }
  }

  .previous-image-button {
    left: ${theme.spacing(3)};
    top: calc(50% - 20px);

    svg {
      width: 16px;
      height: 16px;
    }
  }

  .next-image-button {
    right: ${theme.spacing(3)};
    top: calc(50% - 20px);

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;
