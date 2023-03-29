import React, { useState, useEffect } from "react"
import Select from "react-select"
import { useSession } from "next-auth/react"
import { useUserContext } from "@/context"
import ItemCard from "@/components/cards/ItemCard"
import { SkeletonCard } from "../cards/ItemCardSkeleton"
import ClipLoader from "react-spinners/ClipLoader"

type Props = {}

function DashboardItems({}: Props) {
	const { data: session, status } = useSession()
	const {
		refreshItems,
		setRefreshItems,
		items,
		setItems,
		itemStatus,
		setItemStatus,
	} = useUserContext()

	const [itemName, setItemName] = useState("")
	const [itemImage, setItemImage] = useState()
	const [itemDescription, setItemDescription] = useState("")
	const [itemLink, setItemLink] = useState("")
	const [itemType, setItemType] = useState("")
	const [itemZustellung, setItemZustellung] = useState("")

	const skeletonCards = [1, 2, 3, 4]

	const handleSubmit = (e: any) => {
		e.preventDefault()
		setItemStatus("loading")
		fetch("/api/creator/item/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user: session?.user,
				name: itemName,
				image: itemImage,
				description: itemDescription,
				link: itemLink,
				type: itemType,
				zustellung: itemZustellung,
			}),
		}).then((res) => {
			setRefreshItems(true)
		})
	}

	function handleFileSelect(file: any) {
		const formData = new FormData()
		formData.append("file", file)

		fetch("/api/creator/item/uploadImage", {
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
				setItemImage(data.data)
			})
			.catch((error) => {
				console.error(error)
			})
	}

	useEffect(() => {
		if (session && (!items || items.length === 0)) {
			setItemStatus("loading")
			fetch("/api/creator/item/get", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user: session.user,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					setItems(data)
					setItemStatus("loaded")
				})
		}
	}, [session])

	useEffect(() => {
		if (session && refreshItems) {
			setItemStatus("loading")
			fetch("/api/creator/item/get", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user: session.user,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					setItems(data)
					setItemStatus("loaded")
					setRefreshItems(false)
				})
				.catch((err) => {
					setRefreshItems(false)
					setItemStatus("error")
					console.log(err)
				})
		}
	}, [refreshItems])

	return (
		<div className="h-full pb-20 flex flex-col justify-between divide-y-2 divide-accent-base sm:divide-y-0 sm:flex-row bg-slate-700 text-gray-200">
			<div className="sm:hidden p-2 text-center text-2xl font-medium">
				<p>Items</p>
			</div>
			<section className="sm:w-1/2 h-full flex gap-1 flex-col w-full text-xl font-medium p-2 sm:p-2">
				<p className="py-2">Meine Items</p>
				<div className="overflow-x-scroll overflow-y-hidden h-[610px] w-full sm:p-2">
					<div className=" flex flex-col gap-4">
						{itemStatus === "loading" &&
							skeletonCards.map((item, index) => {
								return <SkeletonCard key={index} />
							})}
						{itemStatus === "loaded" &&
							items.length > 0 &&
							items.map((item, index) => {
								return <ItemCard key={index} status={itemStatus} item={item} />
							})}
					</div>
				</div>
			</section>
			<section className="sm:w-1/2 h-full flex gap-1 flex-col w-full  p-2 sm:p-2">
				<p className="py-2 text-xl font-medium">Item erstellen</p>
				<div className="w-full h-full flex justify-center p-2 font-primary">
					<form
						onSubmit={handleSubmit}
						className="w-full max-w-4xl h-full p-1 gap-4 flex-col flex justify-evenly">
						<div className="w-full sm:gap-1 gap-1 flex flex-col">
							<div className="flex flex-col">
								<label htmlFor="fileInput">Bild</label>
								<input
									id="fileInput"
									accept="image/*"
									required
									onChange={(e: any | null) =>
										handleFileSelect(e.target.files[0])
									}
									type={"file"}></input>
							</div>
							<div>
								<label htmlFor="name">Name</label>
								<input
									type="text"
									name="name"
									id="name"
									value={itemName}
									onChange={(e) => setItemName(e.target.value)}
									required
									className="w-full p-2 border-2 border-primary text-black rounded-sm"
									placeholder="Name"
								/>
							</div>
							<div>
								<label htmlFor="description">Beschreibung</label>
								<input
									type="text"
									name="description"
									id="description"
									value={itemDescription}
									onChange={(e) => setItemDescription(e.target.value)}
									className="w-full p-2 border-2 border-primary text-black rounded-sm"
									placeholder="Beschreibung"
								/>
							</div>
							<div>
								<label htmlFor="link">
									[optional] Link zum Item (z.B. zu einem Google Drive Ordner)
								</label>
								<input
									type="text"
									name="link"
									id="link"
									value={itemLink}
									onChange={(e) => setItemLink(e.target.value)}
									className="w-full p-2 border-2 border-primary text-black rounded-sm"
									placeholder="Link"
								/>
							</div>
							<div className="flex flex-row gap-2">
								<div className="w-1/2">
									<label htmlFor="typ">Typ</label>
									<Select
										name="typ"
										menuPlacement="auto"
										id="typ"
										onChange={(e: any) => {
											setItemType(e.value)
										}}
										options={[
											{
												value: "Physischer Gegenstand",
												label: "Physischer Gegenstand",
											},
											{
												value: "Digitaler Gegenstand",
												label: "Digitaler Gegenstand",
											},
										]}
										className="w-full rounded-sm text-black"
									/>
								</div>

								<div className="w-1/2">
									<label htmlFor="zustellung">Zustellung</label>
									<Select
										name="zustellung"
										id="zustellung"
										menuPlacement="auto"
										onChange={(e: any) => {
											setItemZustellung(e.value)
										}}
										options={[
											{ value: "Email", label: "Email" },
											{ value: "Post", label: "Post" },
										]}
										className="w-full rounded-sm text-black"
									/>
								</div>
							</div>
						</div>

						<button
							type="submit"
							disabled={itemStatus === "loading"}
							className="bg-accent-base text-3xl disabled:bg-gray-600 p-2 px-10 font-medium rounded-lg duration-200 hover:bg-accent-base">
							{itemStatus === "loading" ? (
								<ClipLoader></ClipLoader>
							) : (
								"Item erstellen"
							)}
						</button>
					</form>
				</div>
			</section>
		</div>
	)
}

export default DashboardItems
