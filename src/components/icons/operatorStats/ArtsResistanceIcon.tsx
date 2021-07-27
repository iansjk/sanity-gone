const ArtsResistanceIcon: React.VFC<React.HTMLAttributes<SVGElement>> = (
  props
) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 14L0 7L7 0L14 7L7 14ZM2 7L7 12L12 7L7 2L2 7Z"
        fill="#D6D6E2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.5 7L7 3.5L10.5 7L7 10.5L3.5 7ZM7 8.5L5.5 7L7 5.5L8.5 7L7 8.5Z"
        fill="#D6D6E2"
      />
    </svg>
  );
};
export default ArtsResistanceIcon;
