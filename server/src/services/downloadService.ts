import path from "path";

const APKfilePath = path.resolve("files/eclipse_player_v1.2.4.apk");

export const apkService = {
    getApkPath(): string {
        return APKfilePath;
    }
};