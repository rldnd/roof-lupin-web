"use client";

import { memo, useCallback, useRef } from "react";

import { useAtom, useSetAtom } from "jotai";

import type {
  AddMarkerParameter,
  AddMarkersParameter,
  BaseNaverMapEventParameter,
  LoadParameter,
  MarkerClickedCustomEvent,
  MarkerValue,
  MoveCenterParameter,
  NaverMapEventCallback,
} from "./types";
import { MAP_CLICKED_EVENT_NAME, MARKER_CLICKED_EVENT_NAME, NAVER_MAP_EVENT_NAME_MAPPER } from "@/common/constants";
import { useClientEffect, useThrottleSetAtom } from "@/hooks";
import { clickedMapMarkerState, mapCenterState, mapSizeState, mapZoomState } from "@/states/location";
import { deletePropertyInObject } from "@/utils/function";
import {
  checkIsTargetMap,
  checkMapLoaded,
  checkMarkerLocationDuplicates,
  getMarkerLocationObjectToString,
  loadNaverMapScript,
} from "@/utils/naverMap";

import naverMapEventEmitter from "./NaverMapEventEmitter";

const MARKER_Z_INDEX = 0;
const MARKER_CLICKED_Z_INDEX = 1;

const mapMarkerContent = `<img src="/icons/map/map-marker.svg" width="32" height="32" alt="마커" />`;
const mapClickedMarkerContent = `<img src="/icons/map/map-clicked-marker.svg" width="56" height="56" alt="클릭된 마커" />`;

interface Props {
  id: string;
  width: string | number;
  height: string | number;
  className?: string;
}

const Map: React.FC<Props> = ({ id, width, height, className }) => {
  const listeners = useRef<naver.maps.MapEventListener[]>([]);
  const naverMapScript = useRef<HTMLScriptElement>();
  const mapController = useRef<naver.maps.Map>();

  // MEMO: Record<'${lat},${lng}', value>
  const markers = useRef<Record<string, MarkerValue>>({});

  // MEMO: 하단 3개의 atom은 Record<[mapId], value> 형태로 관리된다.
  // MEMO: 지도 여러개를 관리하기 위함
  const setMapCenter = useThrottleSetAtom(mapCenterState);
  const setMapSize = useThrottleSetAtom(mapSizeState);
  const setMapZoom = useSetAtom(mapZoomState);

  const [clickedMapMarker, setClickedMapMarker] = useAtom(clickedMapMarkerState);

  // MEMO: atom 초기화
  const initializeAtom = useCallback(() => {
    if (!checkMapLoaded(mapController)) return;
    const center = mapController.current.getCenter();
    const zoom = mapController.current.getZoom();
    const size = mapController.current.getSize();
    setMapCenter((prev) => ({ ...prev, [id]: { lat: center.y.toString(), lng: center.x.toString() } }));
    setMapZoom((prev) => ({ ...prev, [id]: zoom }));
    setMapSize((prev) => ({ ...prev, [id]: { width: size.width, height: size.height } }));
    setClickedMapMarker((prev) => ({ ...prev, [id]: null }));
  }, [id, setClickedMapMarker, setMapCenter, setMapSize, setMapZoom]);

  // MEMO: 지도의 중심 좌표가 변경 되는 것을 감지하기 위한 이벤트 리스너
  const addCenterChangedListener = useCallback(() => {
    if (!checkMapLoaded(mapController)) return;

    const centerChangedListener = mapController.current.addListener(NAVER_MAP_EVENT_NAME_MAPPER.CENTER_CHANGED, () => {
      const center = mapController.current.getCenter();
      setMapCenter((prev) => ({ ...prev, [id]: { lat: center.y.toString(), lng: center.x.toString() } }));
    });

    listeners.current.push(centerChangedListener);
  }, [id, setMapCenter]);

  // MEMO: 지도의 줌 레벨이 변경 되는 것을 감지하기 위한 이벤트 리스너
  const addZoomChangedListener = useCallback(() => {
    if (!checkMapLoaded(mapController)) return;

    const zoomChangedListener = mapController.current.addListener(NAVER_MAP_EVENT_NAME_MAPPER.ZOOM_CHANGED, () => {
      const zoom = mapController.current.getZoom();
      setMapZoom((prev) => ({ ...prev, [id]: zoom }));
    });

    listeners.current.push(zoomChangedListener);
  }, [id, setMapZoom]);

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
      window.dispatchEvent(new CustomEvent(MAP_CLICKED_EVENT_NAME));
    });

    listeners.current.push(mouseDownListener);
  }, []);

  // MEMO: 지도를 load하기 위한 emit 함수
  // MEMO: load가 되면 mapController.current에 지도의 controller가 할당된다.
  // MEMO: listener를 등록하며, 지도의 중심 좌표, 줌 레벨, 실제 width, height를 atom에 등록한다.
  const load = useCallback(
    async (info: BaseNaverMapEventParameter<LoadParameter>) => {
      if (!checkIsTargetMap(info.mapId, id)) return;
      naverMapScript.current = loadNaverMapScript();
      naverMapScript.current.onload = () => {
        mapController.current = new naver.maps.Map(id, info.options);

        initializeAtom();

        addCenterChangedListener();
        addZoomChangedListener();
        addResizeListener();
        addMouseDownListener();
      };
    },
    [addCenterChangedListener, addMouseDownListener, addResizeListener, addZoomChangedListener, id, initializeAtom],
  );

  // MEMO: 지도의 중심 좌표를 변경하기 위한 emit 함수
  const moveCenter = useCallback(
    (position: BaseNaverMapEventParameter<MoveCenterParameter>) => {
      if (!checkMapLoaded(mapController) || !checkIsTargetMap(position.mapId, id)) return;
      mapController.current.setCenter({ lat: Number(position.lat), lng: Number(position.lng) });
    },
    [id],
  );

  // MEMO: 지도에 마커를 추가하기 위한 emit 함수
  const addMarker = useCallback(
    (data: BaseNaverMapEventParameter<AddMarkerParameter>) => {
      if (!checkMapLoaded(mapController) || !checkIsTargetMap(data.mapId, id)) return;
      const { lat, lng } = data;
      if (!data.replaceDuplicateLocation && checkMarkerLocationDuplicates(markers.current, { lat, lng })) return;

      const marker = new naver.maps.Marker({
        position: { lat: Number(lat), lng: Number(lng) },
        map: mapController.current,
        clickable: true,
        icon: {
          content: mapMarkerContent,
          size: new naver.maps.Size(32, 32),
        },
        zIndex: MARKER_Z_INDEX,
      });

      const listener = marker.addListener(NAVER_MAP_EVENT_NAME_MAPPER.CLICK, () => {
        window.dispatchEvent(
          new CustomEvent<MarkerClickedCustomEvent>(MARKER_CLICKED_EVENT_NAME, {
            detail: { location: { lat, lng }, spaceId: data.spaceId },
          }),
        );
      });

      markers.current = { ...markers.current, [getMarkerLocationObjectToString({ lat, lng })]: { marker, listener } };
    },
    [id],
  );

  // TODO:
  const deleteMarker = useCallback(() => {}, []);

  // TODO:
  const clearMarkers = useCallback(() => {}, []);

  // MEMO: 지도에 마커들을 추가하기 위한 emit 함수
  const addMarkers = useCallback(
    (data: BaseNaverMapEventParameter<AddMarkersParameter>) => {
      if (!checkMapLoaded(mapController) || !checkIsTargetMap(data.mapId, id)) return;
      if (data.clearBeforeMarkers) clearMarkers();
      data.markers.forEach((item) => addMarker({ ...item, action: "addMarker", mapId: data.mapId }));
    },
    [addMarker, clearMarkers, id],
  );

  // MEMO: 지도를 destroy 하기 위한 emit 함수
  // MEMO: mapController.current를 초기화한다.
  // MEMO: listeners를 모두 제거하며, atom에 해당 mapId를 키로 갖고 있는 값들을 모두 제거한다.
  const destroy = useCallback(() => {
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
  }, [id, setClickedMapMarker, setMapCenter, setMapSize, setMapZoom]);

  // MEMO: event emitter listener
  useClientEffect(() => {
    const callback: NaverMapEventCallback = (event) => {
      if (event.action === "load") load(event);
      if (event.action === "moveCenter") moveCenter(event);
      if (event.action === "addMarker") addMarker(event);
      if (event.action === "addMarkers") addMarkers(event);
      if (event.action === "destroy") destroy();
    };

    naverMapEventEmitter.addEventListener(callback);
    return () => {
      naverMapEventEmitter.removeEventListener(callback);
    };
  }, [addMarker, addMarkers, destroy, id, load, moveCenter]);

  useClientEffect(() => {
    // MEMO: 마커를 클릭할 시 이미 활성화 되어있는 마커가 있는 경우 해당 마커를 원복시키고, 클릭한 마커를 활성화 시킨다.
    const markerClickedHandler = (event: CustomEvent<MarkerClickedCustomEvent>) => {
      const { location, spaceId } = event.detail;
      const { lat, lng } = location;

      const clickedMarker = markers.current[getMarkerLocationObjectToString({ lat, lng })];
      clickedMarker.marker.setIcon({
        content: mapClickedMarkerContent,
        size: new naver.maps.Size(56, 56),
      });
      clickedMarker.marker.setZIndex(MARKER_CLICKED_Z_INDEX);

      const prevClickedMapMarker = clickedMapMarker?.[id];
      if (prevClickedMapMarker) {
        const marker = markers.current[getMarkerLocationObjectToString(prevClickedMapMarker.location)].marker;
        marker.setIcon({
          content: mapMarkerContent,
          size: new naver.maps.Size(32, 32),
        });
        marker.setZIndex(MARKER_Z_INDEX);
      }

      setClickedMapMarker((prev) => ({
        ...prev,
        [id]: { spaceId, location: { lat, lng } },
      }));
    };

    // MEMO: 마커가 아닌 지도를 클릭 시 활성화 되어있는 마커를 원복시킨다.
    const mapClickedHandler = () => {
      const prevClickedMapMarker = clickedMapMarker?.[id];
      if (!prevClickedMapMarker) return;

      markers.current[getMarkerLocationObjectToString(prevClickedMapMarker.location)].marker.setIcon({
        content: mapMarkerContent,
        size: new naver.maps.Size(32, 32),
      });
      setClickedMapMarker((prev) => ({ ...prev, [id]: null }));
    };

    window.addEventListener(MARKER_CLICKED_EVENT_NAME, markerClickedHandler as EventListener);
    window.addEventListener(MAP_CLICKED_EVENT_NAME, mapClickedHandler);

    return () => {
      window.removeEventListener(MARKER_CLICKED_EVENT_NAME, markerClickedHandler as EventListener);
      window.removeEventListener(MAP_CLICKED_EVENT_NAME, mapClickedHandler);
    };
  }, [clickedMapMarker, id, setClickedMapMarker]);

  return <div id={id} style={{ width, height }} className={className} />;
};

export default memo(Map);
