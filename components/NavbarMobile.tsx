import React, { useEffect, useState } from "react"
import { MdAccountBox, MdHome, MdOutlineExplore } from "react-icons/md"
import { GiLovers } from "react-icons/gi"
import { BiDonateHeart } from "react-icons/bi"
import { IoWoman } from "react-icons/io5"
import { ImWoman } from "react-icons/im"
import { RiAuctionFill, RiDashboardFill } from "react-icons/ri"
import { useSession } from "next-auth/react"
import { useUserContext } from "@/context"
import { GoSearch } from "react-icons/go"
import { BiHomeAlt2 } from "react-icons/bi"
import { MdOutlineNotifications } from "react-icons/md"
import { IoMdNotificationsOutline } from "react-icons/io"
import { AiOutlineUser } from "react-icons/ai"

import Link from "next/link"

type Props = {}

function NavbarMobile({}: Props) {
	const { data: session, status } = useSession()
	const {
		active,
		setActive,
		showMobileMenu,
		setShowMobileMenu,
		notifications,
		setNotifications,
	} = useUserContext()

	useEffect(() => {
		fetch("/api/user/notifications/get", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({}),
		})
			.then((res) => res.json())
			.then((data) => {
				setNotifications(data)
			})
	}, [])

	const navigation = [
		{
			name: "Home",
			href: "/",
			current: false,
			Icon: () => {
				return <BiHomeAlt2 className="w-8 h-8"></BiHomeAlt2>
			},
		},
		{
			name: "Entdecken",
			href: "/explore",
			current: false,
			Icon: () => {
				return <GoSearch className="w-7 h-7"></GoSearch>
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
			name: "Benachrichtigungen",
			href: "/notifications",
			current: false,
			Icon: () => {
				return (
					<>
						<MdOutlineNotifications className="w-8 h-8"></MdOutlineNotifications>
					</>
				)
			},
		},
		{
			name: "Profil",
			href: "/profile",
			current: false,
			Icon: () => {
				return <AiOutlineUser className="w-8 h-8"></AiOutlineUser>
			},
		},
	]

	const navigationCrator = [
		{
			name: "Home",
			href: "/",
			current: false,
			Icon: () => {
				return <BiHomeAlt2 className="w-8 h-8"></BiHomeAlt2>
			},
		},
		{
			name: "Entdecken",
			href: "/explore",
			current: false,
			Icon: () => {
				return <GoSearch className="w-7 h-7"></GoSearch>
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
			name: "Benachrichtigungen",
			href: "/notifications",
			current: false,
			Icon: () => {
				return (
					<div className="relative">
						{notifications.filter((notification) => {
							if (notification.read === false) {
								return notification
							}

							return false
						}).length > 0 && (
							<div className="absolute -top-1 text-primary-base text-sm font-bold flex justify-center items-center -right-1 w-5 h-5 rounded-full bg-accent-base">
								{
									notifications.filter((notification) => {
										if (notification.read === false) {
											return notification
										}

										return false
									}).length
								}
							</div>
						)}
						<MdOutlineNotifications className="w-8 h-8"></MdOutlineNotifications>
					</div>
				)
			},
		},
		{
			name: "Profil",
			href: "/profile",
			current: false,
			Icon: () => {
				return <AiOutlineUser className="w-8 h-8"></AiOutlineUser>
			},
		},
	]

	return session && session.user.role === "CREATOR" ? (
		<div className="w-full grow-0 max-h-14 h-14 border-t z-30  fixed sm:hidden flex flex-row justify-evenly items-center -bottom-0 bg-primary-base text-secondary-base">
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
		<div className="w-full h-14 grow-0 max-h-14 border-t z-30  fixed sm:hidden flex flex-row justify-evenly items-center -bottom-0 bg-primary-base text-secondary-base">
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
