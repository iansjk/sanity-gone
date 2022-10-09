import React, { useEffect, useImperativeHandle, useState } from "react";
import { createPortal } from "react-dom";
import { Listbox, Transition } from "@headlessui/react";
import cx from "clsx";
import { usePopper } from "react-popper";

import * as classes from "./styles.css";

// this augmentation is needed in order for the generic type <P> to be passed
// from the outer function to the inner function (the argument to React.forwardRef);
// see https://fettblog.eu/typescript-react-generic-forward-refs/
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/ban-types
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

export const DropdownOption = <T,>(
  props: React.HTMLAttributes<HTMLLIElement> & {
    value: T;
    disabled?: boolean;
  }
) => <Listbox.Option<"li", T> {...props} />;

type Props<T> = React.PropsWithChildren<{
  buttonContent: React.ReactNode;
  value: T;
  onChange: (newValue: T) => void;
  classes?: {
    button?: string;
  };
  disabled?: boolean;
}>;

export interface DropdownSelectRef {
  button: HTMLButtonElement | null;
}

function DropdownSelectInner<T>(
  props: Props<T>,
  ref: React.Ref<DropdownSelectRef>
) {
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
    modifiers: [
      {
        name: "flip",
        enabled: false,
      },
    ],
  });
  useImperativeHandle(ref, () => ({
    button: referenceElement,
  }));

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
}
const DropdownSelect = React.forwardRef(DropdownSelectInner);
// @ts-expect-error displayName is missing from the type augmentation above
DropdownSelect.displayName = "DropdownSelect";
export default DropdownSelect;

// handles the case when component has not mounted yet and `document` is not yet available
// https://github.com/tailwindlabs/headlessui/blob/fbaa1ae9da8788910ce8b240851f9779630babcb/packages/playground-react/pages/menu/menu-with-popper.tsx#L87-L95
const Portal: React.FC = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return createPortal(children, document.body);
};
