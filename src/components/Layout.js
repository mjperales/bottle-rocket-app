import React from 'react';
import Header from './Header';

function Layout({ children }) {
    return (
        <div className="layout-container">
            <Header />
            <main className="layout-constrain top18 below16">{children}</main>
        </div>
    );
}

export default Layout;
