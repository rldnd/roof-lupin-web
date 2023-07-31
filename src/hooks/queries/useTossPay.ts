import { useMutation } from "@tanstack/react-query";

import { ConfirmTossPayment } from "@/common/types/payment";
import type { CreateReservation } from "@/common/types/reservation";
import { completePaymentTossApi, preparePaymentTossApi } from "@/services/payment";
import type { AxiosResponse } from "axios";

interface ReturnUseTossPay {
  prepareTossPay(body: CreateReservation): Promise<AxiosResponse<{ url: string }>>;
  completeTossPay(body: ConfirmTossPayment): Promise<AxiosResponse<{ id: string }>>;
}

const useTossPay = (): ReturnUseTossPay => {
  const { mutateAsync: prepareTossPay } = useMutation(preparePaymentTossApi, {
    onSuccess: (data) => window.open(data.data.url, "_self"),
  });

  const { mutateAsync: completeTossPay } = useMutation(completePaymentTossApi);

  return {
    prepareTossPay,
    completeTossPay,
  };
};

export default useTossPay;
