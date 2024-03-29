import type { Service } from "@/common/types/service";
import { getServiceCategoryIconPath } from "@/utils/service";

import styles from "./service.module.scss";

interface Props {
  services: Service[];
}

const service: React.FC<Props> = ({ services }) => {
  return (
    <section id="service-section" className={styles.wrapper}>
      <h2>시설 및 서비스</h2>
      <ul>
        {services.map((item) => (
          <li key={item.id}>
            <img src={getServiceCategoryIconPath(item)} width={30} height={30} alt="아이콘" />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default service;
