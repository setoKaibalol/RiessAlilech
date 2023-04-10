import React, { useState, useEffect } from "react"
import { useUserContext } from "@/context"
import { prisma } from "@/prisma/PrismaClient"
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
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { VscVerifiedFilled } from "react-icons/vsc"

type Props = {
	creator: any
}

function Creator(props: Props) {
	const router = useRouter()
	const { creator } = props
	const { data: session, status } = useSession()
	const [tipModalOpen, setTipModalOpen] = React.useState(false)
	const [amount, setAmount] = useState(0)
	const [message, setMessage] = useState("")

	useEffect(() => {
		if (
			router.query.redirect_status === "succeeded" &&
			router.query.payment_intent
		) {
			toast("Vielen Dank für deinen Tip 😘", {
				hideProgressBar: true,
				autoClose: 3000,
				style: {
					background: "#FAF9F5",
					border: "20px",
					height: "80px",
					fontFamily: "Montserrat",
					fontWeight: "bold",
					fontSize: "1.3rem",
					borderColor: "#414042",
				},
				type: "success",
			})
		}
		if (
			router.query.redirect_status === "error" &&
			router.query.payment_intent
		) {
			toast("Leider ging da etwas schief 😥", {
				hideProgressBar: true,
				autoClose: 2000,
				type: "success",
			})
		}
	}, [])

	const origin =
		typeof window !== "undefined" && window.location.origin
			? window.location.origin
			: ""

	console.log(origin)

	return creator ? (
		<div className="pt-20 flex flex-col pb-20 items-center gap-2 bg-primary-base">
			<div className="max-w-sm w-full font-primary rounded overflow-hidden shadow-lg bg-primary-base">
				<TipModal
					isOpen={tipModalOpen}
					amount={amount}
					sender={
						!session?.user
							? { email: "undefined", name: "Anonymous" }
							: session.user
					}
					return_url={
						process.env.NEXT_PUBLIC_WEBSITE_URL + "/creator/" + creator.id
					}
					type="creator"
					onClose={() => setTipModalOpen(false)}
					receiver={creator}></TipModal>
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
					<div className="text-secondary-base gap-2 text-2xl font-bold items-center flex flex-row">
						{creator.realName}, {creator.age}
						<VscVerifiedFilled className="text-2xl shrink-0 text-blue-500"></VscVerifiedFilled>
					</div>
				</div>
				<div className="flex flex-col p-4 w-72">
					<div className="flex w-full flex-row">
						<button
							disabled={!amount}
							onClick={() => setTipModalOpen(!tipModalOpen)}
							className="bg-accent-base disabled:bg-gray-500 gap-x-2 flex flex-row z-20 text-2xl text-primary-base font-bold py-2 px-4 w-1/2 rounded-tl-3xl duration-200">
							<BiDonateHeart className="h-8 w-8 inline-block" />
							Tip
						</button>
						<input
							type={"number"}
							placeholder="€"
							className="w-1/2 bg-accent-base placeholder:text-primary-base text-2xl text-primary-base py-2 px-4 rounded-tr-3xl duration-200"
							value={amount}
							onChange={(e) => setAmount(parseInt(e.target.value))}></input>
					</div>
					<textarea
						value={message}
						placeholder="Nachricht"
						onChange={(e) => setMessage(e.target.value)}
						className="p-2 h-20 rounded-b-xl bg-primary-base border shadow-lg"></textarea>
				</div>
			</div>
			<div className="max-w-sm w-full font-primary rounded overflow-hidden shadow-lg bg-primary-base ">
				<div className="px-6 py-4">
					<div className="flex flex-row">
						{creator.instagram ? (
							<Link
								href={creator.instagram}
								rel="noreferrer"
								target="_blank"
								className=" text-2xl text-primary-base font-bold py-2 px-4 rounded-full mr-2 mb-2 transition-all duration-200 ease-in-out transform hover:scale-105">
								<TbBrandInstagram className=" text-purple-500 h-8 w-8 inline-block mr-1" />
							</Link>
						) : null}
						{creator.tiktok ? (
							<Link
								href={creator.tiktok}
								rel="noreferrer"
								target="_blank"
								className=" text-2xl text-primary-base font-bold py-2 px-4 rounded-full mr-2 mb-2 transition-all duration-200 ease-in-out transform hover:scale-105">
								<TbBrandYoutube className=" text-red-600 h-8 w-8 inline-block mr-1" />
							</Link>
						) : null}
						{creator.fourBased ? (
							<Link
								rel="noreferrer"
								href={creator.fourBased}
								target="_blank"
								className=" text-2xl text-primary-base font-bold py-2 px-4 rounded-full mr-2 mb-2 transition-all duration-200 ease-in-out transform hover:scale-105">
								<Image
									alt="4Based"
									src={"/media/images/4Based_Transparent.png"}
									width={35}
									height={35}
								/>
							</Link>
						) : null}
						{creator.twitter ? (
							<Link
								href={creator.twitter}
								target="_blank"
								rel="noreferrer"
								className="bg-accent-base text-2xl text-primary-base font-bold py-2 px-4 rounded-full mr-2 mb-2 transition-all duration-200 ease-in-out transform hover:scale-105">
								<TbBrandTwitch className=" text-purple-600 h-8 w-8 inline-block mr-1" />
							</Link>
						) : null}
						{creator.twitch ? (
							<Link
								href={creator.twitch}
								target="_blank"
								rel="noreferrer"
								className="bg-accent-base text-2xl text-primary-base font-bold py-2 px-4 rounded-full mr-2 mb-2 transition-all duration-200 ease-in-out transform hover:scale-105">
								<TbBrandTwitch className=" text-purple-600 h-8 w-8 inline-block mr-1" />
							</Link>
						) : null}
						{creator.onlyfans ? (
							<Link
								href={creator.onlyfans}
								target="_blank"
								rel="noreferrer"
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
