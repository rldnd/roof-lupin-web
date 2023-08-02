"use client";

import styles from "./loading.module.scss";

interface Props {
  isShow: boolean;
}

const Loading: React.FC<Props> = ({ isShow }) => {
  if (!isShow) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.loading} />
    </div>
  );
};

export default Loading;
