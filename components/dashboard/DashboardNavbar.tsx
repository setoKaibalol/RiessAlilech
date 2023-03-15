import Link from "next/link"
import React, { useState, useContext } from "react"
import { useRouter } from "next/router"
import { AiOutlineRollback } from "react-icons/ai"
import { RiAuctionFill } from "react-icons/ri"
import { MdShoppingBasket } from "react-icons/md"
import { TbCoins } from "react-icons/tb"
import { UserContext } from "../../helpers/UserContext"

type Props = {}

function DashboardNavbar({}: Props) {
	const router = useRouter()
	const [active, setActive] = useContext(UserContext)

	return (
		<div className="w-full h-20 bg-secondary border-b-2 border-primary flex flex-row justify-between px-4">
			<AiOutlineRollback
				className="h-full p-3 w-14"
				onClick={() => router.back()}></AiOutlineRollback>
			<div className="w-1/4 h-full px-1 pt-4 translate-y-[2px]">
				<button
					onClick={() => {
						setActive(1)
					}}
					className={`h-full w-full p-3 ${
						active === 1
							? "bg-primary-100 shadow-inner shadow-primary"
							: "bg-primary-100 border-b-primary border-b-2"
					} border-t-2 border-x-2 rounded-t-xl`}>
					<RiAuctionFill
						className={`h-full w-full duration-200 ${
							active === 1 && "scale-90"
						}`}></RiAuctionFill>
				</button>
				{active === 1 && (
					<div className="absolute w-full">
						<h2 className="text-center font-medium text-xl">Auctions</h2>
					</div>
				)}
			</div>
			<div className="w-1/4 h-full px-1 pt-4 translate-y-[2px]">
				<button
					onClick={() => setActive(2)}
					className={`h-full w-full p-3 ${
						active === 2
							? "bg-secondary-200 shadow-inner shadow-primary"
							: "bg-secondary-200 border-b-primary border-b-2"
					} border-t-2 border-x-2 rounded-t-xl`}>
					<MdShoppingBasket
						className={`h-full w-full duration-200 ${
							active === 2 && "scale-90"
						}`}></MdShoppingBasket>
				</button>
				{active === 2 && (
					<div className="absolute w-full">
						<h2 className="text-center font-medium text-xl">Items</h2>
					</div>
				)}
			</div>
			<div className="w-1/4 h-full px-1 pt-4 translate-y-[2px]">
				<button
					onClick={() => setActive(3)}
					className={`h-full w-full p-3 ${
						active === 3
							? "bg-purple-200 shadow-inner shadow-primary"
							: "bg-purple-200 border-b-primary border-b-2"
					} border-t-2 border-x-2 rounded-t-xl`}>
					<TbCoins
						className={`h-full w-full duration-200 ${
							active === 3 && "scale-90"
						}`}></TbCoins>
				</button>
				{active === 3 && (
					<div className="absolute w-full">
						<h2 className="text-center font-medium text-xl">Übersicht</h2>
					</div>
				)}
			</div>
		</div>
	)
}

export default DashboardNavbar
