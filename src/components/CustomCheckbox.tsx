import { css } from "@emotion/react";
import { Theme } from "@mui/material";

export interface CustomCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const CustomCheckbox: React.VFC<CustomCheckboxProps> = (props) => {
  const { label, disabled, ...rest } = props;
  return (
    <label className={disabled ? "disabled" : ""} css={styles}>
      <div className="checkbox-input">
        <input type="checkbox" {...{ disabled, ...rest }} />
        <span className="checkbox-control" aria-hidden="true" />
      </div>
      {label}
    </label>
  );
};
export default CustomCheckbox;

const styles = (theme: Theme) => css`
  display: inline-grid;
  grid-auto-flow: column;
  column-gap: ${theme.spacing(1)};
  align-items: center;

  &.disabled {
    opacity: 0.3;
  }

  &:not(.disabled) {
    cursor: pointer;
    .checkbox-input > input {
      cursor: pointer;
    }
  }

  .checkbox-input {
    display: grid;
    grid-template-columns: 20px;
    grid-template-rows: 20px;
    align-items: center;
    justify-items: center;

    & > input {
      opacity: 0;
      width: 20px;
      height: 20px;
    }

    & > * {
      grid-row: 1;
      grid-column: 1;
    }

    .checkbox-control {
      width: 14px;
      height: 14px;
      padding: 2px;
      background-clip: content-box;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid ${theme.palette.white.main};
      border-radius: ${theme.spacing(0.5)};
    }

    input:checked + .checkbox-control {
      border-color: ${theme.palette.blue.main};
      background-color: ${theme.palette.blue.main};
    }

    input:focus-visible + .checkbox-control {
      box-shadow: 0 0 0 0.05em #fff, 0 0 0.15em 0.1em ${theme.palette.blue.main};
    }
  }
`;
