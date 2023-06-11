"use client";

import { useState } from "react";

import Slider, { type Settings } from "react-slick";

import styles from "./carousel.module.scss";

const defaultSettings: Settings = {
  dots: false,
  infinite: true,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const TOTAL_SLIDES = 4;

const Carousel: React.FC = () => {
  const [progress, setProgress] = useState((1 / TOTAL_SLIDES) * 100);

  const handleScroll = (currentIndex: number, nextIndex: number) => {
    const progress = ((nextIndex + 1) / TOTAL_SLIDES) * 100;
    setProgress(progress);
  };

  const settings = { ...defaultSettings, beforeChange: handleScroll };

  return (
    <section className={styles.wrapper} aria-label="메인 페이지 이미지 리스트">
      <Slider className={styles.slider} {...settings}>
        <img src="https://via.placeholder.com/300x150" alt="placeholder" className={styles.image} />
        <img src="https://via.placeholder.com/300x150" alt="placeholder" className={styles.image} />
        <img src="https://via.placeholder.com/300x150" alt="placeholder" className={styles.image} />
        <img src="https://via.placeholder.com/300x150" alt="placeholder" className={styles.image} />
      </Slider>
      <progress value={progress} max="100" />
    </section>
  );
};

export default Carousel;
