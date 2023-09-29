"use client";

import { useRouter } from "next/navigation";

import { AuthChecker, Button } from "@/components";

import styles from "./question.module.scss";

interface Props {
  spaceId: string;
}

const Question: React.FC<Props> = ({ spaceId }) => {
  const { push } = useRouter();

  const onClickButton = () => {
    push(`/spaces/${spaceId}/qnas/create-question`);
  };

  return (
    <section className={styles.wrapper}>
      <span>궁금한 내용을 남겨주시면, 호스트가 확인 후 빠르게 답변 드려요.</span>
      <AuthChecker className={styles.authChecker} afterLoginPath={`/spaces/${spaceId}/qnas/create-question`}>
        <Button type="button" color="secondary" full onClick={onClickButton}>
          호스트에게 문의하기
        </Button>
      </AuthChecker>
    </section>
  );
};

export default Question;
