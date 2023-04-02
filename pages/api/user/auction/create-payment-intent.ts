import { NextApiRequest, NextApiResponse } from "next"

const stripe = require("stripe")(process.env.STRIPE_SKEY_TEST)

const calculateOrderAmount = (bid: any) => {
	return bid.amount * 100
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { bid, auction, sender } = req.body
	const paymentIntent = await stripe.paymentIntents.create({
		amount: calculateOrderAmount(bid),
		currency: "eur",
		automatic_payment_methods: {
			enabled: true,
		},
		metadata: {
			type: "auction-bid",
			auctionId: auction.id,
			senderEmail: sender.email,
			senderName: sender.name,
			senderId: sender.id,
		},
	})

	res.send({
		clientSecret: paymentIntent.client_secret,
	})
}
