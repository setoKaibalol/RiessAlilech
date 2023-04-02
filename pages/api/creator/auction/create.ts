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

		if (!session.user.id) {
			res.status(401).json({
				message: "nicht authentifiziert",
			})
			return
		}

		const { title, description, minTip, duration, user, itemId, trostpreisId } =
			req.body

		const auction = await prisma.auction
			.create({
				data: {
					title,
					description,
					minTip,
					durationHours: duration,
					Creator: {
						connect: {
							userId: session.user.id,
						},
					},
					item: {
						connect: {
							id: itemId,
						},
					},
					trostpreis: {
						connect: {
							id: trostpreisId,
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
		return
	} else {
		res.status(405).json({ message: "Method not allowed" })
		return
	}
}

export default handler
