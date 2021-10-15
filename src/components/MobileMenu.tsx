import { useState } from "react";
import { css, Theme } from "@emotion/react";
import { transparentize } from "polished";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";

export interface MobileMenuProps {
  pages: string[];
}

const MobileMenu: React.VFC<MobileMenuProps> = ({ pages }) => {
  const [swiper, setSwiper] = useState<{
    slideTo: (index: number) => void;
  } | null>(null);

  return (
    <Swiper
      wrapperTag="nav"
      onSwiper={(swiper) => setSwiper(swiper)}
      slidesPerView="auto"
      centeredSlides
      freeMode
      freeModeSticky
      grabCursor
      touchRatio={0.5}
      css={styles}
    >
      {pages.map((page, i) => (
        <SwiperSlide key={page}>
          <button onClick={() => swiper?.slideTo(i)}>{page}</button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default MobileMenu;

const styles = (theme: Theme) => css`
  display: flex;
  overflow-x: clip;
  background-color: ${transparentize(0.34, theme.palette.background)};
  backdrop-filter: blur(${theme.spacing(1)});

  .swiper-slide {
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
      color: ${theme.palette.midHighlight};
    }

    &.swiper-slide-active {
      position: relative;

      button {
        color: ${theme.palette.pink};
      }

      &::after {
        content: " ";
        display: inline-block;
        width: ${theme.spacing(4)};
        position: absolute;
        left: calc(50% - ${theme.spacing(2)});
        bottom: 0;
        border-bottom: 3px solid ${theme.palette.pink};
      }
    }
  }
`;
