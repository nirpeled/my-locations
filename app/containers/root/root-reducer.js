import { combineReducers } from 'redux';

import categories from '../categories/categories-reducer.js';

const rootReducer = combineReducers({
    categories
});

export default rootReducer;
