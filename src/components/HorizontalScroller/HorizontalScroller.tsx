import React, { useEffect, useRef } from "react";
import ScrollContainer, {
  ScrollContainerProps,
  ScrollEvent,
} from "react-indiana-drag-scroll";
import cx from "clsx";

import * as classes from "./styles.css";

export type HorizontalScrollerProps = React.HTMLAttributes<HTMLDivElement> & {
  scrollerClassName?: string;
  scrollContainerProps?: Omit<ScrollContainerProps, "ref" | "innerRef">;
};

const HorizontalScroller: React.FC<HorizontalScrollerProps> = (props) => {
  const {
    children,
    scrollContainerProps,
    scrollerClassName,
    className,
    ...rest
  } = props;
  const { onScroll, ...remainingScrollContainerProps } =
    scrollContainerProps ?? {};
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);

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
    <div ref={containerRef} className={cx(classes.root, className)} {...rest}>
      <ScrollContainer
        className={cx(classes.scrollerContents, scrollerClassName)}
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
