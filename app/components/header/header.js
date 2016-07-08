import _ from 'lodash';
import React from 'react';
import helpers from '../../helpers/helpers.js';

// constants
import iconsConstants from '../../constants/icons-constants.js';

var Header = React.createClass({

    render: function () {

        helpers.logger('[Header] render');

        return (
            <header>
                <span className="logo"><i className={iconsConstants.MAP} /> myLocations</span>
            </header>
        );
    }
});

export default Header;