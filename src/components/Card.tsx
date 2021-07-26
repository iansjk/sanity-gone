/** @jsxImportSource @emotion/react */
import { ClassNames, css, Theme } from "@emotion/react";

export interface CardProps {
  header: string;
  subheader?: string;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = (props) => {
  const { header, subheader, children, noPadding } = props;
  return (
    <section css={styles}>
      <div className="heading-block">
        <h2>{header}</h2>
      </div>
      <ClassNames>
        {({ cx }) => (
          <div className={cx("card-content", noPadding && "no-padding")}>
            {children}
          </div>
        )}
      </ClassNames>
    </section>
  );
};
export default Card;

const styles = (theme: Theme) => css`
  background: ${theme.palette.mid};
  border-radius: ${theme.spacing(1)};
  padding: 0;

  .heading-block {
    padding: 16px 0 16px 24px;
    border-bottom: 1px solid ${theme.palette.midHighlight};

    h2 {
      margin: 0;
      text-transform: ${theme.typography.cardHeader.textTransform};
      font-size: ${theme.typography.cardHeader.size};
      font-weight: ${theme.typography.cardHeader.weight};
      font-variant: ${theme.typography.cardHeader.fontVariant};
      letter-spacing: 1px;
      color: ${theme.palette.white};
    }
  }

  .card-content {
    &:not(.no-padding) {
      padding: ${theme.spacing(3)} ${theme.spacing(4)} ${theme.spacing(4)};
    }

    p {
      line-height: 28px;
      margin: ${theme.spacing(3)} 0 0;
    }
  }
`;
