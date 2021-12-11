const StarIcon: React.VFC<React.HTMLAttributes<SVGElement>> = (props) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="rarity-6-gradient">
          <stop offset="0%" stopColor="#ff9254" />
          <stop offset="100%" stopColor="#ede637" />
        </linearGradient>
        <linearGradient id="rarity-5-gradient">
          <stop offset="0%" stopColor="#ffe9b0" />
          <stop offset="100%" stopColor="#e5c675" />
        </linearGradient>
        <linearGradient id="rarity-4-gradient">
          <stop offset="0%" stopColor="#d1d0ee" />
          <stop offset="100%" stopColor="#9d9bf4" />
        </linearGradient>
        <linearGradient id="rarity-3-gradient">
          <stop offset="0%" stopColor="#7cd8ff" />
          <stop offset="100%" stopColor="#49b3ff" />
        </linearGradient>
        <linearGradient id="rarity-2-gradient">
          <stop offset="0%" stopColor="#d3ff77" />
          <stop offset="100%" stopColor="#a7e855" />
        </linearGradient>
      </defs>
      <path
        d="M2.46387 14L4.20979 8.64904L0 5.73798H5.15618L7 0L8.87646 5.73798H14L9.79021 8.64904L11.5688 14L7 10.5841L2.46387 14Z"
        fill="#1B1B22"
      />
    </svg>
  );
};
export default StarIcon;
