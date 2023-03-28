import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { ClipLoader } from "react-spinners"
import Image from "next/image"
import { useUserContext } from "@/context"

type Props = {}

function Profile({}: Props) {
	const { data: session, status } = useSession()
	const { userCreatorData, setUserCreatorData } = useUserContext()

	useEffect(() => {
		if (session && session.user.role === "CREATOR" && !userCreatorData) {
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
					console.log(data)
				})
		}
	}, [session])

	switch (status) {
		case "loading":
			return (
				<div className="flex justify-center items-center h-screen bg-primary-base">
					<ClipLoader color="#E0726C" size={150} />
				</div>
			)
		case "unauthenticated":
			return (
				<div className="flex justify-center items-center h-screen text-black">
					Login
				</div>
			)
		case "authenticated":
			return session.user.role === "CREATOR" ? (
				<div className="flex flex-col justify-start pt-20 items-center bg-primary-base text-secondary-base font-primary h-screen">
					<div className="h-1/4 w-screen flex flex-col justify-center items-center">
						<div className="relative w-48 h-48 shrink-0">
							<Image
								alt="profile picture"
								src={userCreatorData.profilePicture}
								className="border-2 "
								sizes="100%"
								style={{
									objectFit: "contain",
									objectPosition: "center",
									borderRadius: "100%",
								}}
								fill></Image>
						</div>
					</div>
					<div>{}</div>
				</div>
			) : (
				<div className="flex flex-col justify-start pt-20 items-center bg-primary-base text-secondary-base font-primary h-screen">
					<div className="h-1/4 w-screen flex flex-col justify-center items-center">
						{session.user.image ? (
							<div className="relative w-48 h-48 shrink-0">
								<Image
									alt="profile picture"
									src={session.user.image}
									className="border-2 "
									sizes="100%"
									style={{
										objectFit: "contain",
										objectPosition: "center",
										borderRadius: "100%",
									}}
									fill></Image>
							</div>
						) : (
							<div className="relative w-48 h-48 shrink-0">
								<Image
									alt="profile picture"
									src={
										"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
									}
									className="border-2 "
									sizes="100%"
									style={{
										objectFit: "contain",
										objectPosition: "center",
										borderRadius: "100%",
									}}
									fill></Image>
							</div>
						)}
					</div>
					<div>{}</div>
				</div>
			)
		default:
			return (
				<div className="flex justify-center items-center h-screen text-black">
					Login
				</div>
			)
	}
}

export default Profile
