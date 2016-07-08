import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import helpers from '../../helpers/helpers.js';
import iconsConstants from '../../constants/icons-constants.js';

var Homepage = React.createClass({

    render: function () {

        return (
            <section className="box-row box-categories">

                <ul className="table">

                    {
                        _.times(10, (index) => {
                            return <li>Category #{index + 1}</li>
                        })
                    }

                </ul>
                
            </section>
        );
    }
});

export default Homepage;