"use client";

import styles from "./empty.module.scss";

interface Props {
  isAnswered: boolean;
}

const Empty: React.FC<Props> = ({ isAnswered }) => {
  return (
    <p className={styles.wrapper}>
      {!isAnswered && "아직 작성한 질문이 없어요."}
      {isAnswered && "아직 답변 완료된 질문이 없어요."}
    </p>
  );
};

export default Empty;
