import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider, withApollo, Query } from "react-apollo";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

import { initFirebaseUser } from "firebase/config";
import { client } from "apollo/client";
import { Routes } from "routes/Routes";
import { DefaultLayout } from "layouts";
import { IS_AUTH_INITIALIZED } from "apollo/queries";
import { Loading } from 'components';

class AuthWrapperComponent extends Component {
	render = () => (
		<Query query={IS_AUTH_INITIALIZED}>
			{
				({data: { isAuthInitialized } }) => {
					return isAuthInitialized ? <Loading /> : this.props.children;
				}
			}
		</Query>
	)
}

const AuthWrapper = withApollo(AuthWrapperComponent);

class App extends Component {
	constructor(props) {
		super(props);
		initFirebaseUser(client);
	}

	render = () => (
		<ApolloProvider client={client}>
			<AuthWrapper>
				<Router>
					<DefaultLayout>
						<Routes />
					</DefaultLayout>
				</Router>
			</AuthWrapper>
		</ApolloProvider>
	);
}

export default App;