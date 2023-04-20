import React from "react"
import CreditBalance from "./CreditBalance"
import { useSession } from "next-auth/react"

type Props = {
	amount: number
	type: string
}

function CreditPaymentElement({ amount, type }: Props) {
	const { data: session, status } = useSession()
	return (
		<div className="px-4 flex flex-col py-3">
			<div className="h-20">
				<CreditBalance></CreditBalance>
			</div>
			<button
				disabled={
					!session || !session.user || session?.user?.credits! < amount * 10
				}
				className="p-2 w-full bg-accent-base rounded-md text-primary-base text-lg uppercase disabled:bg-gray-500">
				<span id="button-text">
					{type === "creator"
						? `TIP ${amount * 10} Tiptokens`
						: type === "auction"
						? `Bieten`
						: "Kaufen"}
				</span>
			</button>
		</div>
	)
}

export default CreditPaymentElement
