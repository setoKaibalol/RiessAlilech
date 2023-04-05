import React, { useState, useEffect } from "react"
import { BiSearch } from "react-icons/bi"
import { BsBack } from "react-icons/bs"
import { FiChevronLeft } from "react-icons/fi"
import { useRouter } from "next/router"
import { RiAuctionLine } from "react-icons/ri"
import { MdOutlineFace3 } from "react-icons/md"
import { BsPeople } from "react-icons/bs"
import Auctions from "@/components/Auctions"
import Creators from "@/components/Creators"

type Props = {}

function Explore({}: Props) {
	const router = useRouter()
	const [chosenCat, setChosenCat] = useState(1)
	const [search, setSearch] = useState("")

	return (
		<div className="pt-20 gap-4 min-h-screen bg-primary-base flex flex-col">
			<div className="w-full flex flex-row px-4 gap-x-4 justify-between items-center">
				<FiChevronLeft
					onClick={() => {
						router.back()
					}}
					className={"text-5xl"}></FiChevronLeft>
				<BiSearch className="text-2xl absolute left-20 z-40 text-gray-400"></BiSearch>

				<input
					value={search}
					onChange={(e) => {
						setSearch(e.target.value)
					}}
					className="relative focus:outline-2 focus:outline-accent-base bg-gray-200 pl-10 z-10 w-full p-2 text-xl rounded-xl border-secondary-base"></input>
			</div>

			<div className="flex flex-row">
				<button
					onClick={() => {
						setChosenCat(1)
					}}
					className={`flex flex-row justify-center duration-200 w-1/2 p-2 border-b-2 ${
						chosenCat === 1 && "border-black"
					}`}>
					<h2 className="text-3xl"></h2>
					<RiAuctionLine className="text-4xl"></RiAuctionLine>
				</button>
				<button
					onClick={() => {
						setChosenCat(2)
					}}
					className={`flex flex-row w-1/2 justify-center duration-200 p-2 border-b-2 ${
						chosenCat === 2 && "border-black"
					}`}>
					<BsPeople className="text-4xl"></BsPeople>
				</button>
			</div>
			<div>
				{chosenCat === 1 && <Auctions search={search}></Auctions>}
				{chosenCat === 2 && <Creators search={search}></Creators>}
			</div>
		</div>
	)
}

export default Explore
