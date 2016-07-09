import React from 'react';
import { Route, IndexRoute } from 'react-router';

import RootContainer from './containers/root/root-container.js';
import HomepageContainer from './containers/homepage/homepage-container.js';
import ActionNew from './components/actions/action-new.js';
import ActionDelete from './components/actions/action-delete.js';
import ActionEdit from './components/actions/action-edit.js';

export default (
    <Route component={RootContainer}>
        <Route path="/" component={HomepageContainer}>
            <Route path=":page">
                <Route path="new" component={ActionNew}/>
                <Route path=":id/delete" component={ActionDelete}/>
                <Route path=":id/edit" component={ActionEdit}/>
            </Route>
        </Route>
    </Route>
);
