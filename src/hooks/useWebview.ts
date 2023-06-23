import { useCallback, useState } from "react";

import type { BaseWebviewPayload, WithoutData } from "@/common/types/webview";
import { parseConverter, stringifyConverter } from "@/utils/json";
import { isClient } from "@/utils/next";
import { isWebview } from "@/utils/userAgent";

import useClientEffect from "./useClientEffect";

interface Listener {
  type: unknown;
  handler: (payload: unknown) => unknown;
}

type AddListener = <T extends BaseWebviewPayload>(type: T["type"], callback: (args: T["data"]) => unknown) => void;
type RemoveListener = <T extends BaseWebviewPayload>(type: T["type"]) => void;
type SendMessagePayload<T extends BaseWebviewPayload> = T["data"] extends WithoutData ? Omit<T, "data"> : T;
type SendMessage = <T extends BaseWebviewPayload>(payload: SendMessagePayload<T>) => void;

const checkHasWebviewConnected = (): boolean => {
  return typeof window.flutterWebview !== "undefined" || !isWebview;
};

interface ReturnUseWebview {
  addListener: AddListener;
  removeListener: RemoveListener;
  sendMessage: SendMessage;
}

const useWebview = (): ReturnUseWebview => {
  const [listeners, setListeners] = useState<Listener[]>([]);

  const addListener: AddListener = useCallback((type, callback) => {
    setListeners((prev) => [...prev.filter((listener) => listener.type !== type), { type, handler: callback }]);
  }, []);

  const removeListener: RemoveListener = useCallback((type) => {
    setListeners((prev) => prev.filter((listener) => listener.type !== type));
  }, []);

  const sendMessage: SendMessage = useCallback((payload) => {
    if (!checkHasWebviewConnected() || !isClient) return;

    window.flutterWebview?.postMessage(stringifyConverter(payload));
  }, []);

  useClientEffect(() => {
    if (!checkHasWebviewConnected()) return;

    const handleListener = (event: any) => {
      const payload = event.data;
      const parsedPayload = parseConverter<BaseWebviewPayload>(payload);

      const handler = listeners.find((listener) => listener.type === parsedPayload.type)?.handler;
      if (handler) handler(parsedPayload.data);
    };

    window.addEventListener("message", handleListener);
    document.addEventListener("message", handleListener);

    return () => {
      window.removeEventListener("message", handleListener);
      document.removeEventListener("message", handleListener);
    };
  }, [listeners]);

  return {
    addListener,
    removeListener,
    sendMessage,
  };
};

export default useWebview;
