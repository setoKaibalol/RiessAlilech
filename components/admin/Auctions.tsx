import React, { useState } from "react"
import { ClipLoader } from "react-spinners"

interface Auction {
	id: number
	title: string
	description: string
	Creator: {
		creator: {
			id: number
			name: string
			email: string
			role: "USER" | "CREATOR"
		}
		id: number
		name: string
		nickname: string
	}
}

interface AuctionsLayoutProps {
	auctions: Auction[]
}

const AuctionsLayout: React.FC<AuctionsLayoutProps> = ({ auctions }) => {
	const [editingAuctionId, setEditingAuctionId] = useState<number | null>(null)
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [saveAuctionStatus, setSaveAuctionStatus] = useState("loaded")

	const startEditingAuction = (auctionId: number) => {
		const auction = auctions.find((a) => a.id === auctionId)
		if (auction) {
			setEditingAuctionId(auctionId)
			setTitle(auction.title)
			setDescription(auction.description)
		}
	}

	const stopEditingAuction = () => {
		setEditingAuctionId(null)
		setTitle("")
		setDescription("")
	}

	const saveAuction = async () => {
		if (editingAuctionId) {
			setSaveAuctionStatus("loading")
			const res = await fetch(`/api/admin/auctions/update`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					auctionId: editingAuctionId,
					title,
					description,
				}),
			})
				.then((res) => {
					console.log(res)
					if (res.ok) {
						stopEditingAuction()
						setSaveAuctionStatus("loaded")
					}
					res.json()
				})
				.catch((err) => {
					setSaveAuctionStatus("error")
					console.log(err)
				})
		}
	}

	return (
		<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<div className="flex justify-between mb-4 p-6">
				<h1 className="text-2xl font-bold">Auctions</h1>
			</div>
			<div className="bg-white overflow-y-hidden overflow-x-scroll shadow-xl sm:rounded-lg">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								ID
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Title
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Description
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								User
							</th>
							<th scope="col" className="relative px-6 py-3">
								<span className="sr-only">Edit</span>
							</th>
							<th scope="col" className="relative px-6 py-3">
								<span className="sr-only">Delete</span>
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{auctions.map((auction) => (
							<tr key={auction.id}>
								<td className="px-6 py-4 w-32 inline-block text-sm font-medium text-gray-900">
									<span className="font-semibold truncate block">
										{auction.id}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{auction.title}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{auction.description}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{auction.Creator.creator.name}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
									<button
										onClick={() => startEditingAuction(auction.id)}
										className="text-indigo-600 hover:text-indigo-900">
										Edit
									</button>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
									<button className="text-red-600 hover:text-red-900">
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{editingAuctionId && (
				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div className="fixed inset-0 transition-opacity">
							<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
						</div>
						<span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
						&#8203;
						<div
							className="inline-block align-bottom w-full bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
							role="dialog"
							aria-modal="true"
							aria-labelledby="modal-headline">
							<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<div className="sm:flex sm:items-start">
									<div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
										<svg
											className="h-6 w-6 text-green-600"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											aria-hidden="true">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M5 13l4 4L19 7"
											/>
										</svg>
									</div>
									<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
										<h3
											className="text-lg leading-6 font-medium text-gray-900"
											id="modal-headline">
											Edit Auction
										</h3>
										<div className="mt-2">
											<div className="grid grid-cols-6 gap-6">
												<div className="col-span-6">
													<label
														htmlFor="title"
														className="
                              block text-sm font-medium text-gray-700">
														Title
													</label>
													<input
														type="text"
														name="title"
														id="title"
														value={title}
														onChange={(e) => setTitle(e.target.value)}
														className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
													/>
												</div>
												<div className="col-span-6">
													<label
														htmlFor="description"
														className="block text-sm font-medium text-gray-700">
														Description
													</label>
													<input
														type="text"
														name="description"
														id="description"
														value={description}
														onChange={(e) => setDescription(e.target.value)}
														className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
								<button
									onClick={saveAuction}
									type="button"
									className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
									Save
								</button>
								<button
									onClick={stopEditingAuction}
									type="button"
									className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default AuctionsLayout
