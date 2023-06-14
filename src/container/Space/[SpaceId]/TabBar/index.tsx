import dynamic from "next/dynamic";

import styles from "./tabBar.module.scss";

export default dynamic(() => import("./TabBar"), {
  ssr: false,
  loading: () => (
    <nav className={styles.wrapper}>
      <button type="button" className={styles.item}>
        상세요금
      </button>
      <button type="button" className={styles.item}>
        시설/건물
      </button>
      <button type="button" className={styles.item}>
        주의사항
      </button>
      <button type="button" className={styles.item}>
        위치
      </button>
      <button type="button" className={styles.item}>
        리뷰
      </button>
    </nav>
  ),
});
