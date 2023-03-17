import React, { useContext } from "react"
import { useUserContext } from "@/context"
import DashboardNavbar from "@/components/dashboard/DashboardNavbar"
import DashboardAuctions from "@/components/dashboard/DashboardAuctions"
import DashboardItems from "@/components/dashboard/DashboardItems"
import DashboardKonto from "@/components/dashboard/DashboardKonto"

type Props = {}

function Dashboard({}: Props) {
	const { active, setActive } = useUserContext()

	return (
		<div className="sm:h-screen max-h-screen flex flex-col">
			<DashboardNavbar />
			{active === 1 ? (
				<DashboardAuctions />
			) : active === 2 ? (
				<DashboardItems />
			) : (
				active === 3 && <DashboardKonto />
			)}
		</div>
	)
}

export default Dashboard
