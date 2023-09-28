import { useCallback } from "react";

import type {
  ActionOmitter,
  AddMarkerParameter,
  AddMarkersParameter,
  DeleteMarkerParameter,
  LoadParameter,
  MoveCenterParameter,
} from "./types";

import naverMapEventEmitter from "./NaverMapEventEmitter";

type ReturnUseNaverMap = {
  load(options?: ActionOmitter<LoadParameter>): void;
  moveCenter(position: ActionOmitter<MoveCenterParameter>): void;
  addMarker(data: ActionOmitter<AddMarkerParameter>): void;
  addMarkers(data: ActionOmitter<AddMarkersParameter>): void;
  deleteMarker(data: ActionOmitter<DeleteMarkerParameter>): void;
  clearMarkers(): void;
  destroy(): void;
};

const useNaverMap = (mapId: string): ReturnUseNaverMap => {
  const load = useCallback(
    (data: ActionOmitter<LoadParameter>) => {
      naverMapEventEmitter.load({
        action: "load",
        mapId,
        options: data.options,
        restorePosition: data.restorePosition,
        onLoad: data.onLoad,
      });
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
    (data: ActionOmitter<AddMarkerParameter>) => {
      naverMapEventEmitter.addMarker({ ...data, mapId, action: "addMarker" });
    },
    [mapId],
  );

  const addMarkers = useCallback(
    (data: ActionOmitter<AddMarkersParameter>) => {
      naverMapEventEmitter.addMarkers({ ...data, mapId, action: "addMarkers" });
    },
    [mapId],
  );

  const deleteMarker = useCallback(
    (data: ActionOmitter<DeleteMarkerParameter>) => {
      naverMapEventEmitter.deleteMarker({ ...data, mapId, action: "deleteMarker" });
    },
    [mapId],
  );

  const clearMarkers = useCallback(() => {
    naverMapEventEmitter.clearMarkers({ mapId, action: "clearMarkers" });
  }, [mapId]);

  const destroy = useCallback(() => {
    naverMapEventEmitter.destroy({ action: "destroy", mapId });
  }, [mapId]);

  return {
    load,
    moveCenter,
    addMarker,
    addMarkers,
    deleteMarker,
    clearMarkers,
    destroy,
  };
};

export default useNaverMap;
