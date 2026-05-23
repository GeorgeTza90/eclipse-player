import path from "path";

export const apkService = {
    getApkPath(version?: string): string {
        const v = version ?? "1.2.4";
        return path.resolve(`files/eclipse_player_v${v}.apk`);
    }
};