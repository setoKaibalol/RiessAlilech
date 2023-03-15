import React, { useContext } from "react"
import DashboardNavbar from "@/components/dashboard/DashboardNavbar"
import { UserContext } from "@/helpers/UserContext"
import DashboardAuctions from "@/components/dashboard/DashboardAuctions"
import DashboardItems from "@/components/dashboard/DashboardItems"
import DashboardKonto from "@/components/dashboard/DashboardKonto"

type Props = {}

function Dashboard({}: Props) {
	const [active, setActive] = useContext(UserContext)
	return (
		<div className="h-screen flex flex-col">
			<DashboardNavbar />
			{active === 1 ? (
				<DashboardAuctions />
			) : active === 2 ? (
				<DashboardItems />
			) : (
				<DashboardKonto />
			)}
		</div>
	)
}

export default Dashboard
