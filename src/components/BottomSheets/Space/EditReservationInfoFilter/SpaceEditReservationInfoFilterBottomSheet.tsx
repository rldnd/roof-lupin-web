"use client";

import { FormEventHandler, type MouseEventHandler, Suspense, useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useAtom, useSetAtom } from "jotai";

import { BottomSheetPortal } from "@/components/Common";
import { useQueryString, useToast } from "@/hooks";
import {
  initialReservationTime,
  initialSpaceReservationInfo,
  reservationAdditionalServicesState,
  reservationCouponState,
  reservationDepositConfirmState,
  reservationPackageState,
  reservationState,
  reservationTimeState,
  SpaceReservationInfo,
} from "@/states";
import { NotNullable } from "@/utils/types";

import CalendarList, { LoadingCalendarList } from "./CalendarList";
import Header from "./Header";
import SubmitButton from "./SubmitButton";
import { DayBar, UserStepper } from "../../_shared";

import styles from "./spaceEditReservationInfoFilterBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose: () => void;
  maxUser: number;
  overflowUserCount: number;
  overflowUserCost: number;
}

const SpaceEditReservationInfoFilterBottomSheet: React.FC<Props> = ({
  isShow,
  onClose,
  maxUser,
  overflowUserCost,
  overflowUserCount,
}) => {
  const { replace } = useRouter();
  const { set, getQueryStringWithPath } = useQueryString();
  const { addToast } = useToast();

  const setTime = useSetAtom(reservationTimeState);
  const setPackage = useSetAtom(reservationPackageState);
  const setAdditionalServices = useSetAtom(reservationAdditionalServicesState);
  const setDepositConfirm = useSetAtom(reservationDepositConfirmState);
  const setCoupon = useSetAtom(reservationCouponState);

  const [reservation, setReservation] = useAtom(reservationState);
  const [localInfo, setLocalInfo] = useState<NotNullable<SpaceReservationInfo>>(initialSpaceReservationInfo);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const { year, month, day, userCount } = localInfo;
    setTime(initialReservationTime);
    setPackage([]);
    setAdditionalServices({});
    setReservation((prev) => ({ ...prev, year, month, day, userCount }));
    setDepositConfirm(false);
    setCoupon([]);
    replace(getQueryStringWithPath(set({ year, month, day, userCount })));
    onClose();
  };

  const onReset = useCallback(() => {
    const { year, month, day, userCount } = reservation;
    if (!year || !month || !day || !userCount) return;
    setLocalInfo({ year, month, day, userCount });
  }, [reservation]);

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

export default SpaceEditReservationInfoFilterBottomSheet;
