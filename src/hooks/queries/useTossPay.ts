import { useMutation } from "@tanstack/react-query";

import type { ErrorDTO } from "@/common/types/common";
import { ConfirmTossPayment } from "@/common/types/payment";
import type { CreateReservation } from "@/common/types/reservation";
import { isAxiosError } from "@/services/apiClient";
import { completePaymentTossApi, preparePaymentTossApi } from "@/services/payment";
import type { AxiosResponse } from "axios";

import { useToast } from "..";

interface ReturnUseTossPay {
  prepareTossPay(body: CreateReservation): Promise<AxiosResponse<{ url: string }>>;
  completeTossPay(body: ConfirmTossPayment): Promise<AxiosResponse<{ id: string }>>;
  isPrepareSuccess: boolean;
  isPrepareError: boolean;
  isPaySuccess: boolean;
  isPayError: boolean;
}

const useTossPay = (): ReturnUseTossPay => {
  const { addToast } = useToast();

  const {
    mutateAsync: prepareTossPay,
    isSuccess: isPrepareSuccess,
    isError: isPrepareError,
  } = useMutation(preparePaymentTossApi, {
    onSuccess: (data) => window.open(data.data.url, "_self"),
    onError: (error) => {
      if (isAxiosError<ErrorDTO>(error)) {
        addToast({ message: `status: ${error.response?.data.statusCode} / message: ${error.response?.data.message}` });
      } else addToast({ message: JSON.stringify(error) });
    },
  });

  const {
    mutateAsync: completeTossPay,
    isSuccess: isPaySuccess,
    isError: isPayError,
  } = useMutation(completePaymentTossApi, {
    onError: (error) => {
      if (isAxiosError<ErrorDTO>(error)) {
        addToast({ message: `status: ${error.response?.data.statusCode} / message: ${error.response?.data.message}` });
      } else addToast({ message: JSON.stringify(error) });
    },
  });

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
