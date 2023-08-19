import type { BestPhoto } from "@/common/types/space";
import Image from "@/components/Image";

import styles from "./list.module.scss";

interface Props {
  bestPhotos: BestPhoto[];
}

const List: React.FC<Props> = ({ bestPhotos }) => {
  return (
    <ul className={styles.wrapper}>
      {bestPhotos.map((photo, index) => (
        <li key={photo.id}>
          <Image src={photo.url} alt="베스트 포토" images={bestPhotos} initialIndex={index} />
        </li>
      ))}
    </ul>
  );
};

export default List;
