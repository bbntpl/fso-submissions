const { ApolloServer } = require('@apollo/server')
const { createServer } = require('http');
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } =  require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const jwt = require('jsonwebtoken')
const express = require('express')
const cors = require('cors')

const User = require('./models/user')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

require('dotenv').config()

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})

// mongoose.set('debug', true)

const app = express()
const httpServer = createServer(app);

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

// Creating the WebSocket server
const wsServer = new WebSocketServer({
	server: httpServer,
	path: '/',
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
	schema,
	plugins: [
		// Proper shutdown for the HTTP server.
		ApolloServerPluginDrainHttpServer({ httpServer }),

		// Proper shutdown for the WebSocket server.
		{
			async serverWillStart() {
				return {
					async drainServer() {
						await serverCleanup.dispose();
					},
				};
			},
		},
	],
});

server.start().then(() => {
	app.use(
		'/',
		cors(),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req, res }) => {
				const auth = req ? req.headers.authorization : null
				if (auth && auth.startsWith('Bearer ')) {
					const decodedToken = jwt.verify(
						auth.substring(7), process.env.JWT_SECRET
					)

					const currentUser = await User
						.findById(decodedToken.id)

					return { currentUser }
				}
			}
		})
	)
})

const PORT = 4000

httpServer.listen(PORT, () => {
	console.log(`Server is now running on http://localhost:${PORT}`)
})