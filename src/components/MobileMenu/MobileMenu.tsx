import { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { MdClose as CloseIcon } from "react-icons/md";
import * as classes from "./styles.css";
import Link from "next/link";

import SanityGoneLogo from "../SanityGoneLogo";
import SearchBar from "../SearchBar";
import cx from "clsx";

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu: React.VFC<MobileMenuProps> = (props) => {
  const { open, onClose } = props;
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const handleClick: React.MouseEventHandler = (e) => {
    if (e.target === menuContainerRef.current) {
      onClose();
    }
  };

  const [isSearchOpen, setSearchOpen] = useState(false);

  return typeof window === "undefined"
    ? null
    : ReactDOM.createPortal(
        <div
          ref={menuContainerRef}
          aria-modal={open}
          className={open ? classes.mobileMenu.open : classes.mobileMenu.close}
          onClick={handleClick}
        >
          <div className="mobile-menu-inner">
            <div className={classes.topBar}>
              <SanityGoneLogo />
              <div className={classes.spacer} />
              <button
                className={classes.closeButton}
                aria-label="Close menu"
                onClick={onClose}
              >
                <CloseIcon className={classes.closeButtonSvg} />
              </button>
            </div>
            <ul className={classes.list}>
              <li>
                <div
                  className={cx(
                    classes.searchBarContainer,
                    "search-bar-container"
                  )}
                >
                  <SearchBar
                    placeholder="Search"
                    whenInputChange={(input) => {
                      setSearchOpen(!!input);
                    }}
                    onLinkClicked={onClose}
                  />
                </div>
              </li>
              {!isSearchOpen && (
                <>
                  <li>
                    <Link href="/operators">
                      <a className={cx(classes.listLink)}>Operators</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about">
                      <a className={classes.listLink}>About</a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>,
        window.document.body
      );
};
export default MobileMenu;
