import React from "react";
import { Listbox, Transition } from "@headlessui/react";

import {
  PotentialFiveIcon,
  PotentialFourIcon,
  PotentialOneIcon,
  PotentialSixIcon,
  PotentialThreeIcon,
  PotentialTwoIcon,
} from "../icons/operatorStats";

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
    <Listbox<"div", number>
      as="div"
      value={currentPotential}
      onChange={onChange}
      className={classes.root}
    >
      <Listbox.Button<"button"> className={classes.button}>
        {potentialLabel(currentPotential)}
      </Listbox.Button>
      <Transition<"div">
        className={classes.transition.base}
        enterFrom={classes.transition.enterFrom}
        enterTo={classes.transition.enterTo}
        leaveFrom={classes.transition.leaveFrom}
        leaveTo={classes.transition.leaveTo}
      >
        <Listbox.Options<"ul"> className={classes.options}>
          {potList.map((pot) => (
            <Listbox.Option<"li">
              key={pot}
              value={pot}
              className={classes.option}
            >
              {potentialLabel(pot)}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};
export default PotentialsDropdown;
