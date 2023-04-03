const dotenv = require("dotenv")
dotenv.config()
const { createServer } = require("http")
const { parse } = require("url")
const next = require("next")
const io = require("socket.io")
const { createClient } = require("redis")
const { createAdapter } = require("@socket.io/redis-adapter")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
	const server = createServer((req, res) => {
		const parsedUrl = parse(req.url, true)
		handle(req, res, parsedUrl)
	})

	const PORT = process.env.PORT || 3000

	const ioServer = io(server)
	const redisUrl = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`

	const pubClient = createClient(redisUrl)
	const subClient = createClient(redisUrl)

	pubClient.on("connect", () => {
		console.log("Redis pubClient connected")
	})

	subClient.on("connect", () => {
		console.log("Redis subClient connected")
	})

	Promise.all([pubClient.connect(), subClient.connect()])
		.then(() => {
			ioServer.adapter(createAdapter(pubClient, subClient))
		})
		.catch((error) => {
			console.error("Error connecting to Redis:", error)
		})

	ioServer.on("connection", (socket) => {
		console.log("Client connected")

		socket.on("message", (message) => {
			ioServer.emit("message", message)
		})

		socket.on("disconnect", () => {
			console.log("Client disconnected")
		})
	})

	server.listen(PORT, (err) => {
		if (err) throw err
		console.log(`> Ready on http://localhost:${PORT}`)
	})
})
