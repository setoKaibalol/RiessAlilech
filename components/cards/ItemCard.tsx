import React from "react"
import Image from "next/image"
import { SkeletonCard } from "./ItemCardSkeleton"
import { useUserContext } from "@/context"
import { ClipLoader } from "react-spinners"
import { useRouter } from "next/router"

type Props = {
	item: any
	status: string
}

function ItemCard({ item, status }: Props) {
	const router = useRouter()
	const { setRefreshItems, setItemStatus, itemStatus } = useUserContext()
	const [copySuccess, setCopySuccess] = React.useState("")

	const handleCopySuccess = (id: string) => {
		setCopySuccess(id)
		setTimeout(() => {
			setCopySuccess("")
		}, 2000)
	}

	const deleteItem = (item: any) => {
		setItemStatus("loading")
		fetch("/api/creator/item/delete", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				item,
			}),
		}).then((res) => {
			setRefreshItems(true)
		})
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
						<div className="rounded-lg border-secondary divide-y border-2 shadow-md items-center justify-center flex flex-col p-1">
							<h2 className="text-lg p-1 bg-gray-400/20 rounded-lg font-semibold font-primary  text-accent-base z-10 mb-2">
								{item.name}
							</h2>
							<div className="w-36 h-36 relative flex justify-center">
								<Image
									fill
									sizes="100%"
									src={item.image}
									alt="Creator Avatar"
									className="w-full h-full object-cover "
								/>
							</div>
						</div>
					)
				default:
					return <SkeletonCard />
			}
		case "/auctions":
			switch (status) {
				case "loading":
					return <SkeletonCard />
				case "error":
					return <p>error</p>
				case "loaded":
					return (
						<div className="">
							<h2 className="text-lg font-semibold font-primary text-secondary-base mb-2">
								{item.name}
							</h2>

							<div className="w-60 h-60 relative flex justify-center">
								<Image
									fill
									sizes="100%"
									src={item.image}
									alt="Creator Avatar"
									className="w-full h-full object-cover rounded-lg border-secondary border-2 shadow-md"
								/>
							</div>
						</div>
					)
				default:
					return <SkeletonCard />
			}

		default:
			switch (status) {
				case "loading":
					return <SkeletonCard />
				case "error":
					return <p>error</p>
				case "loaded":
					return (
						<div className="rounded-lg p-4 border-secondary border-2 shadow-md w-full">
							<h2 className="text-lg font-semibold font-primary text-secondary-base mb-2">
								{item.name}
							</h2>
							<div className="w-full h-60 relative">
								<Image
									fill
									sizes="100%"
									src={item.image}
									style={{
										borderRadius: "10px",
										objectFit: "contain",
										objectPosition: "center",
									}}
									alt="Creator Avatar"
								/>
							</div>
						</div>
					)
				default:
					return <SkeletonCard />
			}
	}
}

export default ItemCard
