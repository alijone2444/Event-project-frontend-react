export const setCurrentPage = (page) => ({
    type: 'SET_CURRENT_PAGE',
    payload: page,
});

export const setPageSize = (size) => ({
    type: 'SET_PAGE_SIZE',
    payload: size,
});

export const setTotalPages = (total) => ({
    type: 'SET_TOTAL_PAGES',
    payload: total,
});
export const setLastvisited = (page) => ({
    type: 'SET_LAST_VISITED',
    payload: page,
});
