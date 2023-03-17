import React from "react"
import Image from "next/image"
import { SkeletonCard } from "./ItemCardSkeleton"

type Props = {
	item: any
	status: string
}

function ItemCard({ item, status }: Props) {
	switch (status) {
		case "loading":
			return <SkeletonCard />
		case "error":
			return <p>error</p>
		case "loaded":
			return (
				<div className="w-full p-1 h-60 border hover:bg-white/80 duration-200 bg-white/50 shadow-md rounded-sm shadow-gray-600">
					<div className="flex flex-col h-full w-full justify-between">
						<div className="flex flex-row h-auto">
							<div className="relative shrink-0 gap-4 h-52 flex  sm:w-72 w-1/3">
								<Image
									style={{ objectPosition: "top left", objectFit: "contain" }}
									alt={item.name}
									src={item.image}
									fill></Image>
							</div>
							<div className=" w-1/2 h-auto flex flex-col text-base justify-evenly items-center">
								<div className="flex flex-row gap-2 font-medium">
									<p>Name:</p>
									<p>{item.name}</p>
								</div>
								<div className="flex flex-row gap-2 font-medium">
									<p>Link:</p>
									<p>{item.link}</p>
								</div>
								<div className="flex flex-row gap-2 font-medium">
									<p>Zustellungsart:</p>
									<p>{item.zustellung}</p>
								</div>
								<div className="flex flex-row gap-2 font-medium">
									<p>Typ:</p>
									<p>{item.type}</p>
								</div>
							</div>
						</div>
						<div className="flex flex-row gap-2 h-20 font-medium">
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
