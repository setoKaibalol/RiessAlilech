import React, { useContext } from "react"
import { useUserContext } from "@/context"
import { useSession } from "next-auth/react"
import DashboardNavbar from "@/components/dashboard/DashboardNavbar"
import DashboardAuctions from "@/components/dashboard/DashboardAuctions"
import DashboardItems from "@/components/dashboard/DashboardItems"
import DashboardKonto from "@/components/dashboard/DashboardKonto"
import { ClipLoader } from "react-spinners"

type Props = {}

function Dashboard({}: Props) {
	const { data: session, status } = useSession()
	const { active, setActive } = useUserContext()

	switch (status) {
		case "loading":
			return (
				<div className="h-screen max-h-screen w-full bg-primary overflow-hidden flex flex-col items-center justify-center">
					<ClipLoader size={80} color="#E0726C"></ClipLoader>
				</div>
			)

		default:
			return session && session?.user?.role === "CREATOR" ? (
				<div className="sm:h-screen max-h-screen sm:overflow-hidden flex flex-col">
					<DashboardNavbar />
					{active === 1 ? (
						<DashboardAuctions />
					) : active === 2 ? (
						<DashboardItems />
					) : (
						active === 3 && <DashboardKonto />
					)}
				</div>
			) : (
				<div className="flex flex-col p-8 items-center justify-center h-screen">
					<h1 className="text-2xl font-bold">
						Du hast keinen Zugriff auf diese Seite
					</h1>
				</div>
			)
	}
}

export default Dashboard
