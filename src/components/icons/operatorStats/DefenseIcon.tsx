const DefenseIcon: React.FC<React.HTMLAttributes<SVGElement>> = (props) => {
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
        d="M1 1V11L7 14L13 11V1H9L7 0L5 1H1Z"
        fill="#D6D6E2"
      />
    </svg>
  );
};
export default DefenseIcon;
