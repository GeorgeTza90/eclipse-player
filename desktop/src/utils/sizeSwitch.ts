export interface GridConfig {
    columns: number;
    rows: number;
}

export function getGridConfig(width: number): GridConfig {
    let columns: number;
    let rows: number;

    switch (true) {
        case width >= 3060: columns = 16; rows = 3; break;
        case width >= 2760: columns = 14; rows = 3; break;
        case width >= 2551: columns = 12; rows = 3; break;
        case width >= 2378: columns = 11; rows = 3; break;
        case width >= 2176: columns = 10; rows = 3; break;
        case width >= 1958: columns = 9; rows = 3; break;
        case width >= 1739: columns = 8; rows = 3; break;
        case width >= 1520: columns = 7; rows = 3; break;
        case width >= 1300: columns = 6; rows = 3; break;
        case width >= 1082: columns = 5; rows = 3; break;
        case width >= 864: columns = 4; rows = 3; break;
        default: columns = 3; rows = 3;
    }

    return { columns, rows };
}

export function getHeightConfig(height: number, isLogin?: boolean ) {
    let maxHeight: number;

    switch (true) {
        case height >= 1309: maxHeight = isLogin ? 500 : 440; break;
        case height >= 1298: maxHeight = isLogin ? 480 : 420; break;
        case height >= 1232: maxHeight = isLogin ? 420 : 360; break;
        case height >= 1180: maxHeight = isLogin ? 380 : 320; break;
        case height >= 1147: maxHeight = isLogin ? 340 : 280; break;
        case height >= 1108: maxHeight = isLogin ? 300 : 240; break;
        case height >= 1030: maxHeight = isLogin ? 240 : 180; break;
        case height >= 990: maxHeight = isLogin ? 180 : 120; break;
        case height >= 960: maxHeight = isLogin ? 140 : 80; break;
        default: maxHeight = isLogin ? 140 : 80;
    }

    return { maxHeight };
}