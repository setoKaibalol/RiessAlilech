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
		<div className="h-auto w-full bg-black relative overflow-hidden ">
			<div className="w-full h-full flex md:flex-row flex-col items-center md:items-start md:justify-between bg-primary pb-10 border-t-secondary border-t-2">
				<div className="flex md:flex-row items-center md:w-[28%] h-full">
					<div className="w-1/2 h-full flex justify-center items-center">
						<Image
							src="/media/logo/Elite_transparent.png"
							alt="logo"
							width={200}
							height={200}></Image>
					</div>
					<div className="w-1/2 h-full p-10 flex justify-center items-center text-xl font-extralight">
						Unser Slogan ballert
					</div>
				</div>
				<div className="flex flex-row items-center w-[68%] h-full">
					<div className="w-1/3 z-20 relative flex flex-col gap-y-1">
						{FooterNav1.map((item, index) => (
							<Link className="p-1 w-max" href={item.href} key={index}>
								{item.name}
							</Link>
						))}
					</div>
					<div className="w-1/3 z-20 relative flex flex-col gap-y-1">
						{FooterNav1.map((item, index) => (
							<Link className="p-1 w-max" href={item.href} key={index}>
								{item.name}
							</Link>
						))}
					</div>
					<div className="w-1/3 z-20 relative flex flex-col gap-y-1">
						{FooterNav1.map((item, index) => (
							<Link className="p-1 w-max" href={item.href} key={index}>
								{item.name}
							</Link>
						))}
					</div>
				</div>
			</div>
			<div className="absolute z-10 w-[800px] top-4 h-[800px] rounded-full left-[70%] bg-secondary flex justify-center items-center">
				<div className="h-[400px] w-[400px] border border-primary rounded-full"></div>
			</div>
		</div>
	) : (
		<div></div>
	)
}

export default Footer
