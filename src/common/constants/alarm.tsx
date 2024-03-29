import type { AlarmIconMapperValue, AlarmType } from "../types/alarm";

import {
  IconAlarmCouponDuration,
  IconAlarmMarketingExhibition,
  IconAlarmQna,
  IconAlarmReservationApproved,
  IconAlarmReservationAutoCanceled,
  IconAlarmReservationHostCanceled,
  IconAlarmReservationRejected,
  IconAlarmReviewAnswer,
  IconAlarmSpaceTime,
} from "public/icons";

export const ALARM_ICON_MAPPER: Record<AlarmType, AlarmIconMapperValue> = {
  SPACE_TIME: {
    backgroundColor: "roof-orange",
    icon: <IconAlarmSpaceTime />,
  },
  RESERVATION_APPROVED: {
    backgroundColor: "roof-orange",
    icon: <IconAlarmReservationApproved />,
  },
  RESERVATION_REJECTED: {
    backgroundColor: "roof-orange",
    icon: <IconAlarmReservationRejected />,
  },
  RESERVATION_AUTO_CANCELED: {
    backgroundColor: "roof-orange",
    icon: <IconAlarmReservationAutoCanceled />,
  },
  RESERVATION_HOST_CANCELED: {
    backgroundColor: "roof-orange",
    icon: <IconAlarmReservationHostCanceled />,
  },
  REVIEW_RECOMMEND: {
    backgroundColor: null,
    icon: null,
  },
  COUPON_DURATION: {
    backgroundColor: "gray-200",
    icon: <IconAlarmCouponDuration />,
  },
  QNA: {
    backgroundColor: "roof-orange",
    icon: <IconAlarmQna />,
  },
  REVIEW_ANSWER: {
    backgroundColor: "roof-orange",
    icon: <IconAlarmReviewAnswer />,
  },
  MARKETING_EXHIBITION: {
    backgroundColor: "gray-200",
    icon: <IconAlarmMarketingExhibition />,
  },
} as const;

export const ALARM_TYPE_WITH_THUMBNAIL = ["REVIEW_RECOMMEND"] as const;
export const ALARM_TYPE_WITHOUT_THUMBNAIL = [
  "SPACE_TIME",
  "RESERVATION_APPROVED",
  "RESERVATION_REJECTED",
  "RESERVATION_AUTO_CANCELED",
  "RESERVATION_HOST_CANCELED",
  "COUPON_DURATION",
  "QNA",
  "REVIEW_ANSWER",
  "MARKETING_EXHIBITION",
] as const;
