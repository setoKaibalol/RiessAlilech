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
			if (!session || (session.user && session.user.role !== "CREATOR")) {
				res.status(401).json({
					message:
						"du bist kein Creator! Wende dich an das Team um deine Rolle zu bekommen.",
				})
				return
			}
			const { user } = req.body
			if (session.user.id) {
				const auctions = await prisma.auction.findMany({
					where: {
						Creator: {
							userId: session.user.id,
						},
					},
					include: {
						item: true,
						bids: true,
						Creator: true,
					},
				})
				res.status(200).send(auctions)
			}
		} else {
			res.status(405).json({ message: "Method not allowed" })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Internal server error", error: error })
	}
}

export default handler
