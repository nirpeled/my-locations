import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import helpers from '../../helpers/helpers.js';

// constants
import iconsConstants from '../../constants/icons-constants.js';

// actions
import * as categoriesActions from '../categories/categories-actions.js';

var HeaderContainer = React.createClass({

    getInitialState: function() {

        return {
            sorting: 'asc'
        }

    },

    toggleSort: function(e) {

        e.preventDefault();
        
        var props = this.props,
            state = this.state,
            location = _.get(props, 'location.pathname'),
            isCategories = (location === '/categories'),
            isLocations = (location === '/locations'),
            sorting = (state.sorting === 'asc') ? 'desc' : 'asc';

        this.setState({sorting});

        if (isCategories) {
            props.dispatch(categoriesActions.setSorting(sorting));
        }
        
    },

    render: function () {

        helpers.logger('[Header] render');

        var props = this.props,
            state = this.state,
            location = _.get(props, 'location.pathname'),
            isCategories = (location === '/categories'),
            isLocations = (location === '/locations'),
            showActions = isCategories || isLocations,
            showSorting = isCategories && _.size(props, 'categories.items');

        return (
            <header>

                <Link to="/" className="logo"><i className={iconsConstants.MAP} /> myLocations</Link>

                {showActions && <ul className="actions">
                    {/*showSorting && <li className="hint--left" data-hint="Sort"><a href="#" onClick={this.toggleSort}><i className={iconsConstants['SORT_' + _.toUpper(state.sorting)]} /></a></li>*/}
                    <li className="hint--left" data-hint="Add"><Link to={location + '/new'}><i className={iconsConstants.ADD} /></Link></li>
                </ul>}
                
            </header>
        );
    }
});

function mapStateToProps(state) {
    return {
        categories: _.get(state, 'categories')
    };
}

export default connect(mapStateToProps)(HeaderContainer);