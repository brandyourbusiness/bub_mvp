import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Card, CardHeader } from "shards-react";
import { Query, withApollo } from "react-apollo";

import { GET_ALL_FORMS, GET_BRANDS_BY_QUERY } from "apollo/queries";
import { CREATE_BRAND, UPDATE_BRAND_BY_ID } from "apollo/mutations";
import FormComponent from "components/components-overview/FormComponent";
import { Loading } from "components";
import lodash from "lodash";

class EditBrandsComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPath: this.props.location.pathname.replace("/", "")
		};
	}

	componentDidMount() {
		this.props.client.query({
			query: GET_BRANDS_BY_QUERY,
			variables: {
				condition: {
					user_id: this.props.authUser.id
				}
			}
		}).then(({data : { getBrandByQuery } }) => {
			if (!getBrandByQuery || getBrandByQuery.length === 0) {
				this.setState({
					brand: {}
				})
			}
			this.setState({
				brand: getBrandByQuery[0]
			})
		})
	}

	onSubmit = (brandDetails) => {
		console.log("brandDetails", brandDetails)
		if (lodash.isEmpty(this.state.brand)) {
			this.props.client.mutate({
				mutation: CREATE_BRAND,
				variables: {
					input: {
						...brandDetails,
						user_id: this.props.authUser.id
					}
				}
			})
		} else {		
			this.props.client.mutate({
				mutation: UPDATE_BRAND_BY_ID,
				variables: {
					id: this.state.brand.id,
					input: {
						...brandDetails,
						user_id: this.props.authUser.id
					}
				}
			})
		}
	}

	render = () => (
		<Query query={GET_ALL_FORMS}>
			{({ data, loading }) => {
				if (loading) {
					return <Loading />;
				}
				const { list } = data.getAllFormsList;
				console.log("FORMCONTAINER", this.props)
				return (
					<Container fluid className="main-content-container px-4 pb-4 pt-4">
						<Card small>
							<CardHeader className="border-bottom">
								<h6 className="m-0">{this.state.currentPath.toUpperCase()}</h6>
							</CardHeader>
							<FormComponent
								list={list[this.state.currentPath]}
								details={this.state.brand || {}}
								onSubmit={this.onSubmit}
							/>
						</Card>
					</Container>
				);
			}}
		</Query>
	);
}

export default withApollo(EditBrandsComponent);
