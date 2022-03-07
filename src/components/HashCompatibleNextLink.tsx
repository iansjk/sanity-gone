import React from "react";
import Link, { LinkProps as NextLinkProps } from "next/link";

const HashCompatibleNextLink: React.FC<NextLinkProps> = (props) => {
  const { href, children, ...rest } = props;
  const currentPathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  const [path, _hash] = href.toString().split("#");
  return path === currentPathname ? (
    React.cloneElement(children as React.ReactElement<HTMLAnchorElement>, {
      href: href.toString(),
    })
  ) : (
    <Link href={href.toString()} {...rest}>
      {children}
    </Link>
  );
};
export default HashCompatibleNextLink;
