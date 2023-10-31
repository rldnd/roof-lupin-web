import { useCallback } from "react";

import type { Iamport } from "@/common/types/iamport";

interface ReturnUseIamport {
  requestCertificate(): void;
}

const useIamport = (): ReturnUseIamport => {
  const requestCertificate = useCallback(async () => {
    const IMP = window.IMP;
    if (!isIMPLoaded(IMP)) throw new Error("본인인증 모듈을 불러올 수 없습니다.");
    IMP.init(process.env.NEXT_PUBLIC_IAMPORT_UID!);
    IMP.certification(
      {
        pg: process.env.NEXT_PUBLIC_IAMPORT_PG,
        merchant_uid: new Date().toISOString(),
        m_redirect_url: "http://localhost:3000/success",
        popup: false,
      },
      (response: any) => {
        console.log(response);
      },
    );
  }, []);

  return {
    requestCertificate,
  };
};

export default useIamport;

const isIMPLoaded = (IMP: Iamport | undefined): IMP is Iamport => {
  return typeof IMP !== "undefined";
};
