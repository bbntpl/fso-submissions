import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	createHttpLink,
	split
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from '@apollo/client/utilities'

const authLink = setContext((_, { headers }) => {
	const user = JSON.parse(localStorage.getItem('loggedUser'))
	return {
		headers: {
			...headers,
			authorization: user && user?.token ? `Bearer ${user.token}` : null,
		}
	}
})

const httpLink = createHttpLink({
	uri: 'http://localhost:4000'
})

const wsLink = new GraphQLWsLink(
	createClient({
		url: "ws://localhost:4000",
	}),
);

const splitLink = split(
	({query}) => {
		const definition = getMainDefinition(query)
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		)
	},
	wsLink,
	authLink.concat(httpLink)
)

const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')).render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
)