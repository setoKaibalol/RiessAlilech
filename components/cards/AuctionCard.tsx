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
	const date = new Date().getTime()

	const { title, image, description, endDate, startingPrice, id } = auction
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
		const startsIn = moment(auction?.startAt).diff(moment(), "seconds", true)
		if (moment().isAfter(auction?.startAt)) {
			setHasStarted(true)
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
						<div className="w-full min-w-76 p-1 h-60 border relative hover:bg-secondary font-primary duration-200 bg-secondary/80 text-black shadow-md rounded-sm shadow-gray-600">
							<button
								onClick={() => deleteAuction(auction)}
								className="absolute bottom-2 w-40 h-10 justify-center items-center right-2 text-lg text-white bg-red-500 p-1 px-3 uppercase font-medium rounded-lg duration-200 hover:bg-red-700">
								{creatorAuctionsStatus === "loading" && (
									<ClipLoader className="h-10 w-10"></ClipLoader>
								)}
								{creatorAuctionsStatus === "loaded" && "Löschen"}
							</button>

							<div className="flex  divide-x-2 flex-col sm:flex-row h-full w-full justify-between">
								<div className="flex flex-row h-auto pr-2">
									<Link
										href={
											process.env.NEXT_PUBLIC_WEBSITE_URL + "/" + auction.id
										}
										className="relative gap flex sm:w-60 w-1/3 z-20 hover:scale-110 duration-200">
										<Image
											className=" rounded-xl"
											style={{
												objectPosition: "left",
												objectFit: "contain",
											}}
											alt={auction.title}
											src={auction.item.image}
											fill></Image>
									</Link>
									<div className="w-[200px] h-auto flex gap-2 max-w-[200px] flex-col text-base justify-center items-start">
										<div className="flex flex-row gap-2 font-medium w-full justify-between">
											<p>Titel:</p>
											<p>{auction.title}</p>
										</div>
										<div className="flex flex-row justify-between w-full items-center gap-2">
											<p>Link zum Teilen:</p>

											<button
												onClick={() => {
													navigator.clipboard.writeText(
														websiteLink + "/" + auction.id
													)
													handleCopySuccess(auction.id)
												}}
												className="bg-gray-200/20 truncate hover:bg-gray-200/60 duration-200 p-1 rounded-xl w-full font-medium">
												{copySuccess === auction.id
													? "Kopiert!"
													: websiteLink + "/" + auction.id}
											</button>
										</div>
										<div className="flex flex-row gap-2 font-medium w-full justify-between">
											<p>Mindest Tip:</p>
											<p>{auction.minTip}</p>
										</div>
										<div className="flex flex-row gap-2 font-medium w-full justify-between">
											<p>Typ:</p>
											<p>{auction.live}</p>
										</div>
									</div>
								</div>
								<div className="flex pl-2 flex-row sm:flex-col gap-1 h-20 w-full justify-center sm:h-full items-center text-base">
									<p>Beschreibung:</p>
									<p>{auction.description}</p>
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
						<div className="p-4 min-w-[304px] bg-white rounded-lg shadow-md max-w-md">
							<Link
								href={`/auction/${auction.id}`}
								className="w-full flex justify-center">
								<h2 className="text-xl font-semibold text-[#B76E79] hover:bg-secondary-base/20 p-1 duration-200 rounded-lg mb-2">
									{auction.title}
								</h2>
							</Link>
							<p className="text-sm text-secondary-base mb-4">
								{hasStarted ? (
									"Started"
								) : (
									<CountdownTimer
										targetDate={date + startsIn * 1000}></CountdownTimer>
								)}{" "}
							</p>

							<div className="mb-4 w-full flex flex-col items-center">
								<CreatorCard
									creator={auction.Creator}
									status={creatorsStatus}
								/>
							</div>

							<div className="mb-4 flex items-center flex-col">
								<h3 className="text-md font-semibold text-gray-700 mb-2">
									Items:
								</h3>
								<div className="w-full flex flex-wrap gap-1">
									<ItemCard item={auction.item} status={userItemsStatus} />
								</div>
							</div>

							<h3 className="text-lg font-semibold text-gray-700 mb-4">
								Current Bid: $[Amount]
							</h3>
							<button className="py-2 px-4 bg-[#B76E79] text-white rounded-lg w-full">
								Place a Bid
							</button>
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
