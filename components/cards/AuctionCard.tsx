import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { SkeletonCard } from "./ItemCardSkeleton"
import { useUserContext } from "@/context"
import { ClipLoader } from "react-spinners"
import { useRouter } from "next/router"
import { signIn, useSession } from "next-auth/react"
import ItemCard from "./ItemCard"
import moment from "moment"
import "moment/locale/de"
import Countdown from "@/components/Countdown"
import { BiMoney, BiTimeFive } from "react-icons/bi"
import { endAuction } from "@/helpers/endAuction"
import { AiOutlineClockCircle, AiOutlinePlayCircle } from "react-icons/ai"
import { RiAuctionLine } from "react-icons/ri"
import { VscVerifiedFilled } from "react-icons/vsc"
import {
	BsBookmark,
	BsBookmarkCheckFill,
	BsHeart,
	BsHeartFill,
} from "react-icons/bs"
moment.locale("de")

type Props = {
	auction: any
	status: string
}

function AuctionCard({ auction, status }: Props) {
	const { data: session } = useSession()
	const [copySuccess, setCopySuccess] = React.useState("")
	const [isBookmarked, setIsBookmarked] = useState(false)
	const [likes, setLikes] = useState(auction.userLike.length)
	const [isLiked, setIsLiked] = useState(false)
	const [isOptimistic, setIsOptimistic] = useState(false)
	const [isBookmarkOptimistic, setIsBookmarkOptimistic] = useState(false)

	const router = useRouter()
	const {
		setRefreshUserAuctions,
		userItemsStatus,
		setUserItemsStatus,
		setCreatorsStatus,
		bookmarks,
		setBookmarks,
		auctionLikes,
		setAuctionLikes,
	} = useUserContext()

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
		if (session) {
			fetch(`/api/user/auction/bookmarks/get`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					const array = data.auctionBookmarks
					for (let index = 0; index < array.length; index++) {
						const element = array[index]
						if (element.id === auction.id) {
							setIsBookmarked(true)
						}
					}

					setBookmarks(data.Bookmarks)
				})
		}
	}, [session])

	useEffect(() => {
		if (session) {
			fetch(`/api/user/auction/likes/get`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					const array = data.auctionLikes
					console.log(array)
					for (let index = 0; index < array.length; index++) {
						const element = array[index]
						console.log(element)
						if (element.id === auction.id) {
							setIsLiked(true)
						}
					}
				})
		}
	}, [session])

	const handleLike = () => {
		setIsOptimistic(true)
		setLikes(isLiked ? likes - 1 : likes + 1)

		if (session) {
			if (isLiked) {
				setIsLiked(false)
				fetch("/api/user/auction/likes/remove", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ auctionId: auction.id }),
				})
					.then((res) => res.json())
					.then((data) => {
						setRefreshUserAuctions(true)
						setIsOptimistic(false)
					})
					.catch((err) => {
						console.log(err)
					})
			} else {
				setIsLiked(true)
				fetch("/api/user/auction/likes/add", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ auctionId: auction.id }),
				})
					.then((res) => res.json())
					.then((data) => {
						setRefreshUserAuctions(true)
						setIsOptimistic(false)
					})
					.catch((err) => {
						console.log(err)
					})
			}
		}
	}

	const handleBookmark = () => {
		setIsBookmarkOptimistic(true)
		setIsBookmarked((prev) => !prev)

		if (isBookmarked) {
			try {
				fetch("/api/user/auction/bookmarks/remove", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ auctionId: auction.id }),
				})
					.then((res) => res.json())
					.then((data) => {
						setIsBookmarked(false)
					})
			} catch (err) {
				console.log(err)
			} finally {
				setIsBookmarkOptimistic(false)
			}
		} else {
			try {
				fetch("/api/user/auction/bookmarks/add", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ auctionId: auction.id }),
				})
					.then((res) => res.json())
					.then((data) => {
						setIsBookmarked(true)
					})
			} catch (err) {
				console.log(err)
			} finally {
				setIsBookmarkOptimistic(false)
			}
		}
	}

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
									<div className="flex flex-row items-center gap-2">
										<AiOutlineClockCircle className="text-accent-base"></AiOutlineClockCircle>

										<p>Dauer:</p>
									</div>
									<div>
										<span className="text-accent-base font-bold">
											{auction.durationHours}
										</span>{" "}
										Stunden
									</div>
								</div>
								<div className="w-full flex flex-row gap-2 justify-between">
									<div className="flex flex-row items-center gap-2">
										<AiOutlinePlayCircle className="text-accent-base"></AiOutlinePlayCircle>

										<p>Mindestgebot:</p>
									</div>
									<div>
										<span className="text-accent-base font-bold">
											{auction.minTip}
										</span>{" "}
										€
									</div>
								</div>
								<div className="w-full flex flex-row gap-2 justify-between">
									<div className="flex flex-row items-center gap-2">
										<RiAuctionLine className="text-accent-base"></RiAuctionLine>
										<p>Gebote:</p>
									</div>
									<div>
										<span className="text-accent-base font-bold">
											{auction.bids.length}
										</span>{" "}
									</div>
								</div>
								<div className="w-full flex flex-row gap-2 justify-between">
									<div className="flex flex-row items-center gap-2">
										<BiMoney className="text-accent-base"></BiMoney>
										<p>Einnahmen in €:</p>
									</div>

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
		case "/explore":
			switch (status) {
				case "loading":
					return <SkeletonCard />
				case "error":
					return <p>error</p>
				case "loaded":
					return (
						<div className="w-full h-auto border-t-2 pt-4 text-secondary-base font-primary bg-primary-base flex flex-col max-w-md">
							<div className="w-full px-4 h-auto flex flex-row items-start justify-between">
								<div className="flex flex-row justify-start items-center gap-4">
									<Link href={`/creator/${auction.Creator.id}`} className="">
										<div className="relative w-14 h-14">
											<Image
												src={auction.Creator.profilePicture}
												placeholder="blur"
												blurDataURL="https://www.pngmart.com/files/16/Blur-PNG-Picture.png"
												alt="profile picture"
												fill
												className="rounded-full"
												unoptimized></Image>
										</div>
									</Link>
									<div className="flex flex-col gap-1">
										<Link
											href={`/creator/${auction.Creator.id}`}
											className="flex flex-row justify-center items-center gap-1 h-5">
											<h2 className="text-lg font-bold">
												{auction.Creator.nickName}
											</h2>
											<VscVerifiedFilled className="text-blue-500 text-xl"></VscVerifiedFilled>
										</Link>
										<div className="text-gray-500">
											@{auction.Creator.nickName}
										</div>
									</div>
								</div>
								<div className="w-auto text-gray-500">
									{moment(auction.createdAt).locale("de").fromNow()}
								</div>
							</div>
							<div className="h-auto w-full flex flex-col rounded-sm">
								<div className="pt-6 p-2 px-4 flex flex-wrap items-center gap-2 justify-start">
									<Link href={`/auction/${auction.id}`} className="">
										<h1 className="text-xl font-bold">{auction.title}</h1>
									</Link>
									<div className="flex flex-row gap-1 justify-center items-center px-2 border-secondary-base/30 border rounded-xl ">
										<h2 className="h-full text-secondary-base">
											{auction.live} live
										</h2>
										{isLive ? (
											<div className="relative h-3 w-3">
												<p className="w-3 h-3 absolute animate-ping bg-green-500 rounded-full"></p>
												<p className="w-3 h-3 bg-green-500 rounded-full"></p>
											</div>
										) : (
											<div className="relative h-3 w-3">
												<p className="w-3 h-3 bg-red-500 rounded-full"></p>
											</div>
										)}
									</div>
								</div>

								<div className="p-2 px-4">
									<p>{auction.description}</p>
								</div>
								<Link
									href={`/auction/${auction.id}`}
									className="w-full h-64 relative">
									<Image
										src={auction.item.image}
										alt="item image"
										fill
										sizes="100%"
										placeholder="blur"
										blurDataURL="https://www.pngmart.com/files/16/Blur-PNG-Picture.png"
										className="rounded-t-sm"
										style={{ objectFit: "cover" }}
										unoptimized></Image>
									<div className="absolute bottom-5 w-32 h-32 grow-0 bg-black border-primary-base border-4 shrink-0 rounded-full right-5">
										<Image
											src={auction.trostpreis.image}
											alt="trostpreis image"
											fill
											placeholder="blur"
											blurDataURL="https://www.pngmart.com/files/16/Blur-PNG-Picture.png"
											unoptimized
											sizes="100%"></Image>
									</div>
								</Link>

								<div className="w-full px-4 pt-4">
									<div className="py-4 h-16 p-2 flex flex-row justify-between">
										<div className="h-full w-20 flex gap-4 flex-row justify-center items-center">
											{session && session.user ? (
												<button
													disabled={isOptimistic}
													onClick={() => {
														handleLike()
													}}>
													{isLiked ? (
														<BsHeartFill className="text-red-500 text-2xl shrink-0"></BsHeartFill>
													) : (
														<BsHeart className="text-2xl shrink-0"></BsHeart>
													)}
												</button>
											) : (
												<button
													onClick={() => {
														signIn(undefined, {
															callbackUrl: window.location.href,
														})
													}}>
													<BsHeart className="text-2xl shrink-0" />
												</button>
											)}

											<p className="whitespace-nowrap">
												{likes} {likes > 1 || likes === 0 ? "likes" : "like"}
											</p>
										</div>
										<div className="h-full flex justify-center text-gray-500 text-2xl items-center">
											{session && session.user ? (
												<button
													className="focus:outline-none duration-200"
													onClick={() => {
														handleBookmark()
													}}>
													{isBookmarked ? (
														<BsBookmarkCheckFill className="text-accent-base" />
													) : (
														<BsBookmark />
													)}
												</button>
											) : (
												<button onClick={() => signIn()}>
													<BsBookmark />
												</button>
											)}
										</div>
									</div>
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
