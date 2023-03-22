import NextAuth from "next-auth"
import { Session, User } from "next-auth"

declare module "next-auth" {
	interface Session {}
	interface User {
		role: string | null
	}
}
