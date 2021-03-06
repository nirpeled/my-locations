import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import helpers from '../../helpers/helpers.js';
import classNames from 'classnames';

// constants
import iconsConstants from '../../constants/icons-constants.js';

// actions
import * as homepageActions from '../homepage/homepage-actions.js';

var HeaderContainer = React.createClass({

    getInitialState: function() {

        return {
            sorting: 'asc',
            groupByCategory: null
        }

    },

    componentWillReceiveProps: function(nextProps) {

        var page = _.get(nextProps, 'params.page');

        this.setState({
            sorting: _.get(nextProps, [page, 'sorting'], 'asc'),
            groupByCategory: _.get(nextProps, 'locations.groupByCategory')
        })

    },

    toggleSort: function(e) {

        e.preventDefault();

        var props = this.props,
            state = this.state,
            page = _.get(props, 'params.page'),
            sorting = (state.sorting === 'asc') ? 'desc' : 'asc';

        this.setState({sorting});

        props.dispatch(homepageActions.sort(page, sorting));

    },

    toggleGroupByCategory: function(e) {

        e.preventDefault();

        var props = this.props,
            state = this.state,
            groupByCategory = !state.groupByCategory;

        this.setState({groupByCategory});

        props.dispatch(homepageActions.groupByCategory('locations', groupByCategory));

    },

    render: function () {

        helpers.logger('[Header] render');

        var props = this.props,
            state = this.state,
            page = _.get(props, 'params.page'),
            location = _.get(props, 'location.pathname'),
            isCategories = (location === '/categories'),
            isLocations = (location === '/locations'),
            showActions = isCategories || isLocations,
            showSorting = (page && !_.isEmpty(props, [page, 'items']));

        return (
            <header>

                <Link to="/" className="logo"><i className={iconsConstants.MAP} /> myLocations</Link>

                {showActions && <ul className="actions">
                    {isLocations && <li className="hint--left" data-hint="Group by Category"><a href="#" className={classNames({'active': state.groupByCategory})} onClick={this.toggleGroupByCategory}><i className={iconsConstants.TAG} /></a></li>}
                    {showSorting && <li className="hint--left" data-hint="Sort"><a href="#" onClick={this.toggleSort}><i className={iconsConstants['SORT_' + _.toUpper(state.sorting)]} /></a></li>}
                    <li className="hint--left" data-hint="Add"><Link to={page + '/new'}><i className={iconsConstants.ADD} /></Link></li>
                </ul>}
                
            </header>
        );
    }
});

function mapStateToProps(state) {
    return {
        categories: _.get(state, 'homepage.categories'),
        locations: _.get(state, 'homepage.locations')
    };
}

export default connect(mapStateToProps)(HeaderContainer);