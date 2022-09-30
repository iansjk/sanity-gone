import * as classes from "./styles.css";

export interface CustomCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const CustomCheckbox: React.VFC<CustomCheckboxProps> = (props) => {
  const { label, disabled, className, ...rest } = props;
  return (
    <label
      className={`${className ?? ""} ${
        disabled ? classes.label.disabled : classes.label.enabled
      }`}
    >
      <div className={classes.checkboxContainer}>
        <input
          type="checkbox"
          className={classes.checkboxInput}
          {...{ disabled, ...rest }}
        />
        <span className={classes.checkboxControl} aria-hidden="true" />
      </div>
      {label}
    </label>
  );
};
export default CustomCheckbox;
