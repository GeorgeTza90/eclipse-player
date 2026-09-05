export function useVinylPagination<T>( group: T[], itemsPerRow: number, rowsCount: number): T[][] {    
    const pages: T[][] = [];
    const pageSize = itemsPerRow * rowsCount;

    for (let i = 0; i < group.length; i += pageSize) {
        pages.push(group.slice(i, i + pageSize));
    }

    return pages;
}