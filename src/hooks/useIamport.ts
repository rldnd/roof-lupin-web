import { useCallback } from "react";

import { useMutation } from "@tanstack/react-query";

import type { Iamport } from "@/common/types/iamport";
import { certificatePhoneApi } from "@/services/user";

import { useToast } from ".";
import { useMe } from "./queries";

interface ReturnUseIamport {
  requestCertificate(): void;
}

const useIamport = (): ReturnUseIamport => {
  const { refetchMe } = useMe();
  const { addToast } = useToast();
  const { mutateAsync: certificatePhone } = useMutation(certificatePhoneApi, { onSuccess: refetchMe });

  const requestCertificate = useCallback(() => {
    const IMP = window.IMP;
    if (!isIMPLoaded(IMP)) throw new Error("본인인증 모듈을 불러올 수 없습니다.");
    IMP.init(process.env.NEXT_PUBLIC_IAMPORT_UID!);
    IMP.certification(
      {
        pg: process.env.NEXT_PUBLIC_IAMPORT_PG,
        merchant_uid: new Date().toISOString(),
        m_redirect_url: `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/portone/success`,
        popup: false,
      },
      async (response) => {
        if (response.success) {
          await certificatePhone({ imp_uid: response.imp_uid });
        } else {
          addToast({ message: "본인 인증에 실패하였습니다." });
        }
      },
    );
  }, [addToast, certificatePhone]);

  return {
    requestCertificate,
  };
};

export default useIamport;

const isIMPLoaded = (IMP: Iamport | undefined): IMP is Iamport => {
  return typeof IMP !== "undefined";
};
