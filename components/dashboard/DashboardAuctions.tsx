import React from "react"
import CreateAuctionComponent from "./CreateAuctionComponent"

type Props = {}

function DashboardAuctions({}: Props) {
	// 1
	return (
		<div className="h-full sm:bg-primary-100 divide-y-2">
			<section className=" h-1/2"></section>
			<section className=" h-1/2">
				<CreateAuctionComponent />
			</section>
		</div>
	)
}

export default DashboardAuctions
