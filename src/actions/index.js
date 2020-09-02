import {
    FETCH_RESTAURANT_PENDING,
    FETCH_RESTAURANT_SUCCESS,
    FETCH_RESTAURANT_ERROR,
} from '../constants/action-types';

export function fetchRestaurantsPending() {
    return {
        type: FETCH_RESTAURANT_PENDING,
    };
}

export function fetchRestaurantsSuccess(data) {
    return {
        type: FETCH_RESTAURANT_SUCCESS,
        data,
    };
}

export function fetchRestaurantsError(error) {
    return {
        type: FETCH_RESTAURANT_ERROR,
        error,
    };
}

export function fetchRestaurants() {
    return (dispatch) => {
        dispatch(fetchRestaurantsPending());

        fetch('https://s3.amazonaws.com/br-codingexams/restaurants.json')
            .then((rsp) => {
                if (rsp.status === 200) {
                    return rsp.json();
                }
            })
            .then((rsp) => {
                if (rsp.error) {
                    throw rsp.error;
                }
                dispatch(fetchRestaurantsSuccess(rsp.data));
                return rsp.data;
            })
            .catch((error) => {
                dispatch(fetchRestaurantsError(error));
            });
    };
}
