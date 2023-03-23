import React from "react"

type Props = {}

export default function DashboardKonto({}: Props) {
	// 3
	return (
		<div className="h-full flex flex-col justify-between sm:flex-row bg-neutral-800 text-gray-200 ">
			<div className="sm:hidden p-2 text-center text-2xl font-medium">
				<p>Konto</p>
			</div>

			<section className=" h-1/2"></section>
			<section className=" h-1/2"></section>
		</div>
	)
}
