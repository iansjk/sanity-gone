import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import {
  professionToClass,
  subProfessionIdToSubclass,
} from "../../utils/globals";
import OperatorPortrait from "../OperatorPortrait";
import * as classes from "./styles.css";

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

const Synergy: React.VFC<
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
    <section className={classes.root} {...rest}>
      <div className={classes.synergyHeader}>
        <div className={classes.portrait}>
          <OperatorPortrait
            variant="small"
            charId={charId}
            iconOverride={isGroup ? iconUrl : undefined}
          />
        </div>
        <div className={classes.nameAndQuality}>
          <h3 className={classes.operatorName}>{name}</h3>
          {!isGroup && (
            <div className={classes.synergyOperatorInfo}>
              <span
                className={
                  classes.rarity[
                    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
                    `rarity-${rarity!}-stars` as keyof typeof classes.rarity
                  ]
                }
              >
                {rarity} ★
              </span>
              <span className={classes.operatorClass}>
                {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
                {professionToClass(profession!)}
              </span>
              <span
                className={classes.classSubclassSeparator}
                aria-hidden="true"
              >
                ·
              </span>
              <span className={classes.subclass}>
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
