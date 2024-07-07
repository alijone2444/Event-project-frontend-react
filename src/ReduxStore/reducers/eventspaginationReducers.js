const initialState = {
    currentPage: 1,
    pageSize: 6,
    totalPages: 1,
    lastVisitedPage: 1
};

const paginationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload,
            };
        case 'SET_PAGE_SIZE':
            return {
                ...state,
                pageSize: action.payload,
            };
        case 'SET_TOTAL_PAGES':
            return {
                ...state,
                totalPages: action.payload,
            };
        case 'SET_LAST_VISITED':
            return {
                ...state,
                lastVisitedPage: action.payload,
            };
        default:
            return state;
    }
};

export default paginationReducer;
