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
      <path
        d="M2.46387 14L4.20979 8.64904L0 5.73798H5.15618L7 0L8.87646 5.73798H14L9.79021 8.64904L11.5688 14L7 10.5841L2.46387 14Z"
        fill="#1B1B22"
      />
    </svg>
  );
};
export default StarIcon;
