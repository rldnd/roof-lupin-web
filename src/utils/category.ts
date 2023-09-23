import type { Category as AppCategory, CategoryIcon } from "@/common/types/category";
import type { SpaceCategory } from "@/common/types/space";

type Category = AppCategory | SpaceCategory;

export const getHomeCategoryIcon = (category: Category) => {
  return category.icons.find((icon) => !icon.isMapIcon);
};

export const getHomeCategoryIconPath = (category: Category) => {
  const categoryIcon = getHomeCategoryIcon(category);
  if (!isCategoryIcon(categoryIcon)) return "";
  return categoryIcon.iconPath;
};

export const getMapCategoryIcon = (category: Category) => {
  return category.icons.find((icon) => icon.isMapIcon);
};

export const getMapCategoryIconPath = (category: Category) => {
  const categoryIcon = getMapCategoryIcon(category);
  if (!isCategoryIcon(categoryIcon)) return "";
  return categoryIcon.iconPath;
};

export const isCategoryIcon = (categoryIcon?: CategoryIcon): categoryIcon is CategoryIcon => {
  return Boolean(categoryIcon);
};
