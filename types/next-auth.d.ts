import NextAuth from "next-auth"
import { Session, User } from "next-auth"

import NextAuth from "next-auth"

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** The user's postal address. */
			image: string | null | undefined
			role: string | null | undefined
			id: string | null | undefined
		}
	}
}
