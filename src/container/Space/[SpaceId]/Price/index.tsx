import type { RentalType } from "@/common/types/rentalType";

import styles from "./price.module.scss";

interface Props {
  rentalTypes: RentalType[];
}

const Price: React.FC<Props> = ({ rentalTypes }) => {
  return (
    <section id="price-section" className={styles.wrapper}>
      <div className={styles.header}>
        <h2>상세요금</h2>
        <small>부가 서비스 및 인원 추가에 따라 최종 가격이 달라질 수 있습니다.</small>
      </div>
    </section>
  );
};

export default Price;
