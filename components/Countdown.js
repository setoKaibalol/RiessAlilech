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
			return <div className="text-red-500 py-5">ABGELAUFEN</div>
		}

		const hours = Math.floor(timeLeft / (60 * 60 * 1000))
		const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000))
		const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000)

		return (
			<div className="flex flex-col w-full justify-center items-center">
				<div>
					<span className="text-accent-base">
						{hours.toString().padStart(2, "0")}
					</span>
					:{minutes.toString().padStart(2, "0")}:
					{seconds.toString().padStart(2, "0")}
				</div>
				<p className="text-3xl px-2 font-medium"> Stunden</p>
			</div>
		)
	}

	return (
		<div className="flex items-center justify-center text-secondary-base font-primary">
			<span className="text-3xl font-bold mr-2">{remainingTime}</span>
		</div>
	)
}

export default Countdown
