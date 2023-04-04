import React, { useState, useEffect, useRef } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useUserContext } from "./../context"
import { ClipLoader } from "react-spinners"
import { AuthComponent } from "./AuthComponent"
import { HiOutlineMenuAlt3 } from "react-icons/hi"

type Props = {}

function Navbar({}: Props) {
	const { active, setActive, showMobileMenu, setShowMobileMenu } =
		useUserContext()
	const router = useRouter()
	const { data: session, status } = useSession()

	const [current, setCurrent] = useState(3)

	const navigation = [
		{ name: "Creators", href: "/creators", current: current === 0 },
		{ name: "Auktionen", href: "/auctions", current: current === 1 },
		{ name: "Hilfe", href: "/hilfe", current: current === 2 },
	]

	const navigationLeft = [
		{ name: "Creators", href: "/creators", current: current === 0 },
		{ name: "Auctions", href: "/auctions", current: current === 1 },
	]

	const navigationRight = [
		{ name: "Hilfe", href: "/hilfe", current: current === 2 },
	]

	const NavbarRef = useRef(null)
	const MobileMenuButton = useRef(null)

	const mobileMenuNavigation = [
		{ name: "Creators", href: "/creators", current: current === 0 },
		{ name: "Auktionen", href: "/auctions", current: current === 1 },
		{ name: "Hilfe", href: "/hilfe", current: current === 2 },
	]

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

	const handleMobileMenu = (e: any) => {
		e.preventDefault()
		setShowMobileMenu(!showMobileMenu)
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

	return router.pathname === "/" ? (
		<div className="h-20 w-full bg-transparent z-30 fixed flex flex-row">
			<div
				id="navbar-ref"
				className="fixed sm:flex hidden border-b-2 border-transparent w-full px-4 h-20 z-20 justify-between font-primary text-secondary-base bg-transparent flex-row items-center">
				<Link
					onClick={() => {
						setShowMobileMenu(false)
					}}
					href={"/"}
					className="flex flex-row justify-center items-center">
					<Image
						alt="logo"
						height={80}
						width={240}
						src={"/media/logo/logo_text_nobg.png"}></Image>
				</Link>
				<div className="flex-row gap-2 hidden md:flex text-secondary-base font-primary font-medium">
					{navigation.map((item, index) => (
						<Link
							onClick={() => setShowMobileMenu(false)}
							className="p-2 rounded-md hover:bg-secondary-base/20 text-2xl"
							key={index}
							href={`${item.href}`}>
							{item.name}
						</Link>
					))}
				</div>
				<AuthComponent />
			</div>
			<div
				id="navbar-ref-mobile"
				className="fixed flex sm:hidden border-b-2 border-transparent w-full px-4 h-20 z-20 justify-between font-primary text-secondary-base bg-transparent flex-row items-center">
				<Link
					onClick={() => {
						setShowMobileMenu(false)
					}}
					href={"/"}
					className="flex flex-row justify-center items-center">
					<Image
						alt="logo"
						height={60}
						width={60}
						src={"/media/logo/t4u_logo.png"}></Image>
				</Link>

				<button
					className="z-40 relative0"
					ref={MobileMenuButton}
					onClick={(e) => {
						handleMobileMenu(e)
					}}>
					<HiOutlineMenuAlt3
						className={`h-10 w-10 z-20  ${
							showMobileMenu ? " text-primary-base" : " text-secondary-base"
						}`}></HiOutlineMenuAlt3>
				</button>
				{showMobileMenu && (
					<div className="z-20 w-[60%] h-screen pb-14 flex flex-col border-l-2 border-accent-base bg-secondary-base absolute right-0 top-0">
						<div className="flex flex-col gap-14 p-4 text-primary-base w-full h-full">
							<div className="flex flex-col ">
								{mobileMenuNavigation.map((item, index) => (
									<Link
										onClick={() => setShowMobileMenu(false)}
										className="p-2 rounded-md hover:bg-secondary-base/20 text-lg"
										key={index}
										href={`${item.href}`}>
										{item.name}
									</Link>
								))}
								<AuthComponent></AuthComponent>
							</div>

							<div className=" flex flex-col h-full justify-end gap-4">
								{status === "authenticated" && (
									<button
										onClick={() => signOut()}
										className="bg-primary-base w-full  text-secondary-base font-bold py-2 px-4 rounded">
										Abmelden
									</button>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	) : router.pathname != "/dashboard" && !router.pathname.includes("admin") ? (
		<div className="h-20 w-full bg-transparent z-30 fixed flex flex-row">
			<div
				id="navbar-ref"
				className="fixed sm:flex hidden border-b-2 border-transparent w-full px-4 h-20 z-20 justify-between font-primary text-secondary-base bg-transparent flex-row items-center">
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
			<div
				id="navbar-ref-mobile"
				className="fixed flex sm:hidden border-b-2 border-transparent w-full px-4 h-20 z-20 justify-between font-primary text-secondary-base bg-transparent flex-row items-center">
				<Link
					onClick={() => {
						setShowMobileMenu(false)
					}}
					href={"/"}
					className="flex flex-row justify-center items-center">
					<Image
						alt="logo"
						height={60}
						width={60}
						src={"/media/logo/t4u_logo.png"}></Image>
				</Link>

				<button
					className="z-40"
					ref={MobileMenuButton}
					onClick={(e) => {
						handleMobileMenu(e)
					}}>
					<HiOutlineMenuAlt3
						className={`h-10 w-10 z-20  ${
							showMobileMenu ? " text-primary-base" : " text-secondary-base"
						}`}></HiOutlineMenuAlt3>
				</button>
				{showMobileMenu && (
					<div className="z-20 w-[60%] h-screen pb-14 flex flex-col border-l-2 border-accent-base bg-secondary-base absolute right-0 top-0">
						<div className="flex flex-col justify-between gap-14 p-4 text-primary-base w-full h-full">
							<div className="flex flex-col">
								{mobileMenuNavigation.map((item, index) => (
									<Link
										onClick={() => setShowMobileMenu(false)}
										className="p-2 rounded-md hover:bg-secondary-base/20 text-lg"
										key={index}
										href={`${item.href}`}>
										{item.name}
									</Link>
								))}
								<div className="flex justify-center">
									<AuthComponent></AuthComponent>
								</div>
							</div>

							<div className=" flex flex-col gap-4">
								{status === "authenticated" && (
									<button
										onClick={() => signOut()}
										className="bg-primary-base w-full  text-secondary-base font-bold py-2 px-4 rounded">
										Abmelden
									</button>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	) : (
		<div></div>
	)
}

export default Navbar
