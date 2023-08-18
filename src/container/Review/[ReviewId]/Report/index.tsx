import Form from "./Form";
import Header from "./Header";

import styles from "./reviewReportContainer.module.scss";

export default async function ReviewReportContainer() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main>
        <p className={styles.info}>
          리뷰를 신고하시는
          <br />
          이유를 선택해주세요.
        </p>
        <Form />
      </main>
    </div>
  );
}
