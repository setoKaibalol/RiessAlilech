import React, { useEffect } from "react"
import { useUserContext } from "@/context"
import { useSession } from "next-auth/react"
import AuctionCard from "@/components/cards/AuctionCard"
import { SkeletonCard } from "@/components/cards/ItemCardSkeleton"

type Props = {}

function Auctions({}: Props) {
	const { data: session, status } = useSession()
	const {
		userAuctions,
		setUserAuctions,
		userAuctionsStatus,
		setUserAuctionsStatus,
		refreshUserAuctions,
		setRefreshUserAuctions,
	} = useUserContext()

	useEffect(() => {
		if (refreshUserAuctions && (!userAuctions || userAuctions.length === 0)) {
			fetch("/api/user/auction/get", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
			})
				.then((res) => res.json())
				.then((data) => {
					setUserAuctions(data)
					setUserAuctionsStatus("loaded")
					setRefreshUserAuctions(false)
				})
				.catch((err) => {
					setUserAuctionsStatus("error")
					setRefreshUserAuctions(false)
				})
		}
	}, [refreshUserAuctions])

	useEffect(() => {
		if (!userAuctions || userAuctions.length === 0) {
			fetch("/api/user/auction/get", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
			})
				.then((res) => res.json())
				.then((data) => {
					setUserAuctions(data)
					setUserAuctionsStatus("loaded")
				})
		}
	}, [])
	return (
		<div className="min-h-screen pt-20 flex justify-center  bg-primary ">
			<div className="flex flex-wrap w-4/5 h-full py-10 gap-2">
				{userAuctionsStatus === "loading" &&
					[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
				{userAuctionsStatus === "loaded" &&
					userAuctions.map((auction, index) => (
						<AuctionCard
							status={userAuctionsStatus}
							key={index}
							auction={auction}
						/>
					))}
			</div>
		</div>
	)
}

export default Auctions
