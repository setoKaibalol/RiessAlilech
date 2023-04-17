import React, { useState, useEffect } from "react"
import { useUserContext } from "@/context"
import { prisma } from "@/prisma/PrismaClient"
import Image from "next/image"
import { useSession } from "next-auth/react"
import moment from "moment"
import { BiDonateHeart } from "react-icons/bi"
import {
	MdEmail,
	MdNumbers,
	MdPersonPinCircle,
	MdTravelExplore,
} from "react-icons/md"
import Link from "next/link"
import { BsPersonHeart } from "react-icons/bs"
import {
	TbBrandOnlyfans,
	TbBrandYoutube,
	TbBrandInstagram,
	TbBrandTwitter,
	TbBrandTiktok,
	TbNumber4,
	TbBrandTwitch,
} from "react-icons/tb"
import TipModal from "@/components/TipModal"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { VscVerifiedFilled } from "react-icons/vsc"

type Props = {
	creator: any
}

function Creator(props: Props) {
	const router = useRouter()
	const { creator } = props

	const handleDownload = () => {
		const element = document.createElement("a")

		const header = "ID,AMOUNT,CREATEDAT,MESSAGE" // Replace with appropriate CSV headers
		const tipsReceivedCSV = creator.tipsReceived
			.map((tip: any) => {
				// Replace this line with the actual data extraction logic for your object.
				return `${tip.id},${tip.amount},${moment(tip.createdAt).format(
					"DD.MM.YYYY HH:mm"
				)},${tip.message}`
			})
			.join("\n")

		const csvContent = header + "\n" + tipsReceivedCSV

		const file = new Blob([csvContent], {
			type: "text/csv",
		})

		element.href = URL.createObjectURL(file)
		element.download = `${creator.name} - Tips.csv`
		document.body.appendChild(element) // Required for this to work in FireFox
		element.click()
	}

	return creator ? (
		<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 pb-20">
			<div className="flex justify-between mb-4 px-6">
				<h1 className="text-2xl font-bold">Tips</h1>
			</div>
			<div className="bg-white overflow-x-scroll shadow-xl sm:rounded-lg">
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
								amount
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								CreatedAt
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Message
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{creator.tipsReceived.map((tip: any) => {
							return (
								<tr key={tip.id}>
									<td className="px-6 py-4 w-32 inline-block text-sm font-medium text-gray-900">
										<span className="font-semibold truncate block">
											{tip.id}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{tip.amount} €
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{moment(tip.createdAt).format("DD.MM.YYYY")}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{tip.message}
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
			<div className="flex justify-between mb-4 mt-10 px-6">
				<button
					onClick={() => handleDownload()}
					className="text-2xl border-2 rounded-lg p-2 bg-gray-200 border-secondary-base w-full font-bold">
					Download CSV
				</button>
			</div>
		</div>
	) : (
		<div className="pt-20 min-h-screen bg-primary flex text-center w-full h-full justify-center items-center text-5xl">
			Dieser Creator existiert nicht
		</div>
	)
}

export default Creator

export async function getServerSideProps(context: { params: any }) {
	const { params } = context
	const creator = await prisma.creator.findUnique({
		where: {
			id: params.CID,
		},
		include: {
			Auction: true,
			tipsReceived: true,
		},
	})

	return {
		props: {
			creator: JSON.parse(JSON.stringify(creator)),
		},
	}
}
