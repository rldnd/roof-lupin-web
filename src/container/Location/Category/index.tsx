import type { Category as CategoryType } from "@/common/types/category";
import { HorizonDraggable } from "@/components";

import CategoryItem from "./CategoryItem";

import styles from "./category.module.scss";

interface Props {
  categories: CategoryType[];
}

const Category: React.FC<Props> = ({ categories }) => {
  return (
    <HorizonDraggable className={styles.wrapper}>
      {categories.map((category) => (
        <li key={category.id}>
          <CategoryItem totalCount={categories.length} category={category}>
            {category.name}
          </CategoryItem>
        </li>
      ))}
    </HorizonDraggable>
  );
};

export default Category;
