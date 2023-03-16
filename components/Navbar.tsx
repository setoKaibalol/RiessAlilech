import React, { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useUserContext } from "./../context"

type Props = {}

function Navbar({}: Props) {
	const { active, setActive } = useUserContext()
	const router = useRouter()
	const { data: session, status } = useSession()
	const [current, setCurrent] = useState(3)
	const navigation = [
		{ name: "Creators", href: "/creators", current: current === 0 },
		{ name: "Auktionen", href: "/auctions", current: current === 1 },
		{ name: "Hilfe", href: "/faq", current: current === 2 },
	]

	const AuthComponent = () => {
		if (true) {
			return (
				<Link
					href={"/dashboard"}
					className="bg-primary flex flex-row gap-1 p-2 px-3 uppercase font-medium rounded-lg duration-200 hover:bg-secondary bg-secondary/20">
					<h2>DASHBOARD</h2>
					<Image
						alt="image"
						className="rounded-full"
						src={session?.user?.image!}
						height={26}
						width={26}></Image>
				</Link>
			)
		} else if (status === "unauthenticated") {
			return (
				<button className="text-black" onClick={() => signIn()}>
					sign in
				</button>
			)
		} else {
			return <div>loading...</div>
		}
	}

	useEffect(() => {
		if (router.pathname === "/creators") {
			setCurrent(0)
		} else if (router.pathname === "/auctions") {
			setCurrent(1)
		} else if (router.pathname === "/hilfe") {
			setCurrent(2)
		}
	}, [router.pathname])

	return router.pathname != "/dashboard" ? (
		<div className="fixed w-full px-4 h-20 justify-between border-secondary bg-primary border-b-2 flex flex-row items-center">
			<Link href={"/"}>
				<Image
					alt="logo"
					placeholder="blur"
					height={70}
					width={70}
					blurDataURL="/media/logo/elite_transparent.png"
					src={"/media/logo/elite_transparent.png"}></Image>
			</Link>
			<div className="flex-row gap-2 hidden md:flex">
				{navigation.map((item, index) => (
					<Link key={index} href={`${item.href}`}>
						{item.name}
					</Link>
				))}
			</div>
			<AuthComponent />
		</div>
	) : (
		<div></div>
	)
}

export default Navbar
