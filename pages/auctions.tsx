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
		<div className="min-h-screen md:pt-20 pt-2 flex justify-center  bg-primary-base ">
			<div className="flex flex-wrap p-4 md:flex-col w-full justify-center gap-4 h-full pb-20">
				<h3 className="font-bold text-2xl underline underline-offset-8">
					Auctions:
				</h3>
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
