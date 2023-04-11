import Head from "next/head"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import moment from "moment"
import "moment/locale/de"
import { signIn } from "next-auth/react"
import { ClipLoader } from "react-spinners"
import Link from "next/link"
import { useUserContext } from "@/context"
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

	const markAsRead = (notification: any) => {
		if (notification.read) return

		setNotifications(
			notifications.map((notification) => {
				if (notification.id === notification.id) {
					return { ...notification, read: true }
				}
				return notification
			})
		)

		fetch("/api/user/notifications/read", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ notification }),
		})
			.then((res) => res.json())
			.then((data) => {})
	}

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
					<button
						className="border-2 p-3 rounded-md bg-accent-base hover:bg-secondary-base text-primary-base border-secondary-base "
						onClick={() => signIn()}>
						Anmelden
					</button>
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
											onClick={() => {
												markAsRead(notification)
											}}
											className={`flex flex-col bg-white p-4 border gap-2 ${
												notification.read
													? "border-gray-300"
													: "border-accent-base"
											} rounded-lg`}>
											<div className="flex items-center justify-between">
												<h2 className="text-base font-bold first-letter:uppercase text-accent-base">
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
