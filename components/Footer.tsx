import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

type Props = {}

function Footer({}: Props) {
	const router = useRouter()
	const pathname = usePathname()
	const FooterNav1 = [
		{ name: "Home", href: "/" },
		{ name: "Creators", href: "/explore?category=creators" },
		{ name: "Auktionen", href: "/explore?category=auctions" },
		{ name: "TipTokens kaufen", href: "/credits" },
	]

	const FooterNav2 = [
		{ name: "Impressum", href: "/impressum" },
		{ name: "Datenschutz", href: "/privacy-policy" },
		{ name: "AGB", href: "/agb" },
		{ name: "Kontakt", href: "/kontakt" },
	]

	const FooterNav3 = [
		{ name: "Über uns", href: "/ueber-uns" },
		{ name: "FAQ", href: "/hilfe" },
		{
			name: "18 U.S.C. SECTION 2257 COMPLIANCE NOTICE",
			href: "/18USC-compliance-notice",
		},
		{
			name: "Notice Regarding Intellectual Property Infringement",
			href: "/notice-regarding-intellectual-property-infringement",
		},
	]

	return pathname != "/dashboard" ? (
		<div className="bg-primary-base h-auto w-full font-primary hidden sm:flex relative overflow-hidden ">
			<div className="w-full py-4 h-full flex md:flex-row flex-col items-center md:items-center md:justify-between bg-secondary border-t-secondary-base border-t">
				<div className="flex md:flex-row items-center md:w-[40%] h-full">
					<div className="w-1/3 h-full flex justify-center items-center">
						<Image
							src="/media/logo/t4u_logo.png"
							alt="logo"
							width={100}
							height={100}></Image>
					</div>
					<div className="w-2/3 h-full p-10 flex justify-center items-center text-xl font-extralight">
						Tip on Desire. Connect with Passion.
					</div>
				</div>
				<div className="flex flex-row items-center justify-center w-[60%] h-full">
					<div className="w-1/5 z-20 relative flex flex-col gap-y-1">
						{FooterNav1.map((item, index) => (
							<Link
								className="p-2 w-max text-xs hover:bg-secondary-base/10 rounded-lg duration-200"
								href={item.href}
								key={index}>
								{item.name}
							</Link>
						))}
					</div>

					<div className="w-1/5 z-20 relative flex flex-col gap-y-1">
						{FooterNav2.map((item, index) => (
							<Link
								className="p-2 w-max text-xs hover:bg-secondary-base/10 rounded-lg duration-200"
								href={item.href}
								key={index}>
								{item.name}
							</Link>
						))}
					</div>
					<div className="w-1/5 z-20 relative flex flex-col gap-y-1">
						{FooterNav3.map((item, index) => (
							<Link
								className="p-2 whitespace-pre-wrap max-w-[200px] w-max text-xs hover:bg-secondary-base/10 rounded-lg duration-200"
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
