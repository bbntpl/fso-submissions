import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	createHttpLink
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
	const user = JSON.parse(localStorage.getItem('loggedUser'))
	return {
		headers: {
			...headers,
			authorization: user && user?.token? `Bearer ${user.token}` : null,
		}
	}
})

const httpLink = createHttpLink({
	uri: 'http://localhost:4000'
})

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')).render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
)