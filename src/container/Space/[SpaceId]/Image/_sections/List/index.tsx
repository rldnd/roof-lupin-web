import type { ImageDTO } from "@/common/types/common";

import styles from "./list.module.scss";

interface Props {
  images: ImageDTO[];
}

const List: React.FC<Props> = ({ images }) => {
  return (
    <ul className={styles.wrapper}>
      {images.map((image, idx) => (
        <li key={`${image} - ${idx}`}>
          <img src={image.url} alt="공간 이미지" />
        </li>
      ))}
    </ul>
  );
};

export default List;
