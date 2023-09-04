"use client";

import Image from "next/image";
import Link from "next/link";

import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";

import { SOCIAL_ICON_MAPPER } from "@/common/constants";
import type { CountInfo } from "@/common/types/user";
import { useSuspenseQuery } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { getMyCountInfoApi } from "@/services/user";

import { IconGrayRightChevron } from "public/icons";
import { IconGrayQna, IconGrayReview, IconGraySchedule, IconGrayTicket } from "public/icons/myPage";

import styles from "./info.module.scss";

const Info: React.FC = () => {
  const { me } = useMe();
  const { data: countInfo } = useSuspenseQuery<CountInfo>(["getMyCountInfo"], getMyCountInfoApi, {
    refetchOnMount: true,
  });

  if (!me) return null;

  return (
    <section className={styles.wrapper}>
      <div className={styles.top}>
        <h1>
          {me.nickname}님,
          <br />
          안녕하세요.
        </h1>
        {me.profileImage && (
          <Image className={styles.thumbnail} src={me.profileImage} width={60} height={60} alt="프로필 이미지" />
        )}
        {!me.profileImage && <div className={styles.emptyImage} />}
        {/* //TODO: 누를 시 내 정보 수정으로 이동 */}
        <span className={styles.email}>
          {SOCIAL_ICON_MAPPER[me.socialType]}
          {me.email}
          <IconGrayRightChevron />
        </span>
      </div>
      <nav className={styles.countInfoList}>
        <Link href="/" className={styles.item}>
          <IconGraySchedule />
          <span className={styles.name}>
            예약<span className={styles.count}>{countInfo.reservationCount}</span>
          </span>
        </Link>
        <Link href="/" className={styles.item}>
          <IconGrayQna />
          <span className={styles.name}>
            Q&A<span className={styles.count}>{countInfo.qnaCount}</span>
          </span>
        </Link>
        <Link href="/my-page/coupons" className={styles.item}>
          <IconGrayTicket />
          <span className={styles.name}>
            쿠폰<span className={styles.count}>{countInfo.couponCount}</span>
          </span>
        </Link>
        <Link href="/my-page/reviews" className={styles.item}>
          <IconGrayReview />
          <span className={styles.name}>
            후기<span className={styles.count}>{countInfo.reviewCount}</span>
          </span>
        </Link>
      </nav>
    </section>
  );
};

export default Info;

export const LoadingInfo: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.top}>
        <Skeleton width={60} />
        <div className={styles.emptyImage} />
        <Skeleton width={120} className={styles.email} />
      </div>
      <div className={styles.countInfoList}>
        {range(4).map((value) => (
          <Skeleton width="75%" height={50} containerClassName={styles.item} key={value} />
        ))}
      </div>
    </section>
  );
};
