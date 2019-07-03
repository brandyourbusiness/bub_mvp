import React from "react";
import { Route } from "react-router-dom";
import { Query } from "react-apollo";

import { IS_AUTHENTICATED } from "apollo/queries";
import Errors from "views/Errors";

const AuthSwitch = ({
	path,
	exact = false,
	truthyComponent: TruthyComponent,
	falsyComponent: FalsyComponent,
	...rest
}) => (
	<Route
		key={path}
		path={path}
		exact={exact}
		render={props => (
			<Query query={IS_AUTHENTICATED}>
				{({ data: { isAuthenticated, authUser } }) => {
					return isAuthenticated ? (
						<TruthyComponent authUser={authUser} {...rest} />
					) : (
						<FalsyComponent />
					);
				}}
			</Query>
		)}
	/>
);

export const AuthRoute = ({ component, ...rest }) => (
	<AuthSwitch {...rest} truthyComponent={component} falsyComponent={Errors} />
);
