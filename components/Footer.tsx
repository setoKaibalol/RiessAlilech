import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

type Props = {}

function Footer({}: Props) {
	const router = useRouter()
	const FooterNav1 = [
		{ name: "Home", href: "/" },
		{ name: "Creators", href: "/creators" },
		{ name: "Auktionen", href: "/auctions" },
		{ name: "Hilfe", href: "/hilfe" },
	]

	return router.pathname != "/dashboard" ? (
		<div className="h-auto w-full font-primary hidden sm:flex relative overflow-hidden ">
			<div className="w-full py-10 h-full flex md:flex-row flex-col items-center md:items-center md:justify-between bg-secondary border-t-secondary-base border-t-2">
				<div className="flex md:flex-row items-center md:w-[30%] h-full">
					<div className="w-1/3 h-full flex justify-center items-center">
						<Image
							src="/media/logo/t4u_logo.png"
							alt="logo"
							width={100}
							height={100}></Image>
					</div>
					<div className="w-2/3 h-full p-10 flex justify-center items-center text-xl font-extralight">
						Bid on Desire. Connect with Passion.
					</div>
				</div>
				<div className="flex flex-row items-center w-[68%] h-full">
					<div className="w-1/3 z-20 relative flex flex-col gap-y-1">
						{FooterNav1.map((item, index) => (
							<Link
								className="p-2 w-max hover:bg-secondary-base/10 rounded-lg duration-200"
								href={item.href}
								key={index}>
								{item.name}
							</Link>
						))}
					</div>
					<div className="w-1/3 z-20 relative flex flex-col gap-y-1">
						{FooterNav1.map((item, index) => (
							<Link
								className="p-2 w-max hover:bg-secondary-base/10 rounded-lg duration-200"
								href={item.href}
								key={index}>
								{item.name}
							</Link>
						))}
					</div>
					<div className="w-1/3 z-20 relative flex flex-col gap-y-1">
						{FooterNav1.map((item, index) => (
							<Link
								className="p-2 w-max hover:bg-secondary-base/10 rounded-lg duration-200"
								href={item.href}
								key={index}>
								{item.name}
							</Link>
						))}
					</div>
				</div>
			</div>
			<div className="absolute z-10 hidden md:flex w-[800px] top-4 translate-x-[50%] h-[800px] border border-secondary-base rounded-full right-0 bg-accent-base/80 justify-center items-center">
				<div className="h-[600px] w-[600px] border-2 border-secondary-base rounded-full"></div>
			</div>
		</div>
	) : (
		<div></div>
	)
}

export default Footer
