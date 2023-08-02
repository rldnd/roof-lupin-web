"use client";

import styles from "./hostApprove.module.scss";

const HostApprove: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <h2>해당 공간은 호스트 승인이 필요합니다.</h2>
      <p>호스트가 승인하기 전에는 예약이 확정되지 않습니다. 호스트가 24시간 내에 빠르게 승인할 예정입니다.</p>
    </section>
  );
};

export default HostApprove;
