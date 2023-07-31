import { useMutation } from "@tanstack/react-query";

import { ConfirmTossPayment } from "@/common/types/payment";
import type { CreateReservation } from "@/common/types/reservation";
import { completePaymentTossApi, preparePaymentTossApi } from "@/services/payment";
import type { AxiosResponse } from "axios";

interface ReturnUseTossPay {
  prepareTossPay(body: CreateReservation): Promise<AxiosResponse<{ url: string }>>;
  completeTossPay(body: ConfirmTossPayment): Promise<AxiosResponse<{ id: string }>>;
  isPrepareSuccess: boolean;
  isPrepareError: boolean;
  isPaySuccess: boolean;
  isPayError: boolean;
}

const useTossPay = (): ReturnUseTossPay => {
  const {
    mutateAsync: prepareTossPay,
    isSuccess: isPrepareSuccess,
    isError: isPrepareError,
  } = useMutation(preparePaymentTossApi, {
    onSuccess: (data) => window.open(data.data.url, "_self"),
  });

  const {
    mutateAsync: completeTossPay,
    isSuccess: isPaySuccess,
    isError: isPayError,
  } = useMutation(completePaymentTossApi);

  return {
    prepareTossPay,
    completeTossPay,
    isPayError,
    isPaySuccess,
    isPrepareError,
    isPrepareSuccess,
  };
};

export default useTossPay;
