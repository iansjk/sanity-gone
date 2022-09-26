const CloseIcon: React.FC<React.HTMLAttributes<SVGElement>> = (props) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 34L34 2M34 34L2 2"
        stroke="#4D4D5B"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};
export default CloseIcon;
