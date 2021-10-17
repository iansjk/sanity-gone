import React, { Fragment, useState } from "react";
import { Theme, css } from "@emotion/react";
import { transparentize } from "polished";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import useIsMobile from "../hooks/useIsMobile";

export type TabButtonsProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onClick"
> &
  Partial<{
    activeTab: number;
    onClick: (index: number) => void;
    isSwiper: boolean;
  }>;

const TabButtons: React.FC<TabButtonsProps> = (props) => {
  const { activeTab, onClick, isSwiper, children, ...rest } = props;
  const [swiper, setSwiper] = useState<any | null>(null);
  const isMobile = useIsMobile();

  const buttonChildren = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement<React.HTMLAttributes<HTMLButtonElement>>(child) &&
      child.type === "button"
  ) as React.ReactElement<React.HTMLAttributes<HTMLButtonElement>, "button">[];
  const numTabs = buttonChildren.length;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const currentTab = +button.getAttribute("data-index")!;
    if (!Number.isNaN(currentTab)) {
      let tabToFocus = currentTab;
      switch (e.key) {
        case "Down":
        case "ArrowDown":
        case "Right":
        case "ArrowRight":
          // next tab, wrapping if necessary
          tabToFocus = (currentTab + 1) % numTabs;
          e.preventDefault();
          break;
        case "Up":
        case "ArrowUp":
        case "Left":
        case "ArrowLeft":
          // previous tab, wrapping if necessary
          // (need to add numTabs first to avoid negative numbers)
          tabToFocus = (currentTab + numTabs - 1) % numTabs;
          e.preventDefault();
          break;
      }
      (e.target as HTMLButtonElement)
        .closest('[role="tablist"]')
        ?.querySelectorAll("button")
        [tabToFocus].focus();
    }
  };

  let buttonIndex = 0;
  const newChildren = [];
  const childrenAsArray = React.Children.toArray(children);
  for (let i = 0; i < childrenAsArray.length; i++) {
    const child = childrenAsArray[i];
    if (
      React.isValidElement<React.HTMLAttributes<HTMLButtonElement>>(child) &&
      child.type === "button"
    ) {
      const isActiveTab = buttonIndex === activeTab;
      const className = isActiveTab ? "active" : "inactive";
      newChildren.push(
        React.cloneElement<
          React.HTMLAttributes<HTMLButtonElement> & { "data-index"?: number }
        >(child, {
          ...child.props,
          role: "tab",
          className: child.props.className
            ? `${child.props.className} ${className}`
            : className,
          onClick: ((noClosureIndex) => () => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onClick!(noClosureIndex);
            if (isSwiper) {
              console.log(`calling swiper.slideTo(${noClosureIndex})`);
              console.log(swiper);
              swiper?.slideTo(noClosureIndex);
            }
          })(buttonIndex),
          onKeyDown: handleKeyDown,
          tabIndex: isActiveTab ? 0 : -1,
          "data-index": buttonIndex,
          "aria-selected": isActiveTab,
        })
      );
      buttonIndex++;
    } else {
      newChildren.push(child);
    }
  }

  return (
    <Fragment>
      {isSwiper && (
        <Swiper
          role="tablist"
          onSwiper={(swiper) => {
            setSwiper(swiper);
            swiper.slideTo(activeTab!);
            swiper.update();
          }}
          centeredSlides
          slidesPerView="auto"
          freeMode
          freeModeSticky
          grabCursor
          touchRatio={0.5}
          observer
          onActiveIndexChange={() => {
            newChildren[swiper.activeIndex].props.onClick();
          }}
          css={swiperStyles}
          hidden={!isMobile}
        >
          {newChildren.map((child, i) => (
            <SwiperSlide key={i}>{child}</SwiperSlide>
          ))}
        </Swiper>
      )}
      <div
        role="tablist"
        {...rest}
        {...(isSwiper && isMobile ? { style: { display: "none" } } : {})}
      >
        {newChildren}
      </div>
    </Fragment>
  );
};
export default TabButtons;

const swiperStyles = (theme: Theme) => css`
  background-color: ${transparentize(0.34, theme.palette.dark)};
  backdrop-filter: blur(${theme.spacing(1)});

  &.swiper-container {
    margin: 0;
    width: 100%;
  }

  .swiper-slide {
    box-sizing: border-box;
    padding: ${theme.spacing(2)};
    margin-left: ${theme.spacing(2)};
    width: max-content;

    button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: ${theme.typography.cardHeading.fontSize};
      font-weight: ${theme.typography.cardHeading.fontWeight};
      line-height: ${theme.typography.cardHeading.lineHeight};
      text-transform: ${theme.typography.cardHeading.textTransform};
    }
  }

  .swiper-slide:not(.swiper-slide-active) {
    button {
      color: ${theme.palette.midtoneBrighter};
    }
  }

  .swiper-slide-active {
    position: relative;

    &::after {
      content: " ";
      display: inline-block;
      width: ${theme.spacing(4)};
      position: absolute;
      left: calc(50% - ${theme.spacing(2)});
      bottom: 0;
      border-bottom-width: 3px;
      border-bottom-style: solid;
    }
  }
`;
