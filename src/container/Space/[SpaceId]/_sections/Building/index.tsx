import Image from "next/image";

import type { Building as BuildingType } from "@/common/types/building";
import type { Size } from "@/common/types/size";

import SizeRow from "./SizeRow";

import styles from "./building.module.scss";

interface Props {
  buildings: BuildingType[];
  sizes: Size[];
}

const Building: React.FC<Props> = ({ buildings, sizes }) => {
  return (
    <section className={styles.wrapper}>
      <h2>건물 미리 알고가세요!</h2>
      <ul>
        {buildings.map((building) => (
          <li key={building.id} className={styles.building}>
            <Image width={30} height={30} src={building.iconPath} alt="빌딩 아이콘" />
            <span>{building.name}</span>
          </li>
        ))}
        <SizeRow sizes={sizes} />
      </ul>
    </section>
  );
};

export default Building;