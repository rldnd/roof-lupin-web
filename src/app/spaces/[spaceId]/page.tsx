import type { Metadata } from "next";

import { getServerSpaceApi } from "@/services/space";

interface Props {
  params: {
    spaceId: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata | null> {
  const space = await getServerSpaceApi(params.spaceId);

  if (!space) return null;

  return {
    title: space.title,
    description: space.description,
    keywords: [
      space.title,
      ...space.categories.map((category) => category.name),
      "루프루팡",
      "루프탑",
      "공간 대여",
      "옥상",
    ],
    openGraph: {
      title: `${space.title} | 루프루팡`,
      description: space.description,
    },
  };
}

export { default } from "@/container/Space/[SpaceId]";
