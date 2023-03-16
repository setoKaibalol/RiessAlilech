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
		<div className="w-full h-20 bg-secondary border-b-2 border-primary flex flex-row justify-between px-4">
			<AiOutlineRollback
				className="h-full p-3 w-14 cursor-pointer"
				onClick={() => router.back()}></AiOutlineRollback>
			<div className="w-1/4 h-full pt-4 translate-y-[2px]">
				<button
					onClick={() => {
						setActive(1)
					}}
					className={`h-full w-full p-3 flex md:flex-row md:gap-2 items-center justify-center ${
						active === 1
							? "bg-primary-100 shadow-inner shadow-primary"
							: "bg-primary-100 border-b-primary border-b-2"
					} border-t-2 border-x-2 rounded-t-md`}>
					<RiAuctionFill
						className={`h-full w-auto duration-200 ${
							active === 1 && "scale-90"
						}`}></RiAuctionFill>
					{active === 1 && (
						<p className="font-medium hidden sm:flex text-2xl">Auctions</p>
					)}
				</button>
				{active === 1 && (
					<div className="absolute border-x-2 from-primary-100 to-white bg-gradient-to-b sm:hidden w-full h-20 flex justify-center items-center">
						<h2 className="text-center font-medium text-xl ">Auctions</h2>
					</div>
				)}
			</div>
			<div className="w-1/4 h-full pt-4 translate-y-[2px]">
				<button
					onClick={() => setActive(2)}
					className={`h-full w-full p-3 flex md:flex-row md:gap-2 items-center justify-center ${
						active === 2
							? "bg-secondary-200 shadow-inner shadow-primary"
							: "bg-secondary-200 border-b-primary border-b-2"
					} border-t-2 border-x-2 rounded-t-md`}>
					<MdShoppingBasket
						className={`h-full w-auto duration-200 ${
							active === 2 && "scale-90"
						}`}></MdShoppingBasket>
					{active === 2 && (
						<p className="font-medium hidden sm:flex text-2xl">Items</p>
					)}
				</button>
				{active === 2 && (
					<div className="absolute border-x-2 from-secondary-200 to-white bg-gradient-to-b sm:hidden w-full h-20 flex justify-center items-center">
						<h2 className="text-center font-medium text-xl ">Items</h2>
					</div>
				)}
			</div>
			<div className="w-1/4 h-full pt-4 translate-y-[2px]">
				<button
					onClick={() => setActive(3)}
					className={`h-full w-full p-3 flex md:flex-row md:gap-2 items-center justify-center ${
						active === 3
							? "bg-purple-200 shadow-inner shadow-primary"
							: "bg-purple-200 border-b-primary border-b-2"
					} border-t-2 border-x-2 rounded-t-md`}>
					<TbCoins
						className={`h-full w-auto duration-200 ${
							active === 3 && "scale-90"
						}`}></TbCoins>
					{active === 3 && (
						<p className="font-medium hidden sm:flex text-2xl">Konto</p>
					)}
				</button>
				{active === 3 && (
					<div className="absolute border-x-2 from-purple-200 to-white bg-gradient-to-b sm:hidden w-full h-20 flex justify-center items-center">
						<h2 className="text-center font-medium text-xl ">Konto</h2>
					</div>
				)}
			</div>
		</div>
	)
}

export default DashboardNavbar
