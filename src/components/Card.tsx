import { css, Theme } from "@emotion/react";
import { transparentize } from "polished";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  header: string;
};

const Card: React.FC<CardProps> = (props) => {
  const { header, children, dangerouslySetInnerHTML, ...rest } = props;
  return (
    <section css={styles} {...rest}>
      <div className="heading-block">
        <h2>{header}</h2>
      </div>
      <div
        className="card-content"
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      >
        {children}
      </div>
    </section>
  );
};
export default Card;

const styles = (theme: Theme) => css`
  border-radius: ${theme.spacing(1)};
  padding: 0;
  box-shadow: ${theme.spacing(0.25)} ${theme.spacing(0.5)} ${theme.spacing(1)}
    rgba(0, 0, 0, 0.05);

  .heading-block {
    padding: ${theme.spacing(2, 0, 2, 4)};
    background-color: ${transparentize(0.34, theme.palette.midtoneDarker)};
    border-top-right-radius: ${theme.spacing(1)};

    ${theme.breakpoints.down("mobile")} {
      display: none;
    }

    h2 {
      margin: 0;
      text-transform: ${theme.typography.cardHeading.textTransform};
      font-size: ${theme.typography.cardHeading.fontSize};
      font-weight: ${theme.typography.cardHeading.fontWeight};
      line-height: ${theme.typography.cardHeading.lineHeight};
      color: ${theme.palette.white};
    }
  }

  .card-content {
    padding: ${theme.spacing(3, 4, 4)};
    background: ${transparentize(0.34, theme.palette.midtone)};
    border-bottom-right-radius: ${theme.spacing(1)};

    ${theme.breakpoints.down("mobile")} {
      padding: ${theme.spacing(2)};
    }

    & > p {
      margin: ${theme.spacing(3, 0, 0)};

      ${theme.breakpoints.down("mobile")} {
        margin: ${theme.spacing(2, 0, 0)};
      }

      &:first-of-type {
        margin-top: 0;
      }
    }
  }
`;
