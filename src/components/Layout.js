import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout(props) {
    return (
        <div className="layout-container">
            <Header />
            <main className="layout-constrain top18 below16">{props.children}</main>
            <Footer />
        </div>
    );
}

export default Layout;
