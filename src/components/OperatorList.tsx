import React, { useEffect, useMemo, useRef } from "react";
import { Box, css, Theme, Tooltip } from "@mui/material";
import cx from "clsx";
import { rgba } from "polished";

import { professionToClass, subProfessionIdToSubclass } from "../utils/globals";
import StarIcon from "./icons/StarIcon";
import Image from "next/image";
import Link from "next/link";
import { operatorBranchIcon } from "../utils/images";

const getPortraitFilename = (operatorId: string) =>
  operatorId === "char_1001_amiya2"
    ? `${operatorId}_2.png`
    : `${operatorId}_1.png`;

export interface OperatorListOperator {
  charId: string;
  name: string;
  isCnOnly: boolean;
  profession: string;
  subProfessionId: string;
  rarity: number; // 0-indexed
}

interface Props {
  operators: OperatorListOperator[];
  filterSettings: {
    showOnlyGuideAvailable: boolean;
    selectedProfession: string | null;
    selectedSubProfessionId: string | null;
  };
  operatorsWithGuides: { [operatorName: string]: string }; // operator name -> slug
  onSubclassFilter: (profession: string, subProfessionId: string) => void;
}

const OperatorList: React.VFC<Props> = React.memo((props) => {
  const { operators, filterSettings, operatorsWithGuides, onSubclassFilter } =
    props;
  const {
    showOnlyGuideAvailable,
    selectedProfession,
    selectedSubProfessionId,
  } = filterSettings;
  const operatorListRef = useRef<HTMLUListElement>(null);
  const noResultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!noResultsRef.current || !operatorListRef.current) {
      return;
    }

    let numVisible = 0;
    operatorListRef.current
      .querySelectorAll<HTMLLIElement>("li.operator-card")
      .forEach((li) => {
        let visible = true;
        if (showOnlyGuideAvailable && li.dataset.hasguide === "false") {
          visible = false;
        }
        if (
          selectedProfession != null &&
          li.dataset.profession !== selectedProfession
        ) {
          visible = false;
        }
        if (
          selectedSubProfessionId != null &&
          li.dataset.subprofessionid !== selectedSubProfessionId
        ) {
          visible = false;
        }

        if (visible) {
          li.style.removeProperty("display");
          numVisible++;
        } else {
          li.style.display = "none";
        }
      });
    if (numVisible > 0) {
      noResultsRef.current.style.display = "none";
    } else {
      noResultsRef.current.style.removeProperty("display");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSettings]);

  const operatorListChildren = useMemo(() => {
    return operators.map((op) => {
      const operatorClass = professionToClass(op.profession);
      const subclass = subProfessionIdToSubclass(op.subProfessionId);
      const url = operatorsWithGuides[op.name];
      const hasGuide = url != null;
      const [charName, alterName] = op.name.split(" the ");
      const portraitFilename = getPortraitFilename(op.charId);

      const operatorInfo = (
        <>
          <h3 className="operator-name">
            {alterName ? (
              <>
                <span className="base-name">{charName}</span>
                <span className="visually-hidden">&nbsp;the&nbsp;</span>
                <span className="alter-name">{alterName}</span>
              </>
            ) : (
              op.name
            )}
          </h3>
          <div className="rarity">
            <span className="visually-hidden">Rarity:&nbsp;</span>
            <span className="rarity-number">{op.rarity + 1}</span>{" "}
            <StarIcon
              aria-hidden="true"
              className="rarity-star"
              aria-label="stars"
            />
          </div>
          <div className="operator-class">
            <span className="visually-hidden">Class:&nbsp;</span>
            {operatorClass}
          </div>
          <div className="visually-hidden">Subclass: {subclass}</div>
        </>
      );

      return (
        <li
          key={op.name}
          className={cx(
            "operator-card",
            hasGuide ? "has-guide" : "no-guide",
            `rarity-${op.rarity + 1}-star${op.rarity > 0 ? "s" : ""}`
          )}
          data-hasguide={operatorsWithGuides[op.name] != null}
          data-profession={op.profession}
          data-subprofessionid={op.subProfessionId}
        >
          <Box
            gridArea="x"
            height="100%"
            overflow="hidden"
            sx={{
              backgroundColor: (theme) => theme.palette.midtone.main,
            }}
          >
            <Box
              position="relative"
              width="100%"
              height={0}
              top="-20px"
              paddingBottom="200%"
            >
              <Image
                src={`/images/portraits/${portraitFilename}`}
                alt=""
                layout="fill"
                objectPosition="right bottom"
              />
            </Box>
          </Box>
          <div className="operator-card-content">
            {hasGuide && (
              <Link href={`/operators/${url}`}>
                <a
                  className="dummy-clickable-area"
                  tabIndex={-1}
                  aria-hidden="true"
                />
              </Link>
            )}
            {hasGuide ? (
              <Link href={`/operators/${url}`}>
                <a className="operator-info" role="presentation" tabIndex={-1}>
                  {operatorInfo}
                </a>
              </Link>
            ) : (
              <div className="operator-info">{operatorInfo}</div>
            )}
            <Tooltip title={subclass}>
              <button
                aria-label={`Filter list by ${subclass}`}
                className="operator-subclass"
                onClick={() =>
                  onSubclassFilter(op.profession, op.subProfessionId)
                }
              >
                <Image
                  width={32}
                  height={32}
                  className="operator-subclass-icon"
                  src={operatorBranchIcon(op.subProfessionId)}
                  alt={""}
                />
              </button>
            </Tooltip>
            {/* TODO "NEW" should go here */}
            {hasGuide ? (
              <Link href={`/operators/${url}`}>
                <a className="go-to-guide-link">
                  <span className="go-to-guide-text">
                    Read{" "}
                    <span className="visually-hidden">
                      &nbsp;{op.name}&nbsp;
                    </span>
                    Guide
                  </span>
                </a>
              </Link>
            ) : (
              <span className="visually-hidden">Guide Unavailable</span>
            )}
          </div>
        </li>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" className="visually-hidden">
        <defs>
          <linearGradient id="rarity-6-gradient">
            <stop offset="0%" stopColor="#ff9254" />
            <stop offset="100%" stopColor="#ede637" />
          </linearGradient>
          <linearGradient id="rarity-5-gradient">
            <stop offset="0%" stopColor="#ffe9b0" />
            <stop offset="100%" stopColor="#e5c675" />
          </linearGradient>
          <linearGradient id="rarity-4-gradient">
            <stop offset="0%" stopColor="#d1d0ee" />
            <stop offset="100%" stopColor="#9d9bf4" />
          </linearGradient>
          <linearGradient id="rarity-3-gradient">
            <stop offset="0%" stopColor="#7cd8ff" />
            <stop offset="100%" stopColor="#49b3ff" />
          </linearGradient>
          <linearGradient id="rarity-2-gradient">
            <stop offset="0%" stopColor="#d3ff77" />
            <stop offset="100%" stopColor="#a7e855" />
          </linearGradient>
        </defs>
      </svg>
      <ul className="operator-list" css={styles} ref={operatorListRef}>
        {operatorListChildren}
      </ul>
      <div className="no-results" ref={noResultsRef}>
        No Results
      </div>
    </>
  );
});
OperatorList.displayName = "OperatorList";
export default OperatorList;

const styles = (theme: Theme) => css`
  margin: ${theme.spacing(3, 3, 0)};
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${theme.spacing(3)};
  list-style: none;

  ${theme.breakpoints.down("mobile")} {
    margin: ${theme.spacing(2, 0, 0)};
    gap: ${theme.spacing(2)};
  }

  li.operator-card {
    width: 100%;
    height: 280px;
    flex-grow: 1;
    display: grid;
    grid-template-areas: "x";
    border-radius: ${theme.spacing(0.5)};
    box-shadow: ${theme.customShadows.baseShadow};
    transition: filter 0.15s ease-in-out;
    will-change: filter;
    contain: content;

    &.no-guide {
      opacity: 0.33;
    }

    &.has-guide {
      cursor: pointer;

      &:hover {
        filter: brightness(110%);
      }
    }

    &.rarity-1-star {
      .rarity-star path {
        fill: ${theme.palette.white.main};
      }
    }

    &.rarity-2-stars {
      .operator-class,
      .rarity-number {
        color: #d3ff77;
      }

      .go-to-guide-link {
        background: linear-gradient(to right, #d3ff77, #a7e855);
      }

      .rarity-star path {
        fill: url(#rarity-2-gradient);
      }

      .operator-card-content .operator-info {
        --gradient-end: #1c1e16;
      }
    }

    &.rarity-3-stars {
      .operator-class,
      .rarity-number {
        color: #7cd8ff;
      }

      .go-to-guide-link {
        background: linear-gradient(to right, #7cd8ff, #49b3ff);
      }

      .rarity-star path {
        fill: url(#rarity-3-gradient);
      }

      .operator-card-content .operator-info {
        --gradient-end: #161b1e;
      }
    }

    &.rarity-4-stars {
      .operator-class,
      .rarity-number {
        color: #d1d0ee;
      }

      .go-to-guide-link {
        background: linear-gradient(to right, #d1d0ee, #9d9bf4);
      }

      .rarity-star path {
        fill: url(#rarity-4-gradient);
      }

      .operator-card-content .operator-info {
        --gradient-end: #1c1921;
      }
    }

    &.rarity-5-stars {
      .operator-class,
      .rarity-number {
        color: #ffe9b0;
      }

      .go-to-guide-link {
        background: linear-gradient(to right, #ffe9b0, #e5c675);
      }

      .rarity-star path {
        fill: url(#rarity-5-gradient);
      }

      .operator-card-content .operator-info {
        --gradient-end: #201d1a;
      }
    }

    &.rarity-6-stars {
      .operator-class,
      .rarity-number {
        color: #ff9254;
      }

      .go-to-guide-link {
        background: linear-gradient(to right, #ff9254, #ede637);
      }

      .rarity-star path {
        fill: url(#rarity-6-gradient);
      }

      .operator-card-content .operator-info {
        --gradient-end: #201916;
      }
    }

    .operator-card-content {
      grid-area: x;
      display: grid;
      position: relative;
      grid-template-areas:
        "subclass dummy"
        "info info"
        "link link";
      grid-template-columns: max-content 1fr;
      grid-template-rows: max-content 1fr min-content;
      overflow: hidden;
      border-radius: ${theme.spacing(0.5)};
      color: ${theme.palette.white.main};

      .dummy-clickable-area:hover ~ a.go-to-guide-link,
      .operator-info:hover ~ a.go-to-guide-link {
        height: 30px;
      }

      .dummy-clickable-area {
        grid-area: dummy;
        position: relative;
        width: calc(100% + ${theme.spacing(1)});
        left: -${theme.spacing(1)};
        height: 100%;
      }

      .operator-info {
        --gradient-end: #1c1c1c;
        grid-area: info;
        align-content: end;
        display: grid;
        grid-template-rows: repeat(2, max-content);
        grid-template-columns: 1fr max-content;
        padding: ${theme.spacing(1.5)};
        row-gap: ${theme.spacing(1)};
        color: ${theme.palette.white.main};
        background: linear-gradient(
          to bottom,
          transparent 40%,
          ${rgba(theme.palette.blackest.main, 0.7)} 67%,
          var(--gradient-end) 100%
        );

        .operator-name,
        .rarity,
        .operator-class {
          text-shadow: 0 ${theme.spacing(0.25)} ${theme.spacing(1)}
            rgba(0, 0, 0, 0.5);
        }

        .operator-name {
          grid-column: span 2;
          display: flex;
          margin: 0;
          flex-direction: column;
          font-size: ${theme.typography.skillTalentHeading.fontSize}px;
          line-height: ${theme.typography.skillTalentHeading.lineHeight};
          font-weight: ${theme.typography.skillTalentHeading.fontWeight};

          .alter-name {
            margin-top: ${theme.spacing(0.75)};
            font-size: ${theme.typography.operatorCardAlterName.fontSize}px;
            font-weight: ${theme.typography.operatorCardAlterName.fontWeight};
            line-height: ${theme.typography.operatorCardAlterName.lineHeight};
            text-transform: ${theme.typography.operatorCardAlterName
              .textTransform};
          }
        }

        .rarity {
          grid-column: 2;
          display: flex;
          align-items: center;
          font-size: ${theme.typography.operatorBrowserNameHeading.fontSize}px;
          font-weight: ${theme.typography.operatorBrowserNameHeading
            .fontWeight};
          line-height: ${theme.typography.operatorBrowserNameHeading
            .lineHeight};

          .rarity-number {
            margin-right: ${theme.spacing(0.25)};
          }

          .rarity-star {
            width: 13px;
            height: 13px;
          }
        }

        .operator-class {
          grid-row: 2;
          font-size: ${theme.typography.body3.fontSize}px;
          line-height: ${theme.typography.body3.lineHeight};
        }
      }

      button.operator-subclass {
        grid-area: subclass;
        padding: ${theme.spacing(0.75)};
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        background-color: ${rgba(theme.palette.dark.main, 0.66)};
        border: none;
        border-bottom-right-radius: ${theme.spacing(1)};
        cursor: pointer;
        transition: background-color 0.15s ease-in-out;
        will-change: background-color;

        &:hover {
          background-color: ${theme.palette.midtoneDarker.main};
        }

        .operator-subclass-icon {
          filter: drop-shadow(
            0 ${theme.spacing(0.25)} ${theme.spacing(1)} rgba(0, 0, 0, 0.5)
          );
          pointer-events: none;
        }
      }

      a.go-to-guide-link {
        grid-area: link;
        width: 100%;
        font-size: ${theme.typography.label2.fontSize}px;
        line-height: ${theme.typography.label2.lineHeight};
        font-weight: ${theme.typography.label2.fontWeight};
        text-transform: uppercase;
        text-align: center;
        color: ${theme.palette.blackest.main};
        background-color: ${theme.palette.white.main};
        transition: height 0.15s ease-in-out;
        height: ${theme.spacing(0.5)};
        will-change: height;

        &:hover,
        &:focus {
          height: ${theme.spacing(3.75)};
        }

        .go-to-guide-text {
          display: inline-block;
          margin-top: ${theme.spacing(0.75)};
        }
      }
    }
  }
`;
