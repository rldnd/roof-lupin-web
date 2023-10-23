import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";
import { getExhibitionApi } from "@/services/exhibition";

import { Header } from "./Header";
import SpaceList from "./SpaceList";

import styles from "./exhibitionDetailContainer.module.scss";

interface Props {
  params: {
    exhibitionId: string;
  };
}

export default async function ExhibitionDetailContainer({ params }: Props) {
  const exhibition = await getExhibitionApi(params.exhibitionId);

  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <div className={styles.wrapper}>
        <Header exhibition={exhibition} />
        <img src={exhibition.thumbnail} alt="썸네일" className={styles.thumbnail} />
        <div dangerouslySetInnerHTML={{ __html: exhibition.content }} className={styles.content} />
        <SpaceList spaces={exhibition.spaces} />
      </div>
    </ToastPositioner>
  );
}
