import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import cx from "clsx";

import * as classes from "./styles.css";

export const DropdownOption = <T,>(
  props: React.HTMLAttributes<HTMLLIElement> & {
    value: T;
    disabled?: boolean;
  }
) => <Listbox.Option<"li", T> {...props} />;

interface Props<T> {
  buttonContent: React.ReactNode;
  value: T;
  onChange: (newValue: T) => void;
  classes?: {
    button?: string;
  };
  disabled?: boolean;
}

const DropdownSelect = <T,>(props: React.PropsWithChildren<Props<T>>) => {
  const {
    buttonContent,
    value,
    onChange,
    disabled,
    classes: customClasses,
    children,
  } = props;

  return (
    <Listbox<"div", T>
      as="div"
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={classes.root}
    >
      <Listbox.Button<"button">
        className={cx(customClasses?.button, classes.button)}
      >
        {buttonContent}
      </Listbox.Button>
      <Transition<"div">
        className={classes.transition.base}
        enterFrom={classes.transition.enterFrom}
        enterTo={classes.transition.enterTo}
        leaveFrom={classes.transition.leaveFrom}
        leaveTo={classes.transition.leaveTo}
      >
        <Listbox.Options<"ul"> className={classes.options}>
          {React.Children.map(children, (child) => {
            if (React.isValidElement<typeof Listbox.Option<"li", T>>(child)) {
              return React.cloneElement(child, {
                // @ts-expect-error force className stacking onto Listbox.Option
                className: cx(child.props.className, classes.option),
              });
            }
          })}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};
export default DropdownSelect;
