import React, { createContext, useState, useEffect, useContext } from 'react';

const RestaurantsContext = createContext();
export const useRestaurants = () => useContext(RestaurantsContext);

export default function RestaurantsProvider({ children }) {
    const [res, setRestaurants] = useState({
        loading: true,
        data: { restaurants: [] },
        error: null,
    });

    const handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    };

    useEffect(() => {
        const getRestaurants = () => {
            fetch('https://s3.amazonaws.com/br-codingexams/restaurants.json')
                .then((rsp) => handleErrors(rsp))
                .then((rsp) => rsp.json())
                .then((data) => {
                    setRestaurants((prevState) => ({
                        ...prevState,
                        loading: false,
                        data: data,
                    }));
                })
                .catch((error) => {
                    setRestaurants((prevState) => ({
                        ...prevState,
                        loading: false,
                        error: error,
                    }));
                });
        };
        getRestaurants();

        return function cleanup() {
            setRestaurants({
                loading: true,
                data: { restaurants: [] },
                error: null,
            });
        };
    }, []);

    return <RestaurantsContext.Provider value={res}>{children}</RestaurantsContext.Provider>;
}
