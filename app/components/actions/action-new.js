import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import helpers from '../../helpers/helpers.js';
import classNames from 'classnames';

// constants
import iconsConstants from '../../constants/icons-constants.js';

var ActionNew = React.createClass({

    getInitialState: function() {

        return {
            name: '',
            error: false
        }

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

        item.name = state.name;
        
        if (!item.name) {
            this.setState({error: 'name'});
            return;
        }
        
        props.handleSave(props.page, item);

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
                <input type="text" value={state.name} name="name" className={classNames('inp inp-large full-width', {'with-error': (state.error === 'name')})} placeholder="Name" onChange={this.handleInputChange} />
                <button className="btn full-width" onClick={this.handleSave}><i className={iconsConstants.ADD} /> Add</button>
                <Link to={'/' + props.page} className="without-style">Cancel</Link>

            </div>
        );
    }
});

export default ActionNew;