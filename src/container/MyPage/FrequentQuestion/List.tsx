"use client";

import { range } from "lodash-es";

import { FrequentQuestion } from "@/common/types/frequentQuestion";
import { useSuspenseQuery } from "@/hooks";
import { getFrequentQuestionsApi } from "@/services/frequentQuestion";

import Empty from "./Empty";
import Item, { LoadingItem } from "./Item";

const List: React.FC = () => {
  const { data } = useSuspenseQuery<FrequentQuestion[]>(["frequentQuestions"], getFrequentQuestionsApi);

  if (data.length === 0) return <Empty />;

  return (
    <ul>
      {data.map((item) => (
        <Item key={item.id} frequentQuestion={item} />
      ))}
    </ul>
  );
};

export default List;

export const LoadingList: React.FC = () => {
  return (
    <>
      {range(10).map((value) => (
        <LoadingItem key={value} />
      ))}
    </>
  );
};
