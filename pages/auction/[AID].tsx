import React, { useEffect, useState } from "react"
import { useUserContext } from "@/context"
import { prisma } from "@/prisma/PrismaClient"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import moment from "moment"
import { loadStripe } from "@stripe/stripe-js"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { BiDonateHeart } from "react-icons/bi"
import { StripeElementsOptions } from "@stripe/stripe-js"
import TipModal from "@/components/TipModal"
import {
	TbBrandOnlyfans,
	TbBrandYoutube,
	TbBrandInstagram,
	TbBrandTwitter,
	TbBrandTiktok,
	TbNumber4,
	TbBrandTwitch,
} from "react-icons/tb"
import { AiOutlineDown, AiOutlineUser } from "react-icons/ai"

type Props = {
	auction: any
}

if (!process.env.NEXT_PUBLIC_STRIPE_PKEY_TEST) {
	throw new Error("Missing STRIPE_PKEY_TEST env variable")
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PKEY_TEST)

function Auction(props: Props) {
	const router = useRouter()
	const { auction } = props
	const { data: session, status } = useSession()
	const [clientSecret, setClientSecret] = useState("")
	const [amount, setAmount] = useState(0)
	const [senderName, setSenderName] = useState("")
	const [senderEmail, setSenderEmail] = useState("")
	const [bids, setBids] = useState<any[]>([])
	const [refreshBids, setRefreshBids] = useState(false)
	const [openPaymentModal, setOpenPaymentModal] = useState(false)

	useEffect(() => {
		if (
			router.query.redirect_status === "succeeded" &&
			router.query.payment_intent
		) {
			toast("Viel Glück 🥰", {
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

	useEffect(() => {
		fetch("/api/user/auction/bids/get", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ auction: auction }),
		})
			.then((res) => res.json())
			.then((data) => {
				setBids(data)
			})
	}, [])

	const endsIn = moment().diff(
		moment(auction.createdAt).add(auction.durationHours, "hours"),
		"milliseconds"
	)

	const date = new Date().getTime()

	const appearance = {}
	const options: StripeElementsOptions = {
		clientSecret,
		appearance: {
			theme: "stripe",
			labels: "floating",
		},
	}

	return auction ? (
		<div className="pt-20 font-primary p-3 gap-4 pb-20 md:pb-4 text-gray-200 sm:p-10 sm:pt-32 min-h-screen bg-gradient-radial from-accent-base via-accent-base to-white flex flex-col md:flex-row">
			<TipModal
				isOpen={openPaymentModal}
				onClose={() => {
					setOpenPaymentModal(false)
				}}
				type="auction"
				receiver={auction}
				return_url={
					process.env.NEXT_PUBLIC_WEBSITE_URL + "/auction/" + auction.id
				}
				amount={amount}
				sender={{
					email: senderEmail,
					name: senderName,
					id: session?.user.id,
				}}></TipModal>
			<div className="md:h-[600px] hidden sm:flex  h-auto md:gap-8 p-4 flex-row md:flex-col w-full md:w-1/3">
				<div className="h-1/2 w-full rounded-xl p-4 bg-secondary-base">
					<div className=" flex flex-col w-full h-full items-center justify-evenly">
						<div className="h-40 relative w-40 shrink-0">
							<Image
								unoptimized
								placeholder="blur"
								blurDataURL={auction.Creator.profilePicture}
								priority
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
						<div className="text-primary-base font-bold text-xl p-2  relative flex flex-col">
							{auction.Creator.name ? (
								<p>{auction.Creator.name}</p>
							) : auction.Creator.nickName ? (
								<p>{auction.Creator.nickName}</p>
							) : (
								<p>ANON</p>
							)}
						</div>
						<div className="text-white relative flex flex-row gap-2 justify-center w-full">
							<div className="flex flex-row">
								{auction.Creator.instagram ? (
									<Link
										href={auction.Creator.instagram}
										target="_blank"
										className=" text-2xl text-primary-base font-bold py-2 px-4 rounded-full mr-2 mb-2 transition-all duration-200 ease-in-out transform hover:scale-105">
										<TbBrandInstagram className=" text-purple-500 h-8 w-8 inline-block mr-1" />
									</Link>
								) : null}
								{auction.Creator.tiktok ? (
									<Link
										href={auction.Creator.tiktok}
										target="_blank"
										className=" text-2xl text-primary-base font-bold py-2 px-4 rounded-full mr-2 mb-2 transition-all duration-200 ease-in-out transform hover:scale-105">
										<TbBrandYoutube className=" text-red-600 h-8 w-8 inline-block mr-1" />
									</Link>
								) : null}
								{auction.Creator.fourBased ? (
									<Link
										href={auction.Creator.fourBased}
										target="_blank"
										className=" text-2xl text-primary-base font-bold py-2 px-4 rounded-full mr-2 mb-2 transition-all duration-200 ease-in-out transform hover:scale-105">
										<TbNumber4 className=" text-orange-600 font-bold h-8 w-8 inline-block mr-1" />
									</Link>
								) : null}
								{auction.Creator.twitter ? (
									<Link
										href={auction.Creator.twitter}
										target="_blank"
										className="bg-accent-base text-2xl text-primary-base font-bold py-2 px-4 rounded-full mr-2 mb-2 transition-all duration-200 ease-in-out transform hover:scale-105">
										<TbBrandTwitch className=" text-purple-600 h-8 w-8 inline-block mr-1" />
									</Link>
								) : null}
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
			<div className="h-auto text-secondary-base p-1 md:w-2/3 w-full rounded-md bg-primary-base shadow-xl border-secondary-base border shadow-secondary-base/50">
				<div>
					<div className="bg-white rounded-lg shadow-lg overflow-hidden">
						<div className="flex flex-col md:flex-row gap-2">
							<div className="md:w-1/2">
								<div className="relative h-64 md:h-auto">
									<Image
										src={auction.item.image}
										alt="Auction Item"
										fill
										sizes="100%"
										className="rounded-md border border-secondary-base"
										style={{ objectFit: "cover" }}
									/>
								</div>
							</div>
							<Link
								href={`/creator/${auction.Creator.id}`}
								className="flex items-center flex-col shadow-md shadow-secondary-base/30 border p-1 rounded-md border-secondary-base/20 justify-evenly text-xl ">
								<div className="flex flex-row justify-start p-2 gap-10 items-center w-full">
									<div className="w-16 h-full">
										<div className="relative w-16 h-16">
											<Image
												src={auction.Creator.profilePicture}
												fill
												sizes="100%"
												className="rounded-full border border-secondary-base"
												alt={auction.Creator.nickName}></Image>
										</div>
									</div>

									<span className="text-secondary-base text-2xl font-medium">
										Creator: {auction.Creator.nickName}
									</span>
								</div>
							</Link>

							<div className="px-4 py-6 md:w-1/2">
								<h1 className="text-3xl font-bold mb-2">{auction.item.name}</h1>
								<p className="text-gray-700 mb-6">{auction.description}</p>
							</div>
						</div>
						<div className="bg-gray-100 px-4 py-6">
							<h2 className="text-xl font-bold mb-4">
								<span className="text-green-500 font-bold">live</span> Bids!
							</h2>
							<table className="w-full">
								<thead>
									<tr className="text-left text-gray-700 font-bold">
										<th className="p-2 w-1">#</th>
										<th className="p-2">Bieter</th>
										<th className="p-2">€</th>
									</tr>
								</thead>
								<tbody>
									{bids.length > 0 ? (
										bids.map((bid, index) => (
											<tr key={bid.id} className="text-gray-700">
												<td className="p-2 w-1">{index + 1}</td>
												<td className="p-2">{bid.name}</td>
												<td className="p-2">{bid.amount}</td>
											</tr>
										))
									) : (
										<tr className="text-gray-700 font-bold text-2xl">
											<td className="p-2 w-1">-</td>
											<td className="p-2">-</td>
											<td className="p-2">-</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
						<div className="bg-gray-200 px-4 py-6">
							<h2 className="text-xl font-bold mb-4">Bieten</h2>
							<div className="mb-4">
								<label className="block text-gray-700 mb-2" htmlFor="bid-name">
									Name [wird angezeigt]
								</label>
								<input
									id="bid-name"
									type="text"
									value={senderName}
									onChange={(e) => setSenderName(e.target.value)}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									placeholder="Name..."
								/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700 mb-2" htmlFor="bid-email">
									E-Mail
								</label>
								<input
									id="bid-email"
									type="text"
									value={senderEmail}
									onChange={(e) => setSenderEmail(e.target.value)}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									placeholder="Email..."
								/>
							</div>
							<div className=" flex flex-col">
								<label
									className="block text-gray-700 mb-2"
									htmlFor="bid-amount">
									Gebot in €
								</label>
								<input
									id="bid-amount"
									type="number"
									value={amount}
									onChange={(e) => setAmount(parseInt(e.target.value))}
									className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									placeholder="€"
								/>
								<div className="flex justify-end">
									<button
										type="button"
										onClick={() => setOpenPaymentModal(true)}
										disabled={amount === 0 || !amount || senderName === ""}
										className="bg-accent-base flex flex-row disabled:bg-gray-500 gap-2 w-full rounded-md justify-center items-center text-lg text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline">
										Bieten
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
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

	return {
		props: {
			auction: JSON.parse(JSON.stringify(auction)),
		},
	}
}
