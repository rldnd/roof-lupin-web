import dynamic from "next/dynamic";

import { TOAST_BOTTOM_WITH_BOTTOM_NAVIGATION } from "@/common/constants/toast";
import { ToastPositioner } from "@/components";
import { BottomNavigation } from "@/components/Layout";
import { getHomeCategoriesApi } from "@/services/home";

import { BottomDrawer } from "./BottomDrawer";
import Category from "./Category";
import CurrentPositionButton from "./CurrentPositionButton";
import Header from "./Header";

import styles from "./locationContainer.module.scss";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default async function LocationContainer() {
  const categories = await getHomeCategoriesApi();

  return (
    <ToastPositioner position={TOAST_BOTTOM_WITH_BOTTOM_NAVIGATION}>
      <main className={styles.wrapper}>
        <Header />
        <Category categories={categories} />
        <Map />
        <CurrentPositionButton />
        <BottomNavigation blockScrollInteraction />
      </main>
      <BottomDrawer />
    </ToastPositioner>
  );
}
