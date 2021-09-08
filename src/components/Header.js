import React from 'react';
import MapIcon from '../library/images/icon_map@2x.png';

function Header() {
    return (
        <header>
            <div className="background _lime-green heading-shape">
                <h1 className="h3 heading-shape__title">Lunch Tyme</h1>
                <img
                    className="heading-shape__icon"
                    src={MapIcon}
                    alt="Map Icon"
                    height="50"
                    width="50"
                />
            </div>
        </header>
    );
}

export default Header;
