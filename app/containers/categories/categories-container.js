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
            formName: '',
            formError: false
        }

    },

    componentDidMount: function() {

        var props = this.props;

        props.dispatch(categoriesActions.fetch());

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

        helpers.logger('[CategoriesContainer] handleSave');

        var props = this.props,
            state = this.state;

        if (!state.formName) {
            this.setState({formError: 'formName'});
            return;
        }

        if (id) {
            props.dispatch(categoriesActions.editCategory({id, name: state.formName}));
        } else {
            props.dispatch(categoriesActions.addCategory({name: state.formName}));
        }
        
        this.setState({
            formName: '',
            formError: false
        }, () => {
            this.context.router.push('/categories');
        });

    },

    handleDelete: function(id) {

        helpers.logger('[CategoriesContainer] handleDelete');

        var props = this.props;

        props.dispatch(categoriesActions.deleteCategory(id));

        this.context.router.push('/categories');

    },

    render: function () {

        helpers.logger('[CategoriesContainer] render');

        var props = this.props,
            state = this.state,
            items = _.get(props, 'categories.items'),
            itemId = _.get(props, 'params.id'),
            item = _.size(items) && itemId ? items[itemId] : {},
            sortedItems = _.orderBy(items, ['name']),
            location = _.get(props, 'location.pathname'),
            isNew = _.endsWith(location, '/new'),
            isDelete = _.endsWith(location, '/delete'),
            isEdit = _.endsWith(location, '/edit');

        if (state.isLoading) {
            return (
                <section className="box-row box-categories">

                    <div className="modal">
                        <h1>Loading...</h1>
                    </div>

                </section>
            );
        }

        if (isNew) {
            return (
                <section className="box-row box-categories">

                    <div className="modal">

                        <h1>Add a new category</h1>
                        <input type="text" value={state.formName} name="formName" className={classNames('inp inp-large full-width', {'with-error': (state.formError === 'formName')})} placeholder="Category name" onChange={this.handleInputChange} />
                        <button className="btn full-width" onClick={() => this.handleSave(null)}><i className={iconsConstants.ADD} /> Add</button>
                        <Link to="/categories" className="without-style">Cancel</Link>

                    </div>
                    
                </section>
            );
        }

        if (isEdit) {
            return (
                <section className="box-row box-categories">

                    <div className="modal">

                        <h1>Edit a category</h1>
                        <input type="text" value={state.formName || item.name} name="formName" className={classNames('inp inp-large full-width', {'with-error': (state.formError === 'formName')})} placeholder={item.name} onChange={this.handleInputChange} />
                        <button className="btn full-width" onClick={() => this.handleSave(item.id)}><i className={iconsConstants.SAVE} /> Save</button>
                        <Link to="/categories" className="without-style">Cancel</Link>

                    </div>
                    
                </section>
            );
        }

        if (isDelete) {
            return (
                <section className="box-row box-categories">

                    <div className="modal">

                        <h1>Delete <strong>{item.name}</strong>?</h1>
                        <button className="btn btn-warning full-width" onClick={() => this.handleDelete(item.id)}><i className={iconsConstants.DELETE} /> Delete</button>
                        <Link to="/categories" className="without-style">Cancel</Link>

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
                        _.map(sortedItems, (category, index) => {
                            return <li key={category.id}>
                                <Link to={'/categories/' + category.id + '/delete'} className="action delete hint--right" data-hint="Delete"><i className={iconsConstants.DELETE} /></Link>
                                <Link to={'/categories/' + category.id + '/edit'} className="action edit hint--left" data-hint="Edit"><i className={iconsConstants.EDIT} /></Link>
                                <span className="name">{category.name}</span>
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