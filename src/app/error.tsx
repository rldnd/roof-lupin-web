"use client";

import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import { Button } from "@/components";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const { reset: resetReactQueryError } = useQueryErrorResetBoundary();

  const onClickButton = () => {
    resetReactQueryError();
    reset();
  };

  return (
    <div>
      <h2>{error.name}</h2>
      <p>{error.message}</p>
      <Button full color="primary" onClick={onClickButton}>
        재시도
      </Button>
    </div>
  );
}
