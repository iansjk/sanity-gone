const HealthIcon: React.VFC<React.HTMLAttributes<SVGElement>> = (props) => {
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
        d="M4.28571 4.28571V0H5.71429V4.28571H10V5.71429H5.71429V10H4.28571V5.71429H0V4.28571H4.28571Z"
        fill="#E3E1EF"
      />
    </svg>
  );
};
export default HealthIcon;
