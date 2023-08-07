"use client";

import { Suspense, useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { useAtom, useAtomValue } from "jotai";

import { AuthChecker } from "@/components";
import { SpaceReservationInfoFilterBottomSheet } from "@/components/BottomSheets/Space";
import { categorySortMenuState, spaceReservationInfoState } from "@/states";
import { dayjs } from "@/utils/date";
import { getBeforeNavigationUrl } from "@/utils/navigation";

import { IconRepeat } from "public/icons";

import ReservationButton, { LoadingReservationButton } from "./ReservationButton";

import styles from "./footer.module.scss";

interface Props {
  maxUser: number;
  overflowUserCount: number;
  overflowUserCost: number;
}

const Footer: React.FC<Props> = ({ maxUser, overflowUserCost, overflowUserCount }) => {
  const { spaceId } = useParams();
  const [spaceReservationInfo, setSpaceReservationInfo] = useAtom(spaceReservationInfoState);
  const categorySortMenu = useAtomValue(categorySortMenuState);

  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);

  const { year, month, day, userCount } = spaceReservationInfo;
  const time = dayjs(`${year}-${month}-${day}`).format("MM월 DD일 (ddd)");

  useEffect(() => {
    const { year, month, day, userCount } = categorySortMenu;
    const beforeUrl = getBeforeNavigationUrl();

    if (beforeUrl?.includes(`/spaces/${spaceId}`)) return;

    setSpaceReservationInfo(() => ({ year, month, day, userCount }));
  }, [categorySortMenu, setSpaceReservationInfo, spaceId]);

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
        <Suspense fallback={<LoadingReservationButton />}>
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
