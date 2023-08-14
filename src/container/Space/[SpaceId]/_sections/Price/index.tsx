import type { SpaceRentalType } from "@/common/types/space";
import { ArrowLink } from "@/components";

import PriceItem from "./PriceItem";

import styles from "./price.module.scss";

interface Props {
  rentalType: SpaceRentalType;
  spaceId: string;
}

const Price: React.FC<Props> = ({ rentalType, spaceId }) => {
  const { timeRentalType, packageRentalType } = rentalType;

  return (
    <section id="price-section" className={styles.wrapper}>
      <div className={styles.header}>
        <h2>상세요금</h2>
        <small>부가 서비스 및 인원 추가에 따라 최종 가격이 달라질 수 있습니다.</small>
      </div>
      <ul>
        {timeRentalType && (
          <PriceItem title="시간 당" minCost={timeRentalType.minCost} maxCost={timeRentalType.maxCost} />
        )}
        {packageRentalType && <PriceItem title="패키지" minCost={packageRentalType.minPrice} />}
      </ul>
      <ArrowLink href={`/spaces/${spaceId}/prices`} className={styles.link}>
        자세히 보기
      </ArrowLink>
    </section>
  );
};

export default Price;
