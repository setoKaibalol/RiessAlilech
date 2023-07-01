import React, { useEffect } from "react"
import CreditBalance from "./CreditBalance"
import { useSession } from "next-auth/react"
import { ClipLoader } from "react-spinners"
import { signIn } from "next-auth/react"

type Props = {
	amount: number
	type: string
	receiver: any
	message: string
}

function CreditPaymentElement({ amount, type, receiver, message }: Props) {
	const { data: session, status } = useSession()
	const [loading, setLoading] = React.useState(false)
	const [statusMessage, setStatusMessage] = React.useState("")
	const handleClick = () => {
		setLoading(true)
		fetch("/api/user/creators/credits-tip", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				amount: amount,
				message: message,
				creatorId: receiver.id,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.message) {
					setStatusMessage(data.message)
					setLoading(false)
				}
				if (data.error) {
					setLoading(false)
				} else {
					setLoading(false)
				}
			})
			.catch((err) => {
				console.log(err)
				setLoading(false)
			})
	}

	return session ? (
		<div className="px-4 flex flex-col py-3">
			<div className="h-20">
				<CreditBalance></CreditBalance>
			</div>
			<button
				disabled={
					!session ||
					!session.user ||
					!session.user.credits ||
					session.user.credits < amount * 10 ||
					loading ||
					statusMessage === "Vielen Dank für deinen Tip! ✅"
				}
				onClick={() => handleClick()}
				className="p-2 w-full bg-accent-base rounded-md text-primary-base text-lg uppercase disabled:bg-gray-500">
				<span id="button-text">
					{loading ? (
						<ClipLoader size={30}></ClipLoader>
					) : type === "creator" ? (
						`TIP ${amount * 10} Tiptokens`
					) : type === "auction" ? (
						`Bieten`
					) : (
						"Kaufen"
					)}
				</span>
			</button>
			<p className="p-2 flex justify-center">{statusMessage}</p>
		</div>
	) : (
		<div className="flex justify-center items-center h-60 text-black">
			<button
				className="border-2 p-3 px-5 rounded-md bg-accent-base hover:bg-secondary-base text-primary-base border-secondary-base "
				onClick={() => signIn()}>
				Anmelden
			</button>
		</div>
	)
}

export default CreditPaymentElement
