import React, { useEffect, useState } from "react"
import { useUserContext } from "@/context"
import { useSession } from "next-auth/react"
import AuctionCard from "@/components/cards/AuctionCard"
import { SkeletonCard } from "./cards/skeletons/AuctionSkeleton"
import moment from "moment"
moment.locale("de")

type Props = {
	search: string
}

function Auctions({ search }: Props) {
	const { data: session, status } = useSession()
	const [auctionFilter, setAuctionFilter] = useState("alle")
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

	return userAuctions.length > 0 ? (
		<div className="min-h-screen flex flex-col bg-accent-base/20 items-center">
			<div className="min-h-screen md:px-5 pt-3 border-x-2 w-fit flex flex-col items-center bg-primary-base">
				<div className="w-full flex flex-row justify-start p-2 h-20 ">
					<button
						onClick={() => setAuctionFilter("alle")}
						className={`p-1 text-lg rounded-full px-4 h-max  ${
							auctionFilter === "alle" ? "bg-accent-base" : "bg-gray-200"
						}`}>
						Alle
					</button>
				</div>
				<div className="flex flex-wrap gap-10 md:flex-col w-full justify-center h-full pb-20">
					{userAuctionsStatus === "loading" &&
						[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
					{userAuctionsStatus === "loaded" &&
						userAuctions
							.filter((auction, index) => {
								if (search === "") {
									return auction
								}

								if (
									auction.title.toLowerCase().includes(search.toLowerCase())
								) {
									return auction
								}
								if (
									auction.item.name.toLowerCase().includes(search.toLowerCase())
								) {
									return auction
								}
								if (
									auction.trostpreis.name
										.toLowerCase()
										.includes(search.toLowerCase())
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
		</div>
	) : (
		<div className="min-h-screen flex flex-col w-full p-14 pt-20 items-center text-xl">
			<p>
				Hier werden in Zukunft Auktionen deiner Lieblingscreator stattfinden
			</p>
			<p>👀</p>
		</div>
	)
}

export default Auctions
