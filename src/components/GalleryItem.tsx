import { css } from "@emotion/react";
import { Theme } from "@mui/material";
import Image from "next/image";
interface Props {
  url: string;
  alt: string;
  onClick: () => void;
}

const GalleryItem: React.VFC<Props> = (props) => {
  const { url: rawUrl, alt, onClick } = props;
  const url = rawUrl.startsWith("//") ? `https:${rawUrl}` : rawUrl;

  return (
    <button
      className="gallery-image"
      css={styles}
      aria-label={`Image: ${alt}. Click to expand`}
      onClick={onClick}
    >
      <Image src={url} alt={alt} width={164} height={164} objectFit="cover" />
      <span className="image-caption" aria-hidden="true">
        {alt}
      </span>
    </button>
  );
};
export default GalleryItem;

const styles = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin-right: ${theme.spacing(3)};
  cursor: pointer;
  background: unset;
  border: 0;

  &:not(:focus-visible) {
    outline: none;
  }

  img {
    border-radius: ${theme.spacing(0.5)};
  }

  .image-caption {
    display: inline-block;
    margin-top: ${theme.spacing(1)};
    color: ${theme.palette.gray.main};
    font-size: ${theme.typography.body2.fontSize}px;
    line-height: ${theme.typography.body2.lineHeight};
  }
`;
