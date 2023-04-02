import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/prisma/PrismaClient"

type Handler = (
	req: NextApiRequest,
	res: NextApiResponse
) => void | Promise<void>

const handler: Handler = async (req, res) => {
	const { auction } = req.body
	try {
		if (req.method === "POST") {
			const bids = await prisma.bid
				.findMany({
					where: {
						auctionId: auction.id,
					},
					orderBy: {
						amount: "desc",
					},
				})
				.catch((err) => {
					console.error(err)
					res.status(500).json({ message: err.message })
					return
				})

			res.status(200).send(bids)
			return
		} else {
			res.status(405).json({ message: "Method not allowed" })
			return
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Internal server error" })
		return
	}
}

export default handler
