import React from "react"
import Typewriter from "typewriter-effect"

new Typewriter("#typewriter", {
	strings: ["Hello", "World"],
	autoStart: true,
})

function WriteTextComponent() {
	return (
		<div className="w-80 text-secondary-base text-xl font-bold">
			<div className="">
				<p className="text-primary-base font-medium">Hier findest du </p>{" "}
				<Typewriter
					options={{
						strings: [
							"eine große Auswahl an bezauberndem Content.",
							"persönliche Gegenstände von deinem Lieblingscreator.",
							"eine Möglichkeit in die Welt deiner Lieblingscreator einzutauchen.",
						],
						cursor: "|",
						autoStart: true,
						deleteSpeed: 25,
						loop: true,
					}}
				/>
			</div>
		</div>
	)
}

export default WriteTextComponent
