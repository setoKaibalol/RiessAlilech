import NextAuth, { Session, User } from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/prisma/PrismaClient"

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		EmailProvider({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],
	secret: process.env.SECRET,
	callbacks: {
		async session({ session, user }: { session: Session; user: User }) {
			if (session.user && user) {
				session.user.id = user.id
				session.user.role = user.role
				session.user.credits = user.credits
			}
			return Promise.resolve(session)
		},
	},
}

export default NextAuth(authOptions)
