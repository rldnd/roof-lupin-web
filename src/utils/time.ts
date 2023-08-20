/** 서버에서의 endAt은 11이라면, 프론트에서 봤을 때 12시까지임을 의미하기 때문에 시간을 +1 해준다 */
export const getDiffHour = (startAt: number, endAt: number): number => {
  return endAt - startAt + 1;
};

export const addHour = (hour: number, add: number): number => {
  return hour + add >= 24 ? hour + add - 24 : hour + add;
};

export const getTime = (hour: number) => {
  return hour % 24;
};

export const getNextDayText = (hour: number) => {
  if (hour < 24) return "";
  if (hour >= 24 && hour < 48) return "익일";
  if (hour >= 48 && hour < 72) return "모레";
  return `${(hour / 24).toFixed(0)}일 후`;
};

export const getTimeWithDay = (hour: number) => {
  return `${getNextDayText(hour)} ${getTime(hour)}:00`;
};

export const formatHourToAHHMM = (hour: number) => {
  const time = getTime(hour);
  const isAfternoon = time >= 12;
  return `${getNextDayText(hour)} ${isAfternoon ? "오후" : "오전"} ${isAfternoon ? time - 12 : time}시`;
};
