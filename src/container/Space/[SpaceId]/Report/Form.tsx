"use client";

import { type ChangeEventHandler, type FormEventHandler, useRef, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

import { Button, Radio, Textarea } from "@/components";
import { usePopConfirm, useToast } from "@/hooks";
import { createSpaceReportApi } from "@/services/report";

import styles from "./form.module.scss";

const Form: React.FC = () => {
  const { openPopConfirm } = usePopConfirm();
  const { addToast } = useToast();
  const { spaceId } = useParams();
  const { back } = useRouter();
  const [checked, setChecked] = useState(0);
  const [input, setInput] = useState("");
  const contentRef = useRef("");

  const { mutate } = useMutation(createSpaceReportApi, {
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
    const content = checked === 5 ? input : contentRef.current;

    openPopConfirm({
      title: "선택한 사유로 신고하시겠어요?",
      description: "검토 후 최대한 빠르게 조치하도록 하겠습니다.",
      onConfirm: () => mutate({ spaceId, content }),
    });
  };

  return (
    <form className={styles.wrapper} onSubmit={onSubmit}>
      <Radio value={1} checked={checked === 1} title="호스트의 외부결제 유도" onChange={onChangeRadio}>
        호스트의 외부결제 유도
      </Radio>
      <Radio value={2} checked={checked === 2} title="호스트의 불쾌한 태도" onChange={onChangeRadio}>
        호스트의 불쾌한 태도
      </Radio>
      <Radio value={3} checked={checked === 3} title="호스트의 예약관리 부주의" onChange={onChangeRadio}>
        호스트의 예약관리 부주의
      </Radio>
      <Radio value={4} checked={checked === 4} title="공간 정보 및 이미지에 문제가 있음" onChange={onChangeRadio}>
        공간 정보 및 이미지에 문제가 있음
      </Radio>
      <Radio value={5} checked={checked === 5} onChange={onChangeRadio}>
        기타
      </Radio>
      {checked === 5 && (
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
