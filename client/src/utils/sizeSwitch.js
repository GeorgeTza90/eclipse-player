export function getGridConfig(width) {
    let columns;
    let rows;

    switch (true) {
        case width >= 2700:
            columns = 14;
            break;

        case width >= 2551:
            columns = 12;
            break;

        case width >= 2378:
            columns = 11;
            break;

        case width >= 2176:
            columns = 10;
            break;

        case width >= 1958:
            columns = 9;
            break;

        case width >= 1739:
            columns = 8;
            break;

        case width >= 1520:
            columns = 7;
            break;

        case width >= 1300:
            columns = 6;
            break;

        case width >= 1082:
            columns = 5;
            break;

        case width >= 864:
            columns = 4;            
            break;

        default:
            columns = 3;
            rows = 3;
    }

    return { columns, rows };
}