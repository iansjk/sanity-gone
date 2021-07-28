import { css, Theme } from "@emotion/react";
import React from "react";

export enum SynergyQuality {
  "Anti-Synergy" = -1,
  "Decent Synergy",
  "Good Synergy",
  "Excellent Synergy",
}

export interface SynergyOperatorProps {
  synergyOperator: {
    name: string;
    quality: SynergyQuality;
    analysis: string;
  };
}

const SynergyOperator: React.VFC<
  SynergyOperatorProps & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { name, quality, analysis, ...rest } = props.synergyOperator;
  return (
    <section css={styles} {...rest}>
      <div className="name-and-quality">
        <h3 className="synergy-operator-name">{name}</h3>
        <span className={`synergy-quality quality-${quality}`}>
          {SynergyQuality[quality]}
        </span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: analysis }} />
    </section>
  );
};
export default SynergyOperator;

const styles = (theme: Theme) => css`
  display: flex;
  flex-direction: column;

  .name-and-quality {
    .synergy-operator-name {
      font-size: 24px;
      margin: 0 0 ${theme.spacing(1)};
      font-weight: ${theme.typography.highlight.weight};
    }

    .synergy-quality {
      text-transform: uppercase;
      color: ${theme.palette.gray};

      &.quality--1 {
        color: ${theme.palette.red};
      }

      &.quality-1 {
        color: ${theme.palette.blue};
      }

      &.quality-2 {
        color: ${theme.palette.lime};
      }
    }
  }
`;
