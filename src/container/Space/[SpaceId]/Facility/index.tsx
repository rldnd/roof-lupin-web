import Image from "next/image";

import type { Facility as FacilityType } from "@/common/types/facility";
import type { Service } from "@/common/types/service";

import styles from "./facility.module.scss";

interface Props {
  facilities: FacilityType[];
  services: Service[];
}

const Facility: React.FC<Props> = ({ facilities, services }) => {
  return (
    <section id="facility-section" className={styles.wrapper}>
      <h2>시설 및 서비스</h2>
      <ul>
        {[...facilities, ...services].map((item) => (
          <li key={item.id}>
            {<Image src={item.iconPath} width={30} height={30} alt="아이콘" />}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Facility;
