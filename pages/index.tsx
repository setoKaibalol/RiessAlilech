import Head from "next/head"
import Link from "next/link"
import AnimatedBackground from "@/components/AnimatedBackground"
import WriteTextComponent from "@/components/WriteTextComponent"
import { GiToken } from "react-icons/gi"

export default function Home() {
	return (
		<>
			<Head>
				<title></title>
				<meta name="description" content="" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="full-height sm:h-auto flex flex-col items-center w-full overflow-hidden font-primary relative">
				{/* <div className="pt-40">
					<Chat></Chat>
				</div> */}
				<AnimatedBackground></AnimatedBackground>
				<div className="md:h-96 w-full flex flex-col justify-start items-center gap-10 ">
					<div className="flex flex-col max-w-sm items-center h-44 sm:pt-20 pt-8">
						<h2 className="p-3 text-secondary-base text-2xl font-bold">
							TipForYou
						</h2>
						<h1 className="text-4xl font-bold text-center">
							<span className="text-accent-base">Tip</span> on Desire. <br />
							<span className="text-accent-base">Connect</span> with Passion.
						</h1>
					</div>
				</div>
				<div className="flex flex-col w-full items-center sm:pb-8">
					<div className="w-full h-56 flex lg:justify-center lg:w-1/2 justify-start p-5 py-20">
						<WriteTextComponent></WriteTextComponent>
					</div>
					<div className="flex w-full flex-col gap-5 lg:w-1/2 justify-center items-center px-6">
						<Link
							className="w-full p-3 bg-primary-base rounded-md text-xl font-medium text-secondary-base flex justify-center"
							href={"/explore?category=auctions"}>
							Top Auktionen
						</Link>
						<Link
							className="w-full p-3 bg-primary-base rounded-md text-xl font-medium text-secondary-base flex justify-center"
							href={"/explore?category=creators"}>
							Content Creators entdecken
						</Link>
						<Link
							className="w-full p-3 justify-center flex flex-row items-center bg-primary-base rounded-md text-xl font-medium text-secondary-base "
							href={"/credits"}>
							<GiToken></GiToken>TipTokens
						</Link>
					</div>
				</div>
			</main>
		</>
	)
}
