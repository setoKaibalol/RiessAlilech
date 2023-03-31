import React, { useState } from "react"
import { MdAccountBox, MdHome, MdOutlineExplore } from "react-icons/md"
import { GiLovers } from "react-icons/gi"
import { BiDonateHeart } from "react-icons/bi"
import { IoWoman } from "react-icons/io5"
import { ImWoman } from "react-icons/im"
import { RiAuctionFill, RiDashboardFill } from "react-icons/ri"
import { useSession } from "next-auth/react"
import { useUserContext } from "@/context"

import Link from "next/link"

type Props = {}

function NavbarMobile({}: Props) {
	const { data: session, status } = useSession()
	const { active, setActive, showMobileMenu, setShowMobileMenu } =
		useUserContext()

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
					<MdOutlineExplore className="w-10 h-10 rounded-full border-2 border-accent-base shadow-md shadow-accent-base text-accent-base"></MdOutlineExplore>
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

	const navigationCrator = [
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
			name: "Create",
			href: "/dashboard",
			current: false,
			Icon: () => {
				return (
					<RiDashboardFill className="w-10 h-10 rounded-sm border-2 border-accent-base shadow-md shadow-accent-base text-accent-base"></RiDashboardFill>
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

	return session && session.user.role === "CREATOR" ? (
		<div className="w-full h-14 border-t-2 z-20 border-accent-base fixed sm:hidden flex flex-row justify-evenly items-center -bottom-0 bg-secondary-base text-primary-base">
			{navigationCrator.map((item, index) => (
				<Link
					onClick={() => {
						setShowMobileMenu(false)
					}}
					key={index}
					href={item.href}>
					{item.Icon && <item.Icon></item.Icon>}
				</Link>
			))}
		</div>
	) : (
		<div className="w-full h-14 border-t-2 z-20 border-accent-base fixed sm:hidden flex flex-row justify-evenly items-center -bottom-0 bg-secondary-base text-primary-base">
			{navigation.map((item, index) => (
				<Link
					onClick={() => {
						setShowMobileMenu(false)
					}}
					key={index}
					href={item.href}>
					{item.Icon && <item.Icon></item.Icon>}
				</Link>
			))}
		</div>
	)
}

export default NavbarMobile
