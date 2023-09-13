"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { BackButton, Loading } from "@/components";
import { useToast } from "@/hooks";
import { getErrorMessage } from "@/services/apiClient";
import { uploadImagesApi } from "@/services/file";
import { updateReviewApi } from "@/services/review";
import { initialUpdateReviewBody, type TempUpdateReviewBody, updateReviewBodyState } from "@/states";

import { IconClose } from "public/icons";

import styles from "./header.module.scss";

interface ReturnGetUploadImagesIndexOnTempImages {
  uploadedImageIndex: number;
  tempImageIndex: number;
}

const getUploadImagesIndexOnTempImages = (
  tempImages: TempUpdateReviewBody["tempImages"],
): ReturnGetUploadImagesIndexOnTempImages[] => {
  let uploadedImageIndex = 0;
  return tempImages
    .map((tempImage, tempImageIndex) => {
      if (tempImage.file) return { tempImageIndex, uploadedImageIndex: uploadedImageIndex++ };
    })
    .filter(Boolean);
};

const Header: React.FC = () => {
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const [body, setBody] = useAtom(updateReviewBodyState);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation(updateReviewApi, {
    onSuccess: () => {
      setBody(initialUpdateReviewBody);
      addToast({ message: "리뷰가 수정되었어요!" });
      queryClient.refetchQueries(["paginateReviews"]);
      queryClient.refetchQueries(["paginateMyReviews"]);
      queryClient.refetchQueries(["getMyReviewsCount"]);
      queryClient.refetchQueries(["paginateMyReservations"]);
      replace("/my-page/reviews");
    },
    onError: (err) => {
      addToast({ message: getErrorMessage(err, "리뷰 수정에 실패했어요!") });
      setIsLoading(false);
    },
  });

  const { mutate: uploadImage, isLoading: isLoadingUploadImage } = useMutation(uploadImagesApi, {
    onSuccess: ({ data }) => {
      setIsLoading(true);
      const images = data.map((item) => item.url);
      const { content, tempImages, score, reviewId } = body;
      const indexObject = getUploadImagesIndexOnTempImages(tempImages);
      const parsedImages = tempImages.map<string>((tempImage, idx) => {
        if (tempImage.file) {
          const imageIndexObject = indexObject.find((item) => item.tempImageIndex === idx);
          if (!imageIndexObject) addToast({ message: "이미지 업로드에 실패했어요!" });
          return images[imageIndexObject!.uploadedImageIndex];
        }
        return tempImage.preview;
      });
      mutate({ content, images: parsedImages, score, reviewId });
    },
    onError: () => addToast({ message: "지원하지 않는 확장자 파일이 포함되어 있습니다!" }),
  });

  const onClickSubmit = () => {
    const formData = new FormData();
    for (const tempImage of body.tempImages) {
      if (tempImage.file) formData.append("images", tempImage.file);
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
      <Loading isShow={isLoadingUploadImage || isLoading} />
    </>
  );
};

export default Header;
