import NextAuth, { AuthOptions, Session, User } from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/prisma/PrismaClient"
import CredentialsProvider from "next-auth/providers/credentials"
import { JWT } from "next-auth/jwt"

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
					placeholder: "jsmith@gmail.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null
				}
				const user = await fetch(
					`http://localhost:3000/api/user/checkCredentials`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/x-www-form-urlencoded",
							accept: "application/json",
						},
						body: new URLSearchParams({
							email: credentials.email,
							password: credentials.password,
						}),
					}
				)
					.then((res) => res.json())
					.then((data) => {
						console.log("data:", data)
						return data
					})

				if (user.error) {
					return user.error
				}

				if (!user) {
					return null
				}

				return user
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],
	secret: process.env.SECRET,
	callbacks: {
		async session({ session, token, user }) {
			console.log("session:", session)
			console.log("token:", token)
			if (!token) {
				return Promise.resolve(session)
			}

			if (!session || !session.user) {
				return Promise.resolve(session)
			}
			session.user.id = token.id
			session.user.role = token.role
			session.user.credits = token.credits
			return Promise.resolve(session)
		},

		async jwt({ token, user, session, trigger }: any) {
			const pUser = await prisma.user.findUnique({
				where: {
					email: token.email,
				},
			})
			if (!pUser) {
				console.log("no user found")
				return null
			}

			if (pUser) {
				if (!pUser.name && pUser.email) {
					token.name = pUser.email.slice(0, pUser.email.indexOf("@"))
				}

				if (pUser.name) {
					token.name = pUser.name
				}

				token.id = pUser.id
				token.role = pUser.role
				token.credits = pUser.credits
				token.picture = pUser.image
			}
			return Promise.resolve(token)
		},
	},

	pages: {
		signIn: "/auth/signin",
		signOut: "/auth/signout",
	},
	session: {
		strategy: "jwt",
	},
}

export default NextAuth(authOptions)
