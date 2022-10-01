import React, { useEffect, useMemo, useRef } from "react";
import { Box, Tooltip } from "@mui/material";
import cx from "clsx";

import {
  professionToClass,
  subProfessionIdToSubclass,
} from "../../utils/globals";
import StarIcon from "../icons/StarIcon";
import Image from "next/image";
import Link from "next/link";
import { operatorBranchIcon } from "../../utils/images";
import * as classes from "./styles.css";

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
      .querySelectorAll<HTMLLIElement>("." + classes.operatorCardBase)
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
      const rarityClass = `rarity${op.rarity + 1}Star${
        op.rarity > 0 ? "s" : ""
      }` as keyof typeof classes.rarities;

      const operatorInfo = (
        <>
          <h3 className={classes.operatorName}>
            {alterName ? (
              <>
                <span className="base-name">{charName}</span>
                <span className="visually-hidden">&nbsp;the&nbsp;</span>
                <span className={classes.alterName}>{alterName}</span>
              </>
            ) : (
              op.name
            )}
          </h3>
          <div className={classes.rarity}>
            <span className="visually-hidden">Rarity:&nbsp;</span>
            <span className={classes.rarityNumber}>{op.rarity + 1}</span>{" "}
            <StarIcon
              aria-hidden="true"
              className={classes.rairtyStar}
              aria-label="stars"
            />
          </div>
          <div className={classes.operatorClass}>
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
            hasGuide
              ? classes.operatorCard["hasGuide"]
              : classes.operatorCard["noGuide"],
            classes.rarities[rarityClass]
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
          <div className={classes.operatorCardContent}>
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
                <a
                  className={classes.operatorInfo}
                  role="presentation"
                  tabIndex={-1}
                >
                  {operatorInfo}
                </a>
              </Link>
            ) : (
              <div className={classes.operatorInfo}>{operatorInfo}</div>
            )}
            <Tooltip title={subclass}>
              <button
                aria-label={`Filter list by ${subclass}`}
                className={classes.operatorSubclass}
                onClick={() =>
                  onSubclassFilter(op.profession, op.subProfessionId)
                }
              >
                <Image
                  width={32}
                  height={32}
                  className={classes.operatorSubclassIcon}
                  src={operatorBranchIcon(op.subProfessionId)}
                  alt={""}
                />
              </button>
            </Tooltip>
            {/* TODO "NEW" should go here */}
            {hasGuide ? (
              <Link href={`/operators/${url}`}>
                <a className={classes.goToGuideLink}>
                  <span className={classes.goToGuideLinkText}>
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
      <ul className={classes.operatorList} ref={operatorListRef}>
        {operatorListChildren}
      </ul>
      <div className={classes.noResults} ref={noResultsRef}>
        No Results
      </div>
    </>
  );
});
OperatorList.displayName = "OperatorList";
export default OperatorList;
