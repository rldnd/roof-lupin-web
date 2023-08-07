"use client";

import { FormEventHandler, type MouseEventHandler, Suspense, useCallback, useEffect, useState } from "react";

import { useAtom } from "jotai";

import { BottomSheetPortal } from "@/components";
import { type CategorySortMenuInfoFilter, categorySortMenuState } from "@/states";

import CalendarList, { LoadingCalendarList } from "./CalendarList";
import Header from "./Header";
import SubmitButton from "./SubmitButton";
import { DayBar, UserStepper } from "../../_shared";

import styles from "./categoryInfoFilterBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose: () => void;
}

const CategoryInfoFilterBottomSheet: React.FC<Props> = ({ isShow, onClose }) => {
  const [info, setInfo] = useAtom(categorySortMenuState);
  const { year, month, day, userCount, startAt, endAt } = info;

  const [localInfo, setLocalInfo] = useState<CategorySortMenuInfoFilter>({
    year,
    month,
    day,
    userCount,
    startAt,
    endAt,
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setInfo((prev) => ({ ...prev, ...localInfo }));
    onClose();
  };

  const onReset = useCallback(() => {
    setLocalInfo(info);
  }, [info]);

  const onClickPlus = () => {
    setLocalInfo((prev) => ({ ...prev, userCount: prev.userCount + 1 }));
  };

  const onClickMinus = () => {
    setLocalInfo((prev) => ({ ...prev!, userCount: prev.userCount - 1 }));
  };

  const onClickDay = useCallback(
    (year: string, month: string, day: string): MouseEventHandler<HTMLButtonElement> =>
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
          <UserStepper title="인원" onClickMinus={onClickMinus} onClickPlus={onClickPlus} value={localInfo.userCount} />
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

export default CategoryInfoFilterBottomSheet;
