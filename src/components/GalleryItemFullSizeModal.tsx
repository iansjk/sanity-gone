import { css } from "@emotion/react";
import { styled, Theme } from "@mui/material";
import { ModalUnstyled } from "@mui/base";
import Image from "next/image";
import { rgba, transparentize } from "polished";
import { useCallback, useEffect, useState } from "react";
import { ImageData } from "./Gallery";

import CloseIcon from "./icons/CloseIcon";
import NextArrow from "./icons/NextArrow";
import PreviousArrow from "./icons/PreviousArrow";

const Backdrop = styled("div")(({ theme }) => ({
  zIndex: -1,
  position: "fixed",
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: rgba(theme.palette.black.main, 0.75),
  backdropFilter: "blur(8px)",
  "-webkit-tap-highlight-color": "transparent",
}));

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
  const { src: rawUrl, alt, width: imageWidth, height: imageHeight } = image;
  const url = rawUrl.startsWith("//") ? `https:${rawUrl}` : rawUrl;
  const [imageWrapper, setImageWrapper] = useState<HTMLDivElement | null>(null);
  const [modalTitle, setModalTitle] = useState<HTMLHeadingElement | null>(null);

  const resizeImageCallback = useCallback(() => {
    if (imageWrapper && modalTitle) {
      const maxWidth = Math.max(
        document.documentElement.clientWidth ?? 0,
        window.innerWidth ?? 0
      );
      const maxHeight =
        Math.max(
          document.documentElement.clientHeight ?? 0,
          window.innerHeight ?? 0
        ) - modalTitle.clientHeight;

      // the code below emulates how object-fit: contain; works
      // by setting the exact dimensions of the wrapper <div>
      // to maximize the image's size while not overflowing the viewport
      // and also maintaining the image's aspect ratio
      if (imageWidth < maxWidth && imageHeight < maxHeight) {
        imageWrapper.style.width = `${imageWidth}px`;
        imageWrapper.style.height = `${imageHeight}px`;
      } else {
        const aspectRatio = imageWidth / imageHeight;
        if (aspectRatio > 1) {
          if (maxWidth / aspectRatio > maxHeight) {
            imageWrapper.style.width = `${maxHeight * aspectRatio}px`;
            imageWrapper.style.height = `${maxHeight}px`;
          } else {
            imageWrapper.style.width = `${maxWidth}px`;
            imageWrapper.style.height = `${maxWidth / aspectRatio}px`;
          }
        } else {
          if (maxHeight * aspectRatio > maxWidth) {
            imageWrapper.style.width = `${maxWidth}px`;
            imageWrapper.style.height = `${maxWidth / aspectRatio}px`;
          } else {
            imageWrapper.style.width = `${maxHeight * aspectRatio}px`;
            imageWrapper.style.height = `${maxHeight}px`;
          }
        }
      }
    }
  }, [imageHeight, imageWidth, imageWrapper, modalTitle]);

  useEffect(() => {
    resizeImageCallback();
  }, [imageWidth, imageHeight, imageWrapper, modalTitle, resizeImageCallback]);

  useEffect(() => {
    window.addEventListener("resize", resizeImageCallback);
    return () => {
      window.removeEventListener("resize", resizeImageCallback);
    };
  }, [resizeImageCallback]);

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
        <div id="fullsize-image-wrapper" ref={(el) => setImageWrapper(el)}>
          <Image
            key={url}
            src={url}
            layout="fill"
            alt=""
            quality={100}
            priority
            placeholder="blur"
            // theme.palette.gray as a 1px blur placeholder
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNsb5/9HwAF8AKqEhqAsAAAAABJRU5ErkJggg=="
          />
        </div>
        <h2 id="gallery-modal-title" ref={(el) => setModalTitle(el)}>
          {alt}
        </h2>
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
    grid-template-columns: 1fr;
    grid-template-rows: 1fr max-content;
    justify-items: center;

    & > * {
      grid-area: image;
    }
  }

  #gallery-modal-title {
    grid-area: caption;
    text-align: center;
    margin: 0;
    padding: ${theme.spacing(2, 0)};
    font-size: ${theme.typography.body1.fontSize}px;
    font-weight: ${theme.typography.body1.fontWeight};
    line-height: ${theme.typography.body1.lineHeight};
  }

  #fullsize-image-wrapper {
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
    background-color: ${rgba(theme.palette.black.main, 0.75)};
    z-index: 1;
    cursor: pointer;
    backdrop-filter: blur(8px);

    &:hover {
      background-color: ${transparentize(
        0.25,
        theme.palette.midtoneDarker.main
      )};
    }

    svg path {
      fill: ${theme.palette.white.main};
      stroke: ${theme.palette.white.main};
    }
  }

  .close-modal-button {
    top: ${theme.spacing(3)};
    left: ${theme.spacing(3)};
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
