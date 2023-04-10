import Head from "next/head"
import { useState } from "react"

const NotificationPage = () => {
	const [notifications, setNotifications] = useState([
		{
			id: 1,
			title: "Neue Nachricht",
			message: "Du hast eine neue Nachricht von Lenaa erhalten",
			time: "vor 1h",
			isRead: false,
		},
		{
			id: 2,
			title: "Auktion gewonnen",
			message: "Du hast die Auktion für das Item 'Kleid' gewonnen",
			time: "vor 2h",
			isRead: true,
		},
		{
			id: 3,
			title: "Tip erhalten",
			message: "Lenaa hat deinen Tip erhalten",
			time: "vor 3h",
			isRead: true,
		},
	])

	return (
		<div className="min-h-screen bg-gray-100">
			<Head>
				<title>Notifications</title>
				<meta name="description" content="Notifications" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="">
				<div className="max-w-md mx-auto p-2">
					<div className="w-full flex justify-center py-7">
						<h1 className="text-2xl font-bold">Notifications</h1>
					</div>
					<div className="space-y-4">
						{notifications.map((notification) => (
							<div
								key={notification.id}
								className={`flex flex-col bg-white p-4 border ${
									notification.isRead ? "border-gray-300" : "border-accent-base"
								} rounded-lg`}>
								<div className="flex items-center justify-between">
									<h2 className="text-base font-medium">
										{notification.title}
									</h2>
									<span
										className={`text-xs font-medium ${
											notification.isRead ? "text-gray-500" : "text-accent-base"
										}`}>
										{notification.time}
									</span>
								</div>
								<p className="text-sm text-gray-500">{notification.message}</p>
							</div>
						))}
					</div>
				</div>
			</main>
		</div>
	)
}

export default NotificationPage
