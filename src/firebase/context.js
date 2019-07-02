import React from 'React';

const FirebaseContext = React.createContext(null);

export withFirebase = Component => props => (
	<FirebaseContext.Consumer>
		{firebase => <Component {...props} firebase={firebase} />}
	</FirebaseContext.Consumer>
)

export default FirebaseContext;