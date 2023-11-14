import type { NextApiRequest, NextApiResponse } from "next"
import { Session } from "next-auth"
require("dotenv").config()

type Handler = (
	req: NextApiRequest & {
		session: Session // Define the type of the session object
	},
	res: NextApiResponse
) => void | Promise<void>

const handler: Handler = async (req, res) => {
	try {
		if (req.method === "POST") {
			let nodemailer = require("nodemailer")
			const transporter = nodemailer.createTransport({
				port: 465,
				host: "smtp.gmail.com",
				auth: {
					user: "l.vogel@tipforyou.de",
					pass: process.env.EMAIL_PW,
				},
				secure: true,
			})

			const mailData = {
				from: "l.vogel@tipforyou.de",
				to: "y.alilech@tipforyou.de",
				subject: req.body.subject,
				text: req.body.message,
				html: `<div><p>Anfrage von: ${req.body.email}</p><br/><p>Nachricht: ${req.body.message}</p></div>`,
			}

			transporter.sendMail(mailData, function (err: any, info: any) {
				if (err) console.log(err)
				else console.log(info)
			})

			res.status(200).send("Email sent")
		} else {
			res.status(405).json({ message: "Method not allowed" })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Internal server error" })
	}
}

export default handler
