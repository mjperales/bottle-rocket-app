import React, { useEffect, useState } from 'react';
import Card from './Card';
import Loading from './Loading';
import Popup from './Popup';
import Error from './Error';
import { fetchRestaurants } from '../actions';
import { connect } from 'react-redux';

function List({ loading, data, error, dispatch }) {
    const [popup, setPopup] = useState(false);
    const [cardInfo, setCardInfo] = useState({
        title: '',
        category: '',
        address: '',
        address2: '',
        phone: '',
        twitter: '',
        lat: '',
        lng: '',
    });

    /**
     * Http request for restaurants
     *
     * Grab from redux store
     */
    useEffect(() => {
        dispatch(fetchRestaurants());
    }, [dispatch]);

    /**
     * Handles click event on our Card component
     *
     * @param {Event} event
     */
    const handleClick = (event) => {
        event.preventDefault();
        event.persist();
        const { title, category, address, address2, phone, twitter, lat, lng } =
            event.currentTarget.dataset;

        setCardInfo({
            title,
            category,
            address,
            address2,
            phone,
            twitter,
            lat,
            lng,
        });

        setPopup(true);
    };

    /**
     * Handles closing the map window and details module
     *
     * @param {Event} event
     */
    const handleClose = (event) => {
        event.preventDefault();
        setPopup(false);
    };

    /**
     * Fetch restaurants if needed
     *
     * Use to display loading icon
     *
     * @returns bool
     */
    const isFetching = () => {
        fetchRestaurants();

        if (loading === false) {
            return false;
        }

        return true;
    };

    const { title, category, address, address2, phone, twitter, lat, lng } = cardInfo;
    return (
        <div className="position-relative">
            <Popup
                title={title}
                category={category}
                address={address}
                address2={address2}
                phone={phone}
                twitter={twitter}
                slide={popup ? 'slide-in' : ''}
                handleClose={handleClose}
                lat={lat}
                lng={lng}
            />
            <div className="flexbox _wrap _space-between">
                {error ? <Error error={error} /> : null}
                {isFetching() ? <Loading /> : null}

                {data.restaurants.map(
                    ({ name, category, backgroundImageURL, location, contact }, index) => (
                        <Card
                            key={index}
                            title={name}
                            category={category}
                            image={backgroundImageURL}
                            handleClick={handleClick}
                            location={location}
                            contact={contact}
                        />
                    )
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    error: state.items.error,
    data: state.items.data,
    loading: state.items.loading,
});

export default connect(mapStateToProps)(List);
