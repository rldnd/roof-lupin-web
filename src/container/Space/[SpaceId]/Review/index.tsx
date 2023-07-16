import { Suspense } from "react";

import { getSpaceIdsApi } from "@/services/space";

import { Content, Header, LoadingContent, Menu } from "./_sections";

import styles from "./spaceDetailReviewContainer.module.scss";

export async function generateStaticParams() {
  const { ids } = await getSpaceIdsApi();

  return ids.map((id) => ({
    spaceId: id,
  }));
}

export default function SpaceReviewContainer() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Suspense fallback={null}>
        <Menu />
      </Suspense>
      <Suspense fallback={<LoadingContent />}>
        <Content />
      </Suspense>
    </div>
  );
}
