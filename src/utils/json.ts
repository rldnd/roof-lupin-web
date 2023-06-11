export const stringifyConverter = (arg: unknown): string => {
  if (typeof arg !== "string") return JSON.stringify(arg);
  return arg;
};

export const parseConverter = <T>(arg: unknown): T => {
  if (typeof arg === "string") return JSON.parse(arg) as T;
  return arg as T;
};
