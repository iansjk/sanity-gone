import { css, Theme } from "@mui/material";
import React from "react";

export type HorizontalScrollerProps = React.HTMLAttributes<HTMLDivElement>;

const HorizontalScroller: React.FC<HorizontalScrollerProps> = (props) => {
  const { children, ...rest } = props;
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const containerStyle = containerRef.current.style;
      const contentDiv = e.target as HTMLDivElement;
      containerStyle.setProperty(
        "--scroll-left",
        `${Math.round(contentDiv.scrollLeft)}px`
      );
      if (!containerStyle.getPropertyValue("--scroll-width")) {
        containerStyle.setProperty(
          "--scroll-width",
          `${contentDiv.scrollWidth}px`
        );
      }
      if (!containerStyle.getPropertyValue("--offset-width")) {
        containerStyle.setProperty(
          "--offset-width",
          `${contentDiv.offsetWidth}px`
        );
      }
    }
  };

  return (
    <div ref={containerRef} css={styles} {...rest}>
      <div className="scroller-contents" onScroll={handleScroll}>
        {children}
      </div>
    </div>
  );
};
export default HorizontalScroller;

const styles = (theme: Theme) => css`
  width: 100vw;
  position: relative;
  --scroll-left: 0px;
  --offset-width: 0px;
  --scroll-width: 999px;

  .scroller-contents {
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: auto;

    mask-image: linear-gradient(
      to right,
      transparent,
      #000 clamp(0px, var(--scroll-left), ${theme.spacing(3)}),
      #000
        calc(
          100% -
            clamp(
              0px,
              calc(
                var(--scroll-width) - var(--offset-width) - var(--scroll-left)
              ),
              ${theme.spacing(3)}
            )
        ),
      transparent
    );

    /* Hide scrollbars */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      /* Webkit */
      display: none;
    }

    & > * {
      flex-shrink: 0;
    }
  }
`;
