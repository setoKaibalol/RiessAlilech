import Head from "next/head"
import Image from "next/image"
import FAQ from "@/components/FAQComponent"
import Link from "next/link"
import Chat from "@/components/Chat"
import AnimatedBackground from "@/components/AnimatedBackground"
import WriteTextComponent from "@/components/WriteTextComponent"

export default function Home() {
	return (
		<>
			<Head>
				<title></title>
				<meta name="description" content="" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="h-screen overflow-hidden font-primary relative">
				{/* <div className="pt-40">
					<Chat></Chat>
				</div>
 */}{" "}
				<AnimatedBackground></AnimatedBackground>
				<div className="h-auto w-full flex flex-col justify-start items-center gap-10 ">
					<div className="flex flex-col max-w-sm items-center h-64 sm:pt-20 pt-14">
						<h2 className="font-primary p-5 text-secondary-base text-2xl font-bold">
							TipForYou
						</h2>
						<h1 className="text-4xl font-bold text-center">
							<span className="text-accent-base">Tip</span> on Desire. <br />
							<span className="text-accent-base">Connect</span> with Passion.
						</h1>
					</div>
				</div>
				<div className="w-full h-80 flex justify-start p-5 py-20">
					<WriteTextComponent></WriteTextComponent>
				</div>
				<div className="flex flex-col gap-4 justify-center items-center px-6">
					<Link
						className="w-full p-2 bg-primary-base rounded-md text-2xl font-medium text-secondary-base flex justify-center"
						href={"/explore?category=auctions"}>
						Auctions
					</Link>
					<Link
						className="w-full p-2 bg-primary-base rounded-md text-2xl font-medium text-secondary-base flex justify-center"
						href={"/explore?category=creators"}>
						Creators
					</Link>
				</div>
			</main>
		</>
	)
}
