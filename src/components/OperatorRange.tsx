import { css, Theme } from "@emotion/react";
import React from "react";

export interface RangeObject {
  id: string;
  direction: number;
  grids: {
    row: number;
    col: number;
  }[];
}

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
  // for each of rows and cols,
  // find the minimum value and the maximum value
  // then return max-min to get number of rows/cols
  const rowIndices = rangeObject.grids.map((cell) => cell.row);
  const colIndices = rangeObject.grids.map((cell) => cell.col);
  const minRowIndex = Math.min(...rowIndices);
  const maxRowIndex = Math.max(...rowIndices);
  const minColIndex = Math.min(...colIndices);
  const maxColIndex = Math.max(...colIndices);

  // create a 2d-array of size [rows, cols]
  const rows = maxRowIndex - minRowIndex + 1;
  const cols = maxColIndex - minColIndex + 1;
  const grid: GridCell[][] = Array(rows)
    .fill(GridCell.empty)
    .map(() => Array(cols).fill(GridCell.empty));
  rangeObject.grids.forEach((cell) => {
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

export interface OperatorRangeProps {
  rangeObject: RangeObject;
}

const OperatorRange: React.VFC<
  OperatorRangeProps & React.HTMLAttributes<HTMLTableElement>
> = (props) => {
  const { rangeObject, ...rest } = props;
  const { rows, cols, grid } = normalizeRange(rangeObject);

  return (
    <table css={styles} {...rest}>
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
              <td key={colIndex} className={grid[rowIndex][colIndex]}>
                <span className="visually-hidden">{`${grid[rowIndex][colIndex]} cell`}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default OperatorRange;

const styles = (theme: Theme) => css`
  td {
    width: ${theme.spacing(2)};
    height: ${theme.spacing(2)};
    box-sizing: border-box;
  }

  td.active {
    border: 2px solid ${theme.palette.gray};
  }

  td.operator {
    background-color: ${theme.palette.white};
  }
`;
