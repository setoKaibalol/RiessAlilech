import { NextApiRequest, NextApiResponse } from "next"

const stripe = require("stripe")(process.env.STRIPE_SKEY_TEST)

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
