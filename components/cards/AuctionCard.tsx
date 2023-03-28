import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { SkeletonCard } from "./ItemCardSkeleton"
import { useUserContext } from "@/context"
import { ClipLoader } from "react-spinners"
import { useRouter } from "next/router"
import ItemCard from "./ItemCard"
import CreatorCard from "./CreatorCard"
import moment from "moment"
import CountdownTimer from "../CountdownTimer"

type Props = {
	auction: any
	status: string
}

function AuctionCard({ auction, status }: Props) {
	const [copySuccess, setCopySuccess] = React.useState("")
	const [hasStarted, setHasStarted] = useState(false)
	const startsIn = moment(auction.startAt).diff(moment(), "seconds", true)
	const endsIn = moment(auction.endAt).diff(moment(), "seconds", true)

	const date = new Date().getTime()
	const router = useRouter()
	const {
		creatorAuctionsStatus,
		setCreatorAuctionsStatus,
		refreshCreatorAuctions,
		setRefreshCreatorAuctions,
		userAuctions,
		setUserAuctions,
		userAuctionsStatus,
		setUserAuctionsStatus,
		refreshUserAuctions,
		setRefreshUserAuctions,
		userItems,
		setUserItems,
		userItemsStatus,
		setUserItemsStatus,
		refreshUserItems,
		setRefreshUserItems,
		creatorsStatus,
		setCreatorsStatus,
		refreshCreators,
		setRefreshCreators,
	} = useUserContext()

	const websiteLink = process.env.NEXT_PUBLIC_WEBSITE_URL

	useEffect(() => {
		if (moment().isAfter(auction?.startAt)) {
			setHasStarted(true)
		} else {
			setHasStarted(false)
		}
	}, [])

	useEffect(() => {
		if (status === "loaded") {
			setUserItemsStatus("loaded")
			setCreatorsStatus("loaded")
		}
	}, [status])

	const deleteAuction = (auction: any) => {
		setCreatorAuctionsStatus("loading")
		fetch("/api/creator/auction/delete", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				auction,
			}),
		}).then((res) => {
			setRefreshCreatorAuctions(true)
		})
	}

	const handleCopySuccess = (id: string) => {
		setCopySuccess(id)
		setTimeout(() => {
			setCopySuccess("")
		}, 2000)
	}

	switch (router.pathname) {
		case "/dashboard":
			switch (status) {
				case "loading":
					return <SkeletonCard />
				case "error":
					return <p>error</p>
				case "loaded":
					return (
						<div className="p-4 w-80 max-h-[600px] bg-white rounded-lg shadow-md max-w-md">
							<Link
								href={`/auction/${auction.id}`}
								className="w-full flex flex-row relative justify-between items-center px-2 p-1 mb-2 group hover:bg-secondary-base/10 duration-200 rounded-lg">
								<h2 className="text-xl font-semibold text-[#B76E79] first-letter:uppercase">
									{auction.title}
								</h2>
								{hasStarted ? (
									<div className="relative ">
										<p className="w-4 h-4 absolute animate-ping bg-green-500 rounded-full"></p>
										<p className="w-4 h-4 bg-green-500 rounded-full"></p>
									</div>
								) : (
									<div className="relative ">
										<p className="w-4 h-4 bg-red-500 rounded-full"></p>
									</div>
								)}
							</Link>

							<div className="mb-4 flex items-center flex-col">
								<div className="w-full flex justify-center items-center p-5">
									<ItemCard item={auction.item} status={userItemsStatus} />
								</div>
							</div>
							<div className="flex divide-y-2 text-secondary-base items-center p-4 flex-col">
								<div className="w-full flex flex-row gap-2 justify-between">
									<p>Dauer:</p>
									<div>
										<span className="text-accent-base font-bold">
											{moment(auction.startAt).diff(
												moment(auction.endAt),
												"hours"
											) * -1}
										</span>{" "}
										Stunden
									</div>
								</div>
								<div className="w-full flex flex-row gap-2 justify-between">
									<p>Mindest-Tip:</p>
									<div>
										<span className="text-accent-base font-bold">
											{auction.minTip}
										</span>{" "}
										€
									</div>
								</div>
								<div className="w-full flex flex-row gap-2 justify-between">
									<p>Tips:</p>
									<div>
										<span className="text-accent-base font-bold">
											{auction.totalTips}
										</span>{" "}
									</div>
								</div>
								<div className="w-full flex flex-row gap-2 justify-between">
									<p>Tips in €:</p>
									<div>
										<span className="text-accent-base font-bold">
											{auction.totalTipsAmount.toFixed(2)}
										</span>{" "}
										€
									</div>
								</div>
							</div>
							<div className="text-sm text-secondary-base mb-4">
								{hasStarted ? (
									<div className="flex flex-col items-center min-h-[100px] w-[280px]">
										<CountdownTimer
											hasStarted={hasStarted}
											targetDate={date + endsIn * -1000}></CountdownTimer>
									</div>
								) : (
									<div className="flex flex-col items-center min-h-[100px] w-[280px]">
										<CountdownTimer
											hasStarted={hasStarted}
											targetDate={date + startsIn * 1000}></CountdownTimer>
									</div>
								)}
							</div>
						</div>
					)
				default:
					return <SkeletonCard />
			}
		case "/auctions":
			switch (status) {
				case "loading":
					return <SkeletonCard />
				case "error":
					return <p>error</p>
				case "loaded":
					return (
						<div className="p-4 w-80 bg-white rounded-lg shadow-md max-w-md">
							<Link
								href={`/auction/${auction.id}`}
								className="w-full flex flex-row pb-6 justify-between items-center px-2 p-1 mb-2 group hover:bg-secondary-base/10 duration-200 rounded-lg">
								<h2 className="text-xl font-semibold  text-[#B76E79] first-letter:uppercase">
									{auction.title}
								</h2>
								{hasStarted ? (
									<div className="relative ">
										<p className="w-4 h-4 absolute animate-ping bg-green-500 rounded-full"></p>
										<p className="w-4 h-4 bg-green-500 rounded-full"></p>
									</div>
								) : (
									<div className="relative ">
										<p className="w-4 h-4 bg-red-500 rounded-full"></p>
									</div>
								)}
							</Link>
							<div className="mb-4 w-full flex flex-col items-center">
								<CreatorCard
									creator={auction.Creator}
									status={creatorsStatus}
								/>
							</div>

							<div className="mb-4 flex items-center flex-col">
								<div className="w-full flex flex-wrap gap-1">
									<ItemCard item={auction.item} status={userItemsStatus} />
								</div>
							</div>
							<div className="text-sm text-secondary-base mb-4">
								{hasStarted ? (
									<div className="flex flex-col items-center min-h-[100px] min-w-full">
										<CountdownTimer
											hasStarted={hasStarted}
											targetDate={date + endsIn * 1000}></CountdownTimer>
									</div>
								) : (
									<div className="flex flex-col items-center min-h-[100px] min-w-full">
										<CountdownTimer
											hasStarted={hasStarted}
											targetDate={date + startsIn * 1000}></CountdownTimer>
									</div>
								)}{" "}
							</div>
						</div>
					)

				default:
					return <SkeletonCard />
			}
		default:
			return <SkeletonCard />
	}
}

export default AuctionCard
