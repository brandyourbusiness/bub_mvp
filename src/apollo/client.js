import { ApolloClient } from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';

const cache = new InMemoryCache({
	addTypename: false,
	dataIdFromObject: object => object.id || null
});

const stateLink = withClientState({
	defaults: {
		isUserExists: false
	},
	resolvers: {
		Mutation: () => ({}),
		Query: () => ({})
	},
	cache
});

const httpLink = new HttpLink({
	uri: 'http://localhost:4000/graphql'
});

export const client = new ApolloClient({
	link: ApolloLink.from([
		stateLink,
		httpLink
	]),
	cache
});