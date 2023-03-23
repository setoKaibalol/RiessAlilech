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
						<div className="w-40 h-40 relative">
							<Image
								fill
								sizes="100%"
								src={item.image}
								alt="Creator Avatar"
								className="w-full h-full object-cover rounded-lg border-secondary border-2 shadow-md"
							/>
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
								name
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
			switch (status) {
				case "loading":
					return <SkeletonCard />
				case "error":
					return <p>error</p>
				case "loaded":
					return (
						<div className="w-40 h-40 relative">
							<Image
								fill
								sizes="100%"
								src={item.image}
								alt="Creator Avatar"
								className="w-full h-full object-cover rounded-lg border-secondary border-2 shadow-md"
							/>
						</div>
					)
				default:
					return <SkeletonCard />
			}

		default:
			return <SkeletonCard />
	}
}

export default ItemCard
