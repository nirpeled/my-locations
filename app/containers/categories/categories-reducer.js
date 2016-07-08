import _ from 'lodash';
import helpers from '../../helpers/helpers.js';
import categoriesConstants from './categories-constants.js';

export default function categories(state = {}, action = {}) {

    var data,
        uniqueId;

    switch (action.type) {

        case categoriesConstants.CATEGORIES_FETCH:

            helpers.logger('[CategoriesReducer] ' + action.type);

            data = _.assign({items: helpers.localStorage.get('categories')}, helpers.localStorage.get('categories-settings'));

            return _.assign({}, state, data);

        case categoriesConstants.CATEGORIES_ADD:

            helpers.logger('[CategoriesReducer] ' + action.type);

            data = _.assign({}, state.items);

            uniqueId = _.size(data) ? _.max(_.map(data, 'id')) + 1 : 1;
            
            data[uniqueId] = {
                id: uniqueId,
                name: action.name
            };

            helpers.localStorage.set('categories', data);
            
            return _.assign({}, state, {items: data});

        case categoriesConstants.CATEGORIES_EDIT:

            helpers.logger('[CategoriesReducer] ' + action.type);

            data = _.assign({}, state.items);

            data[action.id].name = action.name;

            helpers.localStorage.set('categories', data);

            return _.assign({}, state, {items: data});

        case categoriesConstants.CATEGORIES_DELETE:

            helpers.logger('[CategoriesReducer] ' + action.type);

            data = _.assign({}, state.items);

            delete data[action.id];

            helpers.localStorage.set('categories', data);

            return _.assign({}, state, {items: data});

        case categoriesConstants.CATEGORIES_SORTING:

            helpers.logger('[CategoriesReducer] ' + action.type);

            data = {sorting: action.sorting};

            helpers.localStorage.set('categories-settings', data);

            return _.assign({}, state, data);

        default:

            return state;

    }

}