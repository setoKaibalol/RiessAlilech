import { google } from "googleapis"
import fs from "fs"
import nextConnect from "next-connect"
import multer from "multer"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { prisma } from "@/prisma/PrismaClient"
const { Readable } = require("stream")

const Multer = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
})

const authenticateGoogle = () => {
	const auth = new google.auth.GoogleAuth({
		credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS),
		scopes: "https://www.googleapis.com/auth/drive",
	})
	return auth
}

const uploadToGoogleDrive = async (file, auth) => {
	const stream = Readable.from(file.buffer)

	const fileMetadata = {
		name: file.originalname,
		parents: ["1327psikU4uFO4Buehti9kNIgRongrl2k"], // folder id
	}
	const media = {
		mimeType: file.mimetype,
		body: stream,
	}

	const driveService = google.drive({ version: "v3", auth })

	const response = await driveService.files
		.create({
			requestBody: fileMetadata,
			media: media,
			fields: "id",
		})
		.catch((err) => {
			console.error("googleDriveUploadError", err)
		})
	return response
}

const apiRoute = nextConnect({
	onError(error, req, res) {
		console.log("nextConnectError 501", error)
		res
			.status(501)
			.json({ error: `Sorry something Happened! ${error.message}` })
	},
	onNoMatch(req, res) {
		console.log("nextConnectError 405", error)

		res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
	},
})

apiRoute.use(Multer.single("file"))

apiRoute.post(async (req, res) => {
	const session = await getServerSession(req, res, authOptions)
	try {
		if (!session || (session.user && session.user.role !== "CREATOR")) {
			res.status(401).json({ message: "Not authenticated" })
			return
		}

		if (!req.file) {
			res.status(400).send("No file uploaded.")
			return
		}

		const auth = authenticateGoogle()
		const response = await uploadToGoogleDrive(req.file, auth)
		const fileUrl = `https://drive.google.com/uc?export=view&id=${response.data.id}`

		const creator = await prisma.creator.update({
			where: {
				userId: session.user.id,
			},
			data: {
				profilePicture: fileUrl,
			},
		})

		res.status(200).json({ fileUrl, creator })
	} catch (err) {
		console.log(err)
		res.status(500).json({ error: err })
	}
})

export default apiRoute

export const config = {
	api: {
		bodyParser: false,
	},
}
