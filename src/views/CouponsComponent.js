import React, { Component } from "react";
import { withApollo } from "react-apollo";
import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	CardFooter,
	Button,
	Badge,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	FormInput,
	InputGroup,
	InputGroupText,
	InputGroupAddon
} from "shards-react";
import PageTitle from "components/common/PageTitle";
import { GET_COUPONS_BY_QUERY } from "apollo/queries";
import moment from "moment";

class CouponsComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			couponsList: []
		};
		this.getCouponsList();
	}

	getCouponsList = () => {
		this.props.client
			.query({
				query: GET_COUPONS_BY_QUERY,
				variables: {
					condition: {
						referrer_id: this.props.authUser.id
					}
				}
			})
			.then(({ data: { getCouponByQuery } }) => {
				this.setState({
					couponsList: getCouponByQuery
				});
			});
	}

	render = () => (
		<Container fluid className="main-content-container px-4">
			<Row noGutters className="page-header py-4">
				<PageTitle sm="4" title="Coupons List" className="text-sm-left" />
			</Row>

			<Row>
				{this.state.couponsList.map((coupon, idx) => (
					<Col lg="4" key={idx}>
						<Card small className="card-post mb-4">
							<CardBody>
								<div className="h6 card-title">
									{moment(coupon.created_at).format("DD/MM/YYYY")}
								</div>
								<p className="card-text text-muted">{coupon.body}</p>
							</CardBody>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
}

export default withApollo(CouponsComponent);
