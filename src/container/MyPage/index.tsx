import { TOAST_BOTTOM_WITH_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";
import { BottomNavigation, Footer } from "@/components/Layout";

import {
  AppVersionItem,
  CloseReservation,
  Info,
  Item,
  KakaoChannelChatItem,
  Logout,
  PartnerButton,
  PolicyItem,
  ServiceCenterItem,
  Title,
} from "./_sections";

import styles from "./myPage.module.scss";

export default async function MyContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITH_BOTTOM_NAVIGATION}>
      <div className={styles.wrapper}>
        <main>
          <Info />
          <div className={styles.content}>
            <CloseReservation />
            <Title className={styles.firstTitle}>고객지원</Title>
            <Item href="/my-page/announcements">공지사항</Item>
            <Item href="/my-page/frequent-questions">자주 묻는 질문 / FAQ</Item>
            <KakaoChannelChatItem />
            <ServiceCenterItem />
            <PartnerButton />
            <hr className={styles.divider} />
            <Title>설정</Title>
            <Item href="/settings">설정</Item>
            <PolicyItem />
            <AppVersionItem />
            <Logout />
          </div>
        </main>
        <Footer className={styles.footer} />
        <BottomNavigation />
      </div>
    </ToastPositioner>
  );
}
