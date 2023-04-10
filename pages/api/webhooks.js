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

						const notification = await prisma.notification.create({
							data: {
								user: {
									connect: {
										id: metadata.senderId,
									},
								},
								linkAuction: {
									connect: {
										id: metadata.auctionId,
									},
								},
								type: "bid",
								message: `Dein Gebot von ${bid.amount}€ wurde erfolgreich abgegeben.`,
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
						take: 3,
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
							include: {
								creator: true,
							},
						})
						const notification = await prisma.notification.create({
							data: {
								user: {
									connect: {
										id: metadata.senderId,
									},
								},
								linkCreator: {
									connect: {
										id: metadata.for,
									},
								},
								type: "tip",
								message: `${tip.creator.nickName} hat deinen ${tip.amount} € Tip erhalten.`,
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

				break
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
