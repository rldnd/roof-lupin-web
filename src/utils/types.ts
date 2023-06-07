export type Nullable<T> = T extends object
  ? T extends unknown[]
    ? T | null
    : { [K in keyof T]: Nullable<T[K]> }
  : T | null;
