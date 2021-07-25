const DefenseIcon: React.VFC<React.HTMLAttributes<SVGElement>> = (props) => {
  return (
    <svg
      width="8"
      height="10"
      viewBox="0 0 8 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.66667 0.714286H0V7.14286L4 10L8 7.14286V0.714286H5.33333L4 0L2.66667 0.714286Z"
        fill="#E3E1EF"
      />
    </svg>
  );
};
export default DefenseIcon;
