const RomanNumeralOne: React.FC<React.HTMLAttributes<SVGElement>> = (
  props
) => {
  return (
    <svg
      width="4"
      height="16"
      viewBox="0 0 4 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 0H4V16H0V0Z" fill="#D6D6E2" />
    </svg>
  );
};
export default RomanNumeralOne;
