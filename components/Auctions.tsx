import React, { useEffect } from "react"
import { useUserContext } from "@/context"
import { useSession } from "next-auth/react"
import AuctionCard from "@/components/cards/AuctionCard"
import { SkeletonCard } from "@/components/cards/ItemCardSkeleton"

type Props = {
	search: string
}

function Auctions({ search }: Props) {
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
		if (refreshUserAuctions) {
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
		<div className="min-h-screen md:pt-20 flex flex-col items-center bg-primary-base ">
			<div className="flex flex-wrap px-3 md:flex-col w-full justify-center gap-4 h-full pb-20">
				{userAuctionsStatus === "loading" &&
					[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
				{userAuctionsStatus === "loaded" &&
					userAuctions
						.filter((auction, index) => {
							if (search === "") {
								return auction
							}
							if (auction.title.toLowerCase().includes(search.toLowerCase())) {
								return auction
							}
							if (
								auction.item.name.toLowerCase().includes(search.toLowerCase())
							) {
								return auction
							}
							if (
								auction.Creator.nickName
									.toLowerCase()
									.includes(search.toLowerCase())
							) {
								return auction
							}
							if (
								auction.Creator.realName
									.toLowerCase()
									.includes(search.toLowerCase())
							) {
								return auction
							}
							return
						})
						.map((auction, index) => (
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
