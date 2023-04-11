import NextAuth from "next-auth"
import { Session, User } from "next-auth"

import NextAuth from "next-auth"

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			image: string | null | undefined
			role: string | null | undefined
			id: string | null | undefined
			email: string | null | undefined
			name: string | null | undefined
			credits: number | null | undefined
		}
	}
	interface User {
		role: string | null | undefined
		id: string | null | undefined
		image: string | null | undefined
		email: string | null | undefined
		name: string | null | undefined
		credits: number | null | undefined
	}
}
