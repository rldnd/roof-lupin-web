import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";
import { BottomNavigation, Footer } from "@/components/Layout";

import { AppVersionItem, CloseReservation, Info, Item, Title } from "./_sections";

import styles from "./myPage.module.scss";

export default async function MyContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <div className={styles.wrapper}>
        <main>
          <Info />
          <div className={styles.content}>
            <CloseReservation />
            <Title className={styles.firstTitle}>고객지원</Title>
            <Item href="/announcements">공지사항</Item>
            <Item>자주 묻는 질문 / FAQ</Item>
            <Item>카카오톡 1:1 문의</Item>
            <Item>이벤트</Item>
            <Item>고객센터</Item>
            <Item>
              루프루팡 파트너스<span className={styles.chipSecondary}>호스트 전용</span>
            </Item>
            <hr className={styles.divider} />
            <Title>설정</Title>
            <Item>설정</Item>
            <Item>약관 및 정책</Item>
            <AppVersionItem />
          </div>
        </main>
        <Footer className={styles.footer} />
        <BottomNavigation />
      </div>
    </ToastPositioner>
  );
}
