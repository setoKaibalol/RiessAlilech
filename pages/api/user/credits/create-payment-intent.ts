import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { Session } from "next-auth"
import { prisma } from "@/prisma/PrismaClient"
import { authOptions } from "../../auth/[...nextauth]"

const stripe = require("stripe")(process.env.STRIPE_SKEY_TEST)

const calculateOrderAmount = (creditsAmount: any) => {
	return (creditsAmount / 10) * 100
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { creditsAmount } = req.body
	const session = await getServerSession(req, res, authOptions)
	if (!session || !session.user.id) {
		res.status(401).json({ message: "Not authenticated" })
		return
	}

	const paymentIntent = await stripe.paymentIntents.create({
		amount: calculateOrderAmount(creditsAmount),
		currency: "eur",
		automatic_payment_methods: {
			enabled: true,
		},
		metadata: {
			type: "credits",
			creditsAmount,
			receiverId: session.user.id,
		},
	})

	res.send({
		clientSecret: paymentIntent.client_secret,
	})
}
