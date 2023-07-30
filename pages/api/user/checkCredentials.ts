import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/prisma/PrismaClient"
import { validatePW } from "@/lib/hash/unhashPW"

type Handler = (
	req: NextApiRequest,
	res: NextApiResponse
) => void | Promise<void>

const handler: Handler = async (req, res) => {
	console.log(req.body)
	const user = await prisma.user.findUnique({
		where: { email: req.body.email },
		select: {
			id: true,
			name: true,
			email: true,
			image: true,
			password: true,
		},
	})

	if (!user || !user.password) {
		res.status(400).json({ error: "Invalid credentials" })
		console.log(user)
		return
	}

	const isValid = await validatePW(req.body.password, user.password)

	if (user && user.password && isValid) {
		res.status(200).json(user)
		console.log("checkcredentials:", "Valid credentials")
		return
	} else {
		res.status(400).json({ error: "wrong password" })
		console.log("checkcredentials:", "wrong password")
		return
	}
}

export default handler
