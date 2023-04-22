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
			if (!session || !session.user.id || !session.user.email) {
				res.status(401).json({ message: "Nicht Angemeldet" })
				return
			}

			if (
				!session.user.credits ||
				session.user.credits < req.body.amount * 10
			) {
				res.status(401).json({ message: "Nicht genug TipTokens" })
				return
			}

			const [tip, creator] = await prisma.$transaction([
				prisma.user.update({
					where: {
						id: session.user.id,
					},
					data: {
						credits: {
							decrement: req.body.amount * 10,
						},
					},
				}),
				prisma.tip.create({
					data: {
						email: session.user.email,
						creator: {
							connect: {
								id: req.body.creatorId,
							},
						},
						creditsTip: true,
						tipper: {
							connect: {
								id: session.user.id,
							},
						},
						amount: req.body.amount,
						message: req.body.message,
					},
				}),
				prisma.notification.create({
					data: {
						type: "tip",
						linkCreator: {
							connect: {
								id: req.body.creatorId,
							},
						},
						user: {
							connect: {
								id: session.user.id,
							},
						},
						message: `Dein Tip über ${
							req.body.amount * 10
						} TipTokens ist angekommen!`,
					},
				}),
			])

			res
				.status(200)
				.json({ tip, creator, message: "Vielen Dank für deinen Tip! ✅" })
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
