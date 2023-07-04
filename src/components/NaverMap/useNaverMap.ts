import { useCallback } from "react";

import type { ActionOmitter, AddMarkerParameter, MoveCenterParameter } from "./types";

import naverMapEventEmitter from "./NaverMapEventEmitter";

type ReturnUseNaverMap = {
  load(options?: naver.maps.MapOptions): void;
  moveCenter(position: ActionOmitter<MoveCenterParameter>): void;
  addMarker(position: ActionOmitter<AddMarkerParameter>): void;
  destroy(): void;
};

const useNaverMap = (mapId: string): ReturnUseNaverMap => {
  const load = useCallback(
    (options?: naver.maps.MapOptions) => {
      naverMapEventEmitter.load({ action: "load", mapId, options });
    },
    [mapId],
  );

  const moveCenter = useCallback(
    (position: ActionOmitter<MoveCenterParameter>) => {
      naverMapEventEmitter.moveCenter({ ...position, mapId, action: "moveCenter" });
    },
    [mapId],
  );

  const addMarker = useCallback(
    (position: ActionOmitter<AddMarkerParameter>) => {
      naverMapEventEmitter.addMarker({ ...position, mapId, action: "addMarker" });
    },
    [mapId],
  );

  const destroy = useCallback(() => {
    naverMapEventEmitter.destroy({ action: "destroy", mapId });
  }, [mapId]);

  return {
    load,
    moveCenter,
    addMarker,
    destroy,
  };
};

export default useNaverMap;
