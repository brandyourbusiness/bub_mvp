import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

import { ApolloProvider, withApollo } from 'react-apollo';
import { client } from './apollo/client';

import { initFirebaseUser } from 'firebase/config';

const AppRoutes = () => (
  <Router basename={process.env.REACT_APP_BASENAME || ""}>
	  <div>
	    {
	    	routes.map((route, index) => {
	      return (
	        <Route
	          key={index}
	          path={route.path}
	          exact={route.exact}
	          component={
	          	withApollo(
	          		withTracker(props => {
			          	console.log("props", props);
			            return (
			              <route.layout {...props}>
			                <route.component {...props}/>
			              </route.layout>
			            );
		        	  })
		        	)
		        }
	        />
	      );
	    })}
	  </div>
	</Router>
);

const AppRoute = withApollo(AppRoutes);

class App extends Component {
	constructor(props) {
		super(props);
		initFirebaseUser(client);
	}

	render = () => (
		<ApolloProvider client={client}>
			<AppRoute />
		</ApolloProvider>
	);
}

export default App;