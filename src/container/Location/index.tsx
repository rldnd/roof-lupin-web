import { BottomNavigation } from "@/components/Layout";
import { getHomeCategoriesApi } from "@/services/home";

import { BottomDrawer } from "./BottomDrawer";
import Category from "./Category";
import CurrentPositionButton from "./CurrentPositionButton";
import Header from "./Header";
import Map from "./Map";

import styles from "./locationContainer.module.scss";

export default async function LocationContainer() {
  const categories = await getHomeCategoriesApi();

  return (
    <>
      <main className={styles.wrapper}>
        <Header />
        <Category categories={categories} />
        <Map />
        <CurrentPositionButton />
        <BottomNavigation blockScrollInteraction />
      </main>
      <BottomDrawer />
    </>
  );
}
