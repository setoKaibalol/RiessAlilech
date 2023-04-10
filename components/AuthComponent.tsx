import React, { useState, useEffect, useRef } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useUserContext } from "./../context"
import { ClipLoader } from "react-spinners"
import { AiFillTool } from "react-icons/ai"

export const AuthComponent = () => {
	const { active, setActive, userCreatorData, setUserCreatorData } =
		useUserContext()
	const router = useRouter()
	const { data: session, status } = useSession()

	const [authButtonStatus, setAuthButtonStatus] = useState<"loading" | "idle">(
		"idle"
	)
	const [refreshData, setRefreshData] = useState(false)

	useEffect(() => {
		if (
			session &&
			session.user.role === "CREATOR" &&
			Object.keys(userCreatorData).length === 0
		) {
			fetch("/api/creator/get", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					creatorId: session.user.id,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					setUserCreatorData(data.Creator[0])
				})
		}
	}, [session])

	useEffect(() => {
		if (session && session.user.role === "CREATOR" && refreshData) {
			fetch("/api/creator/get", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					creatorId: session.user.id,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					setUserCreatorData(data)
					setRefreshData(false)
				})
		}
	}, [session, refreshData])

	if (session && session.user.role === "ADMIN") {
		return (
			<div className=" flex flex-row gap-2 font-primary text-secondary-base">
				<Link
					href={"/admin"}
					className="flex bg-accent-base text-primary-base flex-row gap-1 p-2 px-3 uppercase rounded-lg duration-200 ">
					<h2>ADMIN DASHBOARD</h2>
					<AiFillTool className="w-8 h-8"></AiFillTool>
				</Link>
			</div>
		)
	} else if (
		session &&
		status === "authenticated" &&
		session.user.role === "CREATOR"
	) {
		return (
			<div className="w-full flex flex-row gap-2 font-primary text-primary-base">
				<Link
					href={"/dashboard"}
					className="flex flex-row w-full h-16 font-medium gap-1 p-2 px-2 text-xl justify-center uppercase  items-center rounded-lg duration-200 bg-accent-base hover:bg-accent-base">
					<h2>DASHBOARD</h2>
					<AiFillTool className="w-8 h-8"></AiFillTool>
				</Link>
			</div>
		)
	} else if (
		session &&
		status === "authenticated" &&
		session.user.role === "USER"
	) {
		return session.user.image ? (
			<div className="w-full flex justify-center">
				<Image
					alt="image"
					className="rounded-full border"
					src={session.user.image}
					height={40}
					width={40}></Image>
			</div>
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
				onClick={() => signIn()}
				className="bg-accent-base p-2 text-primary-base px-3 uppercase font-medium rounded-lg duration-200 hover:bg-secondary-base">
				Anmelden
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
