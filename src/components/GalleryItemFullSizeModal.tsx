import { css } from "@emotion/react";
import { Theme } from "@mui/material";
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
    url,
    caption,
    open,
    onClose,
    canNext,
    canPrevious,
    onNext,
    onPrevious,
  } = props;
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
          <div className="modal-content">
            <h2
              id="gallery-modal-title"
              className="caption"
              aria-label={`Image, full size: ${caption}`}
            >
              {caption}
            </h2>
            <div className="previous-button-area">
              {canPrevious && (
                <button
                  aria-label="Previous image"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrevious();
                  }}
                >
                  <PreviousArrow aria-hidden="true" />
                </button>
              )}
            </div>
            <img src={url} alt="" />
            <div className="next-button-area">
              {canNext && (
                <button
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
            </div>
            <div className="topbar">
              <span className="filename" title={`Filename: ${filename}`}>
                {filename}
              </span>
              <span aria-hidden="true" className="separator">
                |
              </span>
              <a
                className="full-resolution"
                href={url}
                target="_blank"
                rel="noreferrer noopener"
              >
                Full Resolution
              </a>
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
  background-color: ${transparentize(0.34, "#000")};
  backdrop-filter: blur(${theme.spacing(1)});
  z-index: 100;

  .close-modal-button {
    position: absolute;
    right: 0;
    top: 0;
    padding: ${theme.spacing(4)};
    margin: 0;
    border: 0;
    background-color: unset;
    line-height: 1;
    cursor: pointer;

    &:hover {
      svg path {
        stroke: ${theme.palette.white.main};
      }
    }
  }

  .modal-content {
    position: absolute;
    left: 50vw;
    top: 50vh;
    transform: translateX(-50%) translateY(-50%);
    width: 80%;
    max-height: 80%;
    background: ${theme.palette.midtone.main};

    display: grid;
    grid-template-rows: max-content 1fr max-content;
    grid-template-columns: 200px 1fr max-content 1fr 200px;
    grid-template-areas:
      "topbar topbar topbar topbar topbar"
      "previous spacerL image spacerR next"
      "bottombar bottombar bottombar bottombar bottombar";

    .topbar {
      grid-area: topbar;
      font-size: ${theme.typography.body1.fontSize}px;
      text-align: center;
      padding: ${theme.spacing(1)} 0;
      border-radius: ${theme.spacing(1, 1, 0, 0)};
      background-color: ${theme.palette.dark.main};

      .filename {
        color: ${theme.palette.gray.main};
      }

      .separator {
        display: inline-block;
        margin: 0 ${theme.spacing(2)};
        color: ${theme.palette.midtoneBrighter.main};
      }
    }

    .previous-button-area {
      grid-area: previous;
    }

    .next-button-area {
      grid-area: next;
    }

    .previous-button-area,
    .next-button-area {
      align-self: center;

      button {
        background: none;
        border: none;
        padding: ${theme.spacing(8)};

        &:hover:not(:disabled) {
          cursor: pointer;

          svg path {
            fill: ${theme.palette.white.main};
          }
        }
      }
    }

    .caption {
      grid-area: bottombar;
      background-color: ${theme.palette.dark.main};
      margin: 0;
      padding: ${theme.spacing(1)};
      font-size: ${theme.typography.body1.fontSize}px;
      line-height: ${theme.typography.body1.lineHeight};
      font-weight: normal;
      text-align: center;
      border-radius: ${theme.spacing(0, 0, 1, 1)};
    }

    img {
      grid-area: image;
      align-self: center;
      padding: ${theme.spacing(4)};
    }
  }
`;
