type Props = React.HTMLAttributes<SVGElement> & {
  pathClassName?: string;
};

const SPCostIcon: React.VFC<Props> = ({ pathClassName, ...rest }) => {
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
        d="M1 8.4L8.5 0L7.3 5.6H13L5.5 14L6.7 8.4H1Z"
        fill="#D6D6E2"
        className={pathClassName}
      />
    </svg>
  );
};
export default SPCostIcon;
