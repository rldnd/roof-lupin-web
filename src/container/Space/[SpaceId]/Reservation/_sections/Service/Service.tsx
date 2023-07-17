import { range } from "lodash-es";

import { PriceSelectMenuItem } from "@/components";

import styles from "./service.module.scss";

const Service: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <h2>부가 서비스</h2>
      <span className={styles.description}>부가서비스 관련 안내 메세지</span>
      <menu className={styles.list}>
        {range(2).map((value) => (
          <li key={value}>
            <PriceSelectMenuItem checked={false} disabled={false} name="바베큐 세트" price={5000} />
          </li>
        ))}
      </menu>
    </section>
  );
};

export default Service;
