import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import helpers from '../../helpers/helpers.js';
import iconsConstants from '../../constants/icons-constants.js';

var CategoriesContainer = React.createClass({

    render: function () {

        return (
            <section className="box-row box-categories">

                <ul className="table">

                    {
                        _.times(15, (index) => {
                            return <li key={index}>Category #{index + 1}</li>
                        })
                    }

                </ul>
                
            </section>
        );
    }
});

export default CategoriesContainer;