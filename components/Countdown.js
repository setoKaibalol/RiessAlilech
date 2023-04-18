import { useState, useEffect } from "react"

const Countdown = ({ startTime, durationInHours }) => {
	const [remainingTime, setRemainingTime] = useState(calculateRemainingTime())

	useEffect(() => {
		const interval = setInterval(() => {
			setRemainingTime(calculateRemainingTime())
		}, 1000)

		return () => clearInterval(interval)
	}, [startTime, durationInHours])

	function calculateRemainingTime() {
		const now = new Date().getTime()
		const endTime = startTime + durationInHours * 60 * 60 * 1000
		const timeLeft = endTime - now

		if (timeLeft < 0) {
			return (
				<div className="text-red-500 w-full justify-center flex items-center">
					-
				</div>
			)
		}

		const hours = Math.floor(timeLeft / (60 * 60 * 1000))
		const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000))
		const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000)

		return (
			<div className="flex flex-col w-full">
				<div className="w-full flex justify-center">
					<span className="text-primary-base">
						{hours.toString().padStart(2, "0")}
					</span>
					:{minutes.toString().padStart(2, "0")}:
					{seconds.toString().padStart(2, "0")} h
				</div>
			</div>
		)
	}

	return (
		<div className="flex items-center w-full justify-center text-primary-base font-primary">
			<span className="w-full font-medium">{remainingTime}</span>
		</div>
	)
}

export default Countdown
