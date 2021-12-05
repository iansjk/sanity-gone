import React, { useEffect } from "react";
import { css, Theme } from "@mui/material";
import ScrollContainer, {
  ScrollContainerProps,
  ScrollEvent,
} from "react-indiana-drag-scroll";

export type HorizontalScrollerProps = React.HTMLAttributes<HTMLDivElement> & {
  scrollContainerProps?: Omit<ScrollContainerProps, "ref" | "innerRef">;
};

const HorizontalScroller: React.FC<HorizontalScrollerProps> = (props) => {
  const { children, scrollContainerProps, ...rest } = props;
  const { onScroll, ...remainingScrollContainerProps } =
    scrollContainerProps ?? {};
  const containerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && containerRef.current) {
      // from https://github.com/mui-org/material-ui/blob/master/packages/mui-utils/src/getScrollbarSize.ts
      const documentWidth = window.document.documentElement.clientWidth;
      const scrollbarWidth = Math.abs(window.innerWidth - documentWidth);
      containerRef.current.style.setProperty(
        "--scrollbar-width",
        `${scrollbarWidth}px`
      );
    }
  }, []);

  const handleScroll = (e: ScrollEvent) => {
    if (containerRef.current && contentRef.current) {
      const containerStyle = containerRef.current.style;
      const contentDiv = contentRef.current;
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
    onScroll && onScroll(e);
  };

  return (
    <div ref={containerRef} css={styles} {...rest}>
      <ScrollContainer
        className="scroller-contents"
        onScroll={handleScroll}
        innerRef={contentRef}
        {...remainingScrollContainerProps}
      >
        {children}
      </ScrollContainer>
    </div>
  );
};
export default HorizontalScroller;

const styles = (theme: Theme) => css`
  --scroll-left: 0px;
  --offset-width: 0px;
  --scroll-width: 999px;
  --scrollbar-width: 0px;
  width: calc(100vw - var(--scrollbar-width));
  box-sizing: border-box;

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

    & > * {
      flex-shrink: 0;
    }
  }
`;
