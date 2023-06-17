import type { Caution } from "@/common/types/caution";

import styles from "./caution.module.scss";

interface Props {
  cautions: Caution[];
}

const Caution: React.FC<Props> = ({ cautions }) => {
  return (
    <section id="caution-section" className={styles.wrapper}>
      <h2>예약 시 주의사항</h2>
      <ol>
        {cautions.map((caution) => (
          <>
            <li key={caution.id}>{caution.content}</li>
          </>
        ))}
      </ol>
    </section>
  );
};

export default Caution;
