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

                    <li>Category #1</li>
                    <li>Category #2</li>
                    <li>Category #3</li>

                </ul>
                
            </section>
        );
    }
});

export default Homepage;