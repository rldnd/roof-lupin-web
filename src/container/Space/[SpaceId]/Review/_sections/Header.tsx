"use client";

import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { BaseHeader } from "@/components/Layout";
import { getReviewsSummaryApi } from "@/services/review";

const Header: React.FC = () => {
  const { spaceId } = useParams();
  const { data } = useQuery(["getReviewsSummary", spaceId], () =>
    getReviewsSummaryApi(spaceId).then((res) => res.data),
  );

  return <BaseHeader title={data?.count ? `리뷰 (${data.count}개)` : "리뷰"} replaceUrl={`/spaces/${spaceId}`} />;
};

export default Header;
