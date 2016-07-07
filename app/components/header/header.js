import _ from 'lodash';
import React from 'react';
import helpers from '../../helpers/helpers.js';

var Header = React.createClass({

    render: function () {

        helpers.logger('[Header] render');

        return (
            <header>
                <span className="logo">My Locations</span>
            </header>
        );
    }
});

export default Header;