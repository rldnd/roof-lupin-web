import { getServerSpaceApi } from "@/services/space";

import { Header, List } from "./_sections";

import styles from "./spaceImageContainer.module.scss";

interface Props {
  params: {
    spaceId: string;
  };
}

export default async function SpaceImageContainer({ params }: Props) {
  const space = await getServerSpaceApi(params.spaceId);

  return (
    <div className={styles.wrapper}>
      <Header title={space.title} />
      <main className={styles.content}>
        <List images={space.images} />
      </main>
    </div>
  );
}
