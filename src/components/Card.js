import React from 'react';
import '../library/scss/components/Card.scss';

const Card = ({ handleClick, image, title, category, location, contact }) => {
    return (
        <button
            onClick={handleClick}
            data-title={title}
            data-category={category}
            data-address={location.address}
            data-address2={`${location.city}, ${location.state} ${location.postalCode}`}
            data-phone={contact === null ? '' : contact.formattedPhone}
            data-twitter={contact === null ? '' : contact.twitter}
            className="card flexbox _align-items-end stop-bleed"
        >
            <div className="card__image">
                <img src={image} alt={title} />
            </div>
            <div className="card-headings">
                <h2 className="h5 card-heading__title">{title}</h2>
                <h3 className="h6 card-heading__type top-mar0">{category}</h3>
            </div>
        </button>
    );
};

export default Card;
