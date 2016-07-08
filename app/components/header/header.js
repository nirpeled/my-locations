import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import helpers from '../../helpers/helpers.js';

// constants
import iconsConstants from '../../constants/icons-constants.js';

var Header = React.createClass({

    render: function () {

        helpers.logger('[Header] render');

        var props = this.props,
            location = _.get(props, 'location.pathname'),
            isCategories = (location === '/categories'),
            isLocations = (location === '/locations'),
            showActions = isCategories || isLocations;

        return (
            <header>

                <Link to="/" className="without-style logo"><i className={iconsConstants.MAP} /> myLocations</Link>

                {showActions && <ul className="actions">
                    <li className="hint--bottom" data-hint="Add"><Link to={location + '/new'} className="without-style"><i className={iconsConstants.ADD} /></Link></li>
                </ul>}
                
            </header>
        );
    }
});

export default Header;