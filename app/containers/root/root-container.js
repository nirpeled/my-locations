import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import styles from '../../styles.js';

import HeaderContainer from '../header/header-container.js';
import Footer from '../../components/footer/footer.js';

var RootContainer = React.createClass({

    render: function() {

        return (

            <html>

                <head>

                    <title>myLocations</title>
                    <link rel="stylesheet" href="/css/application.css" />
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                    <meta httpEquiv="Pragma" content="no-cache" />
                    <meta httpEquiv="Expires" content="-1" />
                    <meta httpEquiv="Cache-Control" content="no-cache" />
                    <meta name="viewport" content="width=device-width" />
                    <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />

                </head>

                <body>

                    <HeaderContainer {...this.props} />
                
                    <main>
                        {this.props.children}
                    </main>

                    <Footer/>

                    <script>var __config = null;</script>
                    <script>var __state = null;</script>
                    <script src="/scripts/vendor.js"></script>
                    <script src="/scripts/application.js"></script>

                </body>

            </html>
        );
    }

});

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(RootContainer);