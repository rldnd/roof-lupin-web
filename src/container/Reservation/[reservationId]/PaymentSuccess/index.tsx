import dynamic from "next/dynamic";

import Header from "./Header";
import { LoadingTopSection } from "./TopSection";

import styles from "./reservationPaymentSuccessContainer.module.scss";

const TopSection = dynamic(() => import("./TopSection"), { ssr: false, loading: () => <LoadingTopSection /> });

interface Props {
  params: {
    reservationId: string;
  };
}

export default async function ReservationPaymentSuccessContainer({ params }: Props) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <TopSection reservationId={params.reservationId} />
    </div>
  );
}
