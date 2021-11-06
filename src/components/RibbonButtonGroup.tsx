import {
  styled,
  ButtonGroup,
  ButtonGroupProps,
  buttonGroupClasses,
} from "@mui/material";

const RibbonButtonGroup = styled((props: ButtonGroupProps) => (
  <ButtonGroup {...props} variant="text" />
))(({ theme }) => ({
  [`.${buttonGroupClasses.grouped}`]: {
    ":first-of-type": {
      borderTopLeftRadius: theme.spacing(0.5),
    },
    ":not(:last-of-type)": {
      borderRight: 0,
      borderColor: "inherit",
    },
    [`${theme.breakpoints.down("mobile")}`]: {
      ":not(:first-of-type)": {
        borderTopLeftRadius: "inherit",
      },
      ":not(:last-of-type)": {
        borderTopRightRadius: "inherit",
      },
    },
  },
}));
export default RibbonButtonGroup;
