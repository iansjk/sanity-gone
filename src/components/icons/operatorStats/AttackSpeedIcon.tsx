type Props = React.HTMLAttributes<SVGElement> & {
  pathClassName?: string;
};

const AttackSpeedIcon: React.VFC<Props> = ({ pathClassName, ...rest }) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path d="M9 1H0V2H8L9 1Z" fill="#D6D6E2" className={pathClassName} />
      <path d="M6 4H0V5H5L6 4Z" fill="#D6D6E2" className={pathClassName} />
      <path d="M3 7H0V8H2L3 7Z" fill="#D6D6E2" className={pathClassName} />
      <path
        d="M12 1L0 13V14H1L3 12L4 13H5V12L4 11L13 2L14 0L12 1Z"
        fill="#D6D6E2"
        className={pathClassName}
      />
    </svg>
  );
};
export default AttackSpeedIcon;
