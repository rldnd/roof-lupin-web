import Link from "next/link";

import type { Category as CategoryType } from "@/common/types/category";

import styles from "./category.module.scss";

interface Props {
  categories: CategoryType[];
}

const Category: React.FC<Props> = ({ categories }) => {
  return (
    <nav className={styles.wrapper}>
      {categories.map((category) => (
        <Link key={category.id} className={styles.item} href={`/categories?categoryId=${category.id}`}>
          <div className={styles.imageWrapper}>
            <img src={category.iconPath} alt={`${category.name} 카테고리 이미지`} />
          </div>
          <span className={styles.name}>{category.name}</span>
          {category.isRecommended && <span className={styles.recommend}>추천</span>}
        </Link>
      ))}
    </nav>
  );
};

export default Category;
