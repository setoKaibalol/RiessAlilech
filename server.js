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

	const ioServer = io(server)
	const pubClient = createClient({
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
		username: process.env.REDIS_USERNAME,
		password: process.env.REDIS_PASSWORD,
	})
	const subClient = pubClient.duplicate()

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
		console.log(`> Ready on http://localhost:3000`)
	})
})
