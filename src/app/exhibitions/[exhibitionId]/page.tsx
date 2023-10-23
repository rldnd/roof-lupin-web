import type { Metadata } from "next";

import { DEFAULT_METADATA } from "@/common/constants/metadata";
import { getExhibitionApi } from "@/services/exhibition";

interface Props {
  params: {
    exhibitionId: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata | null> {
  const exhibition = await getExhibitionApi(params.exhibitionId);

  if (!exhibition) return DEFAULT_METADATA;

  return {
    title: exhibition.title,
    description: exhibition.description,
    openGraph: {
      title: exhibition.title,
      description: exhibition.description,
      images: exhibition.thumbnail,
    },
    keywords: [exhibition.title, "루프루팡", "루프탑", "공간대여", "기획전", "옥상"],
  };
}

export { default } from "@/container/Exhibition/[ExhibitionId]";
