"use client";

import { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { useAtom, useAtomValue } from "jotai";

import { AuthChecker, Button } from "@/components";
import { SpaceReservationInfoFilterBottomSheet } from "@/components/BottomSheets/Space";
import { useQueryString } from "@/hooks";
import { categorySortMenuState } from "@/states";
import { spaceReservationInfoState } from "@/states/space";
import { dayjs } from "@/utils/date";

import { IconRepeat } from "public/icons";

import styles from "./footer.module.scss";

interface Props {
  maxUser: number;
  overflowUserCount: number;
  overflowUserCost: number;
}

const Footer: React.FC<Props> = ({ maxUser, overflowUserCost, overflowUserCount }) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const { append, getQueryStringWithPath } = useQueryString();

  const [spaceReservationInfo, setSpaceReservationInfo] = useAtom(spaceReservationInfoState);
  const categorySortMenu = useAtomValue(categorySortMenuState);

  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);

  const { year, month, day, userCount } = spaceReservationInfo;
  const time = dayjs(`${year}-${month}-${day}`).format("MM월 DD일 (ddd)");

  const onClickButton = () => {
    if (!year || !month || !day || !userCount) return;

    const query = append({ year, month, day, userCount });
    push(getQueryStringWithPath(query, `${pathname}/reservations`));
  };

  useEffect(() => {
    const today = dayjs();
    const { year, month, day, userCount } = categorySortMenu;

    setSpaceReservationInfo({
      year: year ?? today.year().toString(),
      month: month ?? (today.month() + 1).toString(),
      day: day ?? today.date().toString(),
      userCount: userCount ?? 2,
    });
  }, [categorySortMenu, setSpaceReservationInfo]);

  return (
    <>
      <footer className={styles.wrapper}>
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
        <AuthChecker>
          <Button color="primary" onClick={onClickButton}>
            요금 확인하기
          </Button>
        </AuthChecker>
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
