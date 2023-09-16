import dynamic from "next/dynamic";

import { BaseCenterHeader } from "@/components/Layout";

import Form from "./Form";
import Text from "./Text";
import { LoadingTitle } from "./Title";

import styles from "./resignContainer.module.scss";

const Title = dynamic(() => import("./Title"), { ssr: false, loading: () => <LoadingTitle /> });

export default async function ResignContainer() {
  return (
    <div className={styles.wrapper}>
      <BaseCenterHeader title="탈퇴" />
      <main>
        <Title />
        <Text />
        <Form />
      </main>
    </div>
  );
}
