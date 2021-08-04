import { css, Theme } from "@emotion/react";
interface Props {
  url: string;
  alt: string;
  onClick: () => void;
}

const GalleryItem: React.VFC<Props> = (props) => {
  const { url, alt, onClick } = props;

  return (
    <button
      className="gallery-image"
      css={styles}
      aria-label={`Image: ${alt}. Click to expand`}
      onClick={onClick}
    >
      <img src={url} alt={alt} />
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
  margin-right: ${theme.spacing(3)};
  cursor: pointer;
  background: unset;
  border: 0;

  img {
    border-radius: ${theme.spacing(0.5)};
    width: 164px;
    height: 164px;
    object-fit: cover;
  }

  .image-caption {
    display: inline-block;
    margin-top: ${theme.spacing(1)};
    color: ${theme.palette.gray};
    font-size: ${theme.typography.body2.size};
    line-height: ${theme.typography.body2.lineHeight};
  }
`;
