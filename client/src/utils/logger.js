export const logger = {
    info(message, meta) {
        console.log({
            level: "info",
            message,
            ...meta,
            time: new Date().toISOString(),
        });
    },

    error(message, meta) {
        console.error({
            level: "error",
            message,
            ...meta,
            time: new Date().toISOString(),
        });
    },

    warn(message, meta) {
        console.warn({
            level: "warn",
            message,
            ...meta,
            time: new Date().toISOString(),
        });
    },

    test(meta) {
        console.log(meta);
    },
};