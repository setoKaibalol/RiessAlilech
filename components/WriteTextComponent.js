import React from "react"
import Typewriter from "typewriter-effect"

new Typewriter("#typewriter", {
	strings: ["Hello", "World"],
	autoStart: true,
})

function WriteTextComponent() {
	return (
		<div className="w-80 text-secondary-base text-2xl font-bold">
			<div className="">
				<p className="text-primary-base font-medium">Hier findet ihr </p>{" "}
				<Typewriter
					options={{
						strings: [
							"eine große Auswahl an bezauberndem Kontent.",
							"liebevoll getragene Unterwäsche.",
							"unterschiedliche getragene Kleidungsstücke.",
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
