import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
import { withApollo, Query } from "react-apollo";

import MainNavbar from "components/layout/MainNavbar/MainNavbar";
import MainSidebar from "components/layout/MainSidebar/MainSidebar";
import MainFooter from "components/layout/MainFooter";
import { IS_AUTHENTICATED } from "apollo/queries";

class DefaultLayout extends Component {
	render = () => {
		const {
			children,
			noNavbar,
			noFooter
		} = this.props;
		return (
		  <Container fluid>
		    <Row>
		    	<Query query={IS_AUTHENTICATED}>
		    		{
		    			({data}) => (
		    				<>
						      <MainSidebar isAuthenticated={data.isAuthenticated}/>
						      <Col
						        className="main-content p-0"
						        lg={{ size: 10, offset: 2 }}
						        md={{ size: 9, offset: 3 }}
						        sm="12"
						        tag="main"
						      >
						        {!noNavbar && <MainNavbar />}
						        {children}
						        {!noFooter && <MainFooter />}
						      </Col>
						    </>
		    			)
		    		}
		    	</Query>
		    </Row>
		  </Container>
		);
	}
}

DefaultLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default withApollo(DefaultLayout);
