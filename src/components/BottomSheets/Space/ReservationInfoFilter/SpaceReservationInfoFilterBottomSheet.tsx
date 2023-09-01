"use client";

import { FormEventHandler, type MouseEventHandler, Suspense, useCallback, useEffect, useState } from "react";

import { useAtom } from "jotai";

import { BottomSheetPortal } from "@/components/Common";
import { useToast } from "@/hooks";
import { SpaceReservationInfo, spaceReservationInfoState } from "@/states";
import { NotNullable } from "@/utils/types";

import CalendarList, { LoadingCalendarList } from "./CalendarList";
import Header from "./Header";
import SubmitButton from "./SubmitButton";
import { DayBar, UserStepper } from "../../_shared";

import styles from "./spaceReservationInfoFilterBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose: () => void;
  maxUser: number;
  overflowUserCount: number;
  overflowUserCost: number;
}

const SpaceReservationInfoFilterBottomSheet: React.FC<Props> = ({
  isShow,
  onClose,
  maxUser,
  overflowUserCost,
  overflowUserCount,
}) => {
  const { addToast } = useToast();

  const [info, setInfo] = useAtom(spaceReservationInfoState);
  const [localInfo, setLocalInfo] = useState<NotNullable<SpaceReservationInfo>>(info);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setInfo(localInfo);
    onClose();
  };

  const onReset = useCallback(() => {
    setLocalInfo(info);
  }, [info]);

  const onClickPlus = () => {
    if (localInfo.userCount === maxUser || localInfo.userCount === 99) {
      addToast({ message: "인원을 더 추가할 수 없습니다." });
    } else {
      setLocalInfo((prev) => ({ ...prev, userCount: prev.userCount + 1 }));
    }
  };

  const onClickMinus = () => {
    setLocalInfo((prev) => {
      if (prev.userCount === 1) return prev;
      return { ...prev, userCount: prev.userCount - 1 };
    });
  };

  const onClickDay = useCallback(
    (year: number, month: number, day: number): MouseEventHandler<HTMLButtonElement> =>
      () => {
        setLocalInfo((prev) => ({ ...prev, year, month, day }));
      },
    [],
  );

  useEffect(() => {
    if (!isShow) onReset();
  }, [isShow, onReset]);

  return (
    <BottomSheetPortal
      isShow={isShow}
      shouldCloseOnOverlayClick={false}
      onClose={onClose}
      blockWindowScroll
      className={styles.wrapper}
    >
      <form onSubmit={onSubmit} onReset={onReset}>
        <Header onClose={onClose} />
        <div className={styles.content}>
          <UserStepper
            title="인원"
            onClickMinus={onClickMinus}
            onClickPlus={onClickPlus}
            description={`${overflowUserCount}명 초과시 인당 ${overflowUserCost.toLocaleString("ko-KR")}원 추가돼요.`}
            value={localInfo.userCount}
          />
          <hr />
          <h2 className={styles.dateTitle}>날짜 및 시간</h2>
        </div>
        <DayBar />
        <Suspense fallback={<LoadingCalendarList />}>
          <CalendarList
            activeDate={{
              day: localInfo.day,
              month: localInfo.month,
              year: localInfo.year,
            }}
            onClickDay={onClickDay}
          />
        </Suspense>
        <Suspense fallback={null}>
          <SubmitButton {...localInfo} />
        </Suspense>
      </form>
    </BottomSheetPortal>
  );
};

export default SpaceReservationInfoFilterBottomSheet;
