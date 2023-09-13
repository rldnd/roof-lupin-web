import dynamic from "next/dynamic";

import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";

import Header from "./Header";
import { LoadingProfileImage } from "./ProfileImage";

import styles from "./myProfileContainer.module.scss";

const ProfileImage = dynamic(() => import("./ProfileImage"), { ssr: false, loading: () => <LoadingProfileImage /> });

export default async function MyProfileContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <div className={styles.wrapper}>
        <Header />
        <main>
          <ProfileImage />
        </main>
      </div>
    </ToastPositioner>
  );
}
