"use client";

import {
  type CSSProperties,
  Dispatch,
  lazy,
  type MouseEventHandler,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import type { ImageDTO } from "@/common/types/common";
import type { Settings } from "react-slick";

import { IconWhiteRightChevron } from "public/icons";

import styles from "./carousel.module.scss";

const Slider = lazy(() => import("react-slick"));

interface ArrowProps {
  style?: CSSProperties;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

const PrevArrow: React.FC<ArrowProps> = ({ onClick, style, className }) => {
  return (
    <button type="button" className={cx(className, styles.arrow, styles.left)} onClick={onClick} style={style}>
      <IconWhiteRightChevron />
    </button>
  );
};

const NextArrow: React.FC<ArrowProps> = ({ onClick, style, className }) => {
  return (
    <button type="button" className={cx(className, styles.arrow, styles.right)} onClick={onClick} style={style}>
      <IconWhiteRightChevron />
    </button>
  );
};

const defaultSettings: Settings = {
  dots: false,
  infinite: false,
  arrows: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
};

interface Props {
  images: ImageDTO[];
  initialIndex: number;
  setIndex: Dispatch<SetStateAction<number>>;
}

const Carousel: React.FC<Props> = ({ images, initialIndex, setIndex }) => {
  const handleScroll = useCallback(
    (currentIndex: number, nextIndex: number) => {
      setIndex(nextIndex);
    },
    [setIndex],
  );

  const settings = useMemo<Settings>(
    () => ({ ...defaultSettings, initialSlide: initialIndex, beforeChange: handleScroll }),
    [handleScroll, initialIndex],
  );

  return (
    <section className={styles.wrapper}>
      <Slider className={styles.slider} {...settings}>
        {images.map((image) => (
          <img className={styles.image} key={image.url} src={image.url} alt="이미지" />
        ))}
      </Slider>
    </section>
  );
};

export default Carousel;

export const LoadingCarousel: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <Skeleton className={styles.skeleton} />
    </section>
  );
};
