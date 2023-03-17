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
	const { refreshItems, setRefreshItems, items, setItems } = useUserContext()

	const [itemName, setItemName] = useState("")
	const [itemImage, setItemImage] = useState()
	const [itemDescription, setItemDescription] = useState("")
	const [itemLink, setItemLink] = useState("")
	const [itemType, setItemType] = useState("")
	const [itemZustellung, setItemZustellung] = useState("")

	const [itemStatus, setItemStatus] = useState("loading")

	const skeletonCards = [1, 2, 3, 4]

	const handleSubmit = (e: any) => {
		e.preventDefault()
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
				console.log(data.data)
				setItemImage(data.data)
			})
			.catch((error) => {
				console.error(error)
			})
	}

	useEffect(() => {
		setItemStatus("loading")
		fetch("/api/creator/item/get", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user: session?.user,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setItems(data)
				setItemStatus("loaded")
			})
	}, [])

	useEffect(() => {
		setRefreshItems(false)
		setItemStatus("loading")
		if (refreshItems) {
			fetch("/api/creator/item/get", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user: session?.user,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					setItems(data)
					setItemStatus("loaded")
				})
		}
	}, [refreshItems])
	return (
		<div className="h-full flex items-center flex-col grow-0 divide-y-2 sm:divide-y-0 sm:divide-x-2 sm:flex-row bg-secondary-200">
			<div className="sm:hidden p-2 text-center text-2xl font-medium">
				<p>Items</p>
			</div>
			<section className="sm:w-1/2 h-full flex gap-1 flex-col w-full text-xl font-medium p-2 sm:p-2">
				<p>Meine Items</p>
				<div className="overflow-y-scroll overflow-x-hidden h-[75vh] sm:p-2">
					<div className=" flex flex-col gap-4">
						{itemStatus === "loading" &&
							skeletonCards.map((item, index) => {
								return <SkeletonCard key={index} />
							})}
						{itemStatus === "loaded" &&
							items.map((item, index) => {
								return <ItemCard key={index} status={itemStatus} item={item} />
							})}
					</div>
				</div>
			</section>
			<section className="sm:w-1/2 w-full h-full flex justify-center p-2">
				<form
					onSubmit={handleSubmit}
					className="w-full max-w-4xl h-full p-1 gap-4 flex-col flex justify-between">
					<div className="w-full sm:gap-2 gap-4 flex flex-col">
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
								className="w-full p-2 border-2 border-primary rounded-sm"
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
								className="w-full p-2 border-2 border-primary rounded-sm"
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
								className="w-full p-2 border-2 border-primary rounded-sm"
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
									className="w-full rounded-sm"
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
									className="w-full rounded-sm"
								/>
							</div>
						</div>
					</div>

					<button
						type="submit"
						className="bg-primary text-3xl p-2 px-10 font-medium rounded-lg duration-200 hover:bg-secondary">
						{itemStatus === "loading" ? (
							<ClipLoader></ClipLoader>
						) : (
							"Item erstellen"
						)}
					</button>
				</form>
			</section>
		</div>
	)
}

export default DashboardItems
