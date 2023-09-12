import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";

import { AlarmSection, EventSection, LocationSection, LogoutSection, ResignSection } from "./_sections";
import Header from "./Header";

import styles from "./settingContainer.module.scss";

export default async function SettingContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <div className={styles.wrapper}>
        <Header />
        <main>
          <AlarmSection />
          <LocationSection />
          <EventSection />
          <LogoutSection />
          <ResignSection />
        </main>
      </div>
    </ToastPositioner>
  );
}
