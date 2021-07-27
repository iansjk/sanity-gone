const BlockIcon: React.VFC<React.HTMLAttributes<SVGElement>> = (props) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 11V1H5L7 0L9 1H13V11L7 14L1 11ZM5.36 2.41L7 1.59L8.64 2.41H10.204L2.41 8.905V2.41H5.36ZM11.59 10.11L7 12.41L2.88587 10.3484L11.59 3.095V10.11Z"
          fill="#D6D6E2"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default BlockIcon;
