import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

const style = {
	layout: "horizontal",
	color: "gold",
	height: 40,
	tagline: false,
	shape: "pill",
}

export default function ButtonWrapper({
	amount,
	tipMessage,
	currency,
	showSpinner,
	receiver,
	sender,
}) {
	const { data: session, status } = useSession()
	const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

	useEffect(() => {
		dispatch({
			type: "resetOptions",
			value: {
				...options,
				currency: currency,
			},
		})
	}, [currency, showSpinner])

	return (
		<div className="w-full ">
			{showSpinner && isPending && <div className="spinner" />}
			<PayPalButtons
				style={style}
				forceReRender={[style]}
				fundingSource={undefined}
				createOrder={(data, actions) => {
					return actions.order
						.create({
							purchase_units: [
								{
									amount: {
										currency_code: currency,
										value: amount.toFixed(2),
									},
								},
							],
						})
						.then((orderId) => {
							return orderId
						})
				}}
				onApprove={(data, actions) => {
					return actions.order.capture().then(function () {
						fetch("/api/user/creators/create-paypal-tip", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								amount: amount,
								tipMessage: tipMessage,
								receiver: receiver,
								senderId: sender.id,
								email: sender.email,
							}),
						})
							.then((res) => res.json())
							.then((data) => {
								actions.redirect(
									process.env.NODE_ENV === "production"
										? `https://tipforyou.de/creator/${receiver.id}?redirect_status=succeeded`
										: `http://localhost:3000/creator/${receiver.id}?redirect_status=succeeded`
								)
							})
							.catch((err) => {
								console.log(err)
								actions.redirect(
									process.env.NODE_ENV === "production"
										? `https://tipforyou.de/creator/${receiver.id}?redirect_status=error`
										: `http://localhost:3000/creator/${receiver.id}redirect_status=error`
								)
							})
					})
				}}
				onCancel={function (data, actions) {
					return
				}}
			/>
		</div>
	)
}
