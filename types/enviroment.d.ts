namespace NodeJS {
	interface ProcessEnv extends NodeJS.ProcessEnv {
		AUTH0_ID: string
		AUTH0_SECRET: string
		AUTH0_DOMAIN: string
		STRIPE_MODE: string
		GOOGLE_ID: string
		GOOGLE_SECRET: string
		NEXT_PUBLIC_STRIPE_PKEY_LIVE: string
		NEXT_PUBLIC_STRIPE_PKEY_TEST: string
		NEXT_PUBLIC_PAYPAL_CLIENT_ID_LIVE: string
		NEXT_PUBLIC_PAYPAL_CLIENT_ID_TEST: string
	}
}
