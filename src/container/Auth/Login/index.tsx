import Image from "next/image";

import { getMainApi } from "@/services/main";

import Back from "./Back";
import Form from "./Form";

import styles from "./loginContainer.module.scss";

export default async function LoginContainer() {
  const { data } = await getMainApi();

  return (
    <div className={styles.wrapper}>
      <div className={styles.backgroundImageWrapper}>
        <Image className={styles.backgroundImage} src={data.mainImage} priority fill alt="로그인 배경 이미지" />
      </div>
      <main>
        <Back />
        <Image src={"/images/auth/login-logo.png"} width={100} height={112} alt="로그인 화면 로고" />
        <p className={styles.slogan}>{data.content}</p>
        <Form />
      </main>
    </div>
  );
}
