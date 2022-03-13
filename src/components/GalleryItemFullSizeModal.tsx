import { css } from "@emotion/react";
import { styled, Theme } from "@mui/material";
import { ModalUnstyled } from "@mui/base";
import Image from "next/image";
import { transparentize } from "polished";
import { useEffect } from "react";
import { ImageData } from "./Gallery";

import CloseIcon from "./icons/CloseIcon";
import NextArrow from "./icons/NextArrow";
import PreviousArrow from "./icons/PreviousArrow";

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  -webkit-tap-highlight-color: transparent;
`;

interface Props {
  image: ImageData;
  open: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  canPrevious: boolean;
  canNext: boolean;
}

const GalleryItemFullSizeModal: React.VFC<Props> = (props) => {
  const { image, open, onClose, canNext, canPrevious, onNext, onPrevious } =
    props;
  const { src: rawUrl, alt, width, height } = image;
  const url = rawUrl.startsWith("//") ? `https:${rawUrl}` : rawUrl;

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
        }
      };
      document.addEventListener("keydown", listener);
      return () => {
        document.removeEventListener("keydown", listener);
      };
    }
  }, [canNext, canPrevious, onClose, onNext, onPrevious, open]);

  return (
    <ModalUnstyled
      open={open}
      aria-labelledby="gallery-modal-title"
      onClose={onClose}
      css={styles}
      onBackdropClick={onClose}
      BackdropComponent={Backdrop}
    >
      <div className="gallery-modal-content">
        <h2 id="gallery-modal-title">{alt}</h2>
        <button
          className="close-modal-button"
          aria-label="Close"
          onClick={onClose}
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
        <div>
          <Image
            key={url}
            src={url}
            width={width}
            height={height}
            alt=""
            quality={100}
            priority
            placeholder="blur"
            // theme.palette.gray as a 1px blur placeholder
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNsb5/9HwAF8AKqEhqAsAAAAABJRU5ErkJggg=="
          />
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
      </div>
    </ModalUnstyled>
  );
};
export default GalleryItemFullSizeModal;

const styles = (theme: Theme) => css`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1300;
  display: flex;
  align-items: center;
  justify-content: center;

  .gallery-modal-content {
    display: grid;
    grid-template-areas: "image" "caption";
    justify-items: center;

    & > * {
      grid-area: image;
    }

    & > #gallery-modal-title {
      grid-area: caption;
      margin: ${theme.spacing(2, 0)};
      font-size: ${theme.typography.body1.fontSize}px;
      font-weight: ${theme.typography.body1.fontWeight};
      line-height: ${theme.typography.body1.lineHeight};
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
  }
`;
