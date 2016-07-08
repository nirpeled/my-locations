import _ from 'lodash';
import helpers from '../../helpers/helpers.js';
import categoriesConstants from './categories-constants.js';

export default function categories(state = {}, action = {}) {

    var data;

    switch (action.type) {

        case categoriesConstants.CATEGORIES_FETCH:

            helpers.logger('[CategoriesReducer] ' + action.type);

            data = helpers.localStorage.get('categories');
            
            return _.assign({}, state, {items: data});

        case categoriesConstants.CATEGORIES_ADD:

            helpers.logger('[CategoriesReducer] ' + action.type);

            data = _.union(state.items, []);

            data.push({
                id: data.length + 1,
                name: action.name
            });

            helpers.localStorage.set('categories', data);
            
            return _.assign({}, state, {items: data});

        case categoriesConstants.CATEGORIES_EDIT:

            helpers.logger('[CategoriesReducer] ' + action.type);

            return _.assign({}, state, action);

        case categoriesConstants.CATEGORIES_DELETE:

            helpers.logger('[CategoriesReducer] ' + action.type);

            data = _.filter(state.items, function(item) { return item.id !== action.id; });

            helpers.localStorage.set('categories', data);

            return _.assign({}, state, {items: data});

        default:

            return state;

    }

}