import React from "react"
import { SkeletonCard } from "./ItemCardSkeleton"
import { useRouter } from "next/router"
import { ClipLoader } from "react-spinners"
import { useUserContext } from "@/context"
import Link from "next/link"
import Image from "next/image"

type Props = {
	creator: any
	status: string
}

function CreatorCard({ creator, status }: Props) {
	const router = useRouter()
	const {
		creators,
		setCreators,
		creatorsStatus,
		setCreatorsStatus,
		refreshCreators,
		setRefreshCreators,
	} = useUserContext()
	const [copySuccess, setCopySuccess] = React.useState("")

	const websiteLink = process.env.NEXT_PUBLIC_WEBSITE_URL

	const handleCopySuccess = (id: string) => {
		setCopySuccess(id)
		setTimeout(() => {
			setCopySuccess("")
		}, 2000)
	}

	switch (router.pathname) {
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
								{creator.name}
							</h3>
							<img
								src="https://via.placeholder.com/150"
								alt="Creator Avatar"
								className="rounded-full mb-4"
							/>
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
		case "/creators":
			switch (status) {
				case "loading":
					return <SkeletonCard />
				case "error":
					return <p>error</p>
				case "loaded":
					return (
						<div className="p-4 bg-white rounded-lg shadow-md w-80">
							<h3 className="text-lg font-semibold font-primary text-[#B76E79] mb-2">
								{creator.name}
							</h3>
							<img
								src="https://via.placeholder.com/150"
								alt="Creator Avatar"
								className="rounded-full mb-4"
							/>
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
							className="p-4 border hover:shadow-md hover:-translate-y-1 hover:shadow-black/40 duration-200 rounded-lg shadow-black/40 shadow-sm max-w-sm w-full hover:translate">
							<h3 className="text-lg font-semibold font-primary text-[#B76E79] mb-2">
								{creator.nickName}
							</h3>
							<div className="w-full relative h-40">
								<Image
									src={creator.profilePicture}
									alt="Creator Avatar"
									fill
									style={{ objectFit: "contain", objectPosition: "center" }}
									sizes="100%"
									className=" mb-4"
								/>
							</div>
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
