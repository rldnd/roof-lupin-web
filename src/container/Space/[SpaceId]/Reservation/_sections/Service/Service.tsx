"use client";

import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";

import type { AdditionalService } from "@/common/types/service";
import { LoadingPriceSelectMenuItem, PriceSelectMenuItem } from "@/components";

import styles from "./service.module.scss";

interface Props {
  additionalServices: AdditionalService[];
}

const Service: React.FC<Props> = ({ additionalServices }) => {
  return (
    <section className={styles.wrapper}>
      <h2>부가 서비스</h2>
      <span className={styles.description}>상품 이용 조건을 잘 확인해주세요!</span>
      <menu className={styles.list}>
        {additionalServices.map((service) => (
          <li key={service.id}>
            <PriceSelectMenuItem checked={false} disabled={false} name={service.name} price={service.cost} />
          </li>
        ))}
      </menu>
    </section>
  );
};

export default Service;

export const LoadingService: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <h2>부가 서비스</h2>
      <Skeleton width={100} height={16} className={styles.description} />
      <menu className={styles.list}>
        {range(3).map((value) => (
          <LoadingPriceSelectMenuItem key={value} />
        ))}
      </menu>
    </section>
  );
};
