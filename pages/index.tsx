import Head from "next/head"
import Image from "next/image"
import FAQ from "@/components/FAQComponent"

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
				<div className="h-screen w-full flex flex-col justify-center items-center gap-10 bg-gradient-center  from-primary-base  via-accent-base to-accent-base">
					<div className="flex flex-col max-w-sm">
						<h2 className=" font-primary font-medium">Unsere Angebote</h2>
						<p className="font-secondary">
							Enim pariatur esse elit do consequat eu nostrud nisi non. Do esse
							anim sunt elit anim sint elit sit. Ex nostrud ut tempor
							exercitation consequat aliquip. Et pariatur ad commodo ea dolor
							ullamco quis nostrud sit labore et.
						</p>
					</div>
					<FAQ
						items={[
							{ question: "do birds fly?", answer: "no, brids swim" },
							{
								question: "do chickens lay eggs?",
								answer: "yes chickens lay eggs",
							},
							{
								question: "do crocodiles eat a vegetarian diet?",
								answer: "yes crocodiles only eat plants",
							},
						]}></FAQ>
				</div>
			</main>
		</>
	)
}
