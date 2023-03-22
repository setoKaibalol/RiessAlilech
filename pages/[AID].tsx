import React from "react"
import { useUserContext } from "@/context"
import { prisma } from "@/prisma/PrismaClient"
import CreatorCard from "@/components/cards/CreatorCard"
import Image from "next/image"
import { useSession } from "next-auth/react"
import moment from "moment"
import CountdownTimer from "@/components/CountdownTimer"

type Props = {
	auction: any
	startsIn: number
	hasStarted: boolean
}

function Auction(props: Props) {
	const date = new Date().getTime()
	const { auction, hasStarted, startsIn } = props
	const { data: session, status } = useSession()
	return auction ? (
		<div className="pt-20 gap-8 text-gray-200 sm:p-10 sm:pt-32 min-h-screen bg-gradient-radial from-rose-700 to-slate-700 flex flex-row">
			<div className="h-[80vh] gap-8 flex flex-col w-1/3 ">
				<div className="h-1/2 w-full rounded-xl p-4 bg-gradient-radial from-rose-900 to-slate-900">
					<div className="w-full h-full flex flex-row gap-2 ">
						<div className="h-full relative w-[50%]">
							<Image
								className="rounded-md border-slate-600 border-2"
								sizes="100%"
								src={auction.Creator.profilePicture}
								alt={auction.Creator.name}
								fill></Image>
						</div>
						<div className="w-[50%] relative h-full flex flex-col text-black">
							<p>{auction.Creator.name}</p>
							<p>{auction.Creator.name}</p>
							<p>{auction.Creator.name}</p>
							<p>{auction.Creator.name}</p>
						</div>
					</div>
				</div>
				<div className="h-1/2 w-full bg-white rounded-xl p-4 bg-gradient-to-br from-primary to-white">
					<div className="flex flex-col gap-2 text-black items-center">
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
			<div className="h-[80vh] bg-white p-4 w-2/3 rounded-md bg-gradient-radial from-rose-900 to-slate-900">
				{hasStarted ? (
					<div>Die Auktion hat angefangen!</div>
				) : (
					<div className="flex flex-col h-full w-full justify-center p-10 items-center gap-4">
						<p className="text-xl font-medium">Zeit bis die Auktion beginnt:</p>
						<CountdownTimer
							targetDate={date + startsIn * 1000}></CountdownTimer>
					</div>
				)}
			</div>
		</div>
	) : (
		<div className="pt-20 min-h-screen bg-primary flex text-center w-full h-full justify-center items-center text-5xl">
			Diese Auktion existiert nicht :(
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

	const now = moment().toLocaleString()
	const start = moment(auction?.startAt).toLocaleString()
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
