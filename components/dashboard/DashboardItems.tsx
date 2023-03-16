import React from "react"
import Select from "react-select"

type Props = {}

function DashboardItems({}: Props) {
	// 2
	return (
		<div className="h-full flex flex-col items-center bg-secondary-200">
			<section className=" h-1/2">
				<div>
					<p>Meine Items</p>
					<div></div>
				</div>
			</section>
			<section className=" h-1/2 w-full flex justify-center">
				<form className="w-full max-w-4xl h-full p-2 gap-2 flex-col flex justify-between">
					<div className="w-full gap-2 flex flex-col">
						<div>
							<label htmlFor="name">Name</label>
							<input
								type="text"
								name="name"
								id="name"
								required
								className="w-full p-2 border-2 border-primary rounded-sm"
							/>
						</div>
						<div>
							<label htmlFor="description">Beschreibung</label>
							<input
								type="text"
								name="description"
								id="description"
								className="w-full p-2 border-2 border-primary rounded-sm"
							/>
						</div>
						<div>
							<label htmlFor="link">Link</label>
							<input
								type="text"
								name="link"
								id="link"
								className="w-full p-2 border-2 border-primary rounded-sm"
							/>
						</div>
						<div className="flex flex-row gap-2">
							<div className="w-1/2">
								<label htmlFor="zustellung">Typ</label>
								<Select
									name="zustellung"
									id="zustellung"
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
						onClick={() => {}}
						className="bg-primary text-3xl p-2 px-10 font-medium rounded-lg duration-200 hover:bg-secondary">
						Item erstellen
					</button>
				</form>
			</section>
		</div>
	)
}

export default DashboardItems
