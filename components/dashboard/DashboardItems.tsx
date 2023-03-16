import React, { useState, useEffect } from "react"
import Select from "react-select"

type Props = {}

function DashboardItems({}: Props) {
	const [itemName, setItemName] = useState("")
	const [itemDescription, setItemDescription] = useState("")
	const [itemLink, setItemLink] = useState("")
	const [itemType, setItemType] = useState("")
	const [itemZustellung, setItemZustellung] = useState("")

	const handleSubmit = (e: any) => {
		e.preventDefault()
		fetch("/api/creator/createItem", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: itemName,
				description: itemDescription,
				link: itemLink,
				type: itemType,
				zustellung: itemZustellung,
			}),
		})
	}
	// 2
	return (
		<div className="h-full flex flex-col justify-between items-center divide-y-2 sm:divide-y-0 bg-secondary-200">
			<div className="sm:hidden p-2 text-center text-2xl font-medium">
				<p>Items</p>
			</div>

			<section className="h-1/2">lol</section>
			<section className="h-1/2 w-full flex justify-center p-2">
				<form
					onSubmit={handleSubmit}
					className="w-full max-w-4xl h-full p-1 gap-2 flex-col flex justify-between">
					<div className="w-full gap-1 flex flex-col">
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
							<label htmlFor="link">Link</label>
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
						Item erstellen
					</button>
				</form>
			</section>
		</div>
	)
}

export default DashboardItems
