import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { Session } from "next-auth"
import { prisma } from "@/prisma/PrismaClient"
import { authOptions } from "../../auth/[...nextauth]"

type Handler = (
	req: NextApiRequest & {
		session: Session // Define the type of the session object
	},
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

			const { item } = req.body

			console.log(item)

			const items = await prisma.item.delete({
				where: {
					id: item.id,
				},
			})
			res.status(200).send(items)
		} else {
			res.status(405).json({ message: "Method not allowed" })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Internal server error" })
	}
}

export default handler
