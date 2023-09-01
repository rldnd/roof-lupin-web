"use client";

import styles from "./responsive.module.scss";

const Responsive: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      루프루팡은 통신판매중개업자로서 통신판매 당사자가 아니며, 상품의 결제, 이용 및 환불 등과 관련한 의무와 책임은 각
      판매자에게 있습니다.
    </section>
  );
};

export default Responsive;
