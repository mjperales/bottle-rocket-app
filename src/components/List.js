import React, { useState, useEffect } from 'react';
import Card from './Card';
import Loading from './Loading';
import Popup from './Popup';

function List() {
    const [loading, setLoading] = useState(true);
    const [popup, setPopup] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [address, setAddress] = useState('');
    const [address2, setAddress2] = useState('');
    const [phone, setPhone] = useState('');
    const [twitter, setTwitter] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [data, setData] = useState({ restaurants: [] });

    useEffect(() => {
        if (loading) {
            fetch('https://s3.amazonaws.com/br-codingexams/restaurants.json')
                .then((rsp) => {
                    if (rsp.status === 200) {
                        return rsp.json();
                    }
                })
                .then((data) => {
                    setData(data);
                    setLoading(false);
                })
                .catch((err) => console.log(err));
        }
    }, [loading]);

    /**
     * Handles click event on our Card component
     *
     * @param {Event} event
     */
    function handleClick(event) {
        event.preventDefault();
        event.persist();
        const {
            title,
            category,
            address,
            address2,
            phone,
            twitter,
            lat,
            lng,
        } = event.currentTarget.dataset;
        setTitle(title);
        setCategory(category);
        setAddress(address);
        setAddress2(address2);
        setPhone(phone);
        setTwitter(twitter);
        setPopup(true);
        setLat(lat);
        setLng(lng);
    }

    /**
     * Handles closing the map window and details module
     *
     * @param {Event} event
     */
    function handleClose(event) {
        event.preventDefault();
        setPopup(false);
    }

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
