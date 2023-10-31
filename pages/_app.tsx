import "@/styles/globals.css"
import "@/styles/countdown.css"
import Navbar from "@/components/Navbar"
import React, { useEffect } from "react"
import { SessionProvider } from "next-auth/react"
import Footer from "@/components/Footer"
import { UserContext } from "./../context"
import NextNProgress from "nextjs-progressbar"
import type { AppProps } from "next/app"
import { Montserrat, Lato } from "next/font/google"
import NavbarMobile from "@/components/NavbarMobile"
import { Toaster } from "sonner"
import ErrorBoundary from "@/components/error/ErrorBoundary"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import EightheenPlusPanel from "@/components/18PlusPanel"

const mode = process.env.NEXT_PUBLIC_PAYPAL_MODE

const paypalOptions = {
	"client-id":
		mode === "live"
			? process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID_LIVE
			: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID_TEST,
	components: "buttons",
	currency: "EUR",
}

const montserrat = Montserrat({ subsets: ["latin"] })
const lato = Lato({ weight: "400", subsets: ["latin"] })

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	useEffect(() => {
		function updateViewportHeight() {
			const vh = window.innerHeight * 0.01
			document.documentElement.style.setProperty("--vh", `${vh}px`)
		}

		updateViewportHeight()
		window.addEventListener("resize", updateViewportHeight)

		return () => {
			window.removeEventListener("resize", updateViewportHeight)
		}
	}, [])

	return (
		<div className="">
			<style jsx global>
				{`
					:root {
						--montserrat-font: ${montserrat.style.fontFamily};
						--lato-font: ${lato.style.fontFamily};
					}
				`}
			</style>

			<ErrorBoundary>
				<PayPalScriptProvider options={paypalOptions}>
					<UserContext>
						<SessionProvider session={session}>
							<EightheenPlusPanel />
							<NextNProgress color="#e39a9c" />
							<Toaster position="top-right" richColors />
							<Navbar />
							<Component {...pageProps} />
							<Footer />
							<NavbarMobile />
						</SessionProvider>
					</UserContext>
				</PayPalScriptProvider>
			</ErrorBoundary>
		</div>
	)
}
