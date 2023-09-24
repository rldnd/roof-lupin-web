"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import type { SpaceDetail } from "@/common/types/space";
import { Button } from "@/components";
import { SpaceReservationInfoFilterBottomSheet } from "@/components/BottomSheets/Space";
import { useSuspenseQuery } from "@/hooks";
import { getClientSpaceApi } from "@/services/space";

import styles from "./empty.module.scss";

interface Props {
  isShow: boolean;
}

const Empty: React.FC<Props> = ({ isShow }) => {
  const { spaceId } = useParams();
  const { data: space } = useSuspenseQuery<SpaceDetail>(["getClientSpace", spaceId], () => getClientSpaceApi(spaceId));

  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);

  const { maxUser, overflowUserCost, overflowUserCount } = space;

  if (!isShow) return null;

  return (
    <>
      <div className={styles.wrapper}>
        <p className={styles.text}>해당 날짜는 휴무일이에요.</p>
        <Button type="button" color="secondary" onClick={() => setIsShowBottomSheet(true)}>
          다른 날짜 조회하기
        </Button>
      </div>
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

export default Empty;
