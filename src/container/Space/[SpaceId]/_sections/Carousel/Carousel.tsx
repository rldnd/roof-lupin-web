"use client";

import { lazy, memo, type ReactNode, useCallback, useMemo, useState } from "react";

import Skeleton from "react-loading-skeleton";
import { type Settings } from "react-slick";

import styles from "./carousel.module.scss";

const Slider = lazy(() => import("react-slick"));

const defaultSettings: Settings = {
  dots: false,
  infinite: false,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
};

interface Props {
  slideCount: number;
  children: ReactNode;
}

const Carousel: React.FC<Props> = ({ slideCount, children }) => {
  const [index, setIndex] = useState(1);

  const handleScroll = useCallback((currentIndex: number, nextIndex: number) => {
    setIndex(nextIndex + 1);
  }, []);

  const settings = useMemo<Settings>(() => ({ ...defaultSettings, beforeChange: handleScroll }), [handleScroll]);

  return (
    <section className={styles.wrapper} aria-label="공간 이미지 리스트">
      <Slider className={styles.slider} {...settings}>
        {children}
      </Slider>
      <span className={styles.countWrapper}>
        {index}/{slideCount}
      </span>
    </section>
  );
};

export default memo(Carousel);

export const LoadingCarousel: React.FC = () => {
  return <Skeleton className={styles.wrapper} />;
};
