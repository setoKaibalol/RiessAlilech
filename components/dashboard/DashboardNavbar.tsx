import Link from "next/link"
import React, { useState, useContext } from "react"
import { useRouter } from "next/router"
import { AiOutlineRollback } from "react-icons/ai"
import { RiAuctionFill } from "react-icons/ri"
import { MdShoppingBasket } from "react-icons/md"
import { TbCoins } from "react-icons/tb"
import { useUserContext } from "./../../context"

type Props = {}

function DashboardNavbar({}: Props) {
	const router = useRouter()

	const { active, setActive } = useUserContext()

	return (
		<div className="w-full h-20 shrink-0 font-primary text-white bg-primary-base border-b-2 border-accent-base flex flex-row justify-between px-4">
			<div className="flex justify-center h-full items-center">
				<AiOutlineRollback
					className="h-14 hover:bg-gray-500/70 duration-100 rounded-full text-accent-base px-3 w-14 cursor-pointer"
					onClick={() => router.back()}></AiOutlineRollback>
			</div>
			<div className="w-1/4 h-full pt-4">
				<button
					onClick={() => {
						setActive(1)
					}}
					className={`h-full w-full p-3 flex md:flex-row md:gap-2 items-center justify-center ${
						active === 1 ? "bg-zinc-700 translate-y-[3px]" : "bg-zinc-700"
					} border-t-2 border-x-2 border-accent-base rounded-t-md`}>
					<RiAuctionFill
						className={`h-full text-accent-base  w-auto duration-200 ${
							active === 1 && "scale-90"
						}`}></RiAuctionFill>
					{active === 1 && (
						<p className="font-medium hidden sm:flex text-2xl">Auctions</p>
					)}
				</button>
			</div>
			<div className="w-1/4 h-full pt-4">
				<button
					onClick={() => setActive(2)}
					className={`h-full w-full p-3 flex md:flex-row md:gap-2 items-center justify-center ${
						active === 2 ? "bg-slate-700 translate-y-[3px] " : "bg-slate-700"
					} border-t-2 border-x-2 border-accent-base rounded-t-md`}>
					<MdShoppingBasket
						className={`h-full w-auto duration-200 ${
							active === 2 && "scale-90"
						}`}></MdShoppingBasket>
					{active === 2 && (
						<p className="font-medium hidden sm:flex text-2xl">Items</p>
					)}
				</button>
			</div>
			<div className="w-1/4 h-full pt-4">
				<button
					onClick={() => setActive(3)}
					className={`h-full w-full p-3 flex md:flex-row md:gap-2 items-center justify-center ${
						active === 3 ? "bg-neutral-800 translate-y-[3px]" : "bg-neutral-800"
					} border-t-2 border-x-2 border-accent-base rounded-t-md`}>
					<TbCoins
						className={`h-full w-auto duration-200 ${
							active === 3 && "scale-90"
						}`}></TbCoins>
					{active === 3 && (
						<p className="font-medium hidden sm:flex text-2xl">Konto</p>
					)}
				</button>
			</div>
		</div>
	)
}

export default DashboardNavbar
