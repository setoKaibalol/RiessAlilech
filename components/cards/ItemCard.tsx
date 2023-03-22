import React from "react"
import Image from "next/image"
import { SkeletonCard } from "./ItemCardSkeleton"
import { useUserContext } from "@/context"
import { ClipLoader } from "react-spinners"

type Props = {
	item: any
	status: string
}

function ItemCard({ item, status }: Props) {
	const { setRefreshItems, setItemStatus, itemStatus } = useUserContext()
	const [copySuccess, setCopySuccess] = React.useState("")

	const handleCopySuccess = (id: string) => {
		setCopySuccess(id)
		setTimeout(() => {
			setCopySuccess("")
		}, 2000)
	}

	const deleteItem = (item: any) => {
		console.log(item)
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

	switch (status) {
		case "loading":
			return <SkeletonCard />
		case "error":
			return <p>error</p>
		case "loaded":
			return (
				<div className="w-full p-1 h-60 relative border hover:bg-secondary text-gray-200 duration-200 bg-secondary/40 shadow-md rounded-sm shadow-gray-600">
					<button
						onClick={() => deleteItem(item)}
						className="absolute bottom-2 w-40 h-10 justify-center items-center right-2 text-lg text-white bg-red-500 p-1 px-3 uppercase font-medium rounded-lg duration-200 hover:bg-red-700">
						{itemStatus === "loading" && (
							<ClipLoader className="h-10 w-10"></ClipLoader>
						)}
						{itemStatus === "loaded" && "Löschen"}
					</button>
					<div className="flex  divide-x-2 flex-col sm:flex-row h-full w-full justify-between">
						<div className="flex flex-row h-auto pr-2">
							<div className="relative gap flex sm:w-60 w-1/3">
								<Image
									className=" rounded-xl"
									style={{
										objectPosition: "left",
										objectFit: "contain",
									}}
									sizes="100%"
									alt={item.name}
									src={item.image}
									fill></Image>
							</div>
							<div className="w-[200px] h-auto flex gap-2 max-w-[200px] flex-col text-base justify-center items-start">
								<div className="flex flex-row gap-2 font-medium w-full justify-between">
									<p>Name:</p>
									<p>{item.name}</p>
								</div>
								<div className="flex flex-row gap-2 font-medium w-full justify-between">
									<p>Zustellungsart:</p>
									<p>{item.zustellung}</p>
								</div>
								<div className="flex flex-row gap-2 font-medium w-full justify-between">
									<p>Typ:</p>
									<p>{item.type}</p>
								</div>
							</div>
						</div>
						<div className="flex pl-2 flex-row sm:flex-col gap-1 h-20 w-full justify-center sm:h-full items-center text-base">
							<p>Beschreibung:</p>
							<p>{item.description}</p>
						</div>
					</div>
				</div>
			)
		default:
			return <SkeletonCard />
	}
}

export default ItemCard
