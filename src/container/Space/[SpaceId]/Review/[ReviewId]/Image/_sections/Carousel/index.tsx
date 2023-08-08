"use client";

import { type CSSProperties, lazy, type MouseEventHandler, useCallback, useEffect, useMemo } from "react";

import { useParams } from "next/navigation";

import cx from "clsx";
import { useSetAtom } from "jotai";
import Skeleton from "react-loading-skeleton";
import { useUnmount } from "react-use";

import type { Review } from "@/common/types/review";
import { useSuspenseQuery } from "@/hooks";
import { getReviewApi } from "@/services/review";
import { reviewImageIndexState, reviewImageTotalCountState } from "@/states";
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

const Carousel: React.FC = () => {
  const { reviewId } = useParams();
  const { data: review } = useSuspenseQuery<Review>(["getReview", reviewId], () => getReviewApi(reviewId));

  const setIndex = useSetAtom(reviewImageIndexState);
  const setTotalCount = useSetAtom(reviewImageTotalCountState);

  const handleScroll = useCallback(
    (currentIndex: number, nextIndex: number) => {
      setIndex(nextIndex + 1);
    },
    [setIndex],
  );

  const settings = useMemo<Settings>(() => ({ ...defaultSettings, beforeChange: handleScroll }), [handleScroll]);

  useEffect(() => {
    setTotalCount(review.images.length);
  }, [review, setTotalCount]);

  useUnmount(() => {
    setIndex(1);
    setTotalCount(null);
  });

  return (
    <section className={styles.wrapper}>
      <Slider className={styles.slider} {...settings}>
        {review.images.map((image) => (
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
