import { Form, Header } from "@/container/Auth/Login";

import styles from "./loginPage.module.scss";

export default async function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main>
        <h1>세상의 모든 옥상은 루프루팡에서.</h1>
        <Form />
      </main>
    </div>
  );
}
