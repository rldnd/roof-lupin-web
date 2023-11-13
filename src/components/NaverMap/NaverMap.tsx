"use client";

import { memo, useCallback, useEffect, useRef } from "react";

import { useAtom, useSetAtom } from "jotai";

import type {
  AddMarkerParameter,
  AddMarkersParameter,
  AddNonInteractionMarker,
  BaseNaverMapEventParameter,
  DeleteMarkerParameter,
  LoadParameter,
  MarkerClickedCustomEvent,
  MarkerValue,
  MoveCenterParameter,
  NaverMapEventCallback,
  SetCurrentPositionParameter,
} from "./types";
import { MAP_CLICKED_EVENT_NAME, MARKER_CLICKED_EVENT_NAME, NAVER_MAP_EVENT_NAME_MAPPER } from "@/common/constants";
import { useDebounceCallback, useThrottleSetAtom } from "@/hooks";
import {
  clickedMapMarkerState,
  hasInitNaverMapEventEmitterState,
  mapCenterState,
  mapSizeState,
  mapZoomState,
} from "@/states";
import { deletePropertyInObject } from "@/utils/function";
import {
  checkIsTargetMap,
  checkMapLoaded,
  checkMarkerLocationDuplicates,
  getClickedMapMarkerContent,
  getCurrentPositionMarkerContent,
  getMapMarkerContent,
  getMapNonInteractiveMarkerContent,
  getMarkerLocationObjectToString,
  getRestoreMapCenter,
  getRestoreMapZoom,
  loadNaverMapScript,
  setRestoreMapCenter,
  setRestoreMapZoom,
} from "@/utils/naverMap";
import { isClient } from "@/utils/next";

import naverMapEventEmitter from "./NaverMapEventEmitter";

const MARKER_Z_INDEX = 0;
const MARKER_CLICKED_Z_INDEX = 1;
const CURRENT_POSITION_MARKER_Z_INDEX = 2;

interface Props {
  id: string;
  width: string | number;
  height: string | number;
  className?: string;
}

const Map: React.FC<Props> = ({ id, width, height, className }) => {
  const isRestorePosition = useRef(false);

  const listeners = useRef<naver.maps.MapEventListener[]>([]);
  const naverMapScript = useRef<HTMLScriptElement>();
  const mapController = useRef<naver.maps.Map>();

  // MEMO: Record<'${lat},${lng}', value>
  const markers = useRef<Record<string, MarkerValue>>({});

  const currentPositionMarker = useRef<naver.maps.Marker>();

  // MEMO: 하단의 atom은 Record<[mapId], value> 형태로 관리된다.
  // MEMO: 지도 여러개를 관리하기 위함
  const setMapSize = useThrottleSetAtom(mapSizeState);
  const setMapZoom = useSetAtom(mapZoomState);
  const setMapCenter = useSetAtom(mapCenterState);

  const setHasInitNaverMapEventEmitter = useSetAtom(hasInitNaverMapEventEmitterState);

  const [clickedMapMarker, setClickedMapMarker] = useAtom(clickedMapMarkerState);

  const replaceLocationQuery = useCallback(
    (lat: string, lng: string) => {
      setMapCenter((prev) => ({ ...prev, [id]: { lat, lng } }));

      if (isRestorePosition.current) {
        setRestoreMapCenter(id, { lat, lng });
      }
    },
    [id, setMapCenter],
  );

  const replaceLocationAndZoomQuery = useCallback(
    (lat: string, lng: string, zoom: number) => {
      setMapCenter((prev) => ({ ...prev, [id]: { lat, lng } }));
      setMapZoom((prev) => ({ ...prev, [id]: zoom }));

      if (isRestorePosition.current) {
        setRestoreMapCenter(id, { lat, lng });
        setRestoreMapZoom(id, zoom);
      }
    },
    [id, setMapCenter, setMapZoom],
  );

  const replaceLocationQueryDebounce = useDebounceCallback(replaceLocationQuery);
  const replaceLocationAndZoomQueryDebounce = useDebounceCallback(replaceLocationAndZoomQuery);

  // MEMO: 지도의 실제 픽셀 크기 초기화
  const initializeSize = useCallback(() => {
    if (!checkMapLoaded(mapController)) return;
    const size = mapController.current.getSize();

    setMapSize((prev) => ({ ...prev, [id]: { width: size.width, height: size.height } }));
  }, [id, setMapSize]);

  // MEMO: 지도의 중심 좌표와 줌과 선택된 마커 초기화
  const initializeClickedMarker = useCallback(() => {
    if (!checkMapLoaded(mapController)) return;

    setClickedMapMarker((prev) => ({ ...prev, [id]: null }));
  }, [id, setClickedMapMarker]);

  // MEMO: 지도의 중심 좌표가 변경 되는 것을 감지하기 위한 이벤트 리스너
  const addCenterChangedListener = useCallback(() => {
    if (!checkMapLoaded(mapController)) return;

    const centerChangedListener = mapController.current.addListener(NAVER_MAP_EVENT_NAME_MAPPER.CENTER_CHANGED, () => {
      const center = mapController.current.getCenter();
      replaceLocationQueryDebounce(center.y.toString(), center.x.toString());
      setClickedMapMarker((prev) => ({ ...prev, [id]: null }));
    });

    listeners.current.push(centerChangedListener);
  }, [id, replaceLocationQueryDebounce, setClickedMapMarker]);

  // MEMO: 지도의 줌 레벨이 변경 되는 것을 감지하기 위한 이벤트 리스너
  const addZoomChangedListener = useCallback(() => {
    if (!checkMapLoaded(mapController)) return;

    const zoomChangedListener = mapController.current.addListener(NAVER_MAP_EVENT_NAME_MAPPER.ZOOM_CHANGED, () => {
      const zoom = mapController.current.getZoom();
      const center = mapController.current.getCenter();

      replaceLocationAndZoomQueryDebounce(center.y.toString(), center.x.toString(), zoom);
      setClickedMapMarker((prev) => ({ ...prev, [id]: null }));
    });

    listeners.current.push(zoomChangedListener);
  }, [id, replaceLocationAndZoomQueryDebounce, setClickedMapMarker]);

  // MEMO: 지도의 실제 width, height가 변경 되는 것을 감지하기 위한 이벤트 리스너
  const addResizeListener = useCallback(() => {
    if (!checkMapLoaded(mapController)) return;

    const resizeListener = mapController.current.addListener(NAVER_MAP_EVENT_NAME_MAPPER.RESIZE, () => {
      const size = mapController.current.getSize();
      setMapSize((prev) => ({ ...prev, [id]: { width: size.width, height: size.height } }));
    });

    listeners.current.push(resizeListener);
  }, [id, setMapSize]);

  // MEMO: 지도를 클릭하였을 때, 마커를 클릭하지 않았다면 클릭된 마커 액티브 상태를 취소하는 이벤트 리스너
  const addMouseDownListener = useCallback(() => {
    if (!checkMapLoaded(mapController)) return;

    const mouseDownListener = mapController.current.addListener(NAVER_MAP_EVENT_NAME_MAPPER.CLICK, () => {
      window.dispatchEvent(new CustomEvent(`${MAP_CLICKED_EVENT_NAME}-${id}`));
    });

    listeners.current.push(mouseDownListener);
  }, [id]);

  // MEMO: 지도를 load하기 위한 emit 함수
  // MEMO: load가 되면 mapController.current에 지도의 controller가 할당된다.
  // MEMO: listener를 등록하며, 지도의 중심 좌표, 줌 레벨, 실제 width, height를 atom에 등록한다.
  const load = useCallback(
    async (info: BaseNaverMapEventParameter<LoadParameter>) => {
      if (!isClient || !checkIsTargetMap(info.mapId, id)) return;
      naverMapScript.current = loadNaverMapScript();
      naverMapScript.current.onload = () => {
        isRestorePosition.current = info.restorePosition;
        const restoreMapCenter = getRestoreMapCenter(id);
        const restoreMapZoom = getRestoreMapZoom(id);

        mapController.current = new naver.maps.Map(id, {
          ...info.options,
          ...(info.restorePosition &&
            restoreMapCenter && {
              center: { lat: Number(restoreMapCenter.lat), lng: Number(restoreMapCenter.lng) },
            }),
          ...(info.restorePosition &&
            restoreMapZoom && {
              zoom: restoreMapZoom,
            }),
        });

        initializeSize();
        if (!info.restorePosition) initializeClickedMarker();
        if (info.restorePosition && restoreMapCenter) {
          setMapCenter((prev) => ({ ...prev, [id]: restoreMapCenter }));
        }

        if (info.restorePosition && restoreMapZoom) {
          setMapZoom((prev) => ({ ...prev, [id]: restoreMapZoom }));
        }

        addCenterChangedListener();
        addZoomChangedListener();
        addResizeListener();
        addMouseDownListener();

        info?.onLoad?.();
      };
    },
    [
      addCenterChangedListener,
      addMouseDownListener,
      addResizeListener,
      addZoomChangedListener,
      id,
      initializeClickedMarker,
      initializeSize,
      setMapCenter,
      setMapZoom,
    ],
  );

  // MEMO: 지도의 중심 좌표를 변경하기 위한 emit 함수
  const moveCenter = useCallback(
    (position: BaseNaverMapEventParameter<MoveCenterParameter>) => {
      if (!checkMapLoaded(mapController) || !checkIsTargetMap(position.mapId, id)) return;
      mapController.current.setCenter({ lat: Number(position.lat), lng: Number(position.lng) });
      replaceLocationQueryDebounce(position.lat, position.lng);
    },
    [id, replaceLocationQueryDebounce],
  );

  // MEMO: 공간 페이지에서 마커를 추가하기 위한 emit 함수
  const addNonInteractionMarker = useCallback(
    (data: BaseNaverMapEventParameter<AddNonInteractionMarker>) => {
      if (!checkMapLoaded(mapController) || !checkIsTargetMap(data.mapId, id)) return;
      const { lat, lng, icon } = data;

      new naver.maps.Marker({
        position: { lat: Number(lat), lng: Number(lng) },
        map: mapController.current,
        clickable: false,
        icon: {
          content: getMapNonInteractiveMarkerContent(icon),
          size: new naver.maps.Size(45, 56),
        },
        zIndex: MARKER_Z_INDEX,
      });
    },

    [id],
  );

  // MEMO: 지도에 마커를 추가하기 위한 emit 함수
  const addMarker = useCallback(
    (data: BaseNaverMapEventParameter<AddMarkerParameter>) => {
      if (!checkMapLoaded(mapController) || !checkIsTargetMap(data.mapId, id)) return;
      const { lat, lng, icon, title, spaceId } = data;
      if (!data.replaceDuplicateLocation && checkMarkerLocationDuplicates(markers.current, { lat, lng })) return;

      const marker = new naver.maps.Marker({
        position: { lat: Number(lat), lng: Number(lng) },
        map: mapController.current,
        clickable: true,
        icon: {
          content: getMapMarkerContent(icon, spaceId.length),
          size: new naver.maps.Size(38, 38),
        },
        zIndex: MARKER_Z_INDEX,
      });

      const listener = marker.addListener(NAVER_MAP_EVENT_NAME_MAPPER.CLICK, () => {
        window.dispatchEvent(
          new CustomEvent<MarkerClickedCustomEvent>(`${MARKER_CLICKED_EVENT_NAME}-${id}`, {
            detail: { location: { lat, lng }, icon, title, spaceId },
          }),
        );
      });

      markers.current = { ...markers.current, [getMarkerLocationObjectToString({ lat, lng })]: { marker, listener } };
    },
    [id],
  );

  const deleteMarker = useCallback(
    (data: BaseNaverMapEventParameter<DeleteMarkerParameter>) => {
      if (!checkMapLoaded(mapController) || !checkIsTargetMap(data.mapId, id)) return;
      const { lat, lng } = data.location;
      const marker = markers.current?.[getMarkerLocationObjectToString({ lat, lng })];
      if (!marker) return;

      marker.marker.removeListener(marker.listener);
      marker.marker.setMap(null);
      delete markers.current[getMarkerLocationObjectToString({ lat, lng })];
    },
    [id],
  );

  const clearMarkers = useCallback(
    (data: BaseNaverMapEventParameter) => {
      if (!checkMapLoaded(mapController) || !checkIsTargetMap(data.mapId, id)) return;
      Object.values(markers.current).forEach((item) => {
        item.marker.removeListener(item.listener);
        item.marker.setMap(null);
      });
      markers.current = {};
    },
    [id],
  );

  // MEMO: 지도에 마커들을 추가하기 위한 emit 함수
  const addMarkers = useCallback(
    (data: BaseNaverMapEventParameter<AddMarkersParameter>) => {
      if (!checkMapLoaded(mapController) || !checkIsTargetMap(data.mapId, id)) return;
      if (data.clearBeforeMarkers) clearMarkers({ mapId: id });
      data.markers.forEach((item) => addMarker({ ...item, action: "addMarker", mapId: data.mapId }));
    },
    [addMarker, clearMarkers, id],
  );

  const setCurrentPosition = useCallback(
    (data: BaseNaverMapEventParameter<SetCurrentPositionParameter>) => {
      if (!checkMapLoaded(mapController) || !checkIsTargetMap(data.mapId, id)) return;
      if (currentPositionMarker.current) {
        currentPositionMarker.current.setMap(null);
        currentPositionMarker.current = undefined;
      }

      const { lat, lng } = data.position;
      currentPositionMarker.current = new naver.maps.Marker({
        position: { lat: Number(lat), lng: Number(lng) },
        map: mapController.current,
        clickable: false,
        icon: {
          content: getCurrentPositionMarkerContent(),
          size: new naver.maps.Size(38, 38),
        },
        zIndex: CURRENT_POSITION_MARKER_Z_INDEX,
      });
    },
    [id],
  );

  // MEMO: 지도를 destroy 하기 위한 emit 함수
  // MEMO: mapController.current를 초기화한다.
  // MEMO: listeners를 모두 제거하며, atom에 해당 mapId를 키로 갖고 있는 값들을 모두 제거한다.
  const destroy = useCallback(
    (data: BaseNaverMapEventParameter) => {
      if (!checkIsTargetMap(data.mapId, id)) return;

      mapController.current?.removeListener(listeners.current);
      mapController.current?.destroy();
      mapController.current = undefined;
      listeners.current = [];

      Object.values(markers.current).forEach(({ marker, listener }) => {
        marker.removeListener(listener);
        marker.setMap(null);
      });
      markers.current = {};

      naverMapScript.current?.remove();
      setMapCenter((prev) => deletePropertyInObject(prev, id));
      setMapZoom((prev) => deletePropertyInObject(prev, id));
      setMapSize((prev) => deletePropertyInObject(prev, id));
      setClickedMapMarker((prev) => deletePropertyInObject(prev, id));
    },
    [id, setClickedMapMarker, setMapCenter, setMapSize, setMapZoom],
  );

  // MEMO: event emitter listener
  useEffect(() => {
    const callback: NaverMapEventCallback = (event) => {
      if (event.action === "load") load(event);
      if (event.action === "moveCenter") moveCenter(event);
      if (event.action === "addNonInteractionMarker") addNonInteractionMarker(event);
      if (event.action === "addMarker") addMarker(event);
      if (event.action === "addMarkers") addMarkers(event);
      if (event.action === "destroy") destroy(event);
      if (event.action === "deleteMarker") deleteMarker(event);
      if (event.action === "setCurrentPosition") setCurrentPosition(event);
      if (event.action === "clearMarkers") clearMarkers(event);
    };

    naverMapEventEmitter.addEventListener(callback);
    setHasInitNaverMapEventEmitter((prev) => ({ ...prev, [id]: true }));
    return () => {
      naverMapEventEmitter.removeEventListener(callback);
      setHasInitNaverMapEventEmitter((prev) => ({ ...prev, [id]: false }));
    };
  }, [
    addMarker,
    addMarkers,
    addNonInteractionMarker,
    clearMarkers,
    deleteMarker,
    destroy,
    id,
    load,
    moveCenter,
    setCurrentPosition,
    setHasInitNaverMapEventEmitter,
  ]);

  useEffect(() => {
    // MEMO: 마커를 클릭할 시 이미 활성화 되어있는 마커가 있는 경우 해당 마커를 원복시키고, 클릭한 마커를 활성화 시킨다.
    const markerClickedHandler = (event: CustomEvent<MarkerClickedCustomEvent>) => {
      const { location, spaceId, icon, title } = event.detail;
      const { lat, lng } = location;

      const clickedMarker = markers.current[getMarkerLocationObjectToString({ lat, lng })];
      // MEMO: 선택한 마커가 기존 선택된 마커와 동일할 경우 유지
      if (
        clickedMapMarker?.[id] &&
        getMarkerLocationObjectToString({ lat, lng }) ===
          getMarkerLocationObjectToString(clickedMapMarker[id]!.location)
      )
        return;

      clickedMarker.marker.setIcon({
        content: getClickedMapMarkerContent(icon, spaceId.length, title),
        size: new naver.maps.Size(100, 100),
      });
      clickedMarker.marker.setZIndex(MARKER_CLICKED_Z_INDEX);

      const prevClickedMapMarker = clickedMapMarker?.[id];
      if (prevClickedMapMarker) {
        const marker = markers.current[getMarkerLocationObjectToString(prevClickedMapMarker.location)]?.marker;
        marker?.setIcon({
          content: getMapMarkerContent(icon, prevClickedMapMarker.spaceId.length),
          size: new naver.maps.Size(38, 38),
        });
        marker?.setZIndex(MARKER_Z_INDEX);
      }

      setClickedMapMarker((prev) => ({
        ...prev,
        [id]: { spaceId, icon, title, location: { lat, lng } },
      }));
    };

    // MEMO: 마커가 아닌 지도를 클릭 시 활성화 되어있는 마커를 원복시킨다.
    const mapClickedHandler = () => {
      const prevClickedMapMarker = clickedMapMarker?.[id];
      if (!prevClickedMapMarker) return;

      markers.current?.[getMarkerLocationObjectToString(prevClickedMapMarker.location)]?.marker?.setIcon({
        content: getMapMarkerContent(prevClickedMapMarker?.icon, prevClickedMapMarker?.spaceId?.length),
        size: new naver.maps.Size(38, 38),
      });
      setClickedMapMarker((prev) => ({ ...prev, [id]: null }));
    };

    window.addEventListener(`${MARKER_CLICKED_EVENT_NAME}-${id}`, markerClickedHandler as EventListener);
    window.addEventListener(`${MAP_CLICKED_EVENT_NAME}-${id}`, mapClickedHandler);

    return () => {
      window.removeEventListener(`${MARKER_CLICKED_EVENT_NAME}-${id}`, markerClickedHandler as EventListener);
      window.removeEventListener(`${MAP_CLICKED_EVENT_NAME}-${id}`, mapClickedHandler);
    };
  }, [clickedMapMarker, id, setClickedMapMarker]);

  return (
    <>
      <div id={id} style={{ width, height }} className={className} />
      <img src="/images/map/small_marker.png" hidden alt="마커" />
      <img src="/images/map/active_marker.png" hidden alt="마커" />
    </>
  );
};

export default memo(Map);
