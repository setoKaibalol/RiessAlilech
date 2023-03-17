import React from "react"
import CreateAuctionComponent from "./CreateAuctionComponent"
import AuctionCard from "../cards/AuctionCard"

type Props = {}

function DashboardAuctions({}: Props) {
	// 1
	return (
		<div className="h-full flex flex-col justify-between divide-y-2 sm:divide-y-0 sm:flex-row bg-white sm:divide-x-2">
			<div className="sm:hidden p-2 text-center text-2xl font-medium">
				<p>Auctions</p>
			</div>
			<section className="sm:w-1/2 h-full w-full p-4">
				<p>Alle Auctions</p>
				<div className="flex flex-row">
					<AuctionCard />
				</div>
			</section>
			<section className="sm:w-1/2 w-full">
				<CreateAuctionComponent />
			</section>
		</div>
	)
}

export default DashboardAuctions
