import { combineReducers } from 'redux';

import categories from '../categories/categories-reducer.js';
import locations from '../locations/locations-reducer.js';

const rootReducer = combineReducers({
    categories,
    locations
});

export default rootReducer;
