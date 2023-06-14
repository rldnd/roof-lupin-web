import type { SpaceDetail } from "@/common/types/space";

import styles from "./introduction.module.scss";

interface Props {
  space: SpaceDetail;
}

const Introduction: React.FC<Props> = ({ space }) => {
  const { title, publicTransportations } = space;

  return (
    <section className={styles.wrapper}>
      {publicTransportations.length > 0 && (
        <small className={styles.transport}>
          {publicTransportations[0].name} 도보{publicTransportations[0].timeTaken}분
        </small>
      )}
      <h1 className={styles.title}>{title}</h1>
    </section>
  );
};

export default Introduction;
