import React from "react"
import { useUserContext } from "@/context"
import { prisma } from "@/prisma/PrismaClient"
import CreatorCard from "@/components/cards/CreatorCard"
import Image from "next/image"
import { useSession } from "next-auth/react"
import moment from "moment"
import { BiDonateHeart } from "react-icons/bi"
import {
	MdEmail,
	MdNumbers,
	MdPersonPinCircle,
	MdTravelExplore,
} from "react-icons/md"
import Link from "next/link"
import CountdownTimer from "@/components/CountdownTimer"
import { BsPersonHeart } from "react-icons/bs"
import {
	TbBrandOnlyfans,
	TbBrandYoutube,
	TbBrandInstagram,
	TbBrandTwitter,
	TbBrandTiktok,
	TbNumber4,
	TbBrandTwitch,
} from "react-icons/tb"
import TipModal from "@/components/TipModal"

type Props = {
	creator: any
}

function Creator(props: Props) {
	const date = new Date().getTime()
	const { creator } = props
	const { data: session, status } = useSession()
	const [tipModalOpen, setTipModalOpen] = React.useState(false)

	return creator ? (
		<div className="pt-20 flex flex-col pb-20 items-center gap-2 bg-primary-base">
			<div className="max-w-sm w-full font-primary rounded overflow-hidden shadow-lg bg-primary-base">
				<TipModal
					isOpen={tipModalOpen}
					onClose={() => setTipModalOpen(false)}
					creatorName={creator.nickName}></TipModal>
				<div className="relative w-full h-96">
					<Image
						unoptimized
						placeholder="blur"
						blurDataURL={creator.profilePicture}
						fill
						src={creator.profilePicture}
						className="border-y-2"
						style={{ objectFit: "cover", objectPosition: "center" }}
						alt="Creator"
					/>
				</div>
				<div className="px-6 py-4">
					<div className=" font-extrabold text-2xl mb-2 first-letter:uppercase">
						{creator.nickName}
					</div>
				</div>
				<div className="px-6 pt-4 pb-2">
					<button
						onClick={() => setTipModalOpen(!tipModalOpen)}
						className="bg-accent-base z-20 text-2xl text-primary-base font-bold py-2 px-4 rounded-full mr-2 mb-2 transition-all duration-200 ease-in-out transform hover:scale-105">
						<BiDonateHeart className="h-8 w-8 inline-block mr-1" />
						Tip
					</button>

					<button
						disabled
						className="bg-green-500 text-2xl disabled:bg-gray-600 cursor-not-allowed hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mb-2 transition-all duration-200 ease-in-out transform hover:scale-105">
						<MdEmail className="h-8 w-8 inline-block mr-1" />
						Message
					</button>
				</div>
			</div>
			<div className="max-w-sm w-full font-primary rounded overflow-hidden shadow-lg bg-primary-base ">
				<div className="px-6 py-4">
					<div className="flex flex-row">
						{creator.instagram ? (
							<Link
								href={creator.instagram}
								target="_blank"
								className=" text-2xl text-primary-base font-bold py-2 px-4 rounded-full mr-2 mb-2 transition-all duration-200 ease-in-out transform hover:scale-105">
								<TbBrandInstagram className=" text-purple-500 h-8 w-8 inline-block mr-1" />
							</Link>
						) : null}
						{creator.tiktok ? (
							<Link
								href={creator.tiktok}
								target="_blank"
								className=" text-2xl text-primary-base font-bold py-2 px-4 rounded-full mr-2 mb-2 transition-all duration-200 ease-in-out transform hover:scale-105">
								<TbBrandYoutube className=" text-red-600 h-8 w-8 inline-block mr-1" />
							</Link>
						) : null}
						{creator.fourBased ? (
							<Link
								href={creator.fourBased}
								target="_blank"
								className=" text-2xl text-primary-base font-bold py-2 px-4 rounded-full mr-2 mb-2 transition-all duration-200 ease-in-out transform hover:scale-105">
								<TbNumber4 className=" text-orange-600 font-bold h-8 w-8 inline-block mr-1" />
							</Link>
						) : null}
						{creator.twitter ? (
							<Link
								href={creator.twitter}
								target="_blank"
								className="bg-accent-base text-2xl text-primary-base font-bold py-2 px-4 rounded-full mr-2 mb-2 transition-all duration-200 ease-in-out transform hover:scale-105">
								<TbBrandTwitch className=" text-purple-600 h-8 w-8 inline-block mr-1" />
							</Link>
						) : null}
					</div>
				</div>
			</div>
			<div className="max-w-sm w-full font-primary rounded overflow-hidden shadow-lg bg-white my-2">
				{creator.realName && (
					<div className="flex flex-row px-6 py-4 items-center gap-3 text-xl font-medium">
						<BsPersonHeart className="h-8 w-8" />
						{creator.realName}
					</div>
				)}
				{creator.age && (
					<div className="flex flex-row px-6 py-4 items-center gap-3 text-xl font-medium">
						<MdNumbers className="h-8 w-8" />
						{creator.age}
					</div>
				)}
				{creator.origin && (
					<div className="flex flex-row px-6 py-4 items-center gap-3 text-xl font-medium">
						<MdTravelExplore className="h-8 w-8" />
						{creator.origin}
					</div>
				)}
				{creator.country && (
					<div className="flex flex-row px-6 py-4 items-center gap-3 text-xl font-medium">
						<MdPersonPinCircle className="h-8 w-8" />
						{creator.country}
					</div>
				)}
			</div>

			<div className="max-w-sm w-full font-primary rounded overflow-hidden shadow-lg my-3 bg-white">
				{creator.description && (
					<div className="flex flex-col px-6 py-4">
						<h2 className="font-bold text-xl">Über Mich:</h2>
						<p>{creator.description}</p>
					</div>
				)}
			</div>
			<div className="max-w-sm w-full font-primary rounded overflow-hidden shadow-lg my-3 bg-white"></div>
		</div>
	) : (
		<div className="pt-20 min-h-screen bg-primary flex text-center w-full h-full justify-center items-center text-5xl">
			Dieser Creator existiert nicht
		</div>
	)
}

export default Creator

export async function getServerSideProps(context: { params: any }) {
	const { params } = context
	const creator = await prisma.creator.findUnique({
		where: {
			id: params.CID,
		},
		include: {
			Auction: true,
			tipsReceived: true,
		},
	})

	console.log(creator)

	return {
		props: {
			creator: JSON.parse(JSON.stringify(creator)),
		},
	}
}
