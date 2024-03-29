type Props = React.HTMLAttributes<SVGElement> & {
  pathClassName?: string;
};

const HealthIcon: React.VFC<Props> = ({ pathClassName, ...rest }) => {
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
        d="M6 6V0H8V6H14V8H8V14H6V8H0V6H6Z"
        fill="#D6D6E2"
        className={pathClassName}
      />
    </svg>
  );
};
export default HealthIcon;
