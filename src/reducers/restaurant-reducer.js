import {
    FETCH_RESTAURANT_PENDING,
    FETCH_RESTAURANT_SUCCESS,
    FETCH_RESTAURANT_ERROR,
} from '../constants/action-types';

const initialState = {
    loading: false,
    data: { restaurants: [] },
    error: null,
};

export default function restaurantReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_RESTAURANT_PENDING:
            return {
                ...state,
                loading: true,
            };
        case FETCH_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.data,
            };
        case FETCH_RESTAURANT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                data: [],
            };
        default:
            return state;
    }
}
