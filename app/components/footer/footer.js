import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import helpers from '../../helpers/helpers.js';

// constants
import iconsConstants from '../../constants/icons-constants.js';

var Footer = React.createClass({

    render: function () {

        helpers.logger('[Footer] render');

        return (
            <footer>
                <nav>
                    <Link to="/"><i className={iconsConstants.TAG} /> Categories</Link>
                    <Link to="/locations"><i className={iconsConstants.MAP} /> Locations</Link>
                </nav>
            </footer>
        );
    }
});

export default Footer;