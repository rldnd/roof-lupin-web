import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";
import { BaseCenterHeader } from "@/components/Layout";

import { AppPermissionSection, EventSection } from "./_sections";

import styles from "./settingContainer.module.scss";

export default async function SettingContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <div className={styles.wrapper}>
        <BaseCenterHeader title="설정" hasBorderBottom />
        <main>
          <AppPermissionSection />
          <EventSection />
        </main>
      </div>
    </ToastPositioner>
  );
}
