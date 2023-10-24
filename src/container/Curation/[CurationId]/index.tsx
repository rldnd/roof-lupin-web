import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";
import { getCurationApi } from "@/services/curation";

import { Header } from "./Header";
import SpaceList from "./SpaceList";

import styles from "./curationDetailContainer.module.scss";

interface Props {
  params: {
    curationId: string;
  };
}

export default async function CurationDetailContainer({ params }: Props) {
  const curation = await getCurationApi(params.curationId);

  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <div className={styles.wrapper}>
        <Header curation={curation} />
        <img src={curation.thumbnail} alt="썸네일" className={styles.thumbnail} />
        <div dangerouslySetInnerHTML={{ __html: curation.content }} className={styles.content} />
        <SpaceList title={curation.spaceTitle} spaces={curation.spaces} />
      </div>
    </ToastPositioner>
  );
}
