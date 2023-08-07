"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components";

// TODO: server component 분리
export default function NotFound() {
  const { replace } = useRouter();

  return (
    <div>
      없는 페이지임..
      <Button full color="primary" type="button" onClick={() => replace("/")}>
        돌아가기
      </Button>
    </div>
  );
}
