import React from 'react';
import Map from '../library/images/details-map-temp.png';
import '../library/scss/components/Popup.scss';

const Popup = ({ title, category, address, address2, phone, twitter, slide, handleClose }) => {
    return (
        <div className={`popup flexbox _column ${slide}`}>
            <button onClick={handleClose} className="button_close">
                X
            </button>
            <div className="popup__map">
                <img src={Map} alt="Map" />
            </div>
            <div className="popup__title background _green">
                <h2 className="h5 popup-heading__title">{title}</h2>
                <h3 className="h6 popup-heading__type top-mar0">{category}</h3>
            </div>
            <div className="popup__address">
                <p className="mar-b0">{address}</p>
                <p className="mar-t0">{address2}</p>
                <div className="popup__phone">
                    <p>{phone}</p>
                </div>
                <div className="popup__social">
                    {twitter === '' || twitter === undefined ? '' : `@${twitter}`}
                </div>
            </div>
        </div>
    );
};

export default Popup;
