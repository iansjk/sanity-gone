const BlockIcon: React.VFC<React.HTMLAttributes<SVGElement>> = (props) => {
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1 0.714286H2.66667L4 0L5.33333 0.714286H7H8V1.71429V7.14286L4 10L0 7.14286V1.71429V0.714286H1ZM3.13889 1.59577L4 1.13446L4.86111 1.59577L5.08235 1.71429H5.33333H6.02629L1 6.32172V1.71429H2.66667H2.91765L3.13889 1.59577ZM1.64382 7.08811L4 8.7711L7 6.62824V2.17828L1.64382 7.08811Z"
        fill="#E3E1EF"
      />
    </svg>
  );
};
export default BlockIcon;
