import { ApolloClient } from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { setContext } from 'apollo-link-context';

const cache = new InMemoryCache({
	addTypename: false,
	dataIdFromObject: object => object.id || null
});

const stateLink = withClientState({
	defaults: {
		isUserExists: false,
		isAuthenticated: false,
		isAuthInitialized: false
	},
	resolvers: {
		Mutation: () => ({}),
		Query: () => ({})
	},
	cache
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : null
		}
	}
})

const httpLink = new HttpLink({
	uri: 'http://localhost:4000/graphql'
});

export const client = new ApolloClient({
	link: ApolloLink.from([
		stateLink,
		authLink,
		httpLink
	]),
	cache
});
