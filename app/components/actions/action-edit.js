import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import helpers from '../../helpers/helpers.js';
import classNames from 'classnames';
import Select from 'react-select';

// constants
import iconsConstants from '../../constants/icons-constants.js';

var ActionEdit = React.createClass({

    getInitialState: function() {

        var props = this.props,
            state = {error: false};

        _.each(props.fields, (field) => {
            state[field] = _.get(props, ['item', field])
        });

        return state;

    },

    handleInputChange: function (e) {

        var key = e.target.name,
            value = e.target.value;

        this.setState({
            [key]: value,
            error: false
        });

    },

    handleSelectChange: function (category) {

        this.setState({
            category: category.value,
            error: false
        });

    },

    handleSave: function() {

        var props = this.props,
            state = this.state,
            item = {};

        _.each(props.fields, (field) => {

            if (!state[field]) {
                this.setState({error: field});
                return false;
            } else {
                item[field] = state[field];
            }

        });

        if (_.size(item) == _.size(props.fields)) {
            item.id = props.item.id;
            props.handleSave(props.page, item);
        }

    },

    render: function () {

        helpers.logger('[ActionEdit] render');

        var props = this.props,
            state = this.state;

        return (
            <div className="modal">

                <h1>Edit <strong>{props.item.name}</strong></h1>
                {
                    _.map(props.fields, (field, index) => {

                        if (field === 'category') {
                            return <Select key={index} autosize={false} clearable={false} name="category" value={state.category} options={props.categories} onChange={this.handleSelectChange} />
                        } else {
                            return <input key={index} type="text" value={state[field]} name={field} className={classNames('inp inp-large full-width', {'with-error': (state.error === field)})} placeholder={_.capitalize(field)} onChange={this.handleInputChange} />
                        }

                    })

                }
                <button className="btn full-width" onClick={this.handleSave}><i className={iconsConstants.SAVE} /> Save</button>
                <Link to={'/' + props.page} className="without-style">Cancel</Link>

            </div>
        );
    }
});

export default ActionEdit;