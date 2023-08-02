"use client";

import { Button, DataItem, DataList } from "@/components";
import { LoadingDataItem } from "@/components/Data/DataItem";

import styles from "./bottomSection.module.scss";

const BottomSection: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <DataList>
        <DataItem label="날짜">2023년이다 이자식아</DataItem>
        <DataItem label="인원">개많다 이자식아</DataItem>
        <DataItem label="상품 및 부가서비스">아주 많이 구매했다 이자식아</DataItem>
      </DataList>
      <Button type="button" color="secondary" full>
        예약 신청 내역 바로가기
      </Button>
    </section>
  );
};

export default BottomSection;

export const LoadingBottomSection: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <DataList>
        <LoadingDataItem />
        <LoadingDataItem />
        <LoadingDataItem />
      </DataList>
      <Button type="button" color="secondary" full disabled>
        예약 신청 내역 바로가기
      </Button>
    </section>
  );
};
