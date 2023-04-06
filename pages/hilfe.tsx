import FAQ from "@/components/FAQComponent"
import React from "react"

type Props = {}

function Hilfe({}: Props) {
	return (
		<div className="min-h-screen bg-gradient-to-b from-primary-base to-accent-base flex flex-col justify-center bg-primary pt-20">
			<div className="h-80 w-full">
				<FAQ
					items={[
						{ question: "do birds fly?", answer: "no, brids swim" },
						{
							question: "do chickens lay eggs?",
							answer: "yes chickens lay eggs",
						},
						{
							question: "do crocodiles eat a vegetarian diet?",
							answer: "yes crocodiles only eat plants",
						},
					]}></FAQ>
			</div>
		</div>
	)
}

export default Hilfe
