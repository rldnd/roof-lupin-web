"use client";

import { useParams, useRouter } from "next/navigation";

import { ArrowButton } from "@/components";

interface Props {
  reviewCount: number;
}

const ReviewButton: React.FC<Props> = ({ reviewCount }) => {
  const { spaceId } = useParams();
  const { push } = useRouter();

  const onClick = () => {
    push(`/spaces/${spaceId}/reviews`);
  };

  return (
    <ArrowButton direction="right" isBold color="primary" onClick={onClick}>
      리뷰 {reviewCount}개
    </ArrowButton>
  );
};

export default ReviewButton;
