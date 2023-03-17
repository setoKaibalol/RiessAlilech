import NextAuth, { Awaitable, NextAuthOptions } from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "../../../prisma/PrismaClient"
import { Session } from "inspector"
import { AuthOptions } from "@/types/next-auth"

export const authOptions: AuthOptions = {
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
	// Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
	// https://next-auth.js.org/configuration/databases
	//
	// Notes:
	// * You must install an appropriate node_module for your database
	// * The Email provider requires a database (OAuth providers do not)
	// database: process.env.DATABASE_URL,

	// The secret should be set to a reasonably long random string.
	// It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
	// a separate secret is defined explicitly for encrypting the JWT.
	secret: process.env.NEXTAUTH_SECRET,

	session: {
		// Use JSON Web Tokens for session instead of database sessions.
		// This option can be used with or without a database for users/accounts.
		// Note: `strategy` should be set to 'jwt' if no database is used.
		strategy: "jwt",

		// Seconds - How long until an idle session expires and is no longer valid.
		// maxAge: 30 * 24 * 60 * 60, // 30 days

		// Seconds - Throttle how frequently to write to database to extend a session.
		// Use it to limit write operations. Set to 0 to always update the database.
		// Note: This option is ignored if using JSON Web Tokens
		// updateAge: 24 * 60 * 60, // 24 hours
	},

	// JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
	// option is set - or by default if no database is specified.
	// https://next-auth.js.org/configuration/options#jwt
	jwt: {
		// A secret to use for key generation (you should set this explicitly)
		secret: process.env.NEXTAUTH_SECRET,
		// Set to true to use encryption (default: false)
		// encryption: true,
		// You can define your own encode/decode functions for signing and encryption
		// if you want to override the default behaviour.
		// encode: async ({ secret, token, maxAge }) => {},
		// decode: async ({ secret, token, maxAge }) => {},
	},

	// You can define custom pages to override the built-in ones. These will be regular Next.js pages
	// so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
	// The routes shown here are the default URLs that will be used when a custom
	// pages is not specified for that route.
	// https://next-auth.js.org/configuration/pages
	callbacks: {
		async jwt({ token, user }) {
			/* Step 1: update the token based on the user object */
			if (user) {
				token.role = user.role
				token.id = user.id
			}
			return token
		},
		session({ session, token }) {
			/* Step 2: update the session.user based on the token object */
			if (token && session.user) {
				session.user.role = token.role
				session.user.id = token.id
			}
			return session
		},
	},

	// Events are useful for logging
	// https://next-auth.js.org/configuration/events
	events: {},

	// Enable debug messages in the console if you are having problems
	debug: false,
}

export default NextAuth(authOptions)
