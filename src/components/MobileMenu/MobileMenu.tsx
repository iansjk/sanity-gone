import { useEffect } from "react";
import { MdClose as CloseIcon } from "react-icons/md";
import { ModalUnstyled } from "@mui/base";
import Link from "next/link";

import SanityGoneLogo from "../SanityGoneLogo";
import SearchBar from "../SearchBar";

import * as classes from "./styles.css";
export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu: React.VFC<MobileMenuProps> = (props) => {
  const { open, onClose } = props;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  return (
    <ModalUnstyled
      open={open}
      onClose={onClose}
      className={classes.root}
      components={{
        Backdrop: "div",
      }}
      componentsProps={{
        backdrop: {
          className: classes.overlay,
        },
      }}
      // default scroll lock applies to <html>; we only want to lock <body>
      disableScrollLock
    >
      <div className={classes.content}>
        <div className={classes.topBar}>
          <SanityGoneLogo />
          <button
            className={classes.closeButton}
            aria-label="Close menu"
            ref={(btn) => btn?.focus()}
            onClick={onClose}
          >
            <CloseIcon className={classes.closeButtonSvg} />
          </button>
        </div>
        <div className={classes.searchBarContainer}>
          <SearchBar placeholder="Search" onSelected={onClose} />
        </div>
        <ul className={classes.list}>
          <li>
            <Link href="/operators">
              <a className={classes.listLink}>Operators</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a className={classes.listLink}>About</a>
            </Link>
          </li>
        </ul>
      </div>
    </ModalUnstyled>
  );
};
export default MobileMenu;
