import { css } from "@emotion/react";
import {
  Input,
  InputProps,
  SliderUnstyled,
  SliderUnstyledProps,
  Theme,
} from "@mui/material";

export interface SliderWithInputProps {
  label: string;
  identifier: string; // ensure there is a unique identifier
  inputProps?: InputProps;
  sliderProps?: SliderUnstyledProps;
}

const SliderWithInput: React.VFC<SliderWithInputProps> = (props) => {
  const { label, inputProps, sliderProps, identifier, ...rest } = props;

  return (
    <div className="slider-container" css={styles} {...rest}>
      <label htmlFor={`slider-input-${identifier}`}>{label}</label>
      <Input
        id={`slider-input-${identifier}`}
        className="slider-input"
        {...inputProps}
      />
      <div className="slider-border">
        <SliderUnstyled
          aria-label={`${identifier} slider`}
          className="slider"
          {...sliderProps}
        />
      </div>
    </div>
  );
};
export default SliderWithInput;

const styles = (theme: Theme) => css`
  display: flex;
  flex-direction: row;
  height: ${theme.spacing(8)};

  label {
    margin-top: auto;
    margin-bottom: auto;
  }

  .slider-input {
    input {
      text-align: center;
      min-width: ${theme.spacing(3)};
      font-size: ${theme.typography.navigationLink.fontSize}px;
      line-height: ${theme.typography.navigationLink.lineHeight};
    }

    background: ${theme.palette.midtoneDarker.main};
    width: ${theme.spacing(5)};
    height: ${theme.spacing(4)};
    margin: ${theme.spacing(2, 1)};
    color: ${theme.palette.white.main};
    border-radius: ${theme.spacing(0.5)};
    padding: ${theme.spacing(0.5, 1)};
  }

  .slider-border {
    width: ${theme.spacing(32)};
    height: ${theme.spacing(3)};
    margin: auto 0;
    padding: ${theme.spacing(0.5, 2.25)};
    border-radius: ${theme.spacing(0.5)};
    border: 1px solid ${theme.palette.midtoneBrighterer.main};

    ${theme.breakpoints.down("mobile")} {
      flex-grow: 1;
      width: 100%;
      margin-right: ${theme.spacing(2)};
    }

    .slider {
      display: inline-block;
      width: ${theme.spacing(32)};
      height: ${theme.spacing(3)};
      position: relative;
      cursor: pointer;

      ${theme.breakpoints.down("mobile")} {
        flex-grow: 1;
        width: 100%;
      }

      .MuiSlider-track {
        display: block;
        position: absolute;
        height: ${theme.spacing(3)};
        margin-left: ${theme.spacing(-1.75)};
        border-radius: ${theme.spacing(0.25)};
        background: ${theme.palette.midtoneBrighter.main};
      }

      .MuiSlider-rail {
        display: block;
        position: absolute;
        width: 100%;
        padding-right: ${theme.spacing(1.75)};
        height: ${theme.spacing(3)};
      }

      .MuiSlider-thumb {
        position: absolute;
        display: grid;
        margin-left: ${theme.spacing(-1.75)};
        margin-top: ${theme.spacing(0)};
        border-radius: ${theme.spacing(0.25)};
        height: ${theme.spacing(3)};
        width: ${theme.spacing(3.5)};
        background-attachment: fixed;
        background: url("data:image/svg+xml,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.5 0.5C0.776143 0.5 1 0.723858 1 1L1 10C1 10.2761 0.776142 10.5 0.5 10.5C0.223858 10.5 -1.20705e-08 10.2761 0 10L3.93396e-07 1C4.05467e-07 0.723858 0.223858 0.5 0.5 0.5Z' fill='%23484858'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.5 0.5C5.77614 0.5 6 0.723858 6 1L6 10C6 10.2761 5.77614 10.5 5.5 10.5C5.22386 10.5 5 10.2761 5 10L5 1C5 0.723858 5.22386 0.5 5.5 0.5Z' fill='%23484858'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.5 0.5C10.7761 0.5 11 0.723858 11 1V10C11 10.2761 10.7761 10.5 10.5 10.5C10.2239 10.5 10 10.2761 10 10V1C10 0.723858 10.2239 0.5 10.5 0.5Z' fill='%23484858'/%3E%3C/svg%3E%0A")
          no-repeat center ${theme.palette.gray.main};

        &.Mui-focusVisible {
          box-shadow: 0 0 0 0.05em #fff,
            0 0 0.15em 0.1em ${theme.palette.blue.main};
        }
      }

      &:hover .MuiSlider-thumb {
        background: url("data:image/svg+xml,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.5 0.5C0.776143 0.5 1 0.723858 1 1L1 10C1 10.2761 0.776142 10.5 0.5 10.5C0.223858 10.5 -1.20705e-08 10.2761 0 10L3.93396e-07 1C4.05467e-07 0.723858 0.223858 0.5 0.5 0.5Z' fill='%2387879B'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.5 0.5C5.77614 0.5 6 0.723858 6 1L6 10C6 10.2761 5.77614 10.5 5.5 10.5C5.22386 10.5 5 10.2761 5 10L5 1C5 0.723858 5.22386 0.5 5.5 0.5Z' fill='%2387879B'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.5 0.5C10.7761 0.5 11 0.723858 11 1V10C11 10.2761 10.7761 10.5 10.5 10.5C10.2239 10.5 10 10.2761 10 10V1C10 0.723858 10.2239 0.5 10.5 0.5Z' fill='%2387879B'/%3E%3C/svg%3E%0A")
          no-repeat center ${theme.palette.white.main};
      }
    }
  }
`;
