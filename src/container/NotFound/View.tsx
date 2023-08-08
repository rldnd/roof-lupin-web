"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components";

export const View: React.FC = () => {
  const { replace } = useRouter();

  return (
    <div>
      없는 페이지임..
      <Button full color="primary" type="button" onClick={() => replace("/")}>
        돌아가기
      </Button>
    </div>
  );
};
