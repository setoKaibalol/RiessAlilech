import NextAuth from "next-auth"
import { DefaultSession, DefaultUser } from "next-auth"
export enum Role {
	user = "USER",
	admin = "ADMIN",
	creator = "CREATOR",
}
type AuthOptions = {
	adapter: any
	secret: string | undefined
	providers: any
	session: {
		strategy: SessionStrategy | undefined
	}
	jwt: {
		secret: string | undefined
	}
	callbacks: {
		jwt: (params: {
			token: JWT
			user?: User | AdapterUser | undefined
			account?: Account | null | undefined
			profile?: Profile | undefined
			isNewUser?: boolean | undefined
		}) => Awaitable<>
		session: (params: {
			session: Session
			user: User | AdapterUser
			token: JWT
		}) => Awaitable<Session>
	}
	events: any
	debug: boolean
}

interface IUser extends DefaultUser {
	/**
	 * Role of user
	 */
	role?: Role
}
declare module "next-auth" {
	interface User extends IUser {}
	interface Session {
		user?: User
	}
}
declare module "next-auth/jwt" {
	interface JWT extends IUser {}
}
