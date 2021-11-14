const LogoBackground: React.VFC<React.HTMLAttributes<SVGElement>> = (props) => {
  return (
    <svg
      width="376"
      height="88"
      viewBox="0 0 376 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M376 0V68H270.544C245.819 80.7814 217.753 88 188 88C158.247 88 130.181 80.7814 105.456 68H0V0H376Z"
        fill="#101014"
        fillOpacity="0.2"
      />
      <path
        d="M376 0V68H270.544C245.819 80.7814 217.753 88 188 88C158.247 88 130.181 80.7814 105.456 68H0V0H376Z"
        fill="url(#paint0_linear_2639_7374)"
        fillOpacity="0.33"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2639_7374"
          x1="188"
          y1="0"
          x2="188"
          y2="88"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.553358" stopOpacity="0" />
          <stop offset="0.772808" />
        </linearGradient>
      </defs>
    </svg>
  );
};
export default LogoBackground;
