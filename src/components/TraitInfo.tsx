import React from "react";
import branches from "../../data/branches.json";
import { Theme } from "@mui/material";
import { css } from "@emotion/react";
import { operatorBranchIcon } from "../utils/images";
import Image from "next/image";

interface TraitInfoProps {
  subProfessionId: string;
  showSubclassIcon?: boolean;
}

const TraitInfo: React.FC<TraitInfoProps> = ({
  subProfessionId,
  showSubclassIcon,
}) => {
  const description = branches[subProfessionId as keyof typeof branches]
    .trait as unknown as string;

  return (
    <div
      className={
        showSubclassIcon ? "trait-container" : "trait-container subclass-hidden"
      }
      css={styles}
    >
      {showSubclassIcon && (
        <div className="subclass-icon">
          <Image
            src={operatorBranchIcon(subProfessionId)}
            alt=""
            width={48}
            height={48}
          />
        </div>
      )}

      <div className="trait-info">
        <span className="trait-label">
          Trait<span className="visually-hidden">:</span>
        </span>
        <span
          className="trait-description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
};
export default TraitInfo;

const styles = (theme: Theme) => css`
  &.trait-container {
    margin-top: ${theme.spacing(3)};
    display: flex;
    flex-direction: row;

    ${theme.breakpoints.down("mobile")} {
      margin-top: ${theme.spacing(1)};
    }

    .subclass-icon {
      background-color: ${theme.palette.midtoneDarker.main};
      border-radius: ${theme.spacing(0.5, 0, 0, 0.5)};
      width: 80px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

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
      padding: ${theme.spacing(2)};
      display: flex;
      flex-direction: column;

      .trait-label {
        color: ${theme.palette.gray.main};
        font-size: ${theme.typography.body3.fontSize}px;
        line-height: ${theme.typography.body3.lineHeight};
        margin-bottom: ${theme.spacing(0.75)};
      }

      .trait-description {
        color: ${theme.palette.white.main};
        font-size: ${theme.typography.body1.fontSize}px;
        line-height: ${theme.typography.body1.lineHeight};

        ${theme.breakpoints.down("mobile")} {
          font-size: ${theme.typography.body2.fontSize}px;
          line-height: ${theme.typography.body2.lineHeight};
        }

        .keyword {
          color: ${theme.palette.blue.main};
        }
      }
    }
  }

  &.subclass-hidden {
    .trait-info {
      border-radius: ${theme.spacing(0.5)};
      margin: 0;
    }
  }
`;
