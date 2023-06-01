import "client-only";

import { decamelizeKeys } from "humps";

import "@/utils/ga";
import useDebounceCallback from "./useDebounceCallback";

interface UseGAReturn {
  gaEvent(evnetName: string, eventData: any): void;
}

// TODO: event category customize
const useGA = (): UseGAReturn => {
  const gaEvent = useDebounceCallback((eventName: string, eventData: any) => {
    window.gtag("event", eventName, decamelizeKeys(eventData));
  });

  return {
    gaEvent,
  };
};

export default useGA;
