import React from "react";
// import { css } from "@emotion/react";
// import { Theme } from "@mui/material";
import * as classes from "./styles.css";

import { RangeObject } from "../../utils/types";

enum GridCell {
  Operator = "operator",
  empty = "empty",
  active = "active",
}

interface NormalizedRange {
  rows: number;
  cols: number;
  grid: GridCell[][];
}

const normalizeRange = (rangeObject: RangeObject): NormalizedRange => {
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
  const cols = maxColIndex - minColIndex + 1;
  const grid = Array<GridCell>(rows)
    .fill(GridCell.empty)
    .map(() => Array<GridCell>(cols).fill(GridCell.empty));
  rangeGrids.forEach((cell) => {
    const type =
      cell.row === 0 && cell.col === 0 ? GridCell.Operator : GridCell.active;
    grid[cell.row - minRowIndex][cell.col - minColIndex] = type;
  });
  return {
    rows,
    cols,
    grid,
  };
};

export interface CharacterRangeProps {
  rangeObject: RangeObject;
}

const CharacterRange: React.VFC<
  CharacterRangeProps & React.HTMLAttributes<HTMLTableElement>
> = (props) => {
  const { rangeObject, ...rest } = props;
  const { rows, cols, grid } = normalizeRange(rangeObject);

  return (
    <table className={classes.RangeTable} {...rest}>
      <thead>
        <tr>
          <th></th>
          {[...Array(cols).keys()].map((i) => (
            <th key={i} scope="col" className="visually-hidden">{`Y${
              i + 1
            }`}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(rows).keys()].map((rowIndex) => (
          <tr key={rowIndex}>
            <th scope="row" className="visually-hidden">{`X${
              rowIndex + 1
            }`}</th>
            {[...Array(cols).keys()].map((colIndex) => (
              <td
                key={colIndex}
                className={`${classes.RangeRow} ${grid[rowIndex][colIndex]}`}
              >
                <span className="visually-hidden">{`${grid[rowIndex][colIndex]} cell`}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default CharacterRange;
