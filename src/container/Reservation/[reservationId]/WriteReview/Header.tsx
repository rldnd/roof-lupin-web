"use client";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";

import type { ErrorDTO } from "@/common/types/common";
import { BackButton, Loading } from "@/components";
import { useToast } from "@/hooks";
import { isAxiosError } from "@/services/apiClient";
import { uploadImagesApi } from "@/services/file";
import { createReviewApi } from "@/services/review";
import { createReviewBodyState, initialCreateReviewBody } from "@/states";

import { IconClose } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const [body, setBody] = useAtom(createReviewBodyState);

  const { mutate, isLoading: isLoadingMutate } = useMutation(createReviewApi, {
    onSuccess: () => {
      setBody(initialCreateReviewBody);
      addToast({ message: "리뷰가 등록되었어요!" });
      queryClient.refetchQueries(["paginateReviews"]);
      queryClient.refetchQueries(["paginateMyReviews"]);
      queryClient.refetchQueries(["getMyReviewsCount"]);
      queryClient.refetchQueries(["paginateMyReservations"]);
      replace("/my-page/reviews");
    },
    onError: (data) => {
      if (isAxiosError<ErrorDTO>(data)) {
        addToast({ message: data.response?.data.message || "리뷰 등록에 실패했어요!" });
      }
    },
  });

  const { mutate: uploadImage, isLoading: isLoadingUploadImage } = useMutation(uploadImagesApi, {
    onSuccess: ({ data }) => {
      const images = data.map((item) => item.url);
      const { content, reservationId, score, spaceId } = body;
      mutate({ content, images, reservationId, score, spaceId });
    },
    onError: () => addToast({ message: "지원하지 않는 확장자 파일이 포함되어 있습니다!" }),
  });

  const onClickSubmit = () => {
    const formData = new FormData();
    for (const tempImage of body.tempImages) {
      formData.append("images", tempImage.file);
    }
    uploadImage(formData);
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
      <Loading isShow={isLoadingUploadImage || isLoadingMutate} />
    </>
  );
};

export default Header;
