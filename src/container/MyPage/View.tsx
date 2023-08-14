"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components";
import { BottomNavigation } from "@/components/Layout";
import { useMe } from "@/hooks/queries";

import styles from "./myPage.module.scss";

// TODO: server / client 분리
const MyPage: React.FC = () => {
  const { replace } = useRouter();
  const { me, onLogout } = useMe();

  const onClickLogout = () => {
    onLogout();
    replace("/");
  };

  return (
    <main className={styles.wrapper}>
      <dl>
        <dt>이름</dt>
        <dd>{me?.name ?? "익명"}</dd>
        <dt>닉네임</dt>
        <dd>{me?.nickname ?? "닉네임"}</dd>
        <dt>이메일</dt>
        <dd>{me?.email ?? ""}</dd>
        <dt>성별</dt>
        <dd>{me?.gender ?? ""}</dd>
      </dl>
      <Button color="secondary" full type="button" onClick={onClickLogout} className={styles.logout}>
        로그아웃
      </Button>
      <BottomNavigation />
    </main>
  );
};

export default MyPage;
