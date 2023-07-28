import { Suspense } from "react";

import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants/toast";
import { ToastPositioner } from "@/components";

import DataHandler from "./DataHandler";
import View from "./View";

const SpaceReservationContainer: React.FC = () => {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <View />
      <Suspense fallback={null}>
        <DataHandler />
      </Suspense>
    </ToastPositioner>
  );
};

export default SpaceReservationContainer;
