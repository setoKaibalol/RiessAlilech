import { getServerSession } from "next-auth/next"
import { prisma } from "@/prisma/PrismaClient"
import { authOptions } from "./[...nextauth]"
import type { NextApiRequest, NextApiResponse } from "next"
import { hashPW } from "../../../lib/hash/hashPW"

type Handler = (
	req: NextApiRequest,
	res: NextApiResponse
) => void | Promise<void>

const handler: Handler = async (req, res) => {
	try {
		if (req.method === "POST") {
			const users = await prisma.user.findMany()

			const userExists = users.find((user) => user.email === req.body.email)

			const hashedPassword = await hashPW(req.body.password)

			if (userExists) {
				res.status(409).json({ message: "User already exists" })
				return
			}

			if (!userExists) {
				const [user, account]: any = await prisma
					.$transaction([
						prisma.user.create({
							data: {
								email: req.body.email,
								password: hashedPassword,
								role: "USER",
								credits: 0,
							},
						}),
						prisma.account.create({
							data: {
								user: {
									connect: {
										email: req.body.email,
									},
								},
								type: "credentials",
								provider: "credentials",
								providerAccountId: req.body.email,
							},
						}),
					])
					.catch((err) => {
						console.error(err)
						res
							.status(500)
							.json({ message: "Internal server error", error: err })
						return
					})
				res.status(201).json({ message: "User created", user, account })
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
