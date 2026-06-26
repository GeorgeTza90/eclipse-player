type ErrorMap = Record<
    string,
    { status: number; message: string }
>;

export const errorMap: ErrorMap = {
    //--- GENERAL CREDENTIALS ---//
    VALIDATION_ERROR: { status: 400, message: "Invalid input" },
    INVALID_CREDENTIALS: { status: 401, message: "Invalid credentials" },
    INVALID_REQUEST: { status: 400, message: "Invalid request" },
    //--- TOKEN ---//
    INVALID_RESET_TOKEN: { status: 400, message: "Invalid or expired token" },
    INVALID_GOOGLE_TOKEN: { status: 401, message: "Invalid Google token" },
    //--- USER ---//
    USER_NOT_FOUND: { status: 404, message: "User not found" },
    USER_NOT_AUTHORIZED: { status: 403, message: "User Not Authorized" },
    //--- PASSWORD ---//
    PASSWORD_LOGIN_DISABLED: { status: 400, message: "Password login not enabled for this account" },
    INVALID_OLD_PASSWORD: { status: 401, message: "Incorrect old password" },    
    SAME_PASSWORD: { status: 400, message: "New password cannot be the same as old password" },     
    PASSWORD_ALREADY_USED: {status: 400, message: "Password already used" },
    //--- EMAIL ---//
    EMAIL_REQUIRED: { status: 400, message: "Email is required" },
    EMAIL_EXISTS: { status: 400, message: "Email already in use" },
    GOOGLE_NO_EMAIL: { status: 400, message: "This is not a Google Email"},
    //--- PLATFORM ---//
    INVALID_PLATFORM: {status: 400, message:"Invalid Platform" },
    //--- APK ---//
    APK_NOT_FOUND: {status: 404, message: "APK file not found"},
    INVALID_VERSION: { status: 400, message: "Invalid version format" },
    //--- ARTISTS ---//
    ARTIST_NOT_FOUND: {status: 404, message: "Artist not found" },
    //--- PLAYLISTS ---//
    PLAYLIST_NOT_FOUND: { status: 404, message: "Playlist not found"},
    SONG_NOT_FOUND_IN_PLAYLIST: { status: 404, message: "song not found in playlist"},
    INVALID_ORDER: { status: 400, message: "Invalid songs order"},
    SONG_ALREADY_IN_PLAYLIST: { status: 400, message: "Song already in playlist"},
    //--- PRESETS ---//
    PRESET_NOT_FOUND: { status: 404, message: "Preset not found"},
};