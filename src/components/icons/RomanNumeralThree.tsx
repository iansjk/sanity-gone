const RomanNumeralThree: React.VFC<React.HTMLAttributes<SVGElement>> = (
  props
) => {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M8 0H12V16H8V0Z" fill="#D6D6E2" />
      <path d="M16 0H20V16H16V0Z" fill="#D6D6E2" />
      <path d="M0 0H4V16H0V0Z" fill="#D6D6E2" />
    </svg>
  );
};
export default RomanNumeralThree;
