import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { Session } from "next-auth"
import { prisma } from "@/prisma/PrismaClient"
import { authOptions } from "../../auth/[...nextauth]"

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

const calculateOrderAmount = (creditsAmount: any) => {
	const discount = (creditsAmount / 10) * 100 * 0.2
	const credits = (creditsAmount / 10) * 100
	const total = credits - discount
	return total
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
