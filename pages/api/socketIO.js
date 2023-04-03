import nextConnect from "next-connect"
import ioHandler from "../../middleware"

const handler = nextConnect()

handler.use(ioHandler)

export default handler
