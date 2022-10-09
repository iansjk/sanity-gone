type Props = React.HTMLAttributes<SVGElement> & {
  pathClassName?: string;
};

const RomanNumeralTwo: React.VFC<Props> = ({ pathClassName, ...rest }) => {
  return (
    <svg
      width="12"
      height="16"
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path d="M0 0H4V16H0V0Z" fill="#D6D6E2" className={pathClassName} />
      <path d="M8 0H12V16H8V0Z" fill="#D6D6E2" className={pathClassName} />
    </svg>
  );
};
export default RomanNumeralTwo;
