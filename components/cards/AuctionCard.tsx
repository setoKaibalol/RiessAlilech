import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { SkeletonCard } from "./ItemCardSkeleton"
import { useUserContext } from "@/context"
import { ClipLoader } from "react-spinners"
import { useRouter } from "next/router"
import ItemCard from "./ItemCard"
import CreatorCard from "./CreatorCard"
import moment, { duration } from "moment"
import Countdown from "@/components/Countdown"
import { HiExternalLink } from "react-icons/hi"
import { BiTimeFive } from "react-icons/bi"
import { endAuction } from "@/helpers/endAuction"

type Props = {
	auction: any
	status: string
}

function AuctionCard({ auction, status }: Props) {
	const [copySuccess, setCopySuccess] = React.useState("")
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

	const endsAt = moment(auction.createdAt).add(auction.durationHours, "hours")
	const now = moment()
	const hasEnded = moment(now).isAfter(endsAt)
	const [isLive, setIsLive] = useState(!hasEnded)

	useEffect(() => {
		if (hasEnded && auction.live) {
			endAuction({ auction })
			setIsLive(false)
		}
		if (!hasEnded) {
			setIsLive(true)
		}
	}, [])

	useEffect(() => {
		if (status === "loaded") {
			setUserItemsStatus("loaded")
			setCreatorsStatus("loaded")
		}
	}, [status])

	useEffect(() => {}, [])

	const handleCopySuccess = (id: string) => {
		setCopySuccess(id)
		setTimeout(() => {
			setCopySuccess("")
		}, 2000)
	}

	const findHighestBid = (bids: any[]) => {
		if (bids.length === 0) {
			return 0
		}
		const highest = Math.max(...bids.map((o) => o.amount), 0)
		return highest
	}

	const calcTotalBids = (bids: any[]) => {
		if (bids.length === 0) {
			return 0
		}
		const total = bids.reduce((a, b) => a + b.amount, 0)
		return total
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
						<div className="p-4 w-96 max-h-[600px] bg-white rounded-lg shadow-md max-w-md">
							<Link
								href={`/auction/${auction.id}`}
								className="w-full flex flex-row relative justify-between items-center px-2 p-1 mb-2 group hover:bg-secondary-base/10 duration-200 rounded-lg">
								<h2 className="text-xl font-semibold text-[#B76E79] first-letter:uppercase">
									{auction.title}
								</h2>
								<div className="flex flex-row border-2 px-3 rounded-lg h-full w-[25%] justify-center items-center gap-2 text-xl">
									<h2 className="h-full text-secondary-base">
										{auction.live} live
									</h2>
									{isLive ? (
										<div className="relative h-4 w-4">
											<p className="w-4 h-4 absolute animate-ping bg-green-500 rounded-full"></p>
											<p className="w-4 h-4 bg-green-500 rounded-full"></p>
										</div>
									) : (
										<div className="relative h-4 w-4">
											<p className="w-4 h-4 bg-red-500 rounded-full"></p>
										</div>
									)}
								</div>
							</Link>
							<div className="gap-2 text-secondary-base flex justify-evenly items-center flex-row">
								<div>Hauptpreis</div>
								<div>Trostpreis</div>
							</div>
							<div className="mb-4 gap-2 flex items-center flex-row">
								<div className="w-full flex justify-center items-center">
									<ItemCard item={auction.item} status={userItemsStatus} />
								</div>
								<div className="w-full flex justify-center items-center">
									<ItemCard item={auction.item} status={userItemsStatus} />
								</div>
							</div>
							<div className="flex divide-y-2 text-secondary-base items-center p-4 flex-col">
								<div className="w-full flex flex-row gap-2 justify-between">
									<p>Dauer:</p>
									<div>
										<span className="text-accent-base font-bold">
											{auction.durationHours}
										</span>{" "}
										Stunden
									</div>
								</div>
								<div className="w-full flex flex-row gap-2 justify-between">
									<p>Mindestgebot:</p>
									<div>
										<span className="text-accent-base font-bold">
											{auction.minTip}
										</span>{" "}
										€
									</div>
								</div>
								<div className="w-full flex flex-row gap-2 justify-between">
									<p>Gebote:</p>
									<div>
										<span className="text-accent-base font-bold">
											{auction.bids.length}
										</span>{" "}
									</div>
								</div>
								<div className="w-full flex flex-row gap-2 justify-between">
									<p>Einnahmen in €:</p>
									<div>
										<span className="text-accent-base font-bold">
											{calcTotalBids(auction.bids)}
										</span>{" "}
										€
									</div>
								</div>
							</div>
							<div className="flex flex-row justify-center gap-10 items-center min-h-[100px] w-[280px]">
								<div className="flex h-full justify-center items-center">
									<BiTimeFive className=" text-secondary-base mr-2 text-3xl" />
									<Countdown
										startTime={new Date(auction.createdAt).getTime()}
										durationInHours={auction.durationHours}></Countdown>
								</div>
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
						<div className="p-4 w-80 max-h-[700px] bg-white rounded-lg shadow-md max-w-md">
							<Link
								rel="noopener noreferrer"
								target="_blank"
								href={`/auction/${auction.id}`}
								className="w-full flex flex-row relative justify-between items-center px-2 p-1 mb-2 group hover:bg-secondary-base/10 duration-200 rounded-lg">
								<h2 className="text-xl w-[75%] flex flex-wrap items-center gap-1 font-semibold text-[#B76E79] first-letter:uppercase">
									{auction.title}
									<HiExternalLink className="h-6 w-6"></HiExternalLink>
								</h2>
								<div className="flex flex-row border-2 px-3 rounded-lg h-full w-[25%] justify-center items-center gap-2 text-xl">
									<h2 className="h-full">{auction.live} live</h2>
									{isLive ? (
										<div className="relative h-4 w-4">
											<p className="w-4 h-4 absolute animate-ping bg-green-500 rounded-full"></p>
											<p className="w-4 h-4 bg-green-500 rounded-full"></p>
										</div>
									) : (
										<div className="relative h-4 w-4">
											<p className="w-4 h-4 bg-red-500 rounded-full"></p>
										</div>
									)}
								</div>
							</Link>

							<div className=" flex items-center flex-col">
								<div className="w-full flex justify-center items-center mb-1">
									<ItemCard item={auction.item} status={userItemsStatus} />
								</div>
							</div>
							<Link
								href={`/creator/${auction.Creator.id}`}
								className="flex items-center flex-col shadow-md shadow-secondary-base/30 mb-4 border p-1 rounded-md border-secondary-base/20 justify-evenly text-xl ">
								<div className="flex flex-row justify-start p-2 gap-10 items-center w-full">
									<div className="w-16 h-full">
										<div className="relative w-16 h-16">
											<Image
												src={auction.Creator.profilePicture}
												fill
												unoptimized
												placeholder="blur"
												blurDataURL={auction.Creator.profilePicture}
												sizes="100%"
												className="rounded-full border border-secondary-base"
												alt={auction.Creator.nickName}></Image>
										</div>
									</div>

									<span className="text-secondary-base text-2xl font-medium">
										{auction.Creator.nickName}
									</span>
								</div>
							</Link>

							<div className="flex divide-y-2 text-secondary-base items-center p-2 flex-col">
								<div className="w-full flex flex-row gap-2 justify-between">
									<p>Dauer:</p>
									<div>
										<span className="text-accent-base font-bold">
											{auction.durationHours}{" "}
										</span>{" "}
										Stunden
									</div>
								</div>
								<div className="w-full flex flex-row gap-2 justify-between">
									<p>Mindestgebot:</p>
									<div>
										<span className="text-accent-base font-bold">
											{auction.minTip}
										</span>{" "}
										€
									</div>
								</div>
								<div className="w-full flex flex-row gap-2 justify-between">
									<p>Gebote:</p>
									<div>
										<span className="text-accent-base font-bold">
											{auction.bids.length}
										</span>{" "}
									</div>
								</div>
								<div className="w-full flex flex-row gap-2 justify-between">
									<p>Höchstgebot:</p>
									<div>
										<span className="text-accent-base font-bold">
											{findHighestBid(auction.bids)}
										</span>{" "}
										€
									</div>
								</div>
							</div>
							<div className="flex flex-row justify-center gap-4 items-center min-h-[100px] w-[280px]">
								<div className="flex h-full justify-center items-center">
									<BiTimeFive className=" text-secondary-base mr-2 text-3xl" />
									<Countdown
										startTime={new Date(auction.createdAt).getTime()}
										durationInHours={auction.durationHours}></Countdown>
								</div>
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
