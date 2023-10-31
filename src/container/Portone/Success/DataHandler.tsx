"use client";

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

import { useMe } from "@/hooks/queries";
import { certificatePhoneApi } from "@/services/user";
import { getHistoryStackUrl } from "@/utils/navigation";

const DataHandler: React.FC = () => {
  const { refetchMe } = useMe();
  const { mutateAsync: certificatePhone } = useMutation(certificatePhoneApi, { onSuccess: refetchMe });
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const impUid = searchParams.get("imp_uid");
    const success = searchParams.get("success");

    if (success === "true" && impUid) {
      certificatePhone({ imp_uid: impUid })
        .then(() => {
          const historyStackUrl = getHistoryStackUrl();
          const beforeUrl = historyStackUrl?.reverse().find((url) => !url.includes("/portone/success"));
          router.replace(beforeUrl ?? "/");
        })
        .catch(() => {
          throw Error("본인 인증에 실패하였습니다.");
        });
    } else {
      throw Error("잘못된 접근입니다.");
    }
  }, [searchParams, router, certificatePhone]);

  return null;
};

export default DataHandler;
