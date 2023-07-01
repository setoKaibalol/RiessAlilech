import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { Session } from "next-auth"
import { prisma } from "@/prisma/PrismaClient"
import { authOptions } from "../../auth/[...nextauth]"

type Handler = (
	req: NextApiRequest,
	res: NextApiResponse
) => void | Promise<void>

const handler: Handler = async (req, res) => {
	try {
		const session = await getServerSession(req, res, authOptions)
		if (req.method === "POST") {
			const { amount, tipMessage, receiver, senderId, email } = req.body

			if (senderId) {
				const [tip, notification] = await prisma.$transaction([
					prisma.tip.create({
						data: {
							email: email,
							creator: {
								connect: {
									id: receiver.id,
								},
							},
							creditsTip: false,
							tipper: {
								connect: {
									id: senderId,
								},
							},
							amount: amount,
							message: tipMessage,
						},
					}),
					prisma.notification.create({
						data: {
							type: "tip",
							linkCreator: {
								connect: {
									id: receiver.id,
								},
							},
							user: {
								connect: {
									id: senderId,
								},
							},
							message: `Dein Tip über €${amount} ist angekommen!`,
						},
					}),
				])

				res.status(200).json({
					tip,
					notification,
					message: "Vielen Dank für deinen Tip! ✅",
				})
				return
			}
			if (!senderId) {
				const tip = await prisma.tip.create({
					data: {
						amount: amount,
						creator: {
							connect: {
								id: receiver.id,
							},
						},
						message: tipMessage,
						email: email,
					},
				})
				res.status(200).json({
					tip,
					message: "Vielen Dank für deinen Tip! ✅",
				})
				return
			}
			res.status(400).json({ message: "Bad request" })
			return
		} else {
			res.status(405).json({ message: "Method not allowed" })
			return
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Internal server error", error: error })
		return
	}
}

export default handler
