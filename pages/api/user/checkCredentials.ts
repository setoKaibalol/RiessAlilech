import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/prisma/PrismaClient"
import { validatePW } from "@/lib/hash/unhashPW"
import { toast } from "sonner"

type Handler = (
	req: NextApiRequest,
	res: NextApiResponse
) => void | Promise<void>

const handler: Handler = async (req, res) => {
	const user = await prisma.user
		.findUniqueOrThrow({
			where: { email: req.body.email },
			select: {
				id: true,
				name: true,
				email: true,
				image: true,
				password: true,
			},
		})
		.catch((e) => {
			res.status(400).json({ error: "no user with this email found" })
			return
		})

	if (!user) {
		res.status(400).json({ error: "no user with this email found" })
		return
	}

	if (!user.password) {
		res.status(400).json({ error: "not a credentials user" })
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
