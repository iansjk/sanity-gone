import { css, Theme } from "@emotion/react";
import { professionToClass, subProfessionToSubclass } from "../utils/globals";
import GroupSynergyIcon from "./icons/GroupSynergyIcon";
import OperatorPortrait from "./OperatorPortrait";

export enum SynergyQuality {
  "Bad Synergy" = -1,
  "Decent Synergy",
  "Good Synergy",
  "Excellent Synergy",
}

export interface SynergyProps {
  name: string;
  quality?: SynergyQuality;
  isGroup: boolean;
  analysis: string;
  iconUrl?: string;
  rarity?: number;
  profession?: string;
  subProfessionId?: string;
  shouldInvertIconOnHighlight?: boolean;
}

const Synergy: React.VFC<SynergyProps & React.HTMLAttributes<HTMLDivElement>> =
  (props) => {
    const {
      name,
      quality,
      isGroup,
      analysis,
      iconUrl,
      rarity: rawRarity,
      profession,
      subProfessionId,
      ...rest
    } = props;
    const rarity = rawRarity ? rawRarity + 1 : undefined;

    return (
      <section css={styles} {...rest}>
        <div className="synergy-operator-info">
          <div className="portrait">
            <OperatorPortrait
              variant="small"
              name={name}
              iconOverride={isGroup ? iconUrl : undefined}
              rarity={!isGroup ? rarity : undefined}
            />
          </div>
          <div className="name-and-quality">
            <h3 className="operator-name">{name}</h3>
            {quality != null && (
              <span className={`synergy-quality quality-${quality}`}>
                {SynergyQuality[quality]}
              </span>
            )}
            {!isGroup && (
              <div className="synergy-operator-info">
                {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
                <span className={`rarity-${rarity!}-stars`}>{rarity} ★</span>{" "}
                {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
                {professionToClass(profession!)} ·{" "}
                {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
                {subProfessionToSubclass(subProfessionId!)}
              </div>
            )}
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: analysis }} />
      </section>
    );
  };
export default Synergy;

const styles = (theme: Theme) => css`
  margin-top: ${theme.spacing(3)};
  flex-direction: column;

  :not([hidden]) {
    display: flex;
  }

  .synergy-operator-info {
    display: flex;
    align-items: center;

    .portrait {
      position: relative;

      .group-synergy-icon {
        position: absolute;
        right: -3px;
        bottom: -2px;
      }
    }

    .name-and-quality {
      margin-left: ${theme.spacing(2)};

      .operator-name {
        margin: 0;
        font-size: ${theme.typography.generalHeadingBold.fontSize};
        font-weight: ${theme.typography.generalHeadingBold.fontWeight};
        line-height: ${theme.typography.generalHeadingBold.lineHeight};
      }

      .synergy-quality {
        font-size: ${theme.typography.label2.size};
        text-transform: uppercase;
        line-height: ${theme.typography.label2.lineHeight};
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

      .synergy-operator-info {
        font-size: ${theme.typography.body3.fontSize};
        line-height: ${theme.typography.body3.lineHeight};
      }
    }
  }
`;
