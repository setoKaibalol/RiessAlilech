import React, { useEffect } from "react"
import moment from "moment"
import { useUserContext } from "@/context"

type Props = {
	auction: any
}

export function endAuction({ auction }: Props) {
	const endsAt = moment(auction.createdAt).add(auction.durationHours, "hours")
	const now = moment()

	const hasEnded = moment(now).isAfter(endsAt)

	if (hasEnded) {
		const endAuction = fetch("/api/auction/end", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ auction }),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
			})
			.catch((err) => {
				console.error(err)
			})
		return endAuction
	} else {
		console.log("Auction has not ended yet")
		return null
	}

	console.log(endsAt)
}
