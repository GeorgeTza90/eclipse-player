export const useVinylPagination = (group, itemsPerRow, rowsCount) => {
    const pages = [];

    const pageSize = itemsPerRow * rowsCount;

    for (let i = 0; i < group.length; i += pageSize) {
        pages.push(group.slice(i, i + pageSize));
    }

    return pages;
};