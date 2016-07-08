import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import helpers from '../../helpers/helpers.js';
import iconsConstants from '../../constants/icons-constants.js';

var LocationsContainer = React.createClass({

    render: function () {

        return (
            <section className="box-row box-locations">

                <ul className="table">

                    {
                        _.times(20, (index) => {
                            return <li key={index}>Location #{index + 1}</li>
                        })
                    }

                </ul>
                
            </section>
        );
    }
});

export default LocationsContainer;