"use client";

import { Suspense, useEffect, useState } from "react";

import { useAtom, useAtomValue } from "jotai";

import { AuthChecker } from "@/components";
import { SpaceReservationInfoFilterBottomSheet } from "@/components/BottomSheets/Space";
import { categorySortMenuState } from "@/states";
import { spaceReservationInfoState } from "@/states/space";
import { dayjs } from "@/utils/date";

import { IconRepeat } from "public/icons";

import ReservationButton from "./ReservationButton";

import styles from "./footer.module.scss";

interface Props {
  maxUser: number;
  overflowUserCount: number;
  overflowUserCost: number;
}

const Footer: React.FC<Props> = ({ maxUser, overflowUserCost, overflowUserCount }) => {
  const [spaceReservationInfo, setSpaceReservationInfo] = useAtom(spaceReservationInfoState);
  const categorySortMenu = useAtomValue(categorySortMenuState);

  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);

  const { year, month, day, userCount } = spaceReservationInfo;
  const time = dayjs(`${year}-${month}-${day}`).format("MM월 DD일 (ddd)");

  useEffect(() => {
    const today = dayjs();
    const {
      year: categoryYear,
      month: categoryMonth,
      day: categoryDay,
      userCount: categoryUserCount,
    } = categorySortMenu;

    setSpaceReservationInfo((prev) => {
      const { year, month, day, userCount } = prev;
      if (year && month && day && userCount) return prev;

      return {
        year: categoryYear ?? today.year().toString(),
        month: categoryMonth ?? (today.month() + 1).toString(),
        day: categoryDay ?? today.date().toString(),
        userCount: categoryUserCount ?? 2,
      };
    });
  }, [categorySortMenu, setSpaceReservationInfo]);

  return (
    <>
      <footer className={styles.wrapper}>
        <AuthChecker>
          <button type="button" className={styles.left} onClick={() => setIsShowBottomSheet(true)}>
            <IconRepeat />
            {year && month && day && userCount && (
              <u>
                <time dateTime={time}>{time}</time>
                <div className={styles.dot} />
                <span>{spaceReservationInfo.userCount}명</span>
              </u>
            )}
          </button>
        </AuthChecker>
        <Suspense fallback={null}>
          <ReservationButton />
        </Suspense>
      </footer>
      <SpaceReservationInfoFilterBottomSheet
        isShow={isShowBottomSheet}
        onClose={() => setIsShowBottomSheet(false)}
        maxUser={maxUser}
        overflowUserCost={overflowUserCost}
        overflowUserCount={overflowUserCount}
      />
    </>
  );
};

export default Footer;
