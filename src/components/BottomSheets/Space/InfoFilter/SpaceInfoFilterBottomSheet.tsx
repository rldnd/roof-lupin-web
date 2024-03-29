"use client";

import { type FormEventHandler, type MouseEventHandler, Suspense, useCallback, useEffect, useState } from "react";

import { useAtom } from "jotai";

import { BottomSheetPortal, CategoryTimePicker } from "@/components";
import { initialSpaceSortMenu, type SpaceSortMenuInfoFilter, spaceSortMenuState } from "@/states";

import CalendarList, { LoadingCalendarList } from "./CalendarList";
import Header from "./Header";
import SubmitButton from "./SubmitButton";
import { DayBar, UserStepper } from "../../_shared";

import styles from "./spaceInfoFilterBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose: () => void;
}

const SpaceInfoFilterBottomSheet: React.FC<Props> = ({ isShow, onClose }) => {
  const [info, setInfo] = useAtom(spaceSortMenuState);
  const { year, month, day, userCount, startAt, endAt } = info;

  const [localInfo, setLocalInfo] = useState<SpaceSortMenuInfoFilter>({
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
    const { year, month, day, userCount, startAt, endAt } = initialSpaceSortMenu;
    setLocalInfo({ year, month, day, userCount, startAt, endAt });
  }, []);

  const onClickPlus = () => {
    setLocalInfo((prev) => {
      if (prev.userCount === 99) return prev;
      return { ...prev, userCount: prev.userCount + 1 };
    });
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

  const onClickTime: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const hour = Number(e.currentTarget.value);

      const hasStart = localInfo.startAt !== null;
      const hasClickedBeforeStart = hasStart && hour <= localInfo.startAt!;
      const hasEnd = typeof localInfo.endAt === "number";

      if (!hasStart || hasClickedBeforeStart || (hasStart && hasEnd))
        setLocalInfo((prev) => ({ ...prev, endAt: null, startAt: hour }));
      else setLocalInfo((prev) => ({ ...prev, endAt: hour }));
    },
    [localInfo],
  );

  useEffect(() => {
    if (!isShow) setLocalInfo({ year, month, day, userCount, startAt, endAt });
  }, [day, endAt, isShow, month, startAt, userCount, year]);

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

        <div className={styles.bottom}>
          <CategoryTimePicker startAt={localInfo.startAt} endAt={localInfo.endAt} onClickTime={onClickTime} />
          <SubmitButton localInfo={localInfo} />
        </div>
      </form>
    </BottomSheetPortal>
  );
};

export default SpaceInfoFilterBottomSheet;
