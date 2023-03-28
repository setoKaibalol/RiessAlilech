import React from "react"
import DateTimeDisplay from "../helpers/DateTimeDisplay"
import { useCountdown } from "../helpers/useCountdown"
import { ClipLoader } from "react-spinners"

const ShowCounter = ({ days, hours, minutes, seconds, hasStarted }) => {
	return (
		<div className="show-counter">
			{hasStarted ? (
				<p className="font-primary font-medium text-base text-center">
					Zuende in:
				</p>
			) : (
				<p className="font-primary font-medium text-base text-center">
					Beginnt in:
				</p>
			)}

			<div className="countdown-link">
				<DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
				<p>:</p>
				<DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
				<p>:</p>
				<DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
				<p>:</p>
				<DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
			</div>
		</div>
	)
}

const CountdownTimer = ({ targetDate, hasStarted }) => {
	const [days, hours, minutes, seconds] = useCountdown(targetDate)
	if (days + hours + minutes + seconds <= 0) {
		return hasStarted ? (
			<div className="pt-8 w-full flex justify-center items-center">
				<ClipLoader color={"#E0726C"} loading={true} size={40} />
			</div>
		) : (
			<div className="pt-8 w-full flex justify-center items-center">
				<ClipLoader color={"#E0726C"} loading={true} size={40} />
			</div>
		)
	} else {
		return (
			<ShowCounter
				hasStarted={hasStarted}
				days={days}
				hours={hours}
				minutes={minutes}
				seconds={seconds}
			/>
		)
	}
}

export default CountdownTimer
