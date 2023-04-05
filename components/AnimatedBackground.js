// components/AnimatedBackground.js or components/AnimatedBackground.tsx
import React, { useEffect, useState } from "react"

const AnimatedBackground = () => {
	const [heartEmojis, setHeartEmojis] = useState([])

	useEffect(() => {
		const newHearts = Array.from({ length: 20 }, (_, i) => (
			<span
				key={i}
				className="absolute text-2xl opacity-0"
				style={{
					left: `${Math.random() * 100}vw`,
					top: "100%",
					transform: "translateY(100%)",
					transition: `transform ${
						Math.random() * 3 + 2
					}s ease-in-out, opacity ${Math.random() * 3 + 2}s ease-in-out`,
				}}>
				❤️
			</span>
		))
		setHeartEmojis(newHearts)
	}, [])

	useEffect(() => {
		const timer = setTimeout(() => {
			const updatedHearts = heartEmojis.map((heart) => (
				<span
					key={heart.key}
					className="absolute text-2xl"
					style={{
						...heart.props.style,
						top: "-50%",
						transform: "translateY(-100%)",
						opacity: 1,
					}}>
					❤️
				</span>
			))
			setHeartEmojis(updatedHearts)
		}, 500)
		return () => clearTimeout(timer)
	}, [heartEmojis])

	return (
		<div className="gradient-bg w-full h-full fixed top-0 left-0 z-0 overflow-hidden">
			{heartEmojis}
		</div>
	)
}

export default AnimatedBackground
