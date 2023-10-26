import Link from "next/link"
import React, { useState } from "react"

type Props = {}

function EightheenPlusPanel({}: Props) {
	const [open, setOpen] = useState(true)

	const LeaveSiteButton = () => {
		const handleLeave = () => {
			window.history.back()
		}

		return (
			<button className=" text-black font-bold" onClick={handleLeave}>
				Seite verlassen
			</button>
		)
	}

	return open ? (
		<div className="fixed flex flex-col z-50 w-full justify-center items-center h-full bg-black/90">
			<div className=" text-xl bg-primary-base w-[300px] gap-2 h-28 flex flex-col">
				<div className="w-full h-[50%] flex flex-row justify-center text-2xl text-gray font-semibold items-center">
					Über 18?
				</div>
				<div className="w-full flex flex-row gap-8 justify-center items-center">
					<button
						onClick={() => {
							setOpen(false)
						}}
						className="w-20 h-8 bg-accent-base text-white">
						Ja
					</button>
					<LeaveSiteButton />
				</div>
			</div>
		</div>
	) : null
}

export default EightheenPlusPanel
