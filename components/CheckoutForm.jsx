import React from "react"
import {
	PaymentElement,
	LinkAuthenticationElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js"
import { ClipLoader } from "react-spinners"
import { useRouter } from "next/router"

export default function CheckoutForm({ receiver, return_url, type }) {
	const router = useRouter()
	const stripe = useStripe()
	const elements = useElements()

	const [email, setEmail] = React.useState("")
	const [message, setMessage] = React.useState(null)
	const [isLoading, setIsLoading] = React.useState(false)

	React.useEffect(() => {
		if (!stripe) {
			return
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		)

		if (!clientSecret) {
			return
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case "succeeded":
					setMessage("Payment succeeded!")
					break
				case "processing":
					setMessage("Your payment is processing.")
					break
				case "requires_payment_method":
					setMessage("Your payment was not successful, please try again.")
					break
				default:
					setMessage("Something went wrong.")
					break
			}
		})
	}, [stripe])
	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return
		}

		setIsLoading(true)

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				return_url: return_url,
			},
		})

		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.
		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message)
		} else {
			setMessage("An unexpected error occurred.")
		}

		setIsLoading(false)
	}

	return (
		<form
			className="flex flex-col gap-4 font-primary"
			id="payment-form"
			onSubmit={handleSubmit}>
			<PaymentElement
				className=""
				id="payment-element"
				options={{
					paymentMethodOrder: ["apple_pay", "google_pay", "card", "klarna"],
					layout: "tabs",
				}}
			/>
			<button
				className="p-2 w-full bg-accent-base rounded-md text-primary-base text-lg uppercase disabled:bg-gray-500"
				disabled={isLoading || !stripe || !elements}
				id="submit">
				<span id="button-text">
					{isLoading ? (
						<ClipLoader className="w-6 h-6"></ClipLoader>
					) : type === "creator-tip" ? (
						`TIP ${receiver.nickName}`
					) : (
						`Bieten`
					)}
				</span>
			</button>
			{/* Show any error or success messages */}
			{message && <div id="payment-message">{message}</div>}
		</form>
	)
}
