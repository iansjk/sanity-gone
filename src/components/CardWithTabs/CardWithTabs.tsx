import * as classes from "./styles.css";
import { Fragment } from "react";

import Card from "../Card";
import RomanNumeralOne from "../icons/RomanNumeralOne";
import RomanNumeralTwo from "../icons/RomanNumeralTwo";
import RomanNumeralThree from "../icons/RomanNumeralThree";
import cx from "clsx";
import { Tab } from "@headlessui/react";
import useMediaQuery from "../../utils/media-query";
import { breakpoints } from "../../theme-helpers";
import ScrollContainer from "react-indiana-drag-scroll";

export type TabGroup = {
  label?: JSX.Element;
  buttons: Array<{
    image?: JSX.Element;
    label: string;
    indicator?: JSX.Element;
  }>;
  panels: JSX.Element[];
};

export type CardWithTabsProps = {
  header: string;
  tabGroups: TabGroup[];
  buttonClassName?: string;
  tabsClassName?: string;
};

const CardWithTabs: React.VFC<CardWithTabsProps> = (props) => {
  const { header, tabGroups, buttonClassName, tabsClassName, ...rest } = props;
  const isMobile = useMediaQuery(breakpoints.down("mobile"));

  return (
    <Card className={classes.cardWithTabsRoot} header={header} {...rest}>
      <Tab.Group as={"div"} className={classes.tabWrapper} vertical={!isMobile}>
        <Tab.List
          as={ScrollContainer}
          className={cx(tabsClassName, classes.tabButtons)}
        >
          {tabGroups &&
            tabGroups.map((group, groupIndex) => {
              return (
                <Fragment key={groupIndex}>
                  {group.label}
                  {group.buttons.map((button, buttonIndex) => (
                    <Tab as={Fragment} key={buttonIndex}>
                      <button className={cx(classes.button, buttonClassName)}>
                        {button.image ??
                          ((buttonIndex === 0 && (
                            <RomanNumeralOne
                              pathClassName={classes.romanNumerals}
                            />
                          )) ||
                            (buttonIndex === 1 && (
                              <RomanNumeralTwo
                                pathClassName={classes.romanNumerals}
                              />
                            )) ||
                            (buttonIndex === 2 && (
                              <RomanNumeralThree
                                pathClassName={classes.romanNumerals}
                              />
                            )))}
                        {button.indicator}
                      </button>
                    </Tab>
                  ))}
                </Fragment>
              );
            })}
        </Tab.List>
        <Tab.Panels className={classes.tabPanels}>
          {tabGroups &&
            tabGroups.map((group, groupIndex) => {
              return (
                <Fragment key={groupIndex}>
                  {group.panels.map((panel, panelIndex) => (
                    <Tab.Panel key={panelIndex}>{panel}</Tab.Panel>
                  ))}
                </Fragment>
              );
            })}
        </Tab.Panels>
      </Tab.Group>
    </Card>
  );
};
export default CardWithTabs;
