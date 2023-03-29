import React from "react"
import { useUserContext } from "@/context"
import { prisma } from "@/prisma/PrismaClient"
import CreatorCard from "@/components/cards/CreatorCard"
import Image from "next/image"
import { useSession } from "next-auth/react"
import moment from "moment"
import CountdownTimer from "@/components/CountdownTimer"
import {
	TbBrandOnlyfans,
	TbBrandYoutube,
	TbBrandInstagram,
	TbBrandTwitter,
	TbBrandTiktok,
} from "react-icons/tb"
import ItemCard from "@/components/cards/ItemCard"

type Props = {
	auction: any
	startsIn: number
	hasStarted: boolean
}

function Auction(props: Props) {
	const date = new Date().getTime()
	const { auction, hasStarted, startsIn } = props
	const { data: session, status } = useSession()
	console.log(auction)
	return auction ? (
		<div className="pt-20 p-4 gap-4 pb-20 md:pb-4 text-gray-200 sm:p-10 sm:pt-32 min-h-screen bg-gradient-radial from-accent-base via-accent-base to-white flex flex-col md:flex-row">
			<div className="md:h-[600px] h-auto md:gap-8 flex p-4  flex-row md:flex-col w-full md:w-1/3">
				<div className="h-1/2 w-full rounded-xl p-4 bg-secondary-base">
					<div className=" flex flex-col w-full h-full items-center justify-evenly">
						<div className="h-40 relative w-40 shrink-0">
							<Image
								className="rounded-full border-accent-base border-2"
								sizes="100%"
								style={{
									objectPosition: "center",
									objectFit: "cover",
								}}
								src={auction.Creator.profilePicture}
								alt={auction.Creator.name}
								fill></Image>
						</div>
						<div className="text-white relative flex flex-col">
							{auction.Creator.name ? (
								<p>{auction.Creator.name}</p>
							) : auction.Creator.nickName ? (
								<p>{auction.Creator.nickName}</p>
							) : (
								<p>ANON</p>
							)}
						</div>
						<div className="text-white relative flex flex-row gap-2 justify-center w-full">
							<div>
								<TbBrandInstagram className="h-8 w-8 text-purple-600"></TbBrandInstagram>
							</div>
							<div>
								<TbBrandOnlyfans className="h-8 w-8 text-blue-500"></TbBrandOnlyfans>
							</div>
							<div>
								<TbBrandTiktok className="h-8 w-8 text-white"></TbBrandTiktok>
							</div>
							<div>
								<TbBrandYoutube className="h-8 w-8 text-red-600"></TbBrandYoutube>
							</div>
						</div>
					</div>
				</div>
				<div className="h-1/2 md:flex hidden md:w-full w-1/2 bg-secondary-base text-white rounded-xl p-4">
					<div className="flex flex-col gap-2 items-center">
						<h2 className="text-xl font-medium p-2">Tips</h2>
						<div className="w-full h-full border gap-4 flex flex-col">
							<div className="flex flex-row justify-between">
								<p>Nickname</p>
								<p>Betrag</p>
							</div>
							<div className="flex flex-col ">
								<div className="flex flex-row justify-between">
									<p>xXQuickscopeG0dXx</p>
									<p>69€</p>
								</div>
								<div className="flex flex-row justify-between">
									<p>xXQuickscopeG0dXx</p>
									<p>69€</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="h-[600px] text-secondary-base p-4 md:w-2/3 w-full rounded-md bg-primary-base shadow-md border-secondary-base border-2 shadow-secondary-base">
				{hasStarted ? (
					<div>
						<div>
							<ItemCard item={auction.item} status={"loaded"}></ItemCard>
						</div>
						<div></div>
					</div>
				) : (
					<div className="flex flex-col h-full w-full justify-center p-10 items-center gap-4">
						<p className="text-xl font-medium">Zeit bis die Auktion beginnt:</p>
						<CountdownTimer
							hasStarted={hasStarted}
							targetDate={date + startsIn * 1000}></CountdownTimer>
					</div>
				)}
			</div>
		</div>
	) : (
		<div className="pt-20 min-h-screen bg-primary flex text-center w-full h-full justify-center items-center text-5xl">
			Diese Auktion existiert nicht
		</div>
	)
}

export default Auction

export async function getServerSideProps(context: { params: any }) {
	const { params } = context
	const auction = await prisma.auction.findUnique({
		where: {
			id: params.AID,
		},
		include: {
			Creator: true,
			item: true,
			bids: true,
		},
	})

	let hasStarted = false
	const startsIn = moment(auction?.startAt).diff(moment(), "seconds", true)

	if (moment().isAfter(auction?.startAt)) {
		hasStarted = true
	}

	return {
		props: {
			startsIn,
			hasStarted,
			auction: JSON.parse(JSON.stringify(auction)),
		},
	}
}
