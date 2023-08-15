"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { ArrowButton } from "@/components";

interface Props {
  reviewCount: number;
}

const ReviewButton: React.FC<Props> = ({ reviewCount }) => {
  const { spaceId } = useParams();

  return (
    <Link href={`/spaces/${spaceId}/reviews`}>
      <ArrowButton direction="right" isBold color="primary">
        리뷰 {reviewCount}개
      </ArrowButton>
    </Link>
  );
};

export default ReviewButton;
