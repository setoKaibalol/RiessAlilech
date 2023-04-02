import { getServerSession } from "next-auth/next"
import { prisma } from "@/prisma/PrismaClient"
import { authOptions } from "../auth/[...nextauth]"
import type { NextApiRequest, NextApiResponse } from "next"
import moment from "moment"

type Handler = (
	req: NextApiRequest,
	res: NextApiResponse
) => void | Promise<void>

const handler: Handler = async (req, res) => {
	try {
		if (req.method === "POST") {
			const { auction } = req.body
			const endsAt = moment(auction.createdAt).add(
				auction.durationHours,
				"hours"
			)
			const now = moment()

			const hasEnded = moment(now).isAfter(endsAt)

			if (!hasEnded) {
				res.status(400).json({ message: "Auction has not ended yet" })
				return
			}

			const endedAuction = await prisma.auction
				.update({
					where: {
						id: auction.id,
					},
					data: {
						live: false,
					},
				})
				.catch((err) => {
					console.error(err)
					res.status(500).json({ message: err.message })
					return
				})

			res.status(200).send(endedAuction)
			return
		} else {
			res.status(405).json({ message: "Method not allowed" })
			return
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Internal server error", error })
		return
	}
}

export default handler
