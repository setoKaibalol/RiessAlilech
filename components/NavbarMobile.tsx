import React, { useState } from "react"
import { MdAccountBox, MdHome, MdOutlineExplore } from "react-icons/md"
import { GiLovers } from "react-icons/gi"
import { BiDonateHeart } from "react-icons/bi"
import { IoWoman } from "react-icons/io5"
import { ImWoman } from "react-icons/im"
import { RiAuctionFill } from "react-icons/ri"
import Link from "next/link"

type Props = {}

function NavbarMobile({}: Props) {
	const navigation = [
		{
			name: "Home",
			href: "/",
			current: false,
			Icon: () => {
				return <MdHome className="w-8 h-8"></MdHome>
			},
		},
		{
			name: "Creators",
			href: "/creators",
			current: false,
			Icon: () => {
				return <ImWoman className="w-8 h-8"></ImWoman>
			},
		},
		{
			name: "Entdecken",
			href: "/explore",
			current: false,
			Icon: () => {
				return (
					<MdOutlineExplore className="w-10 h-10 animate-spin text-accent-base"></MdOutlineExplore>
				)
			},
		},
		{
			name: "Auktionen",
			href: "/auctions",
			current: false,
			Icon: () => {
				return <RiAuctionFill className="w-8 h-8"></RiAuctionFill>
			},
		},
		{
			name: "Profil",
			href: "/profile",
			current: false,
			Icon: () => {
				return <MdAccountBox className="w-8 h-8"></MdAccountBox>
			},
		},
	]

	return (
		<div className="w-full h-14 border-t-2 z-20 border-accent-base fixed sm:hidden flex flex-row justify-evenly items-center -bottom-0 bg-secondary-base text-primary-base">
			{navigation.map((item, index) => (
				<Link key={index} href={item.href}>
					{item.Icon && <item.Icon></item.Icon>}
				</Link>
			))}
		</div>
	)
}

export default NavbarMobile
