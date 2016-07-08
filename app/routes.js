import React from 'react';
import { Route, Link, IndexRoute } from 'react-router';

import RootContainer from './containers/root/root-container.js';
import CategoriesContainer from './containers/categories/categories-container.js';

export default (
    <Route path="/" component={RootContainer}>
        <IndexRoute component={CategoriesContainer}/>
    </Route>
);
