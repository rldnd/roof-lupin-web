import dynamic from "next/dynamic";

import { HeightFitLayout } from "@/components/Layout";

import { LoadingForm } from "./Form";
import Header from "./Header";

import styles from "./editQuestionContainer.module.scss";

const Form = dynamic(() => import("./Form"), { ssr: false, loading: () => <LoadingForm /> });

export default async function EditQuestionContainer() {
  return (
    <HeightFitLayout className={styles.wrapper}>
      <Header />
      <main>
        <div className={styles.desc}>
          궁금한 내용을 적어주세요.
          <br />
          호스트가 확인 후 답변해드려요.
        </div>
        <Form />
      </main>
    </HeightFitLayout>
  );
}
