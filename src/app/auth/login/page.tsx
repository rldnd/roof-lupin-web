/* eslint-disable @next/next/no-img-element */

import Image from "next/image";

import { Back, Form } from "@/container/Auth/Login";
import { getMainApi } from "@/services/main";

import styles from "./loginPage.module.scss";

export default async function LoginPage() {
  const { data } = await getMainApi();

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.backgroundImage}
        src={data.mainImage}
        width="100%"
        height="100%"
        alt="로그인 배경 이미지"
      />
      <main>
        <Back />
        <Image src={"/images/auth/login-logo.png"} width={100} height={112} alt="로그인 화면 로고" />
        <p className={styles.slogan}>{data.content}</p>
        <Form />
      </main>
    </div>
  );
}
