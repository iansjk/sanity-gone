import React from "react";
import { css } from "@emotion/react";
import { Theme } from "@mui/material";

import { RangeObject } from "../utils/types";

enum GridCell {
  Operator = "operator",
  Empty = "empty",
  Active = "active",
  Added = "added",
}

interface NormalizedRange {
  rows: number;
  cols: number;
  grid: GridCell[][];
}

const normalizeRange = (
  rangeObject: RangeObject,
  forwardExtend?: number
): NormalizedRange => {
  const rangeGrids = [...rangeObject.grids, { row: 0, col: 0 }];
  // for each of rows and cols,
  // find the minimum value and the maximum value
  // then return max-min to get number of rows/cols
  const rowIndices = rangeGrids.map((cell) => cell.row);
  const colIndices = rangeGrids.map((cell) => cell.col);
  const minRowIndex = Math.min(...rowIndices);
  const maxRowIndex = Math.max(...rowIndices);
  const minColIndex = Math.min(...colIndices);
  const maxColIndex = Math.max(...colIndices);

  // create a 2d-array of size [rows, cols]
  const rows = maxRowIndex - minRowIndex + 1;
  const cols = maxColIndex - minColIndex + 1 + (forwardExtend ?? 0);
  const grid = Array<GridCell>(rows)
    .fill(GridCell.Empty)
    .map(() => Array<GridCell>(cols).fill(GridCell.Empty));
  rangeGrids.forEach((cell) => {
    const type =
      cell.row === 0 && cell.col === 0 ? GridCell.Operator : GridCell.Active;
    grid[cell.row - minRowIndex][cell.col - minColIndex] = type;
  });
  if (forwardExtend) {
    for (let c = cols - 1; c >= 0; c--) {
      if (grid.every((r) => r[c] !== GridCell.Empty)) {
        grid.forEach((row) =>
          row.splice(c + 1, 0, ...Array(forwardExtend).fill(GridCell.Added))
        );
        break;
      }
    }
  }
  return {
    rows,
    cols,
    grid,
  };
};

export interface CharacterRangeProps {
  rangeObject: RangeObject;
  forwardExtend?: number;
}

const CharacterRange: React.VFC<
  CharacterRangeProps & React.HTMLAttributes<HTMLTableElement>
> = (props) => {
  const { rangeObject, forwardExtend, ...rest } = props;
  const { rows, cols, grid } = normalizeRange(rangeObject, forwardExtend);

  return (
    <table css={styles} {...rest}>
      <thead>
        <tr>
          <th></th>
          {[...Array(cols).keys()].map((i) => (
            <th key={i} scope="col" className="visually-hidden">
              {`Y${i + 1}`}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(rows).keys()].map((rowIndex) => (
          <tr key={rowIndex}>
            <th scope="row" className="visually-hidden">
              {`X${rowIndex + 1}`}
            </th>
            {[...Array(cols).keys()].map((colIndex) => (
              <td key={colIndex} className={grid[rowIndex][colIndex]}>
                <span className="visually-hidden">
                  {`${grid[rowIndex][colIndex]} cell`}
                </span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default CharacterRange;

const styles = (theme: Theme) => css`
  flex-shrink: 0;

  td {
    width: ${theme.spacing(2)};
    height: ${theme.spacing(2)};
    box-sizing: border-box;

    ${theme.breakpoints.down("mobile")} {
      width: ${theme.spacing(1.5)};
      height: ${theme.spacing(1.5)};
    }
  }

  td.active {
    border: 2px solid ${theme.palette.gray.main};
  }

  td.operator {
    background-color: ${theme.palette.white.main};
  }

  td.added {
    border: 2px solid ${theme.palette.blue.main};
  }
`;
