import type { Metadata } from "next";

import { DEFAULT_METADATA } from "@/common/constants/metadata";
import { getHomeCategoriesApi } from "@/services/home";

interface Props {
  params: {
    categoryId: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata | null> {
  const category = (await getHomeCategoriesApi()).find((category) => category.id === params.categoryId);

  if (!category) return DEFAULT_METADATA;

  return {
    title: `루프탑 ${category.name}`,
    keywords: ["루프루팡", "루프탑", category.name, "옥상"],
  };
}

export { default } from "@/container/Category/[categoryId]";
