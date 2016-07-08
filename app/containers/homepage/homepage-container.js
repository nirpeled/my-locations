import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import helpers from '../../helpers/helpers.js';

// constants
import iconsConstants from '../../constants/icons-constants.js';

var HomepageContainer = React.createClass({

    render: function () {

        helpers.logger('[HomepageContainer] render');

        return (
            <section className="box-row box-homepage">

                <ul className="table">

                    {
                        _.times(1, (index) => {
                            return <li key={index}>Homepage</li>
                        })
                    }

                </ul>
                
            </section>
        );
    }
});

export default HomepageContainer;