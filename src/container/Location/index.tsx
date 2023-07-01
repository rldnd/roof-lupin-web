import { BottomNavigation } from "@/components/Layout";

import Category from "./Category";
import Header from "./Header";
import Map from "./Map";

import styles from "./locationContainer.module.scss";

export default async function LocationContainer() {
  return (
    <main className={styles.wrapper}>
      <Header />
      {/* @ts-expect-error server component */}
      <Category />
      <Map />
      <BottomNavigation blockScrollInteraction />
    </main>
  );
}
