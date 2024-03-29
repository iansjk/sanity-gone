type Props = React.HTMLAttributes<SVGElement> & {
  pathClassName?: string;
};

const DPCostIcon: React.VFC<Props> = ({ pathClassName, ...rest }) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 0L0 7L7 14L14 7L7 0ZM3 7L7 3L8 4L5 7L8 10L7 11L3 7Z"
        fill="#D6D6E2"
        className={pathClassName}
      />
    </svg>
  );
};
export default DPCostIcon;
