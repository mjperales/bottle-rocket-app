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

export function restaurantReducer(state = initialState, action) {
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
                data: action.payload,
            };
        case FETCH_RESTAURANT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
}

export const getRestaurants = (state) => state.restaurants;
export const getRestaurantsPending = (state) => state.pending;
export const getRestaurantsError = (state) => state.error;
