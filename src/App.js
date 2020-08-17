import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Details from './pages/Details';
import './library/scss/styles.scss';

function App() {
    return (
        <Layout>
            <Route exact path="/" component={Details} />
        </Layout>
    );
}

export default App;
