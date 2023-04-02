import { getServerSession } from "next-auth/next"
import { prisma } from "@/prisma/PrismaClient"
import { authOptions } from "../../auth/[...nextauth]"
import type { NextApiRequest, NextApiResponse } from "next"

type Handler = (
	req: NextApiRequest,
	res: NextApiResponse
) => void | Promise<void>

const handler: Handler = async (req, res) => {
	const session = await getServerSession(req, res, authOptions)
	if (!session || (session.user && session.user.role !== "ADMIN")) {
		res.status(401).json({ message: "Not authenticated" })
		return
	}

	const { auctionId } = req.body

	try {
		if (req.method === "POST") {
			const auction = await prisma.auction
				.delete({
					where: {
						id: auctionId,
					},
				})
				.catch((err) => {
					console.error(err)
				})

			res.status(200).send(auction)
		} else {
			res.status(405).json({ message: "Method not allowed" })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Internal server error" })
	}
}

export default handler
