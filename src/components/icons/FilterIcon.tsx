const FilterIcon: React.FC<React.HTMLAttributes<SVGElement>> = (props) => {
  return (
    <svg
      width="14"
      height="11"
      viewBox="0 0 14 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 0.5H14V2.5H0V0.5Z" fill="#49B3FF" />
      <path d="M7 4.5H0V6.5H7V4.5Z" fill="#49B3FF" />
      <path d="M0 10.5V8.5H3.5V10.5H0Z" fill="#49B3FF" />
    </svg>
  );
};
export default FilterIcon;
