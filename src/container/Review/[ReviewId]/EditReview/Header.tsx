"use client";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { BackButton, Loading } from "@/components";
import { useToast } from "@/hooks";
import { createReviewApi } from "@/services/review";
import { createReviewBodyState, initialCreateReviewBody } from "@/states";

import { IconClose } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const [body, setBody] = useAtom(createReviewBodyState);

  const { mutate, isLoading } = useMutation(createReviewApi, {
    onSuccess: () => {
      setBody(initialCreateReviewBody);
      addToast({ message: "리뷰가 등록되었어요!" });
      queryClient.refetchQueries(["paginateReviews"]);
      queryClient.refetchQueries(["paginateMyReviews"]);
      queryClient.refetchQueries(["getMyReviewsCount"]);
      queryClient.refetchQueries(["paginateMyReservations"]);
      replace("/my-page/reviews");
    },
  });

  const onClickSubmit = () => {
    mutate(body);
  };

  return (
    <>
      <header className={styles.wrapper}>
        <BackButton className={styles.closeButton}>
          <IconClose />
        </BackButton>
        <button className={styles.submitButton} onClick={onClickSubmit}>
          완료
        </button>
      </header>
      <Loading isShow={isLoading} />
    </>
  );
};

export default Header;
