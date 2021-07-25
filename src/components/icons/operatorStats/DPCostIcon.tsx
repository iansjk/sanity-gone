const DPCostIcon: React.VFC<React.HTMLAttributes<SVGElement>> = (props) => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 10L0 5L5 0L10 5L5 10ZM8.58579 5L5 1.41421L1.41421 5L5 8.58579L8.58579 5Z"
        fill="#E3E1EF"
      />
    </svg>
  );
};
export default DPCostIcon;
