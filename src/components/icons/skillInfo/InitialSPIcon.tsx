type Props = React.HTMLAttributes<SVGElement> & {
  pathClassName?: string;
};

const InitialSPIcon: React.VFC<Props> = ({ pathClassName, ...rest }) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path d="M2 13V1L12 7L2 13Z" fill="#D6D6E2" className={pathClassName} />
    </svg>
  );
};
export default InitialSPIcon;
