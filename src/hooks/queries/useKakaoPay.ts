import { useMutation } from "@tanstack/react-query";

import type { ErrorDTO } from "@/common/types/common";
import type { ApproveKakaoPayment, PrepareKakaoPayment } from "@/common/types/payment";
import type { CreateReservation } from "@/common/types/reservation";
import { isAxiosError } from "@/services/apiClient";
import { completePaymentKakaoApi, preparePaymentKakaoApi } from "@/services/payment";
import type { AxiosResponse } from "axios";

import { usePlatform, useToast } from "..";

interface ReturnUseKakaoPay {
  prepareKakaoPay(body: CreateReservation): Promise<AxiosResponse<PrepareKakaoPayment>>;
  completeKakaoPay(body: ApproveKakaoPayment): Promise<AxiosResponse<{ id: string }>>;
  isPrepareSuccess: boolean;
  isPrepareError: boolean;
  isPaySuccess: boolean;
  isPayError: boolean;
}

const useKakaoPay = (): ReturnUseKakaoPay => {
  const { isWebview, isMobile, isPc } = usePlatform();
  const { addToast } = useToast();

  const {
    mutateAsync: prepareKakaoPay,
    isSuccess: isPrepareSuccess,
    isError: isPrepareError,
  } = useMutation(preparePaymentKakaoApi, {
    onSuccess: (data) => {
      if (isPc) window.open(data.data.nextRedirectPcUrl, "_self");
      if (isMobile) window.open(data.data.nextRedirectMobileUrl, "_self");
      // TODO: 체크해라..
      if (isWebview) window.open(data.data.nextRedirectAppUrl, "_self");
    },
    onError: (error) => {
      if (isAxiosError<ErrorDTO>(error)) {
        addToast({ message: `status: ${error.response?.data.statusCode} / message: ${error.response?.data.message}` });
      } else addToast({ message: JSON.stringify(error) });
    },
  });

  const {
    mutateAsync: completeKakaoPay,
    isSuccess: isPaySuccess,
    isError: isPayError,
  } = useMutation(completePaymentKakaoApi, {
    onError: (error) => {
      if (isAxiosError<ErrorDTO>(error)) {
        addToast({ message: `status: ${error.response?.data.statusCode} / message: ${error.response?.data.message}` });
      } else addToast({ message: JSON.stringify(error) });
    },
  });

  return {
    prepareKakaoPay,
    completeKakaoPay,
    isPayError,
    isPaySuccess,
    isPrepareError,
    isPrepareSuccess,
  };
};

export default useKakaoPay;
