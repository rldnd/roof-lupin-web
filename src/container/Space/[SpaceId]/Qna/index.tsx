import { BaseHeader } from "@/components/Layout";
import { getServerSpaceApi } from "@/services/space";

import { Question } from "./_sections";

import styles from "./spaceQnaContainer.module.scss";

interface Props {
  params: {
    spaceId: string;
  };
}

export default async function SpaceQnaContainer({ params }: Props) {
  const space = await getServerSpaceApi(params.spaceId);

  return (
    <div className={styles.wrapper}>
      <BaseHeader
        className={styles.header}
        title={
          <>
            Q&A<span>{space.qnaCount}</span>
          </>
        }
      />
      <Question spaceId={params.spaceId} />
    </div>
  );
}
