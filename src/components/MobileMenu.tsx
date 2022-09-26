import { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { css } from "@emotion/react";
import { Theme } from "@mui/material";
import { MdClose as CloseIcon } from "react-icons/md";
import Link from "next/link";

import SanityGoneLogo from "./SanityGoneLogo";
import SearchBar from "./SearchBar";

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = (props) => {
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
          className={open ? "open" : "closed"}
          css={styles}
          onClick={handleClick}
        >
          <div className="mobile-menu-inner">
            <div className="top-bar">
              <SanityGoneLogo />
              <div className="spacer" />
              <button
                className="close-button"
                aria-label="Close menu"
                onClick={onClose}
              >
                <CloseIcon />
              </button>
            </div>
            <ul>
              <li>
                <div className="search-bar-container">
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
                      <a>Operators</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about">
                      <a>About</a>
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

const styles = (theme: Theme) => css`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;

  &.closed {
    display: none;
  }

  &.open {
    display: block;
    background-color: rgba(0, 0, 0, 0.66);
  }

  .top-bar {
    height: 75px;
    padding: ${theme.spacing(0, 3, 0, 2)};
    display: flex;
    align-items: center;
    background-color: ${theme.palette.dark.main};

    .spacer {
      flex: 1 1 0;
    }

    .close-button {
      position: relative;
      background: none;
      border: none;
      display: flex;
      align-items: center;

      svg {
        fill: ${theme.palette.white.main};
        height: 24px;
        width: 24px;
        margin-right: ${theme.spacing(-1)};
      }
    }
  }

  .list-header {
    margin: 0;
    font-size: ${theme.typography.skillTalentHeading.fontSize}px;
    font-weight: ${theme.typography.skillTalentHeading.fontWeight};
    line-height: ${theme.typography.skillTalentHeading.lineHeight};
    color: ${theme.palette.gray.main};
    border-bottom: 1px solid ${theme.palette.midtoneBrighterer.main};
  }

  .list-header,
  ul > li > a {
    margin: 0;
    padding: ${theme.spacing(3)};
    background-color: ${theme.palette.midtone.main};
  }

  ul li .search-bar-container {
    background: ${theme.palette.midtone.main};
    padding: ${theme.spacing(2, 0)};
    margin: 0;

    .search {
      max-width: unset;

      .search-bar {
        border: none !important;
        background: ${theme.palette.midtoneDarker.main};
        max-width: unset;
        width: auto;
        height: ${theme.spacing(5)};
        padding: ${theme.spacing(0)};
        margin: ${theme.spacing(0, 2)};

        &.menu-down {
          border-radius: ${theme.spacing(0.5)};
        }

        &:focus-within {
          background: ${theme.palette.dark.main};
        }

        .search-input {
          font-size: ${theme.typography.skillTalentHeading.fontSize}px;
        }
      }

      .search-results {
        padding-top: ${theme.spacing(2)};
        border-radius: 0;
      }
    }

    .search-results {
      width: 100%;
      max-width: unset;
      margin-right: ${theme.spacing(2)};
      border: none;
    }
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    a {
      color: ${theme.palette.white.main};
    }
  }

  ul li a {
    display: block;
  }
`;
