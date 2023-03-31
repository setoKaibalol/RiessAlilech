import { NextApiRequest, NextApiResponse } from "next"

const stripe = require("stripe")(process.env.STRIPE_SKEY_TEST)

const calculateOrderAmount = (items: any[]) => {
	// Calculate the order total on the server to prevent
	// people from directly manipulating the amount on the client
	return 1400
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { items } = req.body

	const paymentIntent = await stripe.paymentIntents.create({
		amount: calculateOrderAmount(items),
		currency: "eur",
		automatic_payment_methods: {
			enabled: true,
		},
	})

	res.send({
		clientSecret: paymentIntent.client_secret,
	})
}
