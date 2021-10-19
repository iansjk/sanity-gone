import { css, Theme } from "@emotion/react";
import GroupSynergyIcon from "./icons/GroupSynergyIcon";
import OperatorPortrait from "./OperatorPortrait";

export enum SynergyQuality {
  "Anti-Synergy" = -1,
  "Decent Synergy",
  "Good Synergy",
  "Excellent Synergy",
}

export interface SynergyProps {
  name: string;
  rarity?: number;
  quality?: SynergyQuality;
  isGroup: boolean;
  iconUrl?: string;
  analysis: string;
}

const Synergy: React.VFC<SynergyProps & React.HTMLAttributes<HTMLDivElement>> =
  (props) => {
    const { name, rarity, quality, isGroup, iconUrl, analysis, ...rest } =
      props;
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
            {isGroup && (
              <GroupSynergyIcon
                className="group-synergy-icon"
                aria-label="Group Synergy"
              />
            )}
          </div>
          <div className="name-and-quality">
            <h3 className="operator-name">{name}</h3>
            {quality && (
              <span className={`synergy-quality quality-${quality}`}>
                {SynergyQuality[quality]}
              </span>
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
        right: 0;
        bottom: 0;
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
    }
  }
`;
