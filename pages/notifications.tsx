import Head from "next/head"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import moment from "moment"
import "moment/locale/de"
import { signIn } from "next-auth/react"
import { ClipLoader } from "react-spinners"
import Link from "next/link"
import { useUserContext } from "@/context"
import { AuthComponent } from "@/components/AuthComponent"
moment.locale("de")

const NotificationPage = () => {
	const { data: session, status } = useSession()
	const { notifications, setNotifications } = useUserContext()

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

	useEffect(() => {
		fetch("/api/user/notifications/read", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (notifications.length > 0) {
					setNotifications(
						notifications.map((notification) => ({
							...notification,
							read: true,
						}))
					)
				}
			})
	}, [])

	switch (status) {
		case "loading":
			return (
				<div className="flex justify-center items-center h-screen bg-primary-base">
					<ClipLoader color="#E0726C" size={150} />
				</div>
			)
		case "unauthenticated":
			return (
				<div className="flex justify-center items-center h-screen text-black">
					<AuthComponent />
				</div>
			)
		case "authenticated":
			return (
				<div className="min-h-screen bg-gray-100">
					<Head>
						<title>Notifications</title>
						<meta name="description" content="Notifications" />
						<link rel="icon" href="/favicon.ico" />
					</Head>

					<main className="h-screen max-h-screen">
						<div className="max-w-md mx-auto max-h-screen p-2">
							<div className="w-full flex justify-center py-5">
								<h1 className="text-2xl font-bold">Notifications</h1>
							</div>
							<div className="overflow-y-scroll h-[700px] gap-4 flex flex-col">
								{notifications &&
									notifications.length > 0 &&
									notifications.map((notification) => (
										<Link
											href={
												notification.type === "bid"
													? `/auction/${notification.linkAuction.id}`
													: notification.type === "tip"
													? `/creator/${notification.linkCreator.id}`
													: "/explore"
											}
											key={notification.id}
											className={`flex flex-col bg-white p-4 border gap-2 ${
												notification.read
													? "border-gray-300"
													: "border-accent-base"
											} rounded-lg`}>
											<div className="flex items-center justify-between">
												<h2
													className={`text-base font-bold first-letter:uppercase 												${
														notification.read
															? "text-secondary-base"
															: "text-accent-base"
													}
`}>
													{notification.type === "credits" && "TipTokens"}
													{notification.type === "bid" && "Gebot"}
													{notification.type === "tip" && "Tip"}
												</h2>
												<div
													className={`text-xs font-medium ${
														notification.read
															? "text-gray-500"
															: "text-accent-base"
													}`}>
													{moment(notification.createdAt).fromNow()}
												</div>
											</div>
											<p className="text-sm text-gray-500">
												{notification.message}
											</p>
										</Link>
									))}
							</div>
						</div>
					</main>
				</div>
			)

		default:
			return (
				<div className="flex justify-center items-center h-screen text-black">
					Login
				</div>
			)
	}
}

export default NotificationPage
