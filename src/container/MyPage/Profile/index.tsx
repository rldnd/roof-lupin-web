import dynamic from "next/dynamic";

import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";

import Header from "./Header";
import { LoadingItem } from "./Item";
import { LoadingProfileImage } from "./ProfileImage";

import styles from "./myProfileContainer.module.scss";

const ProfileImage = dynamic(() => import("./ProfileImage"), { ssr: false, loading: () => <LoadingProfileImage /> });
const Nickname = dynamic(() => import("./Nickname"), { ssr: false, loading: () => <LoadingItem label="닉네임" /> });
const Email = dynamic(() => import("./Email"), { ssr: false, loading: () => <LoadingItem label="이메일" /> });
const Gender = dynamic(() => import("./Gender"), { ssr: false, loading: () => <LoadingItem label="성별" /> });

export default async function MyProfileContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <div className={styles.wrapper}>
        <Header />
        <main>
          <ProfileImage />
          <section className={styles.infoWrapper}>
            <Nickname />
            <Email />
            <Gender />
          </section>
        </main>
      </div>
    </ToastPositioner>
  );
}
