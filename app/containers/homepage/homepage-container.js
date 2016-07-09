import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import helpers from '../../helpers/helpers.js';

// constants
import iconsConstants from '../../constants/icons-constants.js';

// actions
import * as homepageActions from './homepage-actions.js';

var HomepageContainer = React.createClass({

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    
    getInitialState: function() {

        return {
            isLoading: true
        }

    },

    componentDidMount: function() {

        var props = this.props;

        props.dispatch(homepageActions.fetch());

        this.setState({isLoading: false});

    },

    handleSave: function(page, item) {

        helpers.logger('[HomepageContainer] handleSave');

        var props = this.props;
        
        if (item.id) {
            props.dispatch(homepageActions.edit(page, item));
        } else {
            props.dispatch(homepageActions.add(page, item));
        }
        
        this.context.router.push('/' + page);

    },

    handleDelete: function(page, itemId) {

        helpers.logger('[HomepageContainer] handleDelete');

        var props = this.props;

        props.dispatch(homepageActions.remove(page, itemId));

        this.context.router.push('/' + page);

    },    
    
    render: function () {

        helpers.logger('[HomepageContainer] render');

        var props = this.props,
            state = this.state,
            params = _.get(props, 'params', {}),
            filterByCategory = _.get(props, 'location.query.category'),
            categories = _.get(props, 'categories.items', {}),
            locations = _.get(props, 'locations.items', {}),
            page = _.get(props, 'params.page'),
            isCategories = (page === 'categories'),
            isLocations = (page === 'locations'),
            items = filterByCategory ? _.filter(_.get(props, [page, 'items']), ['category', parseInt(filterByCategory)]) : _.get(props, [page, 'items']),
            sorting = _.get(props, [page, 'sorting']),
            sortedItems = _.orderBy(items, 'name', sorting),
            actionProps = {},
            fields = {
                categories: ['name'],
                locations: ['name', 'address', 'coordinates', 'category']
            };

        if (state.isLoading) {
            return (
                <section className="box-row box-homepage">

                    <div className="modal">
                        <h1>Loading...</h1>
                    </div>

                </section>
            );
        }

        if (props.children) {

            actionProps.fields = fields[page];
            actionProps.item = params.id ? items[params.id] : null;
            actionProps.page = page;
            actionProps.handleSave = this.handleSave;
            actionProps.handleDelete = this.handleDelete;
            actionProps.categories = _.map(_.orderBy(categories, 'name', 'asc'), (category) => {return {value: category.id, label: category.name}});

            return(
                <section className="box-row box-homepage">
                    {React.cloneElement(props.children, actionProps)}
                </section>
            );
            
        }
        
        if (isCategories || isLocations) {

            if (_.isEmpty(items)) {
                return (
                    <section className="box-row box-homepage">

                        <div className="modal">
                            <h1>No {page} were found</h1>
                            <Link to={'/' + page + '/new'} className="btn full-width"><i className={iconsConstants.ADD} /> Add</Link>
                        </div>

                    </section>
                );
            }

            if (isLocations && _.get(props, 'locations.groupByCategory')) {

                return (
                    <section className="box-row box-homepage">

                        {
                            _.map(_.orderBy(categories, 'name', sorting), (category, index) => {

                                return (
                                    <ul key={category.id} className="table">

                                        {!_.isEmpty(_.filter(sortedItems, ['category', category.id])) && <li className="category">{category.name}</li>}

                                        {
                                            _.map(_.filter(sortedItems, ['category', category.id]), (item, index) => {
                                                return <li key={item.id}>
                                                    <Link to={'/' + page + '/' + item.id + '/delete'} className="action delete hint--right" data-hint="Delete"><i className={iconsConstants.DELETE} /></Link>
                                                    <Link to={'/' + page + '/' + item.id + '/edit'} className="action edit hint--left" data-hint="Edit"><i className={iconsConstants.EDIT} /></Link>
                                                    <span className="name">{item.name}</span>
                                                    <a target="_blank" href={'https://www.google.com/maps/place/' + _.words(item.name).join('+')} className="action open hint--left" data-hint="Show location on Google Maps"><i className={iconsConstants.OPEN} /></a>
                                                </li>
                                            })

                                        }

                                    </ul>
                                )

                            })
                        }

                    </section>
                );
            }

            return (
                <section className="box-row box-homepage">

                    <ul className="table">

                        {
                            _.map(sortedItems, (item, index) => {
                                return <li key={item.id}>
                                    <Link to={'/' + page + '/' + item.id + '/delete'} className="action delete hint--right" data-hint="Delete"><i className={iconsConstants.DELETE} /></Link>
                                    <Link to={'/' + page + '/' + item.id + '/edit'} className="action edit hint--left" data-hint="Edit"><i className={iconsConstants.EDIT} /></Link>
                                    <span className="name">{item.name}</span>
                                    {isCategories && <Link to={'/locations?category=' + item.id} className="action filter hint--left" data-hint="Show locations for this category"><i className={iconsConstants.MAP} /></Link>}
                                    {isLocations && <a target="_blank" href={'https://www.google.com/maps/place/' + _.words(item.name).join('+')} className="action open hint--left" data-hint="Show location on Google Maps"><i className={iconsConstants.OPEN} /></a>}
                                </li>
                            })
                        }

                    </ul>

                </section>
            );
        }

        return (
            <section className="box-row box-homepage">

                <ul className="table">

                    <li>Categories ({_.size(categories)})</li>
                    <li>Locations ({_.size(locations)})</li>

                </ul>
                
            </section>
        );
    }
});

function mapStateToProps(state) {
    return {
        categories: _.get(state, 'homepage.categories'),
        locations: _.get(state, 'homepage.locations')
    };
}

export default connect(mapStateToProps)(HomepageContainer);