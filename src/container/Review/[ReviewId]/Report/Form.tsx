"use client";

import { type ChangeEventHandler, type FormEventHandler, useRef, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

import { Button, Radio, Textarea } from "@/components";
import { usePopConfirm, useToast } from "@/hooks";
import { createReviewReportApi } from "@/services/report";

import styles from "./form.module.scss";

const Form: React.FC = () => {
  const { openPopConfirm } = usePopConfirm();
  const { addToast } = useToast();
  const { reviewId } = useParams();
  const { back } = useRouter();
  const [checked, setChecked] = useState(0);
  const [input, setInput] = useState("");
  const contentRef = useRef("");

  const { mutate } = useMutation(createReviewReportApi, {
    onSuccess: () => {
      addToast({ message: "신고가 정상적으로 접수되었습니다." });
      back();
    },
  });

  const onChangeRadio: ChangeEventHandler<HTMLInputElement> = (e) => {
    setChecked(Number(e.currentTarget.value));
    contentRef.current = e.currentTarget.title;
    setInput("");
  };

  const onChangeTextarea: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { value } = e.currentTarget;
    if (value.length > 1000) return;
    setInput(value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const content = checked === 6 ? input : contentRef.current;

    openPopConfirm({
      title: "선택한 사유로 신고하시겠어요?",
      description: "검토 후 최대한 빠르게 조치하도록 하겠습니다.",
      onConfirm: () => mutate({ reviewId, content }),
    });
  };

  return (
    <form className={styles.wrapper} onSubmit={onSubmit}>
      <Radio value={1} checked={checked === 1} title="욕설/혐오/차별적 표현" onChange={onChangeRadio}>
        욕설/혐오/차별적 표현
      </Radio>
      <Radio value={2} checked={checked === 2} title="개인정보 포함 또는 유출 위험" onChange={onChangeRadio}>
        개인정보 포함 또는 유출 위험
      </Radio>
      <Radio value={3} checked={checked === 3} title="불쾌한 표현" onChange={onChangeRadio}>
        불쾌한 표현
      </Radio>
      <Radio value={4} checked={checked === 4} title="음란성 또는 청소년에게 유해한 내용" onChange={onChangeRadio}>
        음란성 또는 청소년에게 유해한 내용
      </Radio>
      <Radio value={5} checked={checked === 5} title="사실과 다르거나 비방성 내용" onChange={onChangeRadio}>
        사실과 다르거나 비방성 내용
      </Radio>
      <Radio value={6} checked={checked === 6} onChange={onChangeRadio}>
        기타
      </Radio>
      {checked === 6 && (
        <div className={styles.textareaWrapper}>
          <Textarea
            outlined
            className={styles.textarea}
            placeholder="신고 사유를 5자 이상 작성해주세요."
            value={input}
            onChange={onChangeTextarea}
          />
          <span className={styles.count}>{input.length}/1000</span>
        </div>
      )}
      <footer className={styles.footer}>
        <Button type="submit" color="primary" full disabled={!checked || (checked === 6 && input.length < 5)}>
          신고하기
        </Button>
      </footer>
    </form>
  );
};

export default Form;
