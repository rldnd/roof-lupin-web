import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants/toast";
import { BackButton, ToastPositioner } from "@/components";
import { getMainApi } from "@/services/main";

import Form from "./Form";

import styles from "./loginContainer.module.scss";

export default async function LoginContainer() {
  const main = await getMainApi();

  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <div className={styles.wrapper}>
        <img className={styles.backgroundImage} src={main.mainImage} alt="로그인 배경 이미지" />
        <main>
          <BackButton className={styles.backButton}>둘러보기</BackButton>
          <img src={"/images/auth/login-logo.png"} width={100} height={132} alt="로그인 화면 로고" />
          <p className={styles.slogan}>{main.content}</p>
          <Form />
        </main>
      </div>
    </ToastPositioner>
  );
}
