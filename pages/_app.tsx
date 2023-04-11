import "@/styles/globals.css"
import "@/styles/countdown.css"
import Navbar from "@/components/Navbar"
import React, { useEffect, useState } from "react"
import { SessionProvider } from "next-auth/react"
import Footer from "@/components/Footer"
import { UserContext } from "./../context"
import NextNProgress from "nextjs-progressbar"
import type { AppProps } from "next/app"
import { Montserrat, Lato } from "next/font/google"
import NavbarMobile from "@/components/NavbarMobile"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

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

			<UserContext>
				<SessionProvider session={session}>
					<NextNProgress color="#e39a9c" />
					<ToastContainer />
					<Navbar />
					<Component {...pageProps} />
					<Footer />
					<NavbarMobile />
				</SessionProvider>
			</UserContext>
		</div>
	)
}
