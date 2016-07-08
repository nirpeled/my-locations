import React from 'react';
import { Route, IndexRoute } from 'react-router';

import RootContainer from './containers/root/root-container.js';
import HomepageContainer from './containers/homepage/homepage-container.js';
import CategoriesContainer from './containers/categories/categories-container.js';
import LocationsContainer from './containers/locations/locations-container.js';

export default (
    <Route path="/" component={RootContainer}>
        <IndexRoute component={HomepageContainer}/>
        <Route path="categories" component={CategoriesContainer}/>
        <Route path="locations" component={LocationsContainer}/>
    </Route>
);
