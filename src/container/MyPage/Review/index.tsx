import Header from "./Header";

import styles from "./myReviewContainer.module.scss";

export default async function MyReviewContainer() {
  return (
    <div className={styles.wrapper}>
      <Header />
    </div>
  );
}
