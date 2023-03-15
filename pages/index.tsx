import Head from "next/head"
import Image from "next/image"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
	return (
		<>
			<Head>
				<title></title>
				<meta name="description" content="" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="min-h-screen pt-20">
				<div className="h-screen w-full bg-gradient-radial from-secondary via-primary to-primary"></div>
			</main>
		</>
	)
}
