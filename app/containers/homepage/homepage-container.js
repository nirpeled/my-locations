import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import helpers from '../../helpers/helpers.js';

// constants
import iconsConstants from '../../constants/icons-constants.js';

var HomepageContainer = React.createClass({

    render: function () {

        helpers.logger('[HomepageContainer] render');

        var props = this.props,
            categories = _.get(props, 'categories.items', {}),
            locations = _.get(props, 'locations.items', {});

        return (
            <section className="box-row box-homepage">

                <ul className="table">

                    <li>Categories ({_.size(categories)})</li>
                    <li>Locations ({_.size(locations)})</li>

                </ul>
                
            </section>
        );
    }
});

function mapStateToProps(state) {
    return {
        categories: _.get(state, 'categories'),
        locations: _.get(state, 'locations')
    };
}

export default connect(mapStateToProps)(HomepageContainer);