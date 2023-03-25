import React, { useState, useEffect, useRef } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useUserContext } from "./../context"
import { ClipLoader } from "react-spinners"

type Props = {}

function Navbar({}: Props) {
	const { active, setActive } = useUserContext()
	const router = useRouter()
	const { data: session, status } = useSession()
	const [authButtonStatus, setAuthButtonStatus] = useState<"loading" | "idle">(
		"idle"
	)
	const [current, setCurrent] = useState(3)
	const navigation = [
		{ name: "Creators", href: "/creators", current: current === 0 },
		{ name: "Auktionen", href: "/auctions", current: current === 1 },
		{ name: "Hilfe", href: "/hilfe", current: current === 2 },
	]

	const NavbarRef = useRef(null)

	useEffect(() => {
		addEventListener("scroll", () => {
			const navbar = document.getElementById("navbar-ref")
			if (navbar) {
				if (window.scrollY > 0) {
					navbar.classList.add("bg-primary-base")
					navbar.classList.add("border-secondary-base")
					navbar.classList.remove("bg-transparent")
					navbar.classList.remove("border-transparent")
				} else {
					navbar.classList.remove("bg-primary-base")
					navbar.classList.remove("border-secondary-base")
					navbar.classList.add("bg-transparent")
					navbar.classList.add("border-transparent")
				}
			}
		})
	}, [])

	const AuthComponent = () => {
		if (
			session &&
			status === "authenticated" &&
			session?.user?.role === "ADMIN"
		) {
			return (
				<div className="w-auto flex flex-row gap-2 font-primary text-secondary-base">
					<button
						onClick={() => {
							signOut()
						}}>
						sign out
					</button>
					<Link
						href={"/admin/creators"}
						className="bg-primary flex flex-row gap-1 p-2 px-3 uppercase rounded-lg duration-200 hover:bg-secondary bg-secondary/20">
						<h2>ADMIN DASHBOARD</h2>
						<Image
							alt="image"
							className="rounded-full"
							src={session?.user?.image!}
							height={26}
							width={26}></Image>
					</Link>
					<Link
						href={"/dashboard"}
						className="flex flex-row gap-1 p-2 px-3 uppercase font-medium rounded-lg duration-200 hover:bg-accent bg-accent/20">
						<h2>DASHBOARD</h2>
						<Image
							alt="image"
							className="rounded-full"
							src={session?.user?.image!}
							height={26}
							width={26}></Image>
					</Link>
				</div>
			)
		} else if (
			session &&
			status === "authenticated" &&
			session?.user?.role === "CREATOR"
		) {
			return (
				<div className="w-auto flex flex-row gap-2 font-primary text-secondary-base">
					<button
						onClick={() => {
							signOut()
						}}>
						sign out
					</button>
					<Link
						href={"/dashboard"}
						className="flex flex-row h-16 gap-1 p-2 px-4 text-xl justify-center uppercase font-medium items-center rounded-lg duration-200 bg-accent-base/70 hover:bg-accent-base">
						<h2>DASHBOARD</h2>
						<Image
							alt="image"
							className="rounded-full"
							src={session?.user?.image!}
							height={26}
							width={26}></Image>
					</Link>
				</div>
			)
		} else if (
			session &&
			status === "authenticated" &&
			session?.user?.role === "USER"
		) {
			return session.user.image ? (
				<Image
					alt="image"
					className="rounded-full"
					src={session?.user?.image!}
					height={40}
					width={40}></Image>
			) : (
				<div className="realtive group">
					<Image
						alt="image"
						className="rounded-full cursor-pointer"
						src={
							"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
						}
						height={40}
						width={40}></Image>
					<div className="absolute  hidden gap-6 p-4 font-primary text-lg font-medium group-hover:flex group-hover:flex-col w-auto h-auto bg-primary-base right-2 rounded-md shadow-md shadow-secondary-base ">
						<p>{session.user.email}</p>
						<button
							onClick={() => {
								setAuthButtonStatus("loading")
								signOut()
							}}
							className="bg-accent-base text-primary-base font-primary p-2 px-3 uppercase font-medium rounded-lg duration-200 hover:bg-secondary-base">
							{authButtonStatus === "loading" ? (
								<ClipLoader></ClipLoader>
							) : (
								"abmelden"
							)}
						</button>
					</div>
				</div>
			)
		} else if (status === "unauthenticated") {
			return (
				<button
					className="text-secondary font-primary"
					onClick={() => signIn()}>
					sign in
				</button>
			)
		} else {
			return (
				<div>
					<ClipLoader></ClipLoader>
				</div>
			)
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
		<div
			id="navbar-ref"
			className="fixed border-b-2 border-transparent w-full px-4 h-20 z-20 justify-between font-primary text-secondary-base bg-transparent flex flex-row items-center">
			<Link href={"/"} className="flex flex-row justify-center items-center">
				<Image
					alt="logo"
					height={80}
					width={240}
					src={"/media/logo/logo_text_nobg.png"}></Image>
			</Link>
			<div className="flex-row gap-2 hidden md:flex text-secondary-base font-primary font-medium">
				{navigation.map((item, index) => (
					<Link
						className="p-2 rounded-md hover:bg-secondary-base/20 text-2xl"
						key={index}
						href={`${item.href}`}>
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
