import NextAuth, { AuthOptions, Session, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/prisma/PrismaClient"
import CredentialsProvider from "next-auth/providers/credentials"
import { toast } from "sonner"

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
					`${process.env.NEXTAUTH_URL}/api/user/checkCredentials`,
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
					.catch((err) => {
						console.log("err:", err)
						return null
					})

				if (user.error) {
					return null
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
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async session({ session, token, user }) {
			if (!token) {
				return Promise.resolve(session)
			}

			if (!session || !session.user) {
				return Promise.resolve(session)
			}
			//@ts-ignore
			session.user.id = token.id
			//@ts-ignore
			session.user.role = token.role
			//@ts-ignore
			session.user.credits = token.credits
			return Promise.resolve(session)
		},

		async jwt({ token, user, session, trigger }: any) {
			if (!token || !token.email) {
				return null
			}

			const pUser = await prisma.user.findUnique({
				where: {
					email: token.email,
				},
			})

			if (!pUser) {
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

		async redirect({ url, baseUrl }) {
			return Promise.resolve(baseUrl)
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
