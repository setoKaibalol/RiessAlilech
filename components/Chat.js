import { useState, useEffect, useRef } from "react"
import io from "socket.io-client"

const Chat = () => {
	const [messages, setMessages] = useState([])
	const [inputMessage, setInputMessage] = useState("")
	const socketRef = useRef()

	useEffect(() => {
		const socketUrl =
			process.env.NODE_ENV === "production"
				? "https://riess-alilech-54n3.vercel.app"
				: "http://localhost:3001"

		socketRef.current = io(socketUrl)

		socketRef.current.on("message", (message) => {
			setMessages((prevMessages) => [...prevMessages, message])
		})

		return () => {
			socketRef.current.disconnect()
		}
	}, [])

	const sendMessage = () => {
		if (inputMessage) {
			socketRef.current.emit("message", inputMessage)
			setInputMessage("")
		}
	}

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			sendMessage()
		}
	}

	return (
		<div>
			<h1>Chat</h1>
			<div>
				{messages.map((message, index) => (
					<div key={index}>{message}</div>
				))}
			</div>
			<input
				type="text"
				value={inputMessage}
				onChange={(e) => setInputMessage(e.target.value)}
				onKeyPress={handleKeyPress}
			/>
			<button onClick={sendMessage}>Send</button>
		</div>
	)
}

export default Chat
