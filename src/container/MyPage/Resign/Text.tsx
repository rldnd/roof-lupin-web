"use client";

import styles from "./text.module.scss";

const Text: React.FC = () => {
  return (
    <ul className={styles.wrapper}>
      <li>탈퇴 시 프로필 정보, 예약 내역 등의 모든 정보가 삭제되며 이후 복구가 불가능해요.</li>
      <li>작성하셨던 리뷰, Q&A는 탈퇴하더라도 사라지지 않아요. 삭제를 원하시면 탈퇴 전 개별적으로 삭제해주세요</li>
      <li>보유하셨던 계셨던 쿠폰 또한 탈퇴 시 삭제되며 이후 복구가 불가능해요.</li>
    </ul>
  );
};

export default Text;
