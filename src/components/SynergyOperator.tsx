import { css, Theme } from "@emotion/react";
import OperatorPortrait from "./OperatorPortrait";

export enum SynergyQuality {
  "Anti-Synergy" = -1,
  "Decent Synergy",
  "Good Synergy",
  "Excellent Synergy",
}

export interface SynergyOperatorProps {
  synergyOperator: {
    name: string;
    rarity: number; // we'll assume this is 0-indexed, so rarity: 0 means a 1* operator
    quality: SynergyQuality;
    analysis: string;
  };
}

const SynergyOperator: React.VFC<
  SynergyOperatorProps & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const {
    name,
    rarity: rawRarity,
    quality,
    analysis,
    ...rest
  } = props.synergyOperator;
  const rarity = rawRarity + 1;
  return (
    <section css={styles} {...rest}>
      <div className="synergy-operator-info">
        <div className="name-and-quality">
          <h3 className="operator-name">{name}</h3>
          <span className={`synergy-quality quality-${quality}`}>
            {SynergyQuality[quality]}
          </span>
        </div>
        <OperatorPortrait variant="small" name={name} rarity={rarity} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: analysis }} />
    </section>
  );
};
export default SynergyOperator;

const styles = (theme: Theme) => css`
  display: flex;
  flex-direction: column;

  .synergy-operator-info {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: flex-end;

    .name-and-quality {
      margin-left: ${theme.spacing(2)};

      .operator-name {
        margin: 0;
        font-size: ${theme.typography.generalHeadingBold.size};
        font-weight: ${theme.typography.generalHeadingBold.weight};
        line-height: ${theme.typography.generalHeadingBold.lineHeight};
      }

      .synergy-quality {
        font-size: ${theme.typography.body2.size};
        text-transform: uppercase;
        line-height: 1.25;
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
  }
`;
