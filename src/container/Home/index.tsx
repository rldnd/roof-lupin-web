"use client";

import Link from "next/link";

import { useMe } from "@/hooks/queries";

import styles from "./home.module.scss";

const HomeContainer: React.FC = () => {
  const { me, onLogout, isLogined } = useMe();

  return (
    <div className={styles.wrapper}>
      {isLogined && (
        <section className={styles.myInfo}>
          <p>계정 아이디: {me?.id}</p>
          {me?.profileImage && (
            <p>
              프로필 이미지: <img src={me.profileImage} width="120px" height="120px" />
            </p>
          )}
          <p>이메일: {me?.email}</p>
          <p>닉네임: {me?.nickname}</p>
          <button type="button" onClick={onLogout}>
            로그아웃 하기
          </button>
        </section>
      )}
      {!isLogined && (
        <section className={styles.loginSection}>
          <p>로그인이 되어있지 않습니다!</p>
          <Link href="/auth/login">로그인 하러 가기</Link>
        </section>
      )}
    </div>
  );
};

export default HomeContainer;
