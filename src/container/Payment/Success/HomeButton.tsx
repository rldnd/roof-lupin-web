"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components";

const HomeButton: React.FC = () => {
  const router = useRouter();

  return (
    <Button type="button" onClick={() => router.replace("/")} color="primary" full>
      홈으로
    </Button>
  );
};

export default HomeButton;
