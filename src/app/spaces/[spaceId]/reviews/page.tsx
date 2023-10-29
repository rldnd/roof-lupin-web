import type { Metadata } from "next";

import { getServerSpaceApi } from "@/services/space";

interface Props {
  params: {
    spaceId: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const space = await getServerSpaceApi(params.spaceId);

  return {
    title: `${space.title}에 대한 리뷰`,
    keywords: [
      space.title,
      ...space.categories.map((category) => category.name),
      "루프루팡",
      "루프탑",
      "공간대여",
      "옥상",
    ],
  };
}

export { default } from "@/container/Space/[SpaceId]/Review";
