import _ from 'lodash';
import helpers from '../../helpers/helpers.js';
import homepageConstants from './homepage-constants.js';

export function fetch() {

    helpers.logger('[HomepageActions] fetch');

    return {type: homepageConstants.FETCH};

}

export function add(page, item) {

    helpers.logger('[HomepageActions] add');

    return {
        type: homepageConstants.ADD,
        page,
        item
    }

}

export function edit(page, item) {

    helpers.logger('[HomepageActions] edit');

    return {
        type: homepageConstants.EDIT,
        page,
        item
    }

}

export function remove(page, itemId) {

    helpers.logger('[HomepageActions] remove');

    return {
        type: homepageConstants.REMOVE,
        page,
        itemId
    }

}

export function sort(page, sorting) {

    helpers.logger('[HomepageActions] sort');

    return {
        type: homepageConstants.SORT,
        page,
        sorting
    }

}