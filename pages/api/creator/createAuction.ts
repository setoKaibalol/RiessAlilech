import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const { title, description, startingPrice } = req.body
		res.status(200).json({ title, description, startingPrice })
	} else {
		res.status(405).json({ message: "Method not allowed" })
	}
}
