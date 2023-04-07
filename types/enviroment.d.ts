namespace NodeJS {
	interface ProcessEnv extends NodeJS.ProcessEnv {
		AUTH0_ID: string
		AUTH0_SECRET: string
		AUTH0_DOMAIN: string

		GOOGLE_ID: string
		GOOGLE_SECRET: string
	}
}
