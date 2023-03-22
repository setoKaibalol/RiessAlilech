import "@/styles/globals.css"
import "@/styles/countdown.css"
import Navbar from "@/components/Navbar"
import React, { useState } from "react"
import { SessionProvider } from "next-auth/react"
import Footer from "@/components/Footer"
import { UserContext } from "./../context"
import NextNProgress from "nextjs-progressbar"
import type { AppProps } from "next/app"

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<>
			<UserContext>
				<SessionProvider session={session}>
					<NextNProgress color="#e39a9c" />
					<Navbar />
					<Component {...pageProps} />
					<Footer />
				</SessionProvider>
			</UserContext>
		</>
	)
}
