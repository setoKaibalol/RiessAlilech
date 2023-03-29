import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/prisma/PrismaClient"

type Handler = (
	req: NextApiRequest,
	res: NextApiResponse
) => void | Promise<void>

const handler: Handler = async (req, res) => {
	try {
		if (req.method === "POST") {
			const creators = await prisma.creator
				.findMany({
					include: {
						Auction: true,
						Item: true,
					},
				})
				.catch((err) => {
					console.error(err)
				})

			res.status(200).send(creators)
		} else {
			res.status(405).json({ message: "Method not allowed" })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Internal server error" })
	}
}

export default handler
