/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface RangeObject {
  id: string;
  direction: number;
  grids: {
    row: number;
    col: number;
  }[];
}

enum GridCell {
  Operator = "O",
  empty = ".",
  active = "x",
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

const OperatorRange: React.VFC<OperatorRangeProps> = ({ rangeObject }) => {
  const { rows, cols, grid } = normalizeRange(rangeObject);

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {[...Array(cols).keys()].map((i) => (
            <th key={i} scope="col">{`Y${i + 1}`}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(rows).keys()].map((rowIndex) => (
          <tr key={rowIndex}>
            <th scope="row">{`X${rowIndex + 1}`}</th>
            {[...Array(cols).keys()].map((colIndex) => (
              <td key={colIndex}>{grid[rowIndex][colIndex]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default OperatorRange;
