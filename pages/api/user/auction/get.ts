import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/prisma/PrismaClient"

type Handler = (
	req: NextApiRequest,
	res: NextApiResponse
) => void | Promise<void>

const handler: Handler = async (req, res) => {
	try {
		if (req.method === "POST") {
			const auctions = await prisma.auction
				.findMany({
					include: {
						item: true,
						Creator: true,
						bids: true,
					},
					orderBy: {
						live: "desc",
					},
				})
				.catch((err) => {
					console.error(err)
				})

			res.status(200).send(auctions)
		} else {
			res.status(405).json({ message: "Method not allowed" })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Internal server error" })
	}
}

export default handler
