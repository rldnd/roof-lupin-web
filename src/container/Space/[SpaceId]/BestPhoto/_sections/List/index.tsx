import type { BestPhoto } from "@/common/types/space";

import styles from "./list.module.scss";

interface Props {
  bestPhotos: BestPhoto[];
}

const List: React.FC<Props> = ({ bestPhotos }) => {
  return (
    <ul className={styles.wrapper}>
      {bestPhotos.map((photo) => (
        <li key={photo.id}>
          <img src={photo.url} alt="베스트 포토" />
        </li>
      ))}
    </ul>
  );
};

export default List;
