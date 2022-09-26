import { css } from "@emotion/react";
import { Theme } from "@mui/material";
import { transparentize } from "polished";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  header: string;
};

const Card: React.FC<React.PropsWithChildren<CardProps>> = (props) => {
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
    border-top-right-radius: ${theme.spacing(1)};

    ${theme.breakpoints.down("mobile")} {
      display: none;
    }

    h2 {
      margin: 0;
      text-transform: ${theme.typography.cardHeading.textTransform};
      font-size: ${theme.typography.cardHeading.fontSize}px;
      font-weight: ${theme.typography.cardHeading.fontWeight};
      line-height: ${theme.typography.cardHeading.lineHeight};
      color: ${theme.palette.white.main};
    }
  }

  .card-content {
    padding: ${theme.spacing(3, 4, 4)};
    background: ${transparentize(0.34, theme.palette.midtone.main)};
    border-bottom-right-radius: ${theme.spacing(1)};

    ${theme.breakpoints.down("mobile")} {
      padding: ${theme.spacing(2)};
      border-bottom-right-radius: unset;
    }

    & > p {
      margin: ${theme.spacing(3, 0, 0)};

      ${theme.breakpoints.down("mobile")} {
        margin: ${theme.spacing(2, 0, 0)};
      }
    }
  }
`;
