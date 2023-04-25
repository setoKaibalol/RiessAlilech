import FAQ from "@/components/FAQComponent"
import React from "react"

type Props = {}

function Hilfe({}: Props) {
	return (
		<div className="min-h-screen bg-gradient-center from-primary-base via-accent-base to-accent-base ">
			<div className="h-screen w-full flex flex-col justify-start pt-20">
				<FAQ
					items={[
						{
							question: "Was ist TipForYou?",
							answer:
								"TipForYou ist eine Platform die es Creatorn ermöglicht Tips zu erhalten und Auctions zu erstellen.",
						},
						{
							question: "Was ist ein Creator?",
							answer:
								"Ein Creator ist eine Person die digitalen Content erstellt.",
						},
						{
							question: "Was ist eine Auction?",
							answer:
								"In einer Auction kann ein Creator einen Gegenstand versteigern. Der Höchstbietende erhält den Gegenstand.",
						},
						{
							question: "Kann ich ein Creator werden?",
							answer:
								"Schicke gerne deine Bewerbung mit deinem Namen, Alter, Erfahrungen und deinen Socials an y.alilech@tipforyou.de.",
						},
						{
							question: "Sind die Pakete diskret verpackt?",
							answer:
								"Ja, Die Pakete werden in einem neutralen Karton geliefert, der keine Hinweise auf den Inhalt enthält.",
						},
						{
							question: "Ich brauche Hilfe!",
							answer:
								"Falls du Unterstüzung brauchst kannst du uns per email unter y.alilech@tipforyou.de kontaktieren.",
						},
					]}></FAQ>
			</div>
		</div>
	)
}

export default Hilfe
