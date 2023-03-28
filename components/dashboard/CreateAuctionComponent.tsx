import React, { useState, useEffect } from "react"
import Select from "react-select"
import { useSession } from "next-auth/react"
import { useUserContext } from "@/context"
import ClipLoader from "react-spinners/ClipLoader"
import Link from "next/link"
import Image from "next/image"

type Props = {}

interface SelectOption {
	label: any
	value: string
}

function CreateAuctionComponent({}: Props) {
	const [title, setTitle] = React.useState<string>("")
	const [description, setDescription] = React.useState<string>("")
	const [minTip, setMinTip] = React.useState<number>(0)
	const [startAt, setStartAt] = React.useState<Date | number>(Date.now)
	const [endAt, setEndAt] = React.useState<Date>()
	const [image, setImage] = React.useState<string>("")
	const [duration, setDuration] = React.useState<number>(0)
	const [selectedItemId, setSelectedItemId] = React.useState<any>(null)

	const {
		creatorAuctions,
		setCreatorAuctions,
		creatorAuctionsStatus,
		setCreatorAuctionsStatus,
		refreshCreatorAuctions,
		setRefreshCreatorAuctions,
		items,
		setItems,
		refreshItems,
		setRefreshItems,
		itemStatus,
		setItemStatus,
		active,
		setActive,
	} = useUserContext()

	const { data: session, status } = useSession()

	const SelectOptions: SelectOption[] = items.map((item) => {
		return {
			label: (
				<div className="h-20 w-full flex flex-row gap-4 justify-start px-2 items-center">
					<Image
						height={40}
						width={40}
						alt={item.name}
						src={item.image}></Image>
					<p className="">{item.name}</p>
				</div>
			),
			value: item.id,
		}
	})

	const handleSubmit = (e: any) => {
		e.preventDefault()
		setCreatorAuctionsStatus("loading")
		fetch("/api/creator/auction/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: title,
				description: description,
				minTip: minTip,
				startAt: startAt,
				duration: duration,
				creator: session?.user,
				itemId: selectedItemId,
			}),
		}).then((res) => {
			if (res.status === 200) {
				setCreatorAuctionsStatus("loaded")
				setRefreshCreatorAuctions(true)
			}
		})
	}

	useEffect(() => {
		if (session && (!items || items?.length === 0)) {
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
		}
	}, [session])

	return items && items.length > 0 ? (
		<div className="w-full h-full flex justify-center p-2 font-primary">
			<form
				className="w-full max-w-4xl h-full p-1 gap-2 flex-col flex justify-evenly"
				onSubmit={handleSubmit}>
				<div className="w-full gap-1 flex flex-col">
					<div>
						<label htmlFor="title">Titel</label>
						<input
							type="text"
							name="title"
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
							placeholder="Titel"
							className="w-full p-2 border-2 border-primary rounded-sm text-black"
						/>
					</div>
					<div>
						<label htmlFor="description">Beschreibung</label>
						<input
							type="text"
							name="description"
							id="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Beschreibung"
							className="w-full p-2 border-2 border-primary rounded-sm text-black"
						/>
					</div>
					<div className="flex flex-row gap-4 justify-start">
						<div className="w-1/3">
							<label htmlFor="startPrice">Mindestgebot</label>
							<input
								type="number"
								name="startPrice"
								id="startPrice"
								value={minTip}
								onChange={(e) => setMinTip(parseInt(e.target.value))}
								placeholder="€"
								className="w-full p-2 border-2 border-primary rounded-sm text-black"
							/>
						</div>
						<div className="w-1/3 relative">
							<label htmlFor="duration">Dauer</label>
							<span className="absolute">h</span>
							<input
								type="number"
								step={1}
								name="duration"
								id="duration"
								value={duration}
								onChange={(e) => setDuration(parseInt(e.target.value))}
								placeholder="Stunden"
								className="w-full p-2 border-2 border-primary rounded-sm text-black"></input>
						</div>
						<div className="w-1/3">
							<label htmlFor="starttime">Beginn</label>
							<input
								type="datetime-local"
								name="starttime"
								id="starttime"
								aria-orientation="vertical"
								onChange={(e) => {
									setStartAt(new Date(e.target.value))
								}}
								className="w-full p-2 border-2 border-primary rounded-sm text-black"
							/>
						</div>
					</div>
					{items && items.length > 0 && (
						<div className="flex flex-col justify-start">
							<label htmlFor="item">Item</label>
							<Select
								required
								id="item"
								name="item"
								className="w-full h-24 text-black"
								menuPlacement="auto"
								onChange={(e) => {
									setSelectedItemId(e?.value)
								}}
								options={SelectOptions}
								placeholder="Item"></Select>
						</div>
					)}
				</div>
				<button
					type="submit"
					onClick={() => {}}
					disabled={creatorAuctionsStatus === "loading"}
					className="bg-accent-base text-white text-3xl p-2 disabled:bg-gray-600 px-10 font-medium rounded-lg duration-200 hover:bg-rose-700">
					{creatorAuctionsStatus === "loading" ? (
						<ClipLoader></ClipLoader>
					) : (
						"Auction erstellen"
					)}
				</button>
			</form>
		</div>
	) : (
		<div className="w-full h-full flex justify-center p-2 font-primary">
			<div className="w-full max-w-4xl h-full p-1 gap-2 flex-col flex justify-evenly items-center">
				<div className="max-w-sm text-center text-lg">
					<p>
						Um deine erste Auction zu erstellen, benötigst du erstmal ein Item
						zum anbieten.
					</p>
				</div>
				<div>
					<button
						className="text-primary-500 text-2xl uppercase w-max p-2 bg-accent-base font-medium rounded-lg duration-200"
						onClick={() => setActive(2)}>
						Erstelle dein erstes Item!
					</button>
				</div>
			</div>
		</div>
	)
}

export default CreateAuctionComponent
