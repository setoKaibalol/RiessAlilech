import "@/styles/globals.css"
import Navbar from "@/components/Navbar"
import React, { useState } from "react"
import { SessionProvider } from "next-auth/react"
import Footer from "@/components/Footer"
import { UserContext } from "@/helpers/UserContext"

import type { AppProps } from "next/app"

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	const [active, setActive] = useState(0)
	return (
		<>
			<UserContext.Provider value={[active, setActive]}>
				<SessionProvider session={session}>
					<Navbar />
					<Component {...pageProps} />
					<Footer />
				</SessionProvider>
			</UserContext.Provider>
		</>
	)
}
