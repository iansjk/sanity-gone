import { css } from "@emotion/react";
import { Theme } from "@mui/material";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import { professionToClass, subProfessionIdToSubclass } from "../utils/globals";
import OperatorPortrait from "./OperatorPortrait";

export enum SynergyQuality {
  "Bad Synergy" = -1,
  "Decent Synergy",
  "Good Synergy",
  "Excellent Synergy",
}

export interface SynergyProps {
  name: string;
  charId?: string;
  quality: SynergyQuality | null;
  isGroup: boolean;
  analysis: MDXRemoteSerializeResult;
  iconUrl?: string;
  rarity?: number;
  profession?: string;
  subProfessionId?: string;
  shouldInvertIconOnHighlight?: boolean;
}

const Synergy: React.FC<
  SynergyProps & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const {
    name,
    charId,
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
      <div className="synergy-header">
        <div className="portrait">
          <OperatorPortrait
            variant="small"
            charId={charId}
            iconOverride={isGroup ? iconUrl : undefined}
          />
        </div>
        <div className="name-and-quality">
          <h3 className="operator-name">{name}</h3>
          {!isGroup && (
            <div className="synergy-operator-info">
              {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
              <span className={`rarity-${rarity!}-stars`}>{rarity} ★</span>
              <span className="operator-class">
                {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
                {professionToClass(profession!)}
              </span>
              <span className="class-subclass-separator" aria-hidden="true">
                ·
              </span>
              <span className="subclass">
                {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
                {subProfessionIdToSubclass(subProfessionId!)}
              </span>
            </div>
          )}
        </div>
      </div>
      <MDXRemote {...analysis} />
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

  .synergy-header {
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
        font-size: ${theme.typography.generalHeadingBold.fontSize}px;
        font-weight: ${theme.typography.generalHeadingBold.fontWeight};
        line-height: ${theme.typography.generalHeadingBold.lineHeight};
      }

      .synergy-quality {
        font-size: ${theme.typography.label2.fontSize}px;
        text-transform: uppercase;
        line-height: ${theme.typography.label2.lineHeight};
        color: ${theme.palette.gray.main};

        &.quality--1 {
          color: ${theme.palette.red.main};
        }

        &.quality-1 {
          color: ${theme.palette.blue.main};
        }

        &.quality-2 {
          color: ${theme.palette.lime.main};
        }
      }

      .synergy-operator-info {
        font-size: ${theme.typography.body3.fontSize}px;
        line-height: ${theme.typography.body3.lineHeight};

        .operator-class,
        .class-subclass-separator,
        .subclass {
          display: inline-block;
        }

        .operator-class {
          margin-left: ${theme.spacing(1)};
        }

        .class-subclass-separator {
          margin: ${theme.spacing(0, 1)};
        }
      }
    }
  }
`;
