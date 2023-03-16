import "@/styles/globals.css"
import Navbar from "@/components/Navbar"
import React, { useState } from "react"
import { SessionProvider } from "next-auth/react"
import Footer from "@/components/Footer"
import { UserContext } from "./../context"

import type { AppProps } from "next/app"

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<>
			<UserContext>
				<SessionProvider session={session}>
					<Navbar />
					<Component {...pageProps} />
					<Footer />
				</SessionProvider>
			</UserContext>
		</>
	)
}
