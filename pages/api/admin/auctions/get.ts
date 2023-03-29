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
	try {
		if (req.method === "POST") {
			const auctions = await prisma.auction
				.findMany({
					include: {
						item: true,
						bids: true,
						Creator: {
							include: {
								user: true,
							},
						},
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
