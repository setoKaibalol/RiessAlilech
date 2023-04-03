// lib/socket.js
import { io } from "socket.io-client"

const socket = io(
	process.env.NEXT_PUBLIC_SOCKET_IO_SERVER || "http://localhost:3001"
)

export default socket
