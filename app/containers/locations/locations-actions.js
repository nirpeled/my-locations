import _ from 'lodash';
import helpers from '../../helpers/helpers.js';
import locationsConstants from './locations-constants.js';

export function fetch() {

    helpers.logger('[LocationsActions] fetch');

    return {type: locationsConstants.LOCATIONS_FETCH};

}

export function addLocation(location) {

    helpers.logger('[LocationsActions] addLocation');

    return _.assign({type: locationsConstants.LOCATIONS_ADD}, location);

}

export function editLocation(location) {

    helpers.logger('[LocationsActions] editLocation');

    return _.assign({type: locationsConstants.LOCATIONS_EDIT}, location);

}

export function deleteLocation(id) {

    helpers.logger('[LocationsActions] deleteLocation');

    return {
        type: locationsConstants.LOCATIONS_DELETE,
        id
    }

}

export function setSorting(sorting) {

    helpers.logger('[LocationsActions] setSorting');

    return {
        type: locationsConstants.LOCATIONS_SORTING,
        sorting
    }

}