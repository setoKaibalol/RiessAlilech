import React, { useState, useEffect } from "react"
import { BiX } from "react-icons/bi"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "@/components/CheckoutForm"
import { ClipLoader } from "react-spinners"

type TipModalProps = {
	isOpen: boolean
	onClose: () => void
	receiver: any
	amount: number
	sender: any
	return_url: string
	type: string
}

if (!process.env.NEXT_PUBLIC_STRIPE_PKEY_TEST) {
	throw new Error("Missing STRIPE_PKEY_TEST env variable")
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PKEY_TEST)

const TipModal = ({
	isOpen,
	onClose,
	receiver,
	amount,
	sender,
	return_url,
	type,
}: TipModalProps) => {
	const [clientSecret, setClientSecret] = React.useState("")

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
				<div className="fixed inset-0 z-30 pb-20 flex px-6 items-end justify-center backdrop-blur-sm duration-200 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
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
							<div className="px-4 py-3">
								{clientSecret ? (
									<Elements
										options={{
											clientSecret,
										}}
										stripe={stripePromise}>
										<CheckoutForm
											type={type}
											receiver={receiver}
											return_url={return_url}
										/>
									</Elements>
								) : (
									<div className="flex flex-col justify-center items-center">
										<ClipLoader className="h-32 w-32"></ClipLoader>
									</div>
								)}
							</div>
						</div>
					</div>
					<div onClick={onClose} className="inset-0 fixed z-20"></div>
				</div>
			)}
		</>
	)
}

export default TipModal
