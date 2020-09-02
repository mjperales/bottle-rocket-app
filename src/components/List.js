import React, { Component } from 'react';
import Card from './Card';
import Loading from './Loading';
import Popup from './Popup';
import {
    getRestaurants,
    getRestaurantsPending,
    getRestaurantsError,
} from '../reducers/restaurant-reducer';
import { fetchRestaurants } from '../actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            title: '',
            category: '',
            address: '',
            address2: '',
            phone: '',
            twitter: '',
            lat: '',
            lng: '',
        };
    }

    /**
     * Handles click event on our Card component
     *
     * @param {Event} event
     */
    handleClick = (event) => {
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
        this.setState({
            title,
            category,
            address,
            address2,
            phone,
            twitter,
            lat,
            lng,
        });
    };

    /**
     * Handles closing the map window and details module
     *
     * @param {Event} event
     */
    handleClose = (event) => {
        event.preventDefault();
        this.setState({ popup: false });
    };

    isFetching = () => {
        const { loading } = this.props;
        fetchRestaurants();

        if (loading === false) {
            return false;
        }

        return true;
    };

    componentWillMount() {
        const { fetchRestaurants } = this.props;
        fetchRestaurants();
    }

    render() {
        const { title, category, address, address2, phone, twitter, popup, lat, lng } = this.state;
        const { data } = this.props;
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
                    handleClose={this.handleClose}
                    lat={lat}
                    lng={lng}
                />
                <div className="flexbox _wrap _space-between">
                    {this.isFetching() ? <Loading /> : null}

                    {/* {data.restaurants.map(
                        ({ name, category, backgroundImageURL, location, contact }, index) => (
                            <Card
                                key={index}
                                title={name}
                                category={category}
                                image={backgroundImageURL}
                                handleClick={this.handleClick}
                                location={location}
                                contact={contact}
                            />
                        )
                    )} */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    error: getRestaurantsError(state),
    data: getRestaurants(state),
    pending: getRestaurantsPending(state),
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            fetchRestaurants: fetchRestaurants,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(List);

// export default List;
