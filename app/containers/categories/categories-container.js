import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';
import helpers from '../../helpers/helpers.js';

// constants
import iconsConstants from '../../constants/icons-constants.js';

var CategoriesContainer = React.createClass({

    render: function () {

        helpers.logger('[CategoriesContainer] render');

        var props = this.props,
            location = _.get(props, 'location.pathname'),
            isNew = _.endsWith(location, '/new');

        console.log('props', props);

        if (isNew) {
            return (
                <section className="box-row box-categories">

                    <div className="new">

                        <input type="text" name="category" className="inp inp-large full-width" placeholder="Enter a new category name"/>
                        <button className="btn btn-large full-width">Save Changes</button>
                        <Link to="/categories" className="without-style cancel">Cancel</Link>

                    </div>
                    
                </section>
            );
        }

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

function mapStateToProps(state) {
    return {
        categories: _.get(state, 'categories')
    };
}

export default connect(mapStateToProps)(CategoriesContainer);