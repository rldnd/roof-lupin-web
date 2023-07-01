import { HorizonDraggable } from "@/components";
import { getHomeCategoriesApi } from "@/services/home";

import CategoryItem from "./CategoryItem";

import styles from "./category.module.scss";

export default async function Category() {
  const categories = await getHomeCategoriesApi();

  return (
    <HorizonDraggable className={styles.wrapper}>
      {categories.map((category) => (
        <li key={category.id}>
          <CategoryItem category={category}>{category.name}</CategoryItem>
        </li>
      ))}
    </HorizonDraggable>
  );
}
