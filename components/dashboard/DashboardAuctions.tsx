import React, { useEffect, useState } from "react"
import CreateAuctionComponent from "./CreateAuctionComponent"
import AuctionCard from "../cards/AuctionCard"
import { useSession } from "next-auth/react"
import { useUserContext } from "@/context"
import { SkeletonCard } from "../cards/ItemCardSkeleton"

type Props = {}

function DashboardAuctions({}: Props) {
	const {
		creatorAuctions,
		setCreatorAuctions,
		items,
		setItems,
		refreshItems,
		setRefreshItems,
		itemStatus,
		setItemStatus,
		creatorAuctionsStatus,
		setCreatorAuctionsStatus,
		refreshCreatorAuctions,
		setRefreshCreatorAuctions,
	} = useUserContext()

	const { data: session, status } = useSession()

	const skeletonCards = [1, 2, 3, 4]

	useEffect(() => {
		if (session && (!creatorAuctions || creatorAuctions.length === 0)) {
			setCreatorAuctionsStatus("loading")
			fetch("/api/creator/auction/get", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user: session?.user,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					setCreatorAuctions(data)
					setCreatorAuctionsStatus("loaded")
				})
		}
	}, [session])

	useEffect(() => {
		if (session && refreshCreatorAuctions) {
			setRefreshCreatorAuctions(false)
			setCreatorAuctionsStatus("loading")
			fetch("/api/creator/auction/get", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user: session?.user,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					setCreatorAuctions(data)
					setCreatorAuctionsStatus("loaded")
				})
				.catch((err) => {
					setCreatorAuctionsStatus("error")
					console.log(err)
				})
		}
	}, [session, refreshCreatorAuctions])

	// 1
	return (
		<div className="h-full pb-20 flex flex-col justify-between divide-y-2 divide-accent-base sm:divide-y-0 sm:flex-row bg-zinc-700 text-gray-200">
			<div className="sm:hidden p-2 text-center text-2xl font-medium">
				<p>Auctions</p>
			</div>
			<section className="sm:w-1/2 h-full flex gap-1 flex-col w-full text-xl font-medium p-2 sm:p-2">
				<p className="py-2">Meine Auctions</p>
				<div className="overflow-x-scroll overflow-y-hidden h-[610px] w-full sm:p-2">
					<div className=" flex flex-row gap-4">
						{creatorAuctionsStatus === "loading" &&
							skeletonCards.map((item, index) => {
								return <SkeletonCard key={index}></SkeletonCard>
							})}
						{creatorAuctionsStatus === "loaded" &&
							creatorAuctions.length > 0 &&
							creatorAuctions.map((auction, index) => {
								return (
									<AuctionCard
										key={index}
										auction={auction}
										status={creatorAuctionsStatus}
									/>
								)
							})}
						{creatorAuctionsStatus === "loaded" &&
							creatorAuctions.length === 0 && (
								<p className="text-center text-xl font-medium">
									Noch keine Auctions
								</p>
							)}
					</div>
				</div>
			</section>
			<section className="sm:w-1/2 h-full flex gap-1 flex-col w-full  p-2 sm:p-2">
				<p className="py-2 text-xl font-medium">Auction erstellen</p>

				<CreateAuctionComponent />
			</section>
		</div>
	)
}

export default DashboardAuctions
