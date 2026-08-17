export type HookFunction = (...args: any[]) => Promise<any>;

export type HooksMap = Record<string, HookFunction>;

export interface CallManagerState {
    [key: string]: any;
}

export interface CallManagerLoading {
    [key: string]: boolean;
}

export interface CallManagerError {
    [key: string]: Error | null;
}