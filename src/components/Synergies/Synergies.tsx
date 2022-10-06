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
  // Group Synergies by quality
  const groupedSynergies = synergies.reduce<Record<string, SynergyProps[]>>(
    function (acc, curr) {
      (acc[curr["quality"] || "default"] =
        acc[curr["quality"] || "default"] || []).push(curr);
      return acc;
    },
    {}
  );

  const tabGroups = Object.keys(groupedSynergies).map((key) => {
    const group = groupedSynergies[key];
    let label = <Fragment></Fragment>;

    if (key != "default") {
      const quality = parseInt(key);
      const [qualityLabel] = SynergyQuality[quality].split(" ");
      label = (
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
    }

    return {
      label,
      buttons: group.map((syn) => {
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
            />
          ),
          label: syn.name,
          indicator: syn.isGroup ? (
            <GroupSynergyIcon className={classes.indicator}></GroupSynergyIcon>
          ) : (
            <Fragment />
          ),
        };
      }),
      panels: group.map((synOp) => {
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
        } = synOp;
        return (
          <Synergy
            key={synOp.name}
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
  });

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
