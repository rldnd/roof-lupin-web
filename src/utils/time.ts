/** 서버에서의 endAt은 11이라면, 프론트에서 봤을 때 12시까지임을 의미하기 때문에 시간을 +1 해준다 */
export const getDiffHour = (startAt: number, endAt: number): number => {
  return endAt <= 9 ? 24 - startAt + endAt + 1 : endAt - startAt + 1;
};

export const addHour = (hour: number, add: number): number => {
  return hour + add >= 24 ? hour + add - 24 : hour + add;
};

export const isTimeNextDay = (hour: number, startAt?: number) => {
  if (typeof startAt === "number") return startAt >= hour || hour < 9;
  return hour < 9;
};

export const getNextDayText = (hour: number, startAt?: number) => {
  if (isTimeNextDay(hour, startAt)) return "익일 ";
  return "";
};
