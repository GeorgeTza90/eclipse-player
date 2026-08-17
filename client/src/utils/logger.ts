export interface LogMeta {
    [key: string]: unknown;
}

export const logger = {
    info(message: string, meta?: LogMeta): void {
        console.log({
            level: "info",
            message,
            ...meta,
            time: new Date().toISOString(),
        });
    },

    error(message: string, meta?: LogMeta): void {
        console.error({
            level: "error",
            message,
            ...meta,
            time: new Date().toISOString(),
        });
    },

    warn(message: string, meta?: LogMeta): void {
        console.warn({
            level: "warn",
            message,
            ...meta,
            time: new Date().toISOString(),
        });
    },

    test(meta: unknown): void {
        console.log(meta);
    },
};