import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import helpers from '../../helpers/helpers.js';
import classNames from 'classnames';

// constants
import iconsConstants from '../../constants/icons-constants.js';

var ActionEdit = React.createClass({

    getInitialState: function() {

        var props = this.props;
        
        return {
            name: _.get(props, 'item.name'),
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

        item.id = props.item.id;
        item.name = state.name;

        if (!item.name) {
            this.setState({error: 'name'});
            return;
        }

        props.handleSave(props.page, item);

    },

    render: function () {

        helpers.logger('[ActionEdit] render');

        var props = this.props,
            state = this.state;

        return (
            <div className="modal">

                <h1>Edit <strong>{props.item.name}</strong></h1>
                <input type="text" value={state.name} name="name" className={classNames('inp inp-large full-width', {'with-error': (state.error === 'name')})} placeholder="Name" onChange={this.handleInputChange} />
                <button className="btn full-width" onClick={this.handleSave}><i className={iconsConstants.SAVE} /> Save</button>
                <Link to={'/' + props.page} className="without-style">Cancel</Link>

            </div>
        );
    }
});

export default ActionEdit;