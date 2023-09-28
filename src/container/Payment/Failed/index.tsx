import { HeightFitLayout } from "@/components/Layout";

import RetryButton from "./RetryButton";

import styles from "./tossPayFailContainer.module.scss";

const TossPayFailContainer: React.FC = () => {
  return (
    <>
      <HeightFitLayout className={styles.wrapper}>
        <img src="/images/payment/payment-error.png" className={styles.image} alt="결제 실패 이미지" />
        <h2 className={styles.title}>결제 오류가 발생했어요.</h2>
        <p className={styles.desc}>
          결제가 정상적으로 처리되지 않았어요.
          <br />
          주문 내역과 결제 수단 확인 후 다시 시도해주세요.
        </p>
        <RetryButton />
      </HeightFitLayout>
    </>
  );
};

export default TossPayFailContainer;
