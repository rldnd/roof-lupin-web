import { Suspense } from "react";

import { SafeArea } from "@/components";
import { BaseHeader } from "@/components/Layout";

import Content from "./Content";
import Menu from "./Menu";

import styles from "./spaceDetailReviewContainer.module.scss";

interface Props {
  params: { spaceId: string };
}

export default async function SpaceReviewContainer({ params }: Props) {
  const { spaceId } = params;

  return (
    <SafeArea theme="dark">
      <main className={styles.wrapper}>
        <BaseHeader title="리뷰" replaceUrl={`/spaces/${spaceId}`} />
        <Suspense fallback={null}>
          <Menu />
        </Suspense>
        <Suspense fallback={<>LOADING</>}>
          <Content />
        </Suspense>
      </main>
    </SafeArea>
  );
}
