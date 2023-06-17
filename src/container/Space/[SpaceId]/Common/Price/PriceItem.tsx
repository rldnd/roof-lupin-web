import styles from "./priceItem.module.scss";

interface Props {
  title: string;
  minCost: number;
  maxCost?: number;
}

const PriceItem: React.FC<Props> = ({ title, minCost, maxCost }) => {
  return (
    <li className={styles.wrapper}>
      <span className={styles.title}>{title}</span>
      <span className={styles.price}>
        {minCost.toLocaleString("ko-KR")}원 ~ {maxCost && <>{maxCost.toLocaleString("ko-KR")}원</>}
      </span>
    </li>
  );
};

export default PriceItem;
