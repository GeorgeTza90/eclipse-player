export type AsyncFunction = (...args: any[]) => Promise<any>;

export type HookMap = Record<string, AsyncFunction>;

export type StateType<T extends HookMap> = {
  [K in keyof T]?: Awaited<ReturnType<T[K]>>;
};

export type LoadingType<T extends HookMap> = {
  [K in keyof T]?: boolean;
};

export type ErrorType<T extends HookMap> = {
  [K in keyof T]?: unknown;
};