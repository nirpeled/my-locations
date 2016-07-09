import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import helpers from '../../helpers/helpers.js';
import classNames from 'classnames';

// constants
import iconsConstants from '../../constants/icons-constants.js';

var ActionDelete = React.createClass({

    handleDelete: function() {

        var props = this.props;

        props.handleDelete(props.page, props.item.id);

    },

    render: function () {

        helpers.logger('[ActionDelete] render');

        var props = this.props;

        return (
            <div className="modal">

                <h1>Delete <strong>{_.get(props, 'item.name')}</strong>?</h1>
                <button className="btn btn-warning full-width" onClick={this.handleDelete}><i className={iconsConstants.DELETE} /> Delete</button>
                <Link to={'/' + props.page} className="without-style">Cancel</Link>

            </div>
        );
    }
});

export default ActionDelete;