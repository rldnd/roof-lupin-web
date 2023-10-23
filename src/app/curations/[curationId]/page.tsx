import type { Metadata } from "next";

import { DEFAULT_METADATA } from "@/common/constants/metadata";
import { getCurationApi } from "@/services/curation";

interface Props {
  params: {
    curationId: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata | null> {
  const curation = await getCurationApi(params.curationId);

  if (!curation) return DEFAULT_METADATA;

  return {
    title: curation.title,
    description: curation.subTitle,
    openGraph: {
      title: curation.title,
      description: curation.subTitle,
      images: curation.thumbnail,
    },
    keywords: [curation.title, "루프루팡", "루프탑", "공간대여", "큐레이션", "옥상"],
  };
}

export { default } from "@/container/Curation/[CurationId]";
