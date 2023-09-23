import styles from "./caution.module.scss";

interface Props {
  caution: string;
}

const Caution: React.FC<Props> = ({ caution }) => {
  return (
    <section id="caution-section" className={styles.wrapper}>
      <h2>예약 시 주의사항</h2>
      <p>{caution}</p>
    </section>
  );
};

export default Caution;
