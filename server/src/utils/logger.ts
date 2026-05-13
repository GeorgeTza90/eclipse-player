export const logger = {
    info: (message: string, meta?: object) => {
        console.log({
            level: "info",
            message,
            ...meta,
            time: new Date().toISOString(),
        });
    },

    error: (message: string, meta?: object) => {
        console.error({
            level: "error",
            message,
            ...meta,
            time: new Date().toISOString(),
        });
    },

    warn: (message: string, meta?: object) => {
        console.warn({
            level: "warn",
            message,
            ...meta,
            time: new Date().toISOString(),
        });
    },
};