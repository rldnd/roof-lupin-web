import { getExhibitionApi } from "@/services/exhibition";

import { Header } from "./Header";

import styles from "./exhibitionDetailContainer.module.scss";

interface Props {
  params: {
    exhibitionId: string;
  };
}

export default async function ExhibitionDetailContainer({ params }: Props) {
  const exhibition = await getExhibitionApi(params.exhibitionId);

  return (
    <div className={styles.wrapper}>
      <Header exhibition={exhibition} />
      <img src={exhibition.thumbnail} alt="썸네일" className={styles.thumbnail} />
      <div dangerouslySetInnerHTML={{ __html: exhibition.content }} className={styles.content} />
    </div>
  );
}
