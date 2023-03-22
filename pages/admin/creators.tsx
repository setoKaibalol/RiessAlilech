import React, { useEffect } from "react"
import { useUserContext } from "@/context"
import { useSession } from "next-auth/react"

type Props = {}

function Creators({}: Props) {
	const { data: session } = useSession()

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
		if (session && session?.user?.role === "ADMIN") {
			fetch("/api/admin/users/get", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
			})
				.then((res) => res.json())
				.then((data) => {
					setRefreshAdminUsers(false)
					setAdminUsers(data)
				})
				.catch((err) => console.log(err))
		}
	}, [session, refreshAdminUsers])

	useEffect(() => {
		if (session && session?.user?.role === "ADMIN") {
			fetch("/api/admin/creators/get", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
			})
				.then((res) => res.json())
				.then((data) => {
					setAdminCreators(data)
					setRefreshAdminCreators(false)
				})
				.catch((err) => console.log(err))
		}
	}, [session, refreshAdminCreators])

	const addCreator = (user: any) => {
		fetch("/api/admin/creators/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user: user,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setRefreshAdminCreators(true)
				setRefreshAdminUsers(true)
			})
			.catch((err) => console.log(err))
	}

	return session?.user?.role === "ADMIN" ? (
		<div className="min-h-screen pt-20 h-screen w-full flex flex-col justify-center items-center">
			<div className="flex flex-col justify-center items-center">
				<div className="flex flex-row gap-4 justify-center items-center">
					<div>
						<h1 className="text-2xl font-bold">Users</h1>

						{adminUsers.length > 0 &&
							adminUsers.map((user, index) => (
								<div
									key={index}
									className="flex flex-col p-2 bg-gray-200 rounded-md gap-3 border w-full">
									<p>{index + 1}.</p>
									<div className="flex flex-col gap-1">
										<h1 className="text-xl font-bold">{user.name}</h1>
										<h1 className="text-xl font-bold">{user.email}</h1>
										<button
											onClick={() => addCreator(user)}
											className="bg-primary p-2 px-3 uppercase font-medium rounded-lg duration-200 hover:bg-secondary">
											add creator
										</button>
									</div>
								</div>
							))}
					</div>
					<div>
						<h1 className="text-2xl font-bold">Creators</h1>

						{adminCreators.map((creator, index) => (
							<div
								key={index}
								className="flex flex-col p-2 bg-gray-200 rounded-md gap-3 border w-full">
								<p>{index + 1}.</p>
								<div className="flex flex-col gap-1">
									<h1 className="text-xl font-bold">{creator.name}</h1>
									<h1 className="text-xl font-bold">{creator.email}</h1>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	) : (
		<div className="min-h-screen pt-20 h-screen w-full flex flex-col justify-center items-center">
			<h1 className="text-3xl font-bold">
				You are not authorized to view this page
			</h1>
		</div>
	)
}

export default Creators
