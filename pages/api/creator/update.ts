import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { Session } from "next-auth"
import { prisma } from "@/prisma/PrismaClient"
import { authOptions } from "../auth/[...nextauth]"

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

			if (!session.user.id) {
				res.status(401).json({ message: "Not authenticated" })
				return
			}

			const {
				creatorId,
				realName,
				nickname,
				description,
				country,
				origin,
				age,
				instagram,
				facebook,
				twitter,
				youtube,
				twitch,
				tiktok,
				fourBased,
			} = req.body

			const creator = await prisma.creator
				.update({
					where: {
						id: creatorId,
					},
					data: {
						realName,
						nickName: nickname,
						description,
						country,
						origin,
						age,
						instagram,
						facebook,
						twitter,
						tiktok,
						fourBased,
					},
				})
				.catch((err) => {
					console.error(err)
					res.status(500).json({ message: "Internal server error", err: err })
					return
				})

			res.status(200).send(creator)
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
