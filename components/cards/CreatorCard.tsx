import React from "react"
import { useRouter, usePathname } from "next/navigation"
import { SkeletonCard } from "./skeletons/CreatorSkeleton"
import { useUserContext } from "@/context"
import Link from "next/link"
import Image from "next/image"
import { VscVerifiedFilled } from "react-icons/vsc"

type Props = {
	creator: any
	status: string
}

function CreatorCard({ creator, status }: Props) {
	const router = useRouter()
	const pathname = usePathname()
	const {
		creators,
		setCreators,
		creatorsStatus,
		setCreatorsStatus,
		refreshCreators,
		setRefreshCreators,
	} = useUserContext()
	const [copySuccess, setCopySuccess] = React.useState("")

	switch (pathname) {
		case "/dashboard":
			switch (status) {
				case "loading":
					return <SkeletonCard />
				case "error":
					return <p>error</p>
				case "loaded":
					return (
						<div className="p-4 bg-white rounded-lg shadow-md w-80">
							<h3 className="text-lg font-semibold font-primary text-[#B76E79] mb-2">
								{creator.name}, {creator.age}
							</h3>
							{creator.profilePicture && (
								<Image
									unoptimized
									width={40}
									height={40}
									alt="profile picture"
									src={creator.profilePicture}></Image>
							)}
							<p className="text-sm text-gray-700 mb-4 font-secondary">
								Short bio about the creator...
							</p>
							<button className="py-2 px-4 bg-secondary/90 duration-100 font-primary hover:bg-secondary text-white rounded-lg w-full">
								View Creator
							</button>
						</div>
					)
				default:
					return <SkeletonCard />
			}
		case "/explore":
			switch (status) {
				case "loading":
					return <SkeletonCard />
				case "error":
					return <p>error</p>
				case "loaded":
					return (
						<Link
							href={`/creator/${creator.id}`}
							className="md:p-0 font-primary h-48 rounded-b-md border-b border-x hover:shadow-md md:w-40 w-[46%] hover:-translate-y-0.5 hover:shadow-black/40 duration-200 rounded-lg max-w-sm">
							{creator.profilePicture && (
								<div className="w-full relative h-36">
									<Image
										unoptimized
										src={creator.profilePicture}
										alt="Creator Avatar"
										fill
										style={{ objectFit: "cover", objectPosition: "center" }}
										sizes="100%"
										className=" rounded-t-md border-x border-t"
									/>
								</div>
							)}
							<div className="bg-primary-base w-full ">
								<div className="py-2 px-3">
									<div className="text-secondary-base gap-2 text-lg font-bold items-center flex flex-row">
										{creator.realName}, {creator.age}
										<VscVerifiedFilled className="text-lg shrink-0 text-blue-500"></VscVerifiedFilled>
									</div>
								</div>
							</div>
						</Link>
					)
				default:
					return <SkeletonCard />
			}
		case "/auctions":
			switch (creatorsStatus) {
				case "loading":
					return <SkeletonCard />
				case "error":
					return <p>error</p>
				case "loaded":
					return (
						<Link
							href={`/creator/${creator.id}`}
							className="p-4 border hover:shadow-md h-60 hover:-translate-y-1 hover:shadow-black/40 duration-200 rounded-lg shadow-black/40 shadow-sm max-w-sm w-full hover:translate">
							<h3 className="text-lg font-semibold font-primary text-secondary-base mb-2">
								{creator.nickName}
							</h3>
							{creator.profilePicture && (
								<div className="w-full relative h-40">
									<Image
										unoptimized
										src={creator.profilePicture}
										alt="Creator Avatar"
										fill
										style={{ objectFit: "contain", objectPosition: "center" }}
										sizes="100%"
										className=" mb-4"
									/>
								</div>
							)}
						</Link>
					)
				default:
					return <SkeletonCard />
			}

		default:
			return <SkeletonCard />
	}
}

export default CreatorCard
