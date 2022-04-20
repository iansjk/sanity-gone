const CloseIcon: React.VFC<React.HTMLAttributes<SVGElement>> = (props) => {
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
        d="M1 13L13 1M13 13L1 1"
        stroke="#E8E8F2"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
export default CloseIcon;
