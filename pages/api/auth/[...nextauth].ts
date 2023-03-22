import NextAuth, { Session, User } from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/prisma/PrismaClient"

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		Auth0Provider({
			clientId: process.env.AUTH0_ID,
			clientSecret: process.env.AUTH0_SECRET,
			issuer: process.env.AUTH0_DOMAIN,
			// @ts-ignore
			domain: process.env.AUTH0_DOMAIN,
		}),
	],
	secret: process.env.SECRET,
	callbacks: {
		async session({ session, user }: { session: Session; user?: User | null }) {
			if (session.user && user) {
				session.user.id = user.id
				session.user.role = user.role
			}
			return Promise.resolve(session)
		},
	},
}

export default NextAuth(authOptions)
