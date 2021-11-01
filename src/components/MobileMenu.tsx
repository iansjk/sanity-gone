import { useRef } from "react";
import ReactDOM from "react-dom";
import { css } from "@emotion/react";
import { Theme } from "@mui/material";
import { MdClose as CloseIcon } from "react-icons/md";

import SanityGoneLogo from "./SanityGoneLogo";

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
              <button
                className="close-button"
                aria-label="Close menu"
                onClick={onClose}
              >
                <CloseIcon />
              </button>
            </div>
            <h2 className="list-header">Navigation</h2>
            <ul>
              <li>
                <a href="/operators">Operators</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
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
    height: 39px;
    padding: ${theme.spacing(3)};
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    align-items: center;
    background-color: ${theme.palette.dark.main};

    .close-button {
      position: relative;
      right: -7px;
      top: -1px;
      grid-column: 3;
      background: none;
      border: none;

      svg {
        fill: ${theme.palette.white.main};
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
  ul li a {
    margin: 0;
    padding: ${theme.spacing(3)};
    background-color: ${theme.palette.midtone.main};
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
