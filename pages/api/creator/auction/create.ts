import type { NextApiRequest, NextApiResponse } from "next"
import moment from "moment"
import { getServerSession } from "next-auth/next"
import { prisma } from "@/prisma/PrismaClient"
import { authOptions } from "../../auth/[...nextauth]"

const calcEndTime = (startAt: Date, duration: number) => {
	startAt = moment(startAt).toDate()
	const endAt = moment(startAt).add(duration, "hours").toDate()
	return endAt
}
type Handler = (
	req: NextApiRequest,
	res: NextApiResponse
) => void | Promise<void>

const handler: Handler = async (req, res) => {
	const session = await getServerSession(req, res, authOptions)

	if (req.method === "POST") {
		if (!session || (session.user && session.user.role !== "CREATOR")) {
			res.status(401).json({
				message:
					"du bist kein Creator! Wende dich an das Team um deine Rolle zu bekommen.",
			})
			return
		}

		const { title, description, minTip, startAt, duration, user, itemId } =
			req.body

		const auction = await prisma.auction
			.create({
				data: {
					title,
					description,
					minTip,
					startAt,
					endAt: calcEndTime(startAt, duration),
					Creator: {
						connect: {
							userId: user.id,
						},
					},
					item: {
						connect: {
							id: itemId,
						},
					},
				},
			})
			.catch((error) => {
				console.error(error)
				res.status(500).json({ message: error.message })
				return
			})

		res.status(200).send(auction)
	} else {
		res.status(405).json({ message: "Method not allowed" })
	}
}

export default handler
