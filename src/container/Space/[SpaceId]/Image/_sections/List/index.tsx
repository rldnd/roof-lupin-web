import type { ImageDTO } from "@/common/types/common";
import Image from "@/components/Image";

import styles from "./list.module.scss";

interface Props {
  images: ImageDTO[];
}

const List: React.FC<Props> = ({ images }) => {
  return (
    <ul className={styles.wrapper}>
      {images.map((image, idx) => (
        <li key={`${image} - ${idx}`}>
          <Image src={image.url} alt="공간 이미지" images={images} initialIndex={idx} />
        </li>
      ))}
    </ul>
  );
};

export default List;
