import React from "react"

type Props = {}

function MainButton({}: Props) {
	return (
		<button className="bg-primary p-2 px-3 uppercase font-medium rounded-lg duration-200 hover:bg-secondary">
			home
		</button>
	)
}

export default MainButton
