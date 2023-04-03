import { NextApiRequest, NextApiResponse } from "next"
import { buffer } from "micro"
import Stripe from "stripe"
import { prisma } from "../../prisma/PrismaClient"

const stripe = require("stripe")(process.env.STRIPE_SKEY_TEST)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export const config = {
	api: {
		bodyParser: false,
	},
}

const handler = async (req, res) => {
	if (req.method === "POST") {
		const buf = await buffer(req)
		const sig = req.headers["stripe-signature"]

		let event

		try {
			event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
		} catch (err) {
			res.status(400).send(`Webhook Error: ${err.message}`)
			return
		}

		switch (event.type) {
			case "payment_intent.succeeded":
				console.log("payment_intent.succeeded", event.data.object)
				const paymentIntent = event.data.object
				const metadata = paymentIntent.metadata

				if (metadata.type === "auction-bid") {
					if (
						metadata.senderId &&
						metadata.senderEmail &&
						metadata.senderName
					) {
						const bid = await prisma.bid.create({
							data: {
								amount: paymentIntent.amount / 100,
								auction: {
									connect: {
										id: metadata.auctionId,
									},
								},
								bidder: {
									connect: {
										id: metadata.senderId,
									},
								},
								email: metadata.senderEmail,
								name: metadata.senderName,
							},
						})
					} else if (
						!metadata.senderId &&
						metadata.senderEmail &&
						metadata.senderName
					) {
						const bid = await prisma.bid.create({
							data: {
								amount: paymentIntent.amount / 100,
								auction: {
									connect: {
										id: metadata.auctionId,
									},
								},
								email: metadata.senderName,
								name: metadata.senderName,
							},
						})
					}
					const bidders = await prisma.bid.findMany({
						where: {
							auctionId: metadata.auctionId,
						},
						orderBy: {
							amount: "desc",
						},
						take: 15,
					})

					req.io.emit("updateScoreboard", {
						auctionId: metadata.auctionId,
						bidders,
					})
				}
				if (metadata.type === "creator-tip") {
					if (metadata.senderId) {
						const tip = await prisma.tip.create({
							data: {
								amount: paymentIntent.amount / 100,
								creator: {
									connect: {
										id: metadata.for,
									},
								},
								tipper: {
									connect: {
										id: metadata.senderId,
									},
								},
								email: metadata.senderEmail,
							},
						})
					}
					if (!metadata.senderId && metadata.senderEmail) {
						const tip = await prisma.tip.create({
							data: {
								amount: paymentIntent.amount / 100,
								creator: {
									connect: {
										id: metadata.for,
									},
								},
								email: metadata.senderEmail,
							},
						})
					}
				}

				// Then define and call a method to handle the successful payment intent.
				// handlePaymentIntentSucceeded(paymentIntent);
				break
			case "payment_intent.created":
				console.log("payment_intent.created", event.data.object)
				const paymentIntent_created = event.data.object
				// Then define and call a method to handle the successful payment intent.
				// handlePaymentIntentSucceeded(paymentIntent);
				break
			case "payment_method.attached":
				const paymentMethod = event.data.object
				// Then define and call a method to handle the successful attachment of a PaymentMethod.
				// handlePaymentMethodAttached(paymentMethod);
				break
			// ... handle other event types
			default:
				console.log(`Unhandled event type ${event.type}`)
		}

		res.json({ received: true })
	} else {
		res.setHeader("Allow", "POST")
		res.status(405).end("Method Not Allowed")
	}
}

export default handler
