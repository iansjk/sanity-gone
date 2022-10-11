import CardWithTabs from "../CardWithTabs";
import Synergy, { SynergyProps, SynergyQuality } from "../Synergy";
import { operatorAvatar } from "../../utils/images";
import Image from "next/image";
import cx from "clsx";
import { Fragment } from "react";
import * as classes from "./styles.css";
import GroupSynergyIcon from "../icons/GroupSynergyIcon";

export interface SynergiesProps {
  synergies: SynergyProps[];
}

const Synergies: React.VFC<SynergiesProps> = ({ synergies }) => {
  //Sort synergies first.
  const sortedSynergies = synergies
    .map((syn) => ({
      ...syn,
      quality: syn.quality ?? 0.5,
    }))
    .sort((a, b) => b.quality - a.quality);

  // Group Synergies by quality
  const groupedSynergies = sortedSynergies.reduce((acc, curr) => {
    acc.set(curr.quality, [...(acc.get(curr.quality) ?? []), curr]);
    return acc;
  }, new Map<number, SynergyProps[]>());

  const tabGroups = [...groupedSynergies.entries()].map(
    ([quality, synsForQuality]) => {
      const [qualityLabel] = (SynergyQuality[quality] ?? "").split(" ");
      const label = (
        <span
          key={qualityLabel}
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          className={
            classes.synergyQuality[
              `quality-${quality}` as keyof typeof classes.synergyQuality
            ]
          }
          title={SynergyQuality[quality]}
        >
          {qualityLabel}
        </span>
      );

      return {
        label,
        buttons: synsForQuality.map((syn) => {
          return {
            image: (
              <Image
                className={cx(
                  classes.operatorImage,
                  classes.synergyGroup,
                  syn.shouldInvertIconOnHighlight && classes.invertOnHighlight
                )}
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                src={syn.isGroup ? syn.iconUrl! : operatorAvatar(syn.charId!)}
                width={48}
                height={48}
                alt=""
                layout="fixed"
              />
            ),
            label: syn.name,
            indicator: syn.isGroup ? (
              <GroupSynergyIcon
                className={classes.indicator}
              ></GroupSynergyIcon>
            ) : (
              <Fragment />
            ),
          };
        }),
        panels: synsForQuality.map((syn) => {
          const {
            charId,
            name,
            analysis,
            isGroup,
            iconUrl,
            rarity,
            profession,
            subProfessionId,
            quality,
          } = syn;
          return (
            <Synergy
              key={syn.name}
              charId={charId}
              name={name}
              isGroup={isGroup}
              analysis={analysis}
              iconUrl={iconUrl}
              rarity={rarity}
              profession={profession}
              subProfessionId={subProfessionId}
              quality={quality}
            />
          );
        }),
      };
    }
  );

  return (
    <div className={classes.synergyContainer}>
      <CardWithTabs
        header="Synergy"
        tabGroups={tabGroups}
        buttonClassName={classes.button}
        tabsClassName={classes.tabsContainer}
      />
    </div>
  );
};
export default Synergies;
