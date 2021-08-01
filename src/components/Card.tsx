import { css, Theme } from "@emotion/react";
import { transparentize } from "polished";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  header: string;
  subheader?: string;
};

const Card: React.FC<CardProps> = (props) => {
  const { header, subheader, children, ...rest } = props;
  return (
    <section css={styles} {...rest}>
      <div className="heading-block">
        <h2>{header}</h2>
      </div>
      <div className="card-content">{children}</div>
    </section>
  );
};
export default Card;

const styles = (theme: Theme) => css`
  border-radius: ${theme.spacing(1)};
  padding: 0;

  .heading-block {
    padding: 16px 0 16px 24px;
    background: ${transparentize(0.66, theme.palette.background)};
    backdrop-filter: blur(8px);

    h2 {
      margin: 0;
      text-transform: ${theme.typography.cardHeading.textTransform};
      font-size: ${theme.typography.cardHeading.size};
      font-weight: ${theme.typography.cardHeading.weight};
      letter-spacing: 1px;
      color: ${theme.palette.white};
    }
  }

  .card-content {
    padding: ${theme.spacing(3, 4, 4)};
    backdrop-filter: blur(8px);
    background: ${transparentize(0.34, theme.palette.mid)};
    border-bottom-right-radius: ${theme.spacing(1)};

    & > p {
      margin: ${theme.spacing(3, 0, 0)};
    }
  }
`;
