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
        payload: { data },
    };
}

export function fetchRestaurantsError(error) {
    return {
        type: FETCH_RESTAURANT_ERROR,
        payload: { error },
    };
}

export function fetchRestaurants() {
    return (dispatch) => {
        dispatch(fetchRestaurantsPending());

        fetch('https://s3.amazonaws.com/br-codingexams/restaurants.json')
            .then(handleErrors)
            .then((rsp) => rsp.json())
            .then((data) => {
                dispatch(fetchRestaurantsSuccess(data));
                return data;
            })
            .catch((error) => {
                dispatch(fetchRestaurantsError(error));
            });
    };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
