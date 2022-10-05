import { Fragment } from "react";
import * as classes from "./styles.css";

import Card from "../Card";
import RomanNumeralOne from "../icons/RomanNumeralOne";
import RomanNumeralTwo from "../icons/RomanNumeralTwo";
import RomanNumeralThree from "../icons/RomanNumeralThree";
import { Tab } from "@headlessui/react";

export type CardWithTabsProps = {
  header: string;
  panels: JSX.Element[];
} & Either<
  {
    buttons: Array<{
      content?: JSX.Element;
      label?: string;
    }>;
  },
  {
    buttonLabelFn: (index: number) => string;
  }
>;
// export type CardWithTabsProps = {
//   header: string;
//   isSwiper?: boolean;
//   css?: Interpolation<Theme>;
// } & Either<
//   {
//     panelContent: JSX.Element[];
//   } & Either<
//     {
//       buttonLabels: string[];
//     },
//     {
//       buttonLabelFn: (index: number) => string;
//     }
//   >,
//   {
//     buttons: JSX.Element[];
//     panels: JSX.Element[];
//   }
// >;

const CardWithTabs: React.VFC<CardWithTabsProps> = (props) => {
  const { header, buttonLabelFn, buttons, panels, ...rest } = props;

  return (
    <Card className={classes.cardWithTabsRoot} header={header} {...rest}>
      <Tab.Group as={"div"} className={classes.tabWrapper} vertical>
        <Tab.List className={classes.tabButtons}>
          {panels.map((_, i) => (
            <Tab
              as={"div"}
              aria-label={buttonLabelFn ? buttonLabelFn(i) : buttons?.[i].label}
              key={i}
            >
              {({ selected }) =>
                buttons?.[i].content ? (
                  buttons?.[i].content
                ) : (
                  <button
                    className={
                      selected ? classes.button.active : classes.button.default
                    }
                  >
                    {i === 0 && <RomanNumeralOne />}
                    {i === 1 && <RomanNumeralTwo />}
                    {i === 2 && <RomanNumeralThree />}
                  </button>
                )
              }
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className={classes.tabPanels}>
          {panels.map((panel, i) => (
            <Tab.Panel key={i}>{panel}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </Card>
  );
};
export default CardWithTabs;
