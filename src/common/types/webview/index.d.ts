type WebviewSubject = "app" | "web";

export interface BaseWebviewPayload {
  type: string;
  data: any;
}

export type GenerateWebviewPayload<
  Subject extends WebviewSubject,
  Domain extends string,
  Feature extends string,
  Data = unknown,
> = {
  type: `${Subject}-${Domain}/${Feature}`;
  data: Data;
};

export type WithoutData = undefined;
