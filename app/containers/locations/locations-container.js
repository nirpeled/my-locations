import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';
import helpers from '../../helpers/helpers.js';

// constants
import iconsConstants from '../../constants/icons-constants.js';

// actions
import * as locationsActions from './locations-actions.js';

var LocationsContainer = React.createClass({

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState: function() {

        return {
            isLoading: true,
            formName: '',
            formAddress: '',
            formCoordinates: '',
            formCategory: '',
            formError: false
        }

    },

    componentDidMount: function() {

        var props = this.props;

        props.dispatch(locationsActions.fetch());

        this.setState({isLoading: false});

    },

    handleInputChange: function (e) {

        var key = e.target.name,
            value = e.target.value;

        this.setState({
            [key]: value,
            formError: false
        });

    },

    handleSave: function(id) {

        helpers.logger('[LocationsContainer] handleSave');

        var props = this.props,
            state = this.state;

        if (!state.formName) {
            this.setState({formError: 'formName'});
            return;
        }

        if (id) {
            props.dispatch(locationsActions.editLocation({id, name: state.formName}));
        } else {
            props.dispatch(locationsActions.addLocation({name: state.formName}));
        }

        this.setState({
            formName: '',
            formError: false
        }, () => {
            this.context.router.push('/locations');
        });

    },

    handleDelete: function(id) {

        helpers.logger('[LocationsContainer] handleDelete');

        var props = this.props;

        props.dispatch(locationsActions.deleteLocation(id));

        this.context.router.push('/locations');

    },

    render: function () {

        helpers.logger('[LocationsContainer] render');

        var props = this.props,
            state = this.state,
            items = _.get(props, 'locations.items'),
            itemId = _.get(props, 'params.id'),
            item = _.size(items) && itemId ? items[itemId] : {},
            sortedItems = _.orderBy(items, ['name']),
            location = _.get(props, 'location.pathname'),
            isNew = _.endsWith(location, '/new'),
            isDelete = _.endsWith(location, '/delete'),
            isEdit = _.endsWith(location, '/edit');

        if (state.isLoading) {
            return (
                <section className="box-row box-locations">

                    <div className="modal">
                        <h1>Loading...</h1>
                    </div>

                </section>
            );
        }

        if (isNew) {
            return (
                <section className="box-row box-locations">

                    <div className="modal">

                        <h1>Add a new location</h1>
                        <input type="text" value={state.formName} name="formName" className={classNames('inp inp-large full-width', {'with-error': (state.formError === 'formName')})} placeholder="Location name" onChange={this.handleInputChange} />
                        <input type="text" value={state.formAddress} name="formAddress" className={classNames('inp inp-large full-width', {'with-error': (state.formError === 'formAddress')})} placeholder="Location address" onChange={this.handleInputChange} />
                        <input type="text" value={state.formCoordinates} name="formCoordinates" className={classNames('inp inp-large full-width', {'with-error': (state.formError === 'formCoordinates')})} placeholder="Location coordinates" onChange={this.handleInputChange} />
                        <input type="text" value={state.formCategory} name="formCategory" className={classNames('inp inp-large full-width', {'with-error': (state.formError === 'formCategory')})} placeholder="Location category" onChange={this.handleInputChange} />
                        <button className="btn full-width" onClick={() => this.handleSave(null)}><i className={iconsConstants.ADD} /> Add</button>
                        <Link to="/locations" className="without-style">Cancel</Link>

                    </div>

                </section>
            );
        }

        if (isEdit) {
            return (
                <section className="box-row box-locations">

                    <div className="modal">

                        <h1>Edit a location</h1>
                        <input type="text" value={state.formName || item.name} name="formName" className={classNames('inp inp-large full-width', {'with-error': (state.formError === 'formName')})} placeholder={item.name} onChange={this.handleInputChange} />
                        <button className="btn full-width" onClick={() => this.handleSave(item.id)}><i className={iconsConstants.SAVE} /> Save</button>
                        <Link to="/locations" className="without-style">Cancel</Link>

                    </div>

                </section>
            );
        }

        if (isDelete) {
            return (
                <section className="box-row box-locations">

                    <div className="modal">

                        <h1>Delete <strong>{item.name}</strong>?</h1>
                        <button className="btn btn-warning full-width" onClick={() => this.handleDelete(item.id)}><i className={iconsConstants.DELETE} /> Delete</button>
                        <Link to="/locations" className="without-style">Cancel</Link>

                    </div>

                </section>
            );
        }

        if (_.isEmpty(items)) {
            return (
                <section className="box-row box-locations">

                    <div className="modal">
                        <h1>No locations were found</h1>
                        <Link to="/locations/new" className="btn full-width">Add a new location</Link>
                    </div>

                </section>
            );
        }

        return (
            <section className="box-row box-locations">

                <ul className="table">

                    {
                        _.map(sortedItems, (location, index) => {
                            return <li key={location.id}>
                                <Link to={'/locations/' + location.id + '/delete'} className="action delete hint--right" data-hint="Delete"><i className={iconsConstants.DELETE} /></Link>
                                <Link to={'/locations/' + location.id + '/edit'} className="action edit hint--left" data-hint="Edit"><i className={iconsConstants.EDIT} /></Link>
                                <span className="name">{location.name}</span>
                            </li>
                        })
                    }

                </ul>

            </section>
        );
    }
});

function mapStateToProps(state) {
    return {
        categories: _.get(state, 'categories'),
        locations: _.get(state, 'locations')
    };
}

export default connect(mapStateToProps)(LocationsContainer);