/* eslint-disable @next/next/no-img-element */

import Image from "next/image";

import { Back, Form } from "@/container/Auth/Login";
import { getHomeApi } from "@/services/home";

import styles from "./loginPage.module.scss";

export default async function LoginPage() {
  const { data } = await getHomeApi();

  return (
    <div className={styles.wrapper}>
      <img className={styles.backgroundImage} src={data.homeImage} alt="로그인 배경 이미지" />
      <main>
        <Back />
        <Image src={"/images/auth/login-logo.png"} width={100} height={112} alt="로그인 화면 로고" />
        <p className={styles.slogan}>{data.content}</p>
        <Form />
      </main>
    </div>
  );
}
