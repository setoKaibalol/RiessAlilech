import React from "react"
import Select from "react-select"
import Placeholder, {
	placeholderCSS,
} from "react-select/dist/declarations/src/components/Placeholder"

type Props = {}

function CreateAuctionComponent({}: Props) {
	const options = [
		{ value: "chocolate", label: "Chocolate" },
		{ value: "strawberry", label: "Strawberry" },
		{ value: "vanilla", label: "Vanilla" },
	]

	const handleCreateAuction = (e: any) => {
		e.preventDefault()
		fetch("/api/creator/createAuction", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: "test",
				description: "test",
				startPrice: 100,
			}),
		})
	}

	return (
		<div className="w-full h-full flex justify-center p-2">
			<form
				className="w-full max-w-4xl h-full p-1 gap-2 flex-col flex justify-between"
				onSubmit={handleCreateAuction}>
				<div className="w-full gap-1 flex flex-col">
					<div>
						<label htmlFor="title">Titel</label>
						<input
							type="text"
							name="title"
							id="title"
							required
							placeholder="Titel"
							className="w-full p-2 border-2 border-primary rounded-sm"
						/>
					</div>
					<div>
						<label htmlFor="description">Beschreibung</label>
						<input
							type="text"
							name="description"
							id="description"
							placeholder="Beschreibung"
							className="w-full p-2 border-2 border-primary rounded-sm"
						/>
					</div>
					<div className="flex flex-row gap-4 justify-start">
						<div className="w-1/3">
							<label htmlFor="startPrice">Mindestgebot</label>
							<input
								type="number"
								name="startPrice"
								id="startPrice"
								placeholder="€"
								className="w-full p-2 border-2 border-primary rounded-sm"
							/>
						</div>
						<div className="w-1/3">
							<label htmlFor="duration">Dauer</label>
							<input
								type="number"
								name="duration"
								id="duration"
								placeholder="Stunden"
								className="w-full p-2 border-2 border-primary rounded-sm"
							/>
						</div>
						<div className="w-1/3">
							<label htmlFor="starttime">Startzeitpunkt</label>
							<input
								type="datetime-local"
								name="starttime"
								id="starttime"
								className="w-full p-2 border-2 border-primary rounded-sm"
							/>
						</div>
					</div>
					<div className="flex flex-col justify-start">
						<label htmlFor="item">Item</label>
						<Select
							id="item"
							name="item"
							className="w-full"
							menuPlacement="auto"
							options={options}
							placeholder="Item"></Select>
					</div>
				</div>
				<button
					type="submit"
					onClick={() => {}}
					className="bg-primary text-3xl p-2 px-10 font-medium rounded-lg duration-200 hover:bg-secondary">
					Auktion erstellen
				</button>
			</form>
		</div>
	)
}

export default CreateAuctionComponent
