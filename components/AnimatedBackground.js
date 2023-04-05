import React from "react"

const FloatingHeart = () => {
	const getRandomDirection = () => {
		const x = Math.random() * 500 - 250
		const y = Math.random() * 500 - 250
		return { x, y }
	}
	const getRandomEmote = () => {
		const emotes = ["💘", "💝", "💓", "🧡", "💕", "👑"]
		return emotes[Math.floor(Math.random() * emotes.length)]
	}

	const heartCount = 4
	const hearts = Array.from({ length: heartCount }, () => ({
		direction: getRandomDirection(),
		delay: Math.random() * 0.2,
	}))

	return (
		<div className="absolute -z-10 inset-0 bg-gradient-center from-primary-base to-accent-base via-accent-base">
			{hearts.map((heart, index) => (
				<div
					key={index}
					className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-float`}
					style={{
						animationName: `float-${index}`,
					}}>
					<span className="">❤️</span>
				</div>
			))}
		</div>
	)
}

export default FloatingHeart
