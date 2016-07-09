import _ from 'lodash';
import helpers from '../../helpers/helpers.js';
import homepageConstants from './homepage-constants.js';

export default function homepage(state = {}, action = {}) {

    var localStorageName = 'my-locations',
        data,
        uniqueId,
        store;

    switch (action.type) {

        case homepageConstants.FETCH:

            helpers.logger('[HomepageReducer] ' + action.type);

            data = helpers.localStorage.get(localStorageName);

            return _.assign({}, state, data);

        case homepageConstants.ADD:

            helpers.logger('[HomepageReducer] ' + action.type);

            data = _.assign({}, state[action.page]);
            uniqueId = _.size(data.items) ? _.max(_.map(data.items, 'id')) + 1 : 1;
            data.items = _.size(data.items) ? data.items : {};
            data.items[uniqueId] = _.assign({id: uniqueId}, action.item);
            store = _.assign({}, state, {[action.page]: data});

            helpers.localStorage.set(localStorageName, store);

            return store;

        case homepageConstants.EDIT:

            helpers.logger('[HomepageReducer] ' + action.type);

            data = _.assign({}, state[action.page]);
            data.items[action.item.id] = action.item;
            store = _.assign({}, state, {[action.page]: data});

            helpers.localStorage.set(localStorageName, store);

            return store;

        case homepageConstants.REMOVE:

            helpers.logger('[HomepageReducer] ' + action.type);

            data = _.assign({}, state[action.page]);
            delete data.items[action.itemId];
            store = _.assign({}, state, {[action.page]: data});

            helpers.localStorage.set(localStorageName, store);

            return store;

        case homepageConstants.SORT:

            helpers.logger('[HomepageReducer] ' + action.type);

            data = _.assign({}, state[action.page]);
            data.sorting = action.sorting;
            store = _.assign({}, state, {[action.page]: data});

            helpers.localStorage.set(localStorageName, store);

            return store;

        default:

            return state;

    }

}