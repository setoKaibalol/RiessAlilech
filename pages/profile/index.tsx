import React, { useEffect, useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { ClipLoader } from "react-spinners"
import Image from "next/image"
import { useUserContext } from "@/context"

type Props = {}

function Profile({}: Props) {
	const { data: session, status } = useSession()
	const { userCreatorData, setUserCreatorData } = useUserContext()

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
					setUserCreatorData(data)
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
					<button
						className="border-2 p-3 rounded-md bg-accent-base hover:bg-secondary-base text-primary-base border-secondary-base "
						onClick={() => signIn()}>
						Anmelden
					</button>
				</div>
			)
		case "authenticated":
			return session.user.role === "CREATOR" ? (
				<div className="flex flex-col justify-start pt-10 items-center bg-primary-base text-secondary-base font-primary h-screen">
					<div className="h-[30%] w-screen flex flex-col justify-start items-center">
						<div className="relative w-44 h-44 shrink-0">
							<Image
								placeholder="blur"
								blurDataURL={
									"https://static.vecteezy.com/system/resources/previews/002/596/484/non_2x/default-avatar-photo-placeholder-profile-image-female-vector.jpg"
								}
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
						<h2 className="font-bold text-xl first-letter:uppercase text-secondary-base">
							{userCreatorData.nickName}
						</h2>
					</div>
					<div className="flex flex-col w-full p-4 gap-2 text-lg">
						<div className="flex flex-row gap-8 bg-secondary-base/10 p-2 rounded-md">
							Account typ:{" "}
							<span className="text-accent-base font-bold">
								{session.user.role}
							</span>
						</div>
						<div className="flex flex-row gap-8 bg-secondary-base/10 p-2 rounded-md">
							Name:{" "}
							<span className="text-accent-base font-bold">
								{userCreatorData?.name}
							</span>
						</div>
						<div className="flex flex-row gap-8 min-h-[80px] h-auto bg-secondary-base/10 p-2 rounded-md">
							Über mich:{" "}
							<span className="text-accent-base font-bold">
								{userCreatorData?.description}
							</span>
						</div>
						<div className="flex flex-row gap-8 bg-secondary-base/10 p-2 rounded-md">
							Alter:{" "}
							<span className="text-accent-base font-bold">
								{userCreatorData?.age}
							</span>
						</div>
						<div className="flex flex-row gap-8 bg-secondary-base/10 p-2 rounded-md">
							Herkunft:{" "}
							<span className="text-accent-base font-bold">
								{userCreatorData?.origin}
							</span>
						</div>
						<div className="flex flex-row gap-8 bg-secondary-base/10 p-2 rounded-md">
							Größe: <span className="text-accent-base font-bold"></span>
						</div>
					</div>
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
					<div>{session.user.role}</div>
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
