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

	useEffect(() => {
		if (router.query.category) {
			if (router.query.category === "auctions") {
				setChosenCat(1)
			} else if (router.query.category === "creators") {
				setChosenCat(2)
			}
		}
	}, [router.query.search])

	return (
		<div className="gap-4 min-h-screen bg-primary-base flex flex-col">
			<div className="fixed z-20 pt-5 bg-primary-base w-full">
				<div className="w-full flex flex-row px-2 gap-x-2 justify-between items-center">
					<FiChevronLeft
						onClick={() => {
							router.back()
						}}
						className={
							"text-5xl cursor-pointer hover:bg-gray-200 duration-200 rounded-full"
						}></FiChevronLeft>
					<BiSearch className="text-2xl absolute left-16 z-40 text-gray-400"></BiSearch>

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
						className={`flex  hover:bg-gray-100 flex-row justify-center duration-200 w-1/2 p-2 border-b-2 ${
							chosenCat === 1 && "border-black"
						}`}>
						<h2 className="text-3xl"></h2>
						<RiAuctionLine className="text-4xl"></RiAuctionLine>
					</button>
					<button
						onClick={() => {
							setChosenCat(2)
						}}
						className={`flex hover:bg-gray-100 flex-row w-1/2 justify-center duration-200 p-2 border-b-2 ${
							chosenCat === 2 && "border-black"
						}`}>
						<BsPeople className="text-4xl"></BsPeople>
					</button>
				</div>
			</div>
			<div className="pt-[120px]">
				{chosenCat === 1 && <Auctions search={search}></Auctions>}
				{chosenCat === 2 && <Creators search={search}></Creators>}
			</div>
		</div>
	)
}

export default Explore
