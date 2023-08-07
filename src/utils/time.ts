export const getDiffHour = (startAt: number, endAt: number): number => {
  return endAt <= 9 ? 24 - startAt + endAt : endAt - startAt;
};

export const addHour = (hour: number, add: number): number => {
  return hour + add >= 24 ? hour + add - 24 : hour + add;
};

export const isEndAtNextDay = (hour: number) => {
  return hour < 9;
};
