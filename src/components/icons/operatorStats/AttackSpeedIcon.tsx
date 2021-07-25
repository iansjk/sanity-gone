const AttackSpeedIcon: React.VFC<React.HTMLAttributes<SVGElement>> = (
  props
) => {
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
        d="M6.42857 0.714286H0V1.42857H5.71429L6.42857 0.714286Z"
        fill="#E3E1EF"
      />
      <path
        d="M4.28571 2.85714H0V3.57143H3.57143L4.28571 2.85714Z"
        fill="#E3E1EF"
      />
      <path d="M2.14286 5H0V5.71429H1.42857L2.14286 5Z" fill="#E3E1EF" />
      <path
        d="M8.57143 0.714286L0 9.28571V10H0.714286L2.14286 8.57143L2.85714 9.28571H3.57143V8.57143L2.85714 7.85714L9.28571 1.42857L10 0L8.57143 0.714286Z"
        fill="#E3E1EF"
      />
    </svg>
  );
};
export default AttackSpeedIcon;
