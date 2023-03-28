import React, { ReactNode, useEffect } from "react"
import Link from "next/link"
import UsersLayout from "./users2"
import { useUserContext } from "@/context"

interface AdminLayoutProps {
	children: ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({}) => {
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

	return (
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
			</div>
		</div>
	)
}

export default AdminLayout
