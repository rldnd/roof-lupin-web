"use client";

import { memo, type ReactNode, useCallback, useMemo, useState } from "react";

import Skeleton from "react-loading-skeleton";
import Slider, { type Settings } from "react-slick";

import styles from "./carousel.module.scss";

const defaultSettings: Settings = {
  dots: false,
  infinite: true,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4_500,
};

interface Props {
  slideCount: number;
  children: ReactNode;
}

const Carousel: React.FC<Props> = ({ slideCount, children }) => {
  const [progress, setProgress] = useState((1 / slideCount) * 100);

  const handleScroll = useCallback(
    (currentIndex: number, nextIndex: number) => {
      const progress = ((nextIndex + 1) / slideCount) * 100;
      setProgress(progress);
    },
    [slideCount],
  );

  const settings = useMemo<Settings>(() => ({ ...defaultSettings, beforeChange: handleScroll }), [handleScroll]);

  return (
    <section className={styles.wrapper} aria-label="메인 페이지 이미지 리스트">
      <Slider className={styles.slider} {...settings}>
        {children}
      </Slider>
      <progress value={progress} max="100" />
    </section>
  );
};

export default memo(Carousel);

export const LoadingCarousel: React.FC = () => {
  return <Skeleton className={styles.wrapper} />;
};
