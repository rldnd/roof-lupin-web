import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";
import { getServerSpaceApi } from "@/services/space";

import { Header, List } from "./_sections";

import styles from "./spaceBestPhotoContainer.module.scss";

interface Props {
  params: {
    spaceId: string;
  };
}

export default async function SpaceBestPhotoContainer({ params }: Props) {
  const space = await getServerSpaceApi(params.spaceId);

  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <div className={styles.wrapper}>
        <Header title={space.title} />
        <main className={styles.content}>
          <List bestPhotos={space.bestPhotos} />
        </main>
      </div>
    </ToastPositioner>
  );
}
