import React, { useState, useEffect, useRef } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useUserContext } from "./../context"
import { ClipLoader } from "react-spinners"

export const AuthComponent = () => {
	const { active, setActive } = useUserContext()
	const router = useRouter()
	const { data: session, status } = useSession()

	const [authButtonStatus, setAuthButtonStatus] = useState<"loading" | "idle">(
		"idle"
	)

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
			<button className="text-secondary font-primary" onClick={() => signIn()}>
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
