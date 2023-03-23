import React from "react"

type Props = {}

function Error({}: Props) {
	return (
		<div className=" pt-20 h-screen w-full flex justify-center items-center bg-primary text-2xl font-medium">
			Diese Seite existiert nicht 🤔
		</div>
	)
}

export default Error
