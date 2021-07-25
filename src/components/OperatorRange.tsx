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

interface OperatorRangeProps {
  rangeObject: RangeObject;
}

const tableSize = (
  rangeObject: RangeObject
): { rows: number; cols: number } => {
  // for each of rows and cols,
  // find the minimum value and the maximum value
  // then return max-min to get number of rows/cols
  const rowIndices = rangeObject.grids.map((cell) => cell.row);
  const colIndices = rangeObject.grids.map((cell) => cell.col);
  const minRowIndex = Math.min(...rowIndices);
  const maxRowIndex = Math.max(...rowIndices);
  const minColIndex = Math.min(...colIndices);
  const maxColIndex = Math.max(...colIndices);
  return { rows: maxRowIndex - minRowIndex, cols: maxColIndex - minColIndex };
};

const OperatorRange: React.VFC<OperatorRangeProps> = ({ rangeObject }) => {
  const { rows, cols } = tableSize(rangeObject);

  return (
    <table>
      <thead>
        <tr>
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
              <td key={colIndex}></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default OperatorRange;
