import React from "react"
import { SkeletonCard } from "./ItemCardSkeleton"
import { useRouter } from "next/router"
import { ClipLoader } from "react-spinners"
import { useUserContext } from "@/context"
import Link from "next/link"
import Image from "next/image"

type Props = {
	status: string
	creator: any
}

function CreatorCard({ status, creator }: Props) {
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
						<div className="w-full p-1 h-60 border relative hover:bg-secondary  duration-200 bg-secondary/80 text-black shadow-md rounded-sm shadow-gray-600">
							<div className="flex  divide-x-2 flex-col sm:flex-row h-full w-full justify-between">
								<div className="flex flex-row h-auto pr-2">
									<Link
										href={
											process.env.NEXT_PUBLIC_WEBSITE_URL + "/" + creator.id
										}
										className="relative gap flex sm:w-60 w-1/3 z-20 hover:scale-110 duration-200">
										<Image
											className=" rounded-xl"
											style={{
												objectPosition: "left",
												objectFit: "contain",
											}}
											alt={creator.name}
											src={creator.profilePicture}
											fill></Image>
									</Link>
									<div className="w-[200px] h-auto flex gap-2 max-w-[200px] flex-col text-base justify-center items-start">
										<div className="flex flex-row gap-2 font-medium w-full justify-between">
											<p>Titel:</p>
											<p></p>
										</div>
										<div className="flex flex-row justify-between w-full items-center gap-2">
											<p>Link zum Teilen:</p>

											<button
												onClick={() => {
													navigator.clipboard.writeText(
														websiteLink + "/" + creator.id
													)
													handleCopySuccess(creator.id)
												}}
												className="bg-gray-200/20 truncate hover:bg-gray-200/60 duration-200 p-1 rounded-xl w-full font-medium">
												{copySuccess === creator.id
													? "Kopiert!"
													: websiteLink + "/" + creator.id}
											</button>
										</div>
										<div className="flex flex-row gap-2 font-medium w-full justify-between">
											<p>Mindest Tip:</p>
											<p></p>
										</div>
										<div className="flex flex-row gap-2 font-medium w-full justify-between">
											<p>Typ:</p>
											<p></p>
										</div>
									</div>
								</div>
								<div className="flex pl-2 flex-row sm:flex-col gap-1 h-20 w-full justify-center sm:h-full items-center text-base">
									<p>Beschreibung:</p>
									<p></p>
								</div>
							</div>
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
						<div className="w-full p-1 h-60 border relative hover:bg-secondary  duration-200 bg-secondary/80 text-black shadow-md rounded-sm shadow-gray-600">
							<div className="flex  divide-x-2 flex-col sm:flex-row h-full w-full justify-between">
								<div className="flex flex-row h-auto pr-2">
									<Link
										href={
											process.env.NEXT_PUBLIC_WEBSITE_URL + "/" + creator.id
										}
										className="relative gap flex sm:w-60 w-1/3 z-20 hover:scale-110 duration-200">
										<Image
											className=" rounded-xl"
											style={{
												objectPosition: "left",
												objectFit: "contain",
											}}
											alt={creator?.name}
											src={creator.profilePicture}
											fill></Image>
									</Link>
									<div className="w-[200px] h-auto flex gap-2 max-w-[200px] flex-col text-base justify-center items-start">
										<div className="flex flex-row gap-2 font-medium w-full justify-between">
											<p>Titel:</p>
											<p></p>
										</div>
										<div className="flex flex-row justify-between w-full items-center gap-2">
											<p>Link zum Teilen:</p>

											<button
												onClick={() => {
													navigator.clipboard.writeText(
														websiteLink + "/" + creator.id
													)
													handleCopySuccess(creator.id)
												}}
												className="bg-gray-200/20 truncate hover:bg-gray-200/60 duration-200 p-1 rounded-xl w-full font-medium">
												{copySuccess === creator.id
													? "Kopiert!"
													: websiteLink + "/" + creator.id}
											</button>
										</div>
										<div className="flex flex-row gap-2 font-medium w-full justify-between">
											<p>Mindest Tip:</p>
											<p></p>
										</div>
										<div className="flex flex-row gap-2 font-medium w-full justify-between">
											<p>Typ:</p>
											<p></p>
										</div>
									</div>
								</div>
								<div className="flex pl-2 flex-row sm:flex-col gap-1 h-20 w-full justify-center sm:h-full items-center text-base">
									<p>Beschreibung:</p>
									<p></p>
								</div>
							</div>
						</div>
					)
				default:
					return <SkeletonCard />
			}
		default:
			return <SkeletonCard />
	}
}

export default CreatorCard
