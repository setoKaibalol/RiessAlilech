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
				res.status(401).json({ message: "Not authenticated" })
				return
			}
			if (session.user.id) {
				const { user } = req.body
				const items = await prisma.item.findMany({
					where: {
						creatorId: session.user.id,
					},
				})
				res.status(200).send(items)
			} else {
				res.status(401).json({ message: "Not authenticated" })
			}
		} else {
			res.status(405).json({ message: "Method not allowed" })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Internal server error" })
	}
}

export default handler
