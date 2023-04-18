import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { Session } from "next-auth"
import { prisma } from "@/prisma/PrismaClient"
import { authOptions } from "../../../auth/[...nextauth]"

type Handler = (
	req: NextApiRequest & {
		session: Session
	},
	res: NextApiResponse
) => void | Promise<void>

const handler: Handler = async (req, res) => {
	try {
		const session = await getServerSession(req, res, authOptions)
		if (req.method === "POST") {
			if (!session || !session.user.id) {
				res.status(401).json({ message: "Not authenticated" })
				return
			}

			const [user, auction]: any = await prisma
				.$transaction([
					prisma.user.update({
						where: {
							id: session.user.id,
						},
						data: {
							auctionLikes: {
								connect: {
									id: req.body.auctionId,
								},
							},
						},
					}),
					prisma.auction.update({
						where: {
							id: req.body.auctionId,
						},
						data: {
							likes: {
								increment: 1,
							},
						},
					}),
				])
				.catch((err) => {
					console.error(err)
					res.status(500).json({ message: "Internal server error", error: err })
					return
				})

			res.status(200).send({ user, auction })
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
