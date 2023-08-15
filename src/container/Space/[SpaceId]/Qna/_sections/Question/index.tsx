import Link from "next/link";

import { Button } from "@/components";

import styles from "./question.module.scss";

interface Props {
  spaceId: string;
}

const Question: React.FC<Props> = ({ spaceId }) => {
  return (
    <section className={styles.wrapper}>
      <span>궁금한 내용을 남겨주시면, 호스트가 확인 후 빠르게 답변 드려요.</span>
      <Link href={`/spaces/${spaceId}/qnas/question`}>
        <Button type="button" color="secondary" full>
          호스트에게 문의하기
        </Button>
      </Link>
    </section>
  );
};

export default Question;
