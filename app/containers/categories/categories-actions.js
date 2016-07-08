import _ from 'lodash';
import helpers from '../../helpers/helpers.js';
import categoriesConstants from './categories-constants.js';

export function add(category) {

    helpers.logger('[CategoriesActions] add');

    return _.assign({type: categoriesConstants.CATEGORIES_ADD}, category);

}