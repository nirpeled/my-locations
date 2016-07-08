import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import helpers from '../../helpers/helpers.js';

// constants
import iconsConstants from '../../constants/icons-constants.js';

var Header = React.createClass({

    render: function () {

        helpers.logger('[Header] render');

        return (
            <header>
                <Link to="/" className="without-style logo"><i className={iconsConstants.MAP} /> myLocations</Link>
            </header>
        );
    }
});

export default Header;