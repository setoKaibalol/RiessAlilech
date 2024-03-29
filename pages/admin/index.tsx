import React, { ReactNode, useEffect } from "react"
import Link from "next/link"
import UsersLayout from "@/components/admin/Users"
import { useUserContext } from "@/context"
import { useSession } from "next-auth/react"
import AuctionsLayout from "@/components/admin/Auctions"
import { FiChevronLeft } from "react-icons/fi"
import router from "next/router"

interface AdminLayoutProps {
	children: ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({}) => {
	const { data: session, status } = useSession()
	const {
		adminCreators,
		setAdminCreators,
		refreshAdminCreators,
		setRefreshAdminCreators,
		adminCreatorsStatus,
		setAdminCreatorsStatus,
		adminUsers,
		setAdminUsers,
		adminUsersStatus,
		setAdminUsersStatus,
		refreshAdminUsers,
		setRefreshAdminUsers,
		auctions,
		setAuctions,
		auctionsStatus,
		setAuctionsStatus,
		refreshAuctions,
		setRefreshAuctions,
	} = useUserContext()

	useEffect(() => {
		setAdminUsersStatus("loading")
		fetch("/api/admin/users/get", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({}),
		})
			.then((res) => res.json())
			.then((data) => {
				setAdminUsersStatus("loaded")
				setAdminUsers(data)
			})
	}, [])

	useEffect(() => {
		if (refreshAdminUsers) {
			setAdminUsersStatus("loading")
			fetch("/api/admin/users/get", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data)
					setAdminUsersStatus("loaded")
					setRefreshAdminUsers(false)
					setAdminUsers(data)
				})
				.catch((err) => {
					setAdminUsersStatus("error")
					setRefreshAdminUsers(false)
					console.log(err)
				})
		}
	}, [refreshAdminUsers])

	useEffect(() => {
		if (refreshAuctions && (!auctions || auctions.length === 0)) {
			fetch("/api/admin/auctions/get", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
			})
				.then((res) => res.json())
				.then((data) => {
					setAuctions(data)
					setAuctionsStatus("loaded")
					setRefreshAuctions(false)
				})
				.catch((err) => {
					setAuctionsStatus("error")
					setRefreshAuctions(false)
				})
		}
	}, [refreshAuctions])

	useEffect(() => {
		if (!auctions || auctions.length === 0) {
			fetch("/api/admin/auctions/get", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
			})
				.then((res) => res.json())
				.then((data) => {
					setAuctions(data)
					setAuctionsStatus("loaded")
				})
		}
	}, [])

	return session?.user.role === "ADMIN" ? (
		<div className="flex flex-col min-h-screen h-auto overflow-scroll">
			<nav className="bg-gray-800 py-4">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center">
							<div className="flex-shrink-0 flex-row flex justify-center items-center gap-4">
								<FiChevronLeft
									onClick={() => {
										router.back()
									}}
									className={
										"text-5xl cursor-pointer text-primary-base duration-200 rounded-full"
									}></FiChevronLeft>

								<Link className="text-white font-bold text-xl" href="/admin">
									Admin Dashboard
								</Link>
							</div>
						</div>
					</div>
				</div>
			</nav>
			<div className=" h-full min-h-screen">
				<UsersLayout
					users={adminUsers}
					props={{ setRefreshAdminUsers, setAdminUsersStatus }}
				/>
				<AuctionsLayout
					auctions={auctions}
					props={{ setRefreshAuctions, setAuctionsStatus }}
				/>
			</div>
		</div>
	) : (
		<div className="flex flex-col p-8 items-center justify-center h-screen">
			<h1 className="text-2xl font-bold">
				Du hast keinen Zugriff auf diese Seite
			</h1>
		</div>
	)
}

export default AdminLayout
