import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants/toast";
import { ToastPositioner } from "@/components";
import { getContentApi } from "@/services/content";

import Header from "./Header";
import ContentList from "./List";

import styles from "./contentListContainer.module.scss";

interface Props {
  params: { contentId: string };
}

export default async function ContentListContainer({ params }: Props) {
  const content = await getContentApi(params.contentId);

  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <div className={styles.wrapper}>
        <Header title={`${content.highlight} ${content.name}`} />
        <ContentList spaces={content.spaces} />
      </div>
    </ToastPositioner>
  );
}
