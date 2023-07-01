import React, { useState, useEffect } from "react"
import { BiX } from "react-icons/bi"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "@/components/CheckoutForm"
import { ClipLoader } from "react-spinners"
import { MdEuroSymbol } from "react-icons/md"
import CreditBalance from "./CreditBalance"
import { useSession } from "next-auth/react"
import CreditPaymentElement from "./CreditPaymentElement"

type TipModalProps = {
	isOpen: boolean
	onClose: () => void
	receiver: any
	amount: number
	sender: any
	return_url: string
	type: string
	creditPayments: boolean
	message: string
}

if (
	!process.env.NEXT_PUBLIC_STRIPE_PKEY_TEST ||
	!process.env.NEXT_PUBLIC_STRIPE_PKEY_LIVE
) {
	throw new Error("Missing STRIPE_PKEY_TEST env variable")
}

if (
	process.env.NEXT_PUBLIC_STRIPE_MODE !== "live" &&
	process.env.NEXT_PUBLIC_STRIPE_MODE !== "test"
) {
	throw new Error("NEXT_PUBLIC_STRIPE_MODE must be either 'live' or 'test'")
}

const StripePkey: string =
	process.env.NEXT_PUBLIC_STRIPE_MODE === "live"
		? process.env.NEXT_PUBLIC_STRIPE_PKEY_LIVE
		: process.env.NEXT_PUBLIC_STRIPE_PKEY_TEST

const stripePromise = loadStripe(StripePkey)

const TipModal = ({
	isOpen,
	onClose,
	receiver,
	amount,
	sender,
	return_url,
	type,
	creditPayments,
	message,
}: TipModalProps) => {
	const [clientSecret, setClientSecret] = React.useState("")
	const [paymentType, setPaymentType] = useState("stripe")
	const { data: session, status } = useSession()

	React.useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		if (isOpen && type === "creator") {
			fetch("/api/user/creators/create-payment-intent", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					tip: { amount: amount, currency: "eur" },
					creator: receiver,
					sender,
					message: message,
				}),
			})
				.then((res) => res.json())
				.then((data) => setClientSecret(data.clientSecret))
		}

		if (isOpen && type === "auction") {
			fetch("/api/user/auction/create-payment-intent", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					bid: { amount: amount, currency: "eur" },
					auction: receiver,
					sender: sender,
				}),
			})
				.then((res) => res.json())
				.then((data) => setClientSecret(data.clientSecret))
		}
		if (isOpen && type === "credits") {
			fetch("/api/user/credits/create-payment-intent", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					creditsAmount: amount,
				}),
			})
				.then((res) => res.json())
				.then((data) => setClientSecret(data.clientSecret))
		}
	}, [isOpen])

	return (
		<>
			{isOpen && (
				<div className="fixed inset-0 z-30 pb-16 md:pb-0 flex px-6 items-end justify-center backdrop-blur-sm duration-200 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
					<div className="relative z-40 shadow-lg shadow-black/50 w-full max-w-md mx-auto my-6">
						<div className="bg-white rounded-lg shadow-lg">
							<div className="flex justify-between px-4 py-3 bg-gray-200 rounded-t-lg">
								<h3 className="text-lg font-semibold">
									{type === "creator" && `Tip ${receiver.nickName}`}
									{type === "auction" && "Bid"}
									{type === "credits" && "Buy credits"}
								</h3>
								<button onClick={onClose} className="focus:outline-none">
									<BiX className="h-6 w-6 text-gray-600 hover:text-gray-800" />
								</button>
							</div>
							{type === "creator" || type === "auction" ? (
								<div className="flex flex-row justify-between">
									<button
										onClick={() => {
											setPaymentType("stripe")
										}}
										className={`flex w-1/2 p-2 justify-center rounded-sm items-center ${
											paymentType === "stripe" && "bg-accent-base"
										}`}>
										<MdEuroSymbol className="w-7 h-7 text-secondary-base"></MdEuroSymbol>
									</button>
									<button
										onClick={() => {
											setPaymentType("credits")
										}}
										className={`flex w-1/2 p-2 justify-center rounded-sm items-center ${
											paymentType === "credits" && "bg-accent-base"
										}`}>
										<svg
											className="w-8 h-8 text-secondary-base"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V10.55L16 14H14L12 11.31L10 14H8L11 10.55V7Z"
												fill="currentColor"
											/>
										</svg>
									</button>
								</div>
							) : null}
							{paymentType === "stripe" && (
								<div className="px-4 py-3">
									{clientSecret ? (
										<Elements
											options={{
												clientSecret,
											}}
											stripe={stripePromise}>
											<CheckoutForm
												tipMessage={message}
												amount={amount}
												type={type}
												receiver={receiver}
												sender={sender}
												return_url={return_url}
											/>
										</Elements>
									) : (
										<div className="flex flex-col justify-center items-center">
											<ClipLoader className="h-32 w-32"></ClipLoader>
										</div>
									)}
								</div>
							)}
							{paymentType === "credits" && (
								<CreditPaymentElement
									message={message}
									type={type}
									receiver={receiver}
									amount={amount}></CreditPaymentElement>
							)}
						</div>
					</div>
					<div onClick={onClose} className="inset-0 fixed z-20"></div>
				</div>
			)}
		</>
	)
}

export default TipModal
