import Head from "next/head"
import Image from "next/image"
import FAQ from "@/components/FAQComponent"
import Link from "next/link"

export default function Home() {
	return (
		<>
			<Head>
				<title></title>
				<meta name="description" content="" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="min-h-screen font-primary">
				<div className="h-screen w-full flex flex-col justify-start items-center gap-10 bg-gradient-center  from-primary-base  via-accent-base to-accent-base">
					<div className="flex flex-col max-w-sm items-center h-64 sm:pt-20 pt-14">
						<h2 className="font-primary p-5 text-secondary-base text-2xl font-bold">
							TipForYou
						</h2>
						<h1 className="text-4xl font-bold text-center">
							<span className="text-accent-base">Tip</span> on Desire.
						</h1>
						<h1 className="text-4xl font-bold text-center">
							<span className="text-accent-base">Connect</span> with Passion.
						</h1>
					</div>
					<div className="h-80 grow-0">
						<FAQ
							items={[
								{
									question: "Was ist TipForYou",
									answer:
										"TipForYou ist eine Platform wo der User mit Content Erstellern connecten kann.",
								},
								{
									question: "Wie kann ich starten?",
									answer:
										"Entdecke verschiedene Creator und interagiere mit deinen Favoriten.",
								},
								{
									question: "Was ist eine Auction?",
									answer:
										"In einer Auction versteigert ein Creator einen persöhnlichen Gegenstand.",
								},
							]}></FAQ>
					</div>
				</div>
			</main>
		</>
	)
}
