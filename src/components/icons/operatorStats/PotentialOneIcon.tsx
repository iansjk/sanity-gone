type Props = React.HTMLAttributes<SVGElement> & {
  noPotentialPathClassName?: string;
};

const PotentialOneIcon: React.VFC<Props> = ({
  noPotentialPathClassName,
  ...rest
}) => {
  return (
    <svg
      width="293"
      height="279"
      viewBox="0 0 293 279"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g clipPath="url(#clip0_2515:6236)">
        <path
          d="M157.351 235.772L99.385 57.3711L87.9531 101.041L145.919 279.442L157.351 235.772Z"
          fill="#484858"
          className={noPotentialPathClassName}
        />
        <path
          d="M203.405 29.7782L145.439 208.179L180.357 179.569L238.323 1.16797L203.405 29.7782Z"
          fill="#484858"
          className={noPotentialPathClassName}
        />
        <path
          d="M45.0653 169.36L196.822 59.1016L151.757 61.7239L0 171.982L45.0653 169.36Z"
          fill="#484858"
          className={noPotentialPathClassName}
        />
        <path
          d="M73.5274 42.0493L225.284 152.307L208.864 110.258L57.1074 0L73.5274 42.0493Z"
          fill="#484858"
          className={noPotentialPathClassName}
        />
        <path
          d="M255.213 149.504H67.6309L105.631 173.871H293.213L255.213 149.504Z"
          fill="#E8E8F2"
        />
      </g>
      <defs>
        <clipPath id="clip0_2515:6236">
          <rect width="293" height="279" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default PotentialOneIcon;
