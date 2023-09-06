"use client";

import type { Review } from "@/common/types/review";
import { MySpaceReview, UnorderedInfiniteScroll } from "@/components";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateMyReviewsApi } from "@/services/review";

// TODO: MySpaceReview 컴포넌트 제작
const List: React.FC = () => {
  const { data, isFetching, isSuccess, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery<Review>(
    ["paginateMyReviews"],
    ({ pageParam = 1 }) => paginateMyReviewsApi({ page: pageParam, limit: 10 }),
  );

  return (
    <UnorderedInfiniteScroll
      hasNextPage={hasNextPage}
      isSuccess={isSuccess}
      isFetching={isFetching}
      fetchNextPage={fetchNextPage}
      loadingComponent={<LoadingList />}
    >
      {data.pages.map((review) => (
        <MySpaceReview key={review.id} review={review} />
      ))}
    </UnorderedInfiniteScroll>
  );
};

export default List;

export const LoadingList: React.FC = () => {
  return null;
};
