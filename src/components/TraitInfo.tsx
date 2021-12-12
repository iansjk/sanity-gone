import React from "react";
import { CharacterObject } from "../utils/types";
import { Theme } from "@mui/material";
import { css } from "@emotion/react";
import { operatorSubclassIcon } from "../utils/images";
import { subProfessionIdToSubclass } from "../utils/globals";

interface TraitInfoProps {
  characterObject: CharacterObject;
}

const TraitInfo: React.VFC<TraitInfoProps> = ({ characterObject }) => {
  //characterObject.trait;

  return (
    <div className="trait-container" css={styles}>
      <div className="subclass-icon">
        <img
          src={operatorSubclassIcon(characterObject.subProfessionId)}
          alt=""
        />
      </div>
      <div className="trait-info">
        <label>Trait</label>
      </div>
    </div>
  );
};
export default TraitInfo;

const styles = (theme: Theme) => css`
  &.trait-container {
    margin-top: ${theme.spacing(3)};
    height: 85px;
    display: flex;
    flex-direction: row;

    ${theme.breakpoints.down("mobile")} {
      margin-top: ${theme.spacing(1)};
    }

    .subclass-icon {
      background-color: ${theme.palette.midtoneDarker.main};
      border-radius: ${theme.spacing(0.5, 0, 0, 0.5)};
      height: 85px;
      width: 80px;
      margin: auto;
      display: flex;
      flex-direction: row;
      align-items: center;

      img {
        display: block;
        height: 48px;
        width: 48px;
        margin: auto;
      }
    }

    .trait-info {
      background-color: ${theme.palette.midtoneDarker.main};
      border-radius: ${theme.spacing(0, 0.5, 0.5, 0)};
      flex: 1 1 0;
      margin-left: ${theme.spacing(0.25)};
    }
  }
`;
