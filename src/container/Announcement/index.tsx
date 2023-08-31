import Header from "./Header";

import styles from "./announcementContainer.module.scss";

export default async function AnnouncementContainer() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main></main>
    </div>
  );
}
