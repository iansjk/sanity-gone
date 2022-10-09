type Props = React.HTMLAttributes<SVGElement> & {
  pathClassName?: string;
};

const AttackPowerIcon: React.VFC<Props> = ({ pathClassName, ...rest }) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M2 1L0 0L1 2L6 7L3 10L2 9H1V10L2 11L0 13V14H1L3 12L4 13H5V12L4 11L7 8L10 11L9 12V13H10L11 12L13 14H14V13L12 11L13 10V9H12L11 10L8 7L13 2L14 0L12 1L7 6L2 1Z"
        fill="#D6D6E2"
        className={pathClassName}
      />
    </svg>
  );
};
export default AttackPowerIcon;
