import { NextApiRequest, NextApiResponse } from "next"

if (!process.env.STRIPE_SKEY_TEST || !process.env.STRIPE_SKEY_LIVE) {
	throw new Error("Missing STRIPE_SKEY env variable")
}

if (
	process.env.NEXT_PUBLIC_STRIPE_MODE !== "live" &&
	process.env.NEXT_PUBLIC_STRIPE_MODE !== "test"
) {
	throw new Error("NEXT_PUBLIC_STRIPE_MODE must be either 'live' or 'test'")
}

const StripeSkey: string =
	process.env.NEXT_PUBLIC_STRIPE_MODE === "live"
		? process.env.STRIPE_SKEY_LIVE
		: process.env.STRIPE_SKEY_TEST

const stripe = require("stripe")(StripeSkey)

const calculateOrderAmount = (tip: any) => {
	return tip.amount * 100
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { tip, creator, sender, message } = req.body
	const paymentIntent = await stripe.paymentIntents.create({
		amount: calculateOrderAmount(tip),
		currency: "eur",
		automatic_payment_methods: {
			enabled: true,
		},
		metadata: {
			type: "creator-tip",
			for: creator.id,
			message: message,
			senderEmail: sender?.email,
			senderName: sender?.name,
			senderId: sender?.id,
		},
	})

	res.send({
		clientSecret: paymentIntent.client_secret,
	})
}
