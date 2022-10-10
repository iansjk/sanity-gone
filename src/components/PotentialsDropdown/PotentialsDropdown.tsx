import React from "react";

import {
  PotentialFiveIcon,
  PotentialFourIcon,
  PotentialOneIcon,
  PotentialSixIcon,
  PotentialThreeIcon,
  PotentialTwoIcon,
} from "../icons/operatorStats";
import {
  DropdownSelect,
  DropdownOption,
} from "../../components/DropdownSelect";

import * as classes from "./styles.css";

const potentialLabel = (potential: number) => {
  let icon = null;
  switch (potential) {
    case 0:
      icon = (
        <PotentialOneIcon
          className={classes.svg}
          noPotentialPathClassName={classes.noPotentialSvgPath}
        />
      );
      break;
    case 1:
      icon = (
        <PotentialTwoIcon
          className={classes.svg}
          noPotentialPathClassName={classes.noPotentialSvgPath}
        />
      );
      break;
    case 2:
      icon = (
        <PotentialThreeIcon
          className={classes.svg}
          noPotentialPathClassName={classes.noPotentialSvgPath}
        />
      );
      break;
    case 3:
      icon = (
        <PotentialFourIcon
          className={classes.svg}
          noPotentialPathClassName={classes.noPotentialSvgPath}
        />
      );
      break;
    case 4:
      icon = <PotentialFiveIcon className={classes.svg} />;
      break;
    case 5:
      icon = <PotentialSixIcon className={classes.svg} />;
      break;
  }
  return (
    <>
      {icon}
      <span>Potential {potential + 1}</span>
    </>
  );
};

export interface PotentialsDropdownProps {
  potentialsToShow?: number[];
  currentPotential: number;
  onChange: (potential: number) => void;
}

const PotentialsDropdown: React.VFC<PotentialsDropdownProps> = (props) => {
  const { potentialsToShow, currentPotential, onChange } = props;

  const potList = potentialsToShow ?? [0, 1, 2, 3, 4, 5]; // default to all pots

  return (
    <DropdownSelect
      buttonContent={potentialLabel(currentPotential)}
      value={currentPotential}
      onChange={onChange}
      // TODO maybe we should disable the dropdown if there's only one option?
      // disabled={potList.length === 1 && potList[0] === currentPotential}
    >
      {potList.map((pot) => (
        <DropdownOption key={pot} value={pot}>
          {potentialLabel(pot)}
        </DropdownOption>
      ))}
    </DropdownSelect>
  );
};
export default PotentialsDropdown;
