import Image from "next/image";

import type { Category as CategoryType } from "@/common/types/category";
import { getNumberFromPixel } from "@/utils/styles";

import styles from "./category.module.scss";

interface Props {
  categories: CategoryType[];
}

const Category: React.FC<Props> = ({ categories }) => {
  return (
    <ul className={styles.wrapper}>
      {categories.map((category) => (
        <li key={category.id} className={styles.item}>
          <Image
            src={category.iconPath as string}
            width={getNumberFromPixel(styles.categoryWidth)}
            height={getNumberFromPixel(styles.categoryWidth)}
            alt={`${category.name} 카테고리 이미지`}
          />
          <span className={styles.name}>{category.name}</span>
          {category.isRecommended && <span className={styles.recommend}>추천</span>}
        </li>
      ))}
    </ul>
  );
};

export default Category;
