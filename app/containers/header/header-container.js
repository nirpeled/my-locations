import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import helpers from '../../helpers/helpers.js';

// constants
import iconsConstants from '../../constants/icons-constants.js';

// actions
import * as homepageActions from '../homepage/homepage-actions.js';

var HeaderContainer = React.createClass({

    getInitialState: function() {

        return {
            sorting: 'asc'
        }

    },

    componentWillReceiveProps: function(nextProps) {

        var page = _.get(nextProps, 'params.page');

        this.setState({
            sorting: _.get(nextProps, [page, 'sorting'], 'asc')
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