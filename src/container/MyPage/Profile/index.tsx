import dynamic from "next/dynamic";
import Link from "next/link";

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
const Birth = dynamic(() => import("./Birth"), { ssr: false, loading: () => <LoadingItem label="생년월일" /> });
const PhoneNumber = dynamic(() => import("./PhoneNumber"), {
  ssr: false,
  loading: () => <LoadingItem label="전화번호" />,
});

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
            <Birth />
            <PhoneNumber />
          </section>
          <Link href="/" className={styles.resign}>
            서비스 탈퇴
          </Link>
        </main>
      </div>
    </ToastPositioner>
  );
}
