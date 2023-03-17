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
		const session = await getServerSession(req, res, {})
		if (req.method === "POST") {
			/* 			console.log(session)
			if (!session || (session.user && session.user.role === "CREATOR")) {
				res.status(401).json({ message: "Not authenticated" })
				return
			}
 */ const { name, image, description, link, type, zustellung, user } = req.body

			const item = await prisma.item.create({
				data: {
					name,
					description,
					link,
					type,
					zustellung,
					image,
					creator: {
						connect: {
							id: user.id,
						},
					},
				},
			})

			res.status(200).send(item)
		} else {
			res.status(405).json({ message: "Method not allowed" })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Internal server error" })
	}
}

export default handler
