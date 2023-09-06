"use client";

import { type ChangeEventHandler, type FormEventHandler, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button, Textarea } from "@/components";
import { useToast } from "@/hooks";
import { createQnaApi } from "@/services/qna";
import { revalidateApi } from "@/services/revalidate";

import styles from "./form.module.scss";

const Form: React.FC = () => {
  const queryClient = useQueryClient();
  const { spaceId } = useParams();
  const { addToast } = useToast();
  const { replace } = useRouter();

  const [value, setValue] = useState("");

  const { mutate } = useMutation(createQnaApi, {
    onSuccess: async () => {
      await Promise.all([
        queryClient.refetchQueries(["paginateSpaceQnas", spaceId]),
        revalidateApi({ tag: `/spaces/${spaceId}/detail` }),
      ]);
      addToast({ message: "질문이 등록되었어요!" });
      replace(`/spaces/${spaceId}/qnas`);
    },
  });

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { value } = e.currentTarget;
    setValue(value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate({ spaceId, content: value });
  };

  return (
    <form className={styles.wrapper} onSubmit={onSubmit}>
      <Textarea
        value={value}
        onChange={onChange}
        className={styles.textarea}
        placeholder={` •  공간에 대해 궁금한 점을 작성해주세요.\n •  질문은 공개 상태로만 등록할 수 있어요.\n •  공간 및 예약에 대한 문의가 아닌 글은 무통보 삭제될 수 있어요.\n •  질문 수정은 질문 등록 후 72시간 이내에만 가능해요.`}
      />
      <footer className={styles.footer}>
        <Button type="submit" color="primary" full disabled={value.length === 0}>
          질문하기
        </Button>
      </footer>
    </form>
  );
};

export default Form;
