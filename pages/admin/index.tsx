import React, { ReactNode, useEffect } from "react"
import Link from "next/link"
import UsersLayout from "@/components/admin/Users"
import { useUserContext } from "@/context"
import { useSession } from "next-auth/react"
import AuctionsLayout from "@/components/admin/Auctions"

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
				setAdminUsers(data)
			})
	}, [])

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
		<div className="flex flex-col h-screen">
			<nav className="bg-gray-800 py-4">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<Link className="text-white font-bold text-xl" href="/admin">
									Admin Dashboard
								</Link>
							</div>
						</div>
						<div className="flex items-center">
							<div className="ml-4 flex items-center md:ml-6">
								<Link
									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
									href="/admin/users">
									Users
								</Link>
								<Link
									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
									href="/admin/auctions">
									Auctions
								</Link>
							</div>
						</div>
					</div>
				</div>
			</nav>
			<div>
				<UsersLayout users={adminUsers} />
				<AuctionsLayout auctions={auctions}></AuctionsLayout>
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
