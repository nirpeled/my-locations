import _ from 'lodash';
import helpers from '../../helpers/helpers.js';
import locationsConstants from './locations-constants.js';

export default function locations(state = {}, action = {}) {

    var data,
        uniqueId;

    switch (action.type) {

        case locationsConstants.LOCATIONS_FETCH:

            helpers.logger('[LocationsReducer] ' + action.type);

            data = _.assign({items: helpers.localStorage.get('locations')}, helpers.localStorage.get('locations-settings'));

            return _.assign({}, state, data);

        case locationsConstants.LOCATIONS_ADD:

            helpers.logger('[LocationsReducer] ' + action.type);

            data = _.assign({}, state.items);

            uniqueId = _.size(data) ? _.max(_.map(data, 'id')) + 1 : 1;

            data[uniqueId] = {
                id: uniqueId,
                name: action.name
            };

            helpers.localStorage.set('locations', data);

            return _.assign({}, state, {items: data});

        case locationsConstants.LOCATIONS_EDIT:

            helpers.logger('[LocationsReducer] ' + action.type);

            data = _.assign({}, state.items);

            data[action.id].name = action.name;

            helpers.localStorage.set('locations', data);

            return _.assign({}, state, {items: data});

        case locationsConstants.LOCATIONS_DELETE:

            helpers.logger('[LocationsReducer] ' + action.type);

            data = _.assign({}, state.items);

            delete data[action.id];

            helpers.localStorage.set('locations', data);

            return _.assign({}, state, {items: data});

        case locationsConstants.LOCATIONS_SORTING:

            helpers.logger('[LocationsReducer] ' + action.type);

            data = {sorting: action.sorting};

            helpers.localStorage.set('locations-settings', data);

            return _.assign({}, state, data);

        default:

            return state;

    }

}