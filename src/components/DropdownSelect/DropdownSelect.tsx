import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Listbox, Transition } from "@headlessui/react";
import cx from "clsx";
import { usePopper } from "react-popper";

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
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
  });

  return (
    <Listbox<"div", T>
      as="div"
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      <Listbox.Button<"button">
        className={cx(customClasses?.button, classes.button)}
        ref={setReferenceElement}
      >
        {buttonContent}
      </Listbox.Button>
      <Portal>
        <Transition<"div">
          className={classes.transition.base}
          enterFrom={classes.transition.enterFrom}
          enterTo={classes.transition.enterTo}
          leaveFrom={classes.transition.leaveFrom}
          leaveTo={classes.transition.leaveTo}
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
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
      </Portal>
    </Listbox>
  );
};
export default DropdownSelect;

// handles the case when component has not mounted yet and `document` is not yet available
// https://github.com/tailwindlabs/headlessui/blob/fbaa1ae9da8788910ce8b240851f9779630babcb/packages/playground-react/pages/menu/menu-with-popper.tsx#L87-L95
const Portal: React.FC = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return createPortal(children, document.body);
};
