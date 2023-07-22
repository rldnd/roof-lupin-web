export const getDiffHour = (startAt: number, endAt: number): number => {
  return endAt <= 9 ? 24 - startAt + endAt : endAt - startAt;
};
