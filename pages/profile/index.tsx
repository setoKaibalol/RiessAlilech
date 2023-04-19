import React, { useEffect, useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { ClipLoader } from "react-spinners"
import Image from "next/image"
import { useUserContext } from "@/context"
import { AiFillCamera, AiOutlineCamera } from "react-icons/ai"

type Props = {}

function Profile({}: Props) {
	const { data: session, status } = useSession()
	const {
		userCreatorData,
		setUserCreatorData,
		refreshUserAuctions,
		setRefreshUserAuctions,
		refreshCreators,
		setRefreshCreators,
	} = useUserContext()

	const [realName, setRealName] = useState("")
	const [nickname, setNickname] = useState("")
	const [description, setDescription] = useState("")
	const [profilePicture, setProfilePicture] = useState("")
	const [country, setCountry] = useState("")
	const [origin, setOrigin] = useState("")
	const [age, setAge] = useState<number>(0)
	const [instagram, setInstagram] = useState("")
	const [facebook, setFacebook] = useState("")
	const [twitter, setTwitter] = useState("")
	const [youtube, setYoutube] = useState("")
	const [twitch, setTwitch] = useState("")
	const [tiktok, setTiktok] = useState("")
	const [fourBased, setFourBased] = useState("")
	const [website, setWebsite] = useState("")
	const [onlyFans, setOnlyFans] = useState("")
	const [email, setEmail] = useState("")
	const [role, setRole] = useState<"USER" | "CREATOR">("CREATOR")
	const [userDataStatus, setUserDataStatus] = useState("loading")
	const [refreshData, setRefreshData] = useState(false)
	const [imageStatus, setImageStatus] = useState("loaded")

	useEffect(() => {
		if (session && session.user.role === "CREATOR") {
			setUserDataStatus("loading")
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
					console.log(data)
					setUserCreatorData(data.Creator)
					setRealName(data.Creator.realName)
					setNickname(data.Creator.nickName)
					setDescription(data.Creator.description)
					setProfilePicture(data.Creator.profilePicture)
					setCountry(data.Creator.country)
					setOrigin(data.Creator.origin)
					setAge(data.Creator.age)
					setInstagram(data.Creator.instagram)
					setFacebook(data.Creator.facebook)
					setTwitter(data.Creator.twitter)
					setYoutube(data.Creator.youtube)
					setTwitch(data.Creator.twitch)
					setTiktok(data.Creator.tiktok)
					setFourBased(data.Creator.fourBased)
					setWebsite(data.Creator.website)
					setUserDataStatus("loaded")
				})
		}
	}, [session])

	useEffect(() => {
		if (refreshData && session && session.user.role === "CREATOR") {
			setUserDataStatus("loading")
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
					setUserCreatorData(data.Creator)
					setRealName(data.Creator.realName)
					setNickname(data.Creator.nickName)
					setDescription(data.Creator.description)
					setProfilePicture(data.Creator.profilePicture)
					setCountry(data.Creator.country)
					setOrigin(data.Creator.origin)
					setAge(data.Creator.age)
					setInstagram(data.Creator.instagram)
					setFacebook(data.Creator.facebook)
					setTwitter(data.Creator.twitter)
					setYoutube(data.Creator.youtube)
					setTwitch(data.Creator.twitch)
					setTiktok(data.Creator.tiktok)
					setFourBased(data.Creator.fourBased)
					setWebsite(data.Creator.website)
					setOnlyFans(data.Creator.onlyfans)
					setUserDataStatus("loaded")
					setRefreshData(false)
				})
		}
	}, [session, refreshData])

	const handleImageSubmit = async (file: any) => {
		const formData = new FormData()
		formData.append("file", file)
		setImageStatus("loading")
		fetch("/api/creator/uploadImage", {
			method: "POST",
			body: formData,
		})
			.then((response) => {
				if (response.ok) {
					return response.json()
				} else {
					throw new Error("Something went wrong")
				}
			})
			.then((data) => {
				setImageStatus("loaded")
				setRefreshCreators(true)
				setRefreshUserAuctions(true)
				setRefreshData(true)
			})
			.catch((error) => {
				console.error(error)
				setUserDataStatus("loaded")
			})
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log(userCreatorData)
		setUserDataStatus("loading")
		fetch("/api/creator/update", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				creatorId: userCreatorData.id,
				realName,
				nickname,
				description,
				country,
				origin,
				age,
				instagram,
				facebook,
				twitter,
				youtube,
				twitch,
				tiktok,
				fourBased,
				website,
				onlyFans,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setUserDataStatus("loaded")
			})
	}

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
				<form
					onSubmit={handleSubmit}
					className="flex flex-col h-auto pb-20 px-4 gap-2 justify-start pt-10 items-center bg-primary-base text-secondary-base font-primary min-h-screen">
					<div className="h-[30%] w-screen flex flex-col justify-start items-center">
						{profilePicture &&
						userDataStatus === "loaded" &&
						imageStatus === "loaded" ? (
							<>
								<label
									htmlFor="profilePictureFileInput"
									className="relative w-44 h-44 shrink-0 flex justify-center items-center">
									<Image
										unoptimized
										placeholder="blur"
										blurDataURL={profilePicture}
										alt="profile picture"
										src={profilePicture}
										className="border-2 border-secondary-base "
										sizes="100%"
										style={{
											objectFit: "cover",
											objectPosition: "center",
											borderRadius: "100%",
										}}
										fill></Image>
									<AiOutlineCamera className="text-primary-base/70 absolute justify-self-center h-14 w-14"></AiOutlineCamera>
								</label>
								<input
									hidden
									name="profilePictureFileInput"
									id="profilePictureFileInput"
									type={"file"}
									className="w-full h-full"
									onChange={(e) => {
										console.log(e)
										if (e.target.files) {
											handleImageSubmit(e.target.files[0])
										}
									}}></input>
							</>
						) : (
							<div className="relative w-44 h-44 shrink-0 bg-gray-300 animate-pulse rounded-full"></div>
						)}
						{userDataStatus === "loading" ? (
							<div className=" h-6 m-1 w-24 bg-gray-300 rounded-md animate-pulse"></div>
						) : (
							<h2 className="font-bold text-xl first-letter:uppercase text-secondary-base">
								{userCreatorData?.nickName}
							</h2>
						)}
					</div>
					<div className="flex flex-col w-full pb-10 gap-2 text-lg">
						{userDataStatus === "loading" ? (
							<div className="animate-pulse gap-4 bg-gray-300 w-full h-10 rounded-md items-center p-2 mb-4"></div>
						) : (
							<div className="flex flex-row w-auto justify-center items-center gap-4 mb-4 bg-secondary-base/10 p-2 rounded-md">
								<p className=" font-medium">Account typ: </p>
								<span className="text-accent-base font-bold">
									{session.user.role}
								</span>
							</div>
						)}
						{userDataStatus === "loading" ? (
							<div className="animate-pulse gap-4 bg-gray-300 w-full h-10 rounded-md items-center p-2"></div>
						) : (
							<div className="gap-4 bg-secondary-base/10 p-2 rounded-md">
								<p className="w-40 min-w-40 grow-0 font-extralight">Vorname:</p>
								<input
									type={"text"}
									value={realName}
									onChange={(e) => setRealName(e.target.value)}
									className="bg-transparent w-full text-accent-base font-bold"></input>
							</div>
						)}
						{userDataStatus === "loading" ? (
							<div className="animate-pulse gap-4 bg-gray-300 w-full h-10 items-center rounded-md p-2"></div>
						) : (
							<div className="gap-4 bg-secondary-base/10 p-2 rounded-md">
								<p className=" font-extralight">Nickname:</p>
								<input
									type={"text"}
									value={nickname}
									onChange={(e) => setNickname(e.target.value)}
									className="bg-transparent w-full text-accent-base font-bold"></input>
							</div>
						)}
						{userDataStatus === "loading" ? (
							<div className="animate-pulse min-h-[80px] gap-4 bg-gray-300 w-full h-10 rounded-md  items-center p-2"></div>
						) : (
							<div className="gap-4 min-h-[80px] h-auto bg-secondary-base/10 p-2 rounded-md">
								<p className="font-extralight">Über mich:</p>
								<textarea
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className="bg-transparent w-full text-accent-base font-bold"></textarea>
							</div>
						)}
						{userDataStatus === "loading" ? (
							<div className="animate-pulse gap-4 bg-gray-300 w-full h-10 rounded-md items-center p-2">
								<span className="bg-gray-400 rounded-md h-5 w-28 animate-pulse"></span>
								<span className="bg-gray-400 rounded-md h-7 w-60 animate-pulse"></span>
							</div>
						) : (
							<div className=" bg-secondary-base/10 p-2 rounded-md">
								<p className="font-extralight">Alter:</p>
								<input
									type={"number"}
									value={age}
									onChange={(e) => setAge(parseInt(e.target.value))}
									className="bg-transparent w-full text-accent-base font-bold"></input>
							</div>
						)}
						{userDataStatus === "loading" ? (
							<div className="animate-pulse gap-4 bg-gray-300 w-full h-10 rounded-md items-center p-2">
								<span className="bg-gray-400 rounded-md h-5 w-28 animate-pulse"></span>
								<span className="bg-gray-400 rounded-md h-7 w-60 animate-pulse"></span>
							</div>
						) : (
							<div className="gap-8 bg-secondary-base/10 p-2 rounded-md">
								<p className="font-extralight">Abstammung:</p>
								<input
									type={"text"}
									value={origin}
									onChange={(e) => setOrigin(e.target.value)}
									className="bg-transparent w-full text-accent-base font-bold"></input>
							</div>
						)}
						{userDataStatus === "loading" ? (
							<div className="animate-pulse gap-4 bg-gray-300 w-full h-10 rounded-md items-center p-2">
								<span className="bg-gray-400 rounded-md h-5 w-28 animate-pulse"></span>
								<span className="bg-gray-400 rounded-md h-7 w-60 animate-pulse"></span>
							</div>
						) : (
							<div className="gap-8 bg-secondary-base/10 p-2 rounded-md">
								<p className="font-extralight">Land:</p>
								<input
									type={"text"}
									value={country}
									onChange={(e) => setCountry(e.target.value)}
									className="bg-transparent w-full text-accent-base font-bold"></input>
							</div>
						)}
						{userDataStatus === "loading" ? (
							<div className="animate-pulse gap-4 bg-gray-300 w-full h-10 rounded-md items-center p-2">
								<span className="bg-gray-400 rounded-md h-5 w-28 animate-pulse"></span>
								<span className="bg-gray-400 rounded-md h-7 w-60 animate-pulse"></span>
							</div>
						) : (
							<div className="gap-4 bg-secondary-base/10 p-2 rounded-md">
								<p className="font-extralight">Instagram:</p>{" "}
								<input
									type={"text"}
									value={instagram}
									onChange={(e) => setInstagram(e.target.value)}
									className="bg-transparent w-full text-accent-base font-bold"></input>
							</div>
						)}
						{userDataStatus === "loading" ? (
							<div className="animate-pulse gap-4 bg-gray-300 w-full h-10 rounded-md items-center p-2">
								<span className="bg-gray-400 rounded-md h-5 w-28 animate-pulse"></span>
								<span className="bg-gray-400 rounded-md h-7 w-60 animate-pulse"></span>
							</div>
						) : (
							<div className="gap-4 bg-secondary-base/10 p-2 rounded-md">
								<p className="font-extralight">TikTok:</p>{" "}
								<input
									type={"text"}
									value={tiktok}
									onChange={(e) => setTiktok(e.target.value)}
									className="bg-transparent w-full text-accent-base font-bold"></input>
							</div>
						)}
						{userDataStatus === "loading" ? (
							<div className="animate-pulse gap-4 bg-gray-300 w-full h-10 rounded-md items-center p-2">
								<span className="bg-gray-400 rounded-md h-5 w-28 animate-pulse"></span>
								<span className="bg-gray-400 rounded-md h-7 w-60 animate-pulse"></span>
							</div>
						) : (
							<div className="gap-4 bg-secondary-base/10 p-2 rounded-md">
								<p className="font-extralight">4Based:</p>{" "}
								<input
									type={"text"}
									value={fourBased}
									onChange={(e) => setFourBased(e.target.value)}
									className="bg-transparent w-full text-accent-base font-bold"></input>
							</div>
						)}
						{userDataStatus === "loading" ? (
							<div className="animate-pulse gap-4 bg-gray-300 w-full h-10 rounded-md items-center p-2">
								<span className="bg-gray-400 rounded-md h-5 w-28 animate-pulse"></span>
								<span className="bg-gray-400 rounded-md h-7 w-60 animate-pulse"></span>
							</div>
						) : (
							<div className="gap-4 bg-secondary-base/10 p-2 rounded-md">
								<p className="font-extralight">Twitch:</p>{" "}
								<input
									type={"text"}
									value={twitch}
									onChange={(e) => setTwitch(e.target.value)}
									className="bg-transparent w-full text-accent-base font-bold"></input>
							</div>
						)}
						{userDataStatus === "loading" ? (
							<div className="animate-pulse gap-4 bg-gray-300 w-full h-10 rounded-md items-center p-2">
								<span className="bg-gray-400 rounded-md h-5 w-28 animate-pulse"></span>
								<span className="bg-gray-400 rounded-md h-7 w-60 animate-pulse"></span>
							</div>
						) : (
							<div className="gap-4 bg-secondary-base/10 p-2 rounded-md">
								<p className="font-extralight">website:</p>{" "}
								<input
									type={"text"}
									value={website}
									onChange={(e) => setWebsite(e.target.value)}
									className="bg-transparent w-full text-accent-base font-bold"></input>
							</div>
						)}
						{userDataStatus === "loading" ? (
							<div className="animate-pulse gap-4 bg-gray-300 w-full h-10 rounded-md items-center p-2">
								<span className="bg-gray-400 rounded-md h-5 w-28 animate-pulse"></span>
								<span className="bg-gray-400 rounded-md h-7 w-60 animate-pulse"></span>
							</div>
						) : (
							<div className="gap-4 bg-secondary-base/10 p-2 rounded-md">
								<p className="font-extralight">onlyFans:</p>{" "}
								<input
									type={"text"}
									value={onlyFans}
									onChange={(e) => setOnlyFans(e.target.value)}
									className="bg-transparent w-full text-accent-base font-bold"></input>
							</div>
						)}
					</div>
					<button
						type="submit"
						className="bg-accent-base fixed z-10 bottom-16 p-2 text-primary-base font-primary w-80  px-3 uppercase font-medium rounded-lg duration-200 hover:bg-secondary-base">
						speichern
					</button>
				</form>
			) : (
				<div className="flex flex-col gap-4 justify-start pt-20 items-center bg-primary-base text-secondary-base font-primary h-screen">
					<div className="h-1/4 w-screen flex flex-col justify-center items-center">
						<div className="relative w-48 h-48 shrink-0">
							<Image
								unoptimized
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
					</div>
					<div className="flex flex-row w-auto justify-center items-center gap-4 mb-4 bg-secondary-base/10 p-2 rounded-md">
						<p className=" font-medium">Account typ: </p>
						<span className="text-accent-base font-bold">
							{session.user.role}
						</span>
					</div>
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
