import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Card, CardHeader } from "shards-react";
import { Query, withApollo } from "react-apollo";

import { GET_ALL_FORMS } from "apollo/queries";
import { UPDATE_USER_BY_ID } from "apollo/mutations";
import FormComponent from "components/components-overview/FormComponent";
import { Loading } from "components";

class FormContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPath: this.props.location.pathname.replace("/", "")
		};
	}

	onSubmit = (userDetails) => {
		console.log("userDetails", userDetails)
		this.props.client.mutate({
			mutation: UPDATE_USER_BY_ID,
			variables: {
				id: this.props.authUser.id,
				input: {
					...userDetails
				}
			}
		})
		.then(res => {
			console.log("USER UPDAETD", res)
		})
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
								details={this.props.authUser}
								onSubmit={this.onSubmit}
							/>
						</Card>
					</Container>
				);
			}}
		</Query>
	);
}

export default withApollo(withRouter(FormContainer));
