"use client";

import { useCallback } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";

import type {
  AppAuthPushTokenChangedPayload,
  AppAuthPushTokenData,
  AppAuthPushTokenPayload,
  WebAuthRequestPushTokenPayload,
} from "@/common/types/webview/auth";
import { useClientEffect, useWebview } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { getMyPushTokenApi, updateMeApi } from "@/services/user";

const PushTokenHandler: React.FC = () => {
  const { me, refetchMe } = useMe();
  const { addListener, sendMessage, removeListener } = useWebview();

  const { data: myPushToken } = useQuery(["getMyPushToken", me], () => getMyPushTokenApi().then((res) => res.data), {
    enabled: Boolean(me),
  });
  const { mutate: updateMe } = useMutation(updateMeApi, { onSuccess: () => refetchMe() });

  const checkPushTokenDifferent = useCallback(
    ({ pushToken }: AppAuthPushTokenData) => {
      if (myPushToken?.pushToken !== pushToken) updateMe({ pushToken });
    },
    [myPushToken?.pushToken, updateMe],
  );

  useClientEffect(() => {
    if (!me) return;

    sendMessage<WebAuthRequestPushTokenPayload>({ type: "web-auth/requestPushToken" });
    addListener<AppAuthPushTokenPayload>("app-auth/pushToken", checkPushTokenDifferent);
    addListener<AppAuthPushTokenChangedPayload>("app-auth/pushTokenChanged", checkPushTokenDifferent);

    return () => {
      removeListener<AppAuthPushTokenPayload>("app-auth/pushToken");
      removeListener<AppAuthPushTokenChangedPayload>("app-auth/pushTokenChanged");
    };
  }, [me]);

  return null;
};

export default PushTokenHandler;
