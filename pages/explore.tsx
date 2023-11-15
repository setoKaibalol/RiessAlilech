import React, { useState, useEffect } from "react"
import { BiSearch } from "react-icons/bi"
import { BsBack } from "react-icons/bs"
import { FiChevronLeft } from "react-icons/fi"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback } from "react"
import { RiAuctionLine } from "react-icons/ri"
import { MdOutlineFace3 } from "react-icons/md"
import { BsPeople } from "react-icons/bs"
import Auctions from "@/components/Auctions"
import Creators from "@/components/Creators"

type Props = {}

function Explore({}: Props) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const [chosenCat, setChosenCat] = useState<String>()
	const [search, setSearch] = useState("")

	useEffect(() => {
		if (searchParams.has("category")) {
			if (searchParams.get("category") === "auctions") {
				setChosenCat("auctions")
			} else if (searchParams.get("category") === "creators") {
				setChosenCat("creators")
			}
		}
	}, [searchParams])

	useEffect(() => {
		if (searchParams.has("search")) {
			setSearch(searchParams.get("search") as string)
		}
		if (chosenCat) {
			router.push(
				pathname + "?" + createQueryString("category", chosenCat as string)
			)
		}
	}, [chosenCat])

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams)
			params.set(name, value)

			return params.toString()
		},
		[searchParams]
	)

	return (
		<div className="gap-4 min-h-screen bg-primary-base flex flex-col">
			<div className="fixed z-20 pt-5 bg-primary-base w-full">
				<div className="w-full flex flex-row px-2 gap-x-2 justify-between items-center">
					<FiChevronLeft
						onClick={() => {
							router.back()
						}}
						className={
							"text-4xl cursor-pointer hover:bg-gray-200 duration-200 rounded-full"
						}></FiChevronLeft>
					<BiSearch className="text-2xl absolute left-[70px] z-40 text-gray-400"></BiSearch>

					<input
						value={search}
						onChange={(e) => {
							setSearch(e.target.value)
						}}
						className="relative focus:outline-2 border focus:outline-accent-base/30 bg-white pl-16 z-10 w-full p-2 text-xl rounded-xl border-secondary-base/40"></input>
				</div>

				<div className="flex flex-row">
					<button
						onClick={() => {
							setChosenCat("auctions")
						}}
						className={`flex  hover:bg-gray-100 flex-row justify-center duration-200 w-1/2 p-2 border-b-2 ${
							chosenCat === "auctions" && "border-black"
						}`}>
						<h2 className="text-3xl"></h2>
						<RiAuctionLine className="text-4xl"></RiAuctionLine>
					</button>
					<button
						onClick={() => {
							setChosenCat("creators")
						}}
						className={`flex hover:bg-gray-100 flex-row w-1/2 justify-center duration-200 p-2 border-b-2 ${
							chosenCat === "creators" && "border-black"
						}`}>
						<BsPeople className="text-4xl"></BsPeople>
					</button>
				</div>
			</div>
			<div className="pt-[120px]">
				{chosenCat === "auctions" && <Auctions search={search}></Auctions>}
				{chosenCat === "creators" && <Creators search={search}></Creators>}
			</div>
		</div>
	)
}

export default Explore
