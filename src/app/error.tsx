"use client";

import { QueryErrorResetBoundary, useQueryErrorResetBoundary } from "@tanstack/react-query";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const { reset: resetReactQueryError } = useQueryErrorResetBoundary();

  const onClickButton = () => {
    resetReactQueryError();
    reset();
  };

  return (
    <QueryErrorResetBoundary>
      <div>
        <h2>{JSON.stringify(error)}</h2>
        <button onClick={onClickButton}>재시도</button>
      </div>
    </QueryErrorResetBoundary>
  );
}
