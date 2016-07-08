import _ from 'lodash';
import helpers from '../../helpers/helpers.js';
import categoriesConstants from './categories-constants.js';

export default function categories(state = {}, action = {}) {

    switch (action.type) {

        case categoriesConstants.CATEGORIES_FETCH:
        case categoriesConstants.CATEGORIES_ADD:
        case categoriesConstants.CATEGORIES_EDIT:
        case categoriesConstants.CATEGORIES_DELETE:

            helpers.logger('[CategoriesReducer] ' + action.type);

            return _.assign({}, state, action);

        default:

            return state;

    }

}