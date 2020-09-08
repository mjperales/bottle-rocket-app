import React, { Component } from 'react';
import Card from './Card';
import Loading from './Loading';
import Popup from './Popup';
import { fetchRestaurants } from '../actions';

import { connect } from 'react-redux';

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
        this.props.dispatch(fetchRestaurants());
    }

    render() {
        const { title, category, address, address2, phone, twitter, popup, lat, lng } = this.state;
        const { data, error } = this.props;
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
                    {error ? <div> {error} </div> : null}
                    {this.isFetching() ? <Loading /> : null}

                    {data.restaurants.map(
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
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.items.error,
    data: state.items.data,
    loading: state.items.loading,
});

export default connect(mapStateToProps)(List);

// export default List;
