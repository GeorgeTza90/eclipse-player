export function getGridConfig(width) {
    let columns;
    let rows;

    switch (true) {
         case width >= 3060:
            columns = 16;
            rows = 3;
            break;

        case width >= 2760:
            columns = 14;
            rows = 3;
            break;

        case width >= 2551:
            columns = 12;
            rows = 3;
            break;

        case width >= 2378:
            columns = 11;
            rows = 3;
            break;

        case width >= 2176:
            columns = 10;
            rows = 3;
            break;

        case width >= 1958:
            columns = 9;
            rows = 3;
            break;

        case width >= 1739:
            columns = 8;
            rows = 3;
            break;

        case width >= 1520:
            columns = 7;
            rows = 3;
            break;

        case width >= 1300:
            columns = 6;
            rows = 3;
            break;

        case width >= 1082:
            columns = 5;
            rows = 3;
            break;

        case width >= 864:
            columns = 4;
            rows = 3;
            break;

        default:
            columns = 3;
            rows = 3;
    }

    return { columns, rows };
}