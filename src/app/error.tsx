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
      <h2>{JSON.stringify(error)}</h2>
      <Button full color="primary" onClick={onClickButton}>
        재시도
      </Button>
    </div>
  );
}
