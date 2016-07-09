import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import helpers from '../../helpers/helpers.js';
import classNames from 'classnames';

// constants
import iconsConstants from '../../constants/icons-constants.js';

var ActionNew = React.createClass({

    getInitialState: function() {

        var props = this.props,
            state = {error: false};

        _.each(props.fields, (field) => {
            state[field] = ''
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
            props.handleSave(props.page, item);
        }
        
    },

    render: function () {

        helpers.logger('[ActionNew] render');

        var props = this.props,
            state = this.state,
            label;

        switch(props.page) {

            case 'categories':
                label = 'category';
                break;
            case 'locations':
                label = 'location';
                break;

        }

        return (
            <div className="modal">

                <h1>Add a new {label}</h1>
                {
                    _.map(props.fields, (field, index) => {

                        if (field === 'category') {
                            return <input key={index} type="text" value={state[field]} name={field} className={classNames('inp inp-large full-width', {'with-error': (state.error === field)})} placeholder={_.capitalize(field)} onChange={this.handleInputChange} />
                        } else {
                            return <input key={index} type="text" value={state[field]} name={field} className={classNames('inp inp-large full-width', {'with-error': (state.error === field)})} placeholder={_.capitalize(field)} onChange={this.handleInputChange} />
                        }

                    })

                }
                <button className="btn full-width" onClick={this.handleSave}><i className={iconsConstants.ADD} /> Add</button>
                <Link to={'/' + props.page} className="without-style">Cancel</Link>

            </div>
        );
    }
});

export default ActionNew;