import type { RentalType, TimeRentalType } from "@/common/types/rentalType";

import styles from "./priceItem.module.scss";

interface Props {
  rentalType: RentalType;
}

const PriceItem: React.FC<Props> = ({ rentalType }) => {
  const name = rentalType.name;
  // const price = rentalType.rentalType === 'TIME' ? `${rentalType.}`

  return <li className={styles.wrapper}></li>;
};

export default PriceItem;
