import { Suspense } from "react";

import { SafeArea } from "@/components";
import { BaseHeader } from "@/components/Layout";

import Content from "./Content";

import styles from "./spaceDetailReviewContainer.module.scss";

interface Props {
  params: { spaceId: string };
}

export default async function SpaceReviewContainer({ params }: Props) {
  const { spaceId } = params;

  return (
    <SafeArea theme="dark">
      <main className={styles.wrapper}>
        {/* <BaseHeader className={styles.wrapper} title="리뷰" replaceUrl={`/spaces/${spaceId}`} /> */}
        <Suspense fallback={<>LOADING</>}>
          <Content />
        </Suspense>
      </main>
    </SafeArea>
  );
}
