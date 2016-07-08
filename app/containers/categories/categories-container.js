import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';
import helpers from '../../helpers/helpers.js';

// constants
import iconsConstants from '../../constants/icons-constants.js';

// actions
import * as categoriesActions from './categories-actions.js';

var CategoriesContainer = React.createClass({

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState: function() {

        return {
            isLoading: true,
            newCategoryName: '',
            newCategoryError: false
        }

    },

    componentDidMount: function() {

        var props = this.props;

        props.dispatch(categoriesActions.fetch());

        this.setState({isLoading: false});

    },

    handleInputChange: function (e) {

        helpers.logger('[CategoriesContainer] handleInputChange');

        var key = e.target.name,
            value = e.target.value;

        this.setState({
            [key]: value,
            newCategoryError: false
        });

    },

    handleSave: function() {

        helpers.logger('[CategoriesContainer] handleSave');

        var props = this.props,
            state = this.state;

        if (!state.newCategoryName) {
            this.setState({newCategoryError: 'newCategoryName'});
            return;
        }

        props.dispatch(categoriesActions.add({name: state.newCategoryName}));

        this.setState({
            newCategoryName: '',
            newCategoryError: false
        }, () => {
            this.context.router.push('/categories');
        });

    },

    render: function () {

        helpers.logger('[CategoriesContainer] render');

        var props = this.props,
            state = this.state,
            items = _.get(props, 'categories.items'),
            location = _.get(props, 'location.pathname'),
            isNew = _.endsWith(location, '/new');

        if (isNew) {
            return (
                <section className="box-row box-categories">

                    <div className="modal">

                        <h1>Add a new category</h1>
                        <input type="text" value={state.newCategoryName} name="newCategoryName" className={classNames('inp inp-large full-width', {'with-error': (state.newCategoryError === 'newCategoryName')})} placeholder="Category name" onChange={this.handleInputChange} />
                        <button className="btn full-width" onClick={this.handleSave}>Save</button>
                        <Link to="/categories" className="without-style">Cancel</Link>

                    </div>
                    
                </section>
            );
        }

        if (state.isLoading) {
            return (
                <section className="box-row box-categories">

                    <div className="modal">
                        <h1>Loading...</h1>
                    </div>

                </section>
            );
        }

        if (_.isEmpty(items)) {
            return (
                <section className="box-row box-categories">

                    <div className="modal">
                        <h1>No categories were found</h1>
                        <Link to="/categories/new" className="btn full-width">Add a new category</Link>
                    </div>
                    
                </section>
            );
        }

        return (
            <section className="box-row box-categories">

                <ul className="table">

                    {
                        _.map(items, (category, index) => {
                            return <li key={category.id}>
                                <span className="action delete hint--right" data-hint="Delete"><i className={iconsConstants.DELETE} /></span>
                                <span className="name">{category.name}</span>
                                <span className="action edit hint--left" data-hint="Edit"><i className={iconsConstants.EDIT} /></span>
                            </li>
                        })
                    }

                </ul>

            </section>
        );
    }
});

export default CategoriesContainer;

function mapStateToProps(state) {
    return {
        categories: _.get(state, 'categories')
    };
}

export default connect(mapStateToProps)(CategoriesContainer);