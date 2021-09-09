import React, { useState } from 'react';
import Card from './Card';
import Loading from './Loading';
import Popup from './Popup';
import Error from './Error';
import { useRestaurants } from '../context/RestaurantsProvider';

function List() {
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
    const { data, loading, error } = useRestaurants();

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
                {loading ? <Loading /> : null}

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

export default List;
