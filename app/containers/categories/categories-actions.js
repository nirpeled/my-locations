import _ from 'lodash';
import helpers from '../../helpers/helpers.js';
import categoriesConstants from './categories-constants.js';

export function fetch() {

    helpers.logger('[CategoriesActions] fetch');

    return {type: categoriesConstants.CATEGORIES_FETCH};

}

export function addCategory(category) {

    helpers.logger('[CategoriesActions] addCategory');

    return _.assign({type: categoriesConstants.CATEGORIES_ADD}, category);

}

export function editCategory(category) {

    helpers.logger('[CategoriesActions] editCategory');

    return _.assign({type: categoriesConstants.CATEGORIES_EDIT}, category);

}

export function deleteCategory(id) {

    helpers.logger('[CategoriesActions] deleteCategory');

    return {
        type: categoriesConstants.CATEGORIES_DELETE,
        id
    }

}

export function setSorting(sorting) {

    helpers.logger('[CategoriesActions] setSorting');

    return {
        type: categoriesConstants.CATEGORIES_SORTING,
        sorting
    }

}