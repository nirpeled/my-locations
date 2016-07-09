import { combineReducers } from 'redux';

import homepage from '../homepage/homepage-reducer.js';

const rootReducer = combineReducers({
    homepage
});

export default rootReducer;
